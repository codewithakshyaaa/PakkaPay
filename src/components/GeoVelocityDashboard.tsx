import React, { useState } from "react";
import {
  Radio,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Sliders,
  ArrowLeft,
} from "lucide-react";
import { ChequeData, LanguageCode, RiskLevel } from "../types";
import { translations } from "../data/translations";

interface GeoVelocityDashboardProps {
  language: LanguageCode;
  isDarkMode?: boolean;
  activeCheque: ChequeData | null;
  onTriggerIvr: (cheque: ChequeData) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const GeoVelocityDashboard: React.FC<GeoVelocityDashboardProps> = ({
  language,
  isDarkMode = false,
  activeCheque,
  onTriggerIvr,
  onNavigateToTab,
}) => {
  const t = translations[language].strings;

  // State for interactive simulation parameters
  const [lastCity] = useState("Mumbai, Maharashtra");
  const [currentCity] = useState("Samastipur, Bihar");
  const [elapsedMinutes, setElapsedMinutes] = useState(15);
  const [distanceKm, setDistanceKm] = useState(1750);
  const [amountValue] = useState(activeCheque?.amountNumeric || 45000);
  const [avgBalance] = useState(60000);

  // Speed calculation
  const timeHours = Math.max(0.05, elapsedMinutes / 60);
  const velocityKmH = Math.round(distanceKm / timeHours);

  // Dynamic Risk Score calculation
  let riskScore = 15;
  const flags: string[] = [];

  if (velocityKmH > 800) {
    riskScore += 55;
    flags.push(`Impossible physical velocity: ${velocityKmH.toLocaleString()} km/h exceeds commercial aircraft limits.`);
  } else if (velocityKmH > 250) {
    riskScore += 30;
    flags.push(`High spatial velocity: ${velocityKmH} km/h between locations in short timeframe.`);
  }

  if (amountValue > avgBalance * 1.5) {
    riskScore += 20;
    flags.push(`Amount exceeds 150% of 6-month average account balance (₹${amountValue.toLocaleString()} vs avg ₹${avgBalance.toLocaleString()}).`);
  }

  if (activeCheque && !activeCheque.isWordsNumbersMatch) {
    riskScore += 40;
    flags.push("Critical Words vs Numbers mismatch detected on scanned leaf.");
  }

  riskScore = Math.min(100, Math.max(0, riskScore));
  const riskLevel: RiskLevel = riskScore >= 70 ? "RED" : riskScore >= 35 ? "YELLOW" : "GREEN";

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${
        isDarkMode ? "text-slate-100" : "text-[#182C25]"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          {/* Back to Home CTA */}
          {onNavigateToTab && (
            <button
              id="risk-back-home-btn"
              onClick={() => onNavigateToTab("landing")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all mb-3 cursor-pointer shadow-2xs group border ${
                isDarkMode
                  ? "bg-[#11221C] hover:bg-[#183027] border-[#1E3B30] text-[#D6E8D8]"
                  : "bg-white hover:bg-slate-100 border-slate-200 text-[#182C25]"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>← Back to Home</span>
            </button>
          )}

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#D6E8D8] text-[#182C25] text-xs font-bold uppercase tracking-wider">
              Spatial-Temporal Physics Engine
            </span>
            <span className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Real-Time Transit Verification
            </span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-[#182C25]"
            }`}
          >
            {t.riskEngineTitle}
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            Detects fraudulent cheque deposits when the physical transit speed between recent card/UPI authentication and branch presentation violates physical laws.
          </p>
        </div>

        {/* Color-Coded Risk Badge */}
        <div
          className={`px-5 py-3 rounded-2xl border flex items-center gap-3 shadow-xs ${
            riskLevel === "RED"
              ? isDarkMode
                ? "bg-rose-950/60 border-rose-800 text-rose-100"
                : "bg-rose-50 border-rose-300 text-rose-950"
              : riskLevel === "YELLOW"
              ? isDarkMode
                ? "bg-amber-950/60 border-amber-800 text-amber-100"
                : "bg-amber-50 border-amber-300 text-amber-950"
              : isDarkMode
              ? "bg-[#11221C] border-[#1E3B30] text-[#D6E8D8]"
              : "bg-[#D6E8D8] border-[#C2DEC5] text-[#182C25]"
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg text-white ${
              riskLevel === "RED" ? "bg-rose-600" : riskLevel === "YELLOW" ? "bg-amber-500" : "bg-[#182C25]"
            }`}
          >
            {riskScore}
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Composite Risk Index
            </span>
            <span className="text-xs font-black">
              {riskLevel === "RED" ? t.highRisk : riskLevel === "YELLOW" ? t.moderateRisk : t.lowRisk}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Geo-Velocity Map Diagram (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#10201A] text-white border border-emerald-900/50 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#D6E8D8] animate-pulse" />
                <span className="text-xs font-bold text-white">
                  Spatial-Temporal Trajectory Graph
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#D6E8D8]">
                Δd: {distanceKm} km | Δt: {elapsedMinutes} min
              </span>
            </div>

            {/* Visual Vector Trajectory Diagram */}
            <div className="relative py-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-950/80 rounded-2xl border border-white/10">
              {/* Origin Node */}
              <div className="flex flex-col items-center text-center max-w-[140px]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#D6E8D8] mb-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Previous Node</span>
                <span className="text-xs font-bold text-white truncate">{lastCity}</span>
                <span className="text-[10px] text-[#D6E8D8] font-mono mt-0.5">
                  ATM Swipe • {elapsedMinutes}m ago
                </span>
              </div>

              {/* Transit Vector Line */}
              <div className="flex-1 w-full flex flex-col items-center px-2">
                <div className="text-[11px] font-mono font-black text-amber-300 mb-1">
                  ⚡ {velocityKmH.toLocaleString()} km/h
                </div>
                <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden flex items-center">
                  <div
                    className={`h-full rounded-full transition-all ${
                      velocityKmH > 800 ? "w-full bg-rose-500 animate-pulse" : "w-3/4 bg-[#D6E8D8]"
                    }`}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">
                  {distanceKm} km physical separation
                </span>
              </div>

              {/* Destination Node */}
              <div className="flex flex-col items-center text-center max-w-[140px]">
                <div className="w-12 h-12 rounded-2xl bg-[#D6E8D8]/20 border border-[#D6E8D8]/40 flex items-center justify-center text-[#D6E8D8] mb-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Present Node</span>
                <span className="text-xs font-bold text-white truncate">{currentCity}</span>
                <span className="text-[10px] text-[#D6E8D8] font-mono mt-0.5">
                  Cheque Kiosk • Just Now
                </span>
              </div>
            </div>

            {/* Velocity Verdict Alert */}
            <div className="mt-6">
              {velocityKmH > 800 ? (
                <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 flex items-center gap-3 text-rose-200">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-bounce" />
                  <div className="text-xs">
                    <span className="font-bold block">IMPOSSIBLE VELOCITY ANOMALY DETECTED</span>
                    <span className="text-rose-300">
                      Physical travel of {distanceKm} km in {elapsedMinutes} minutes requires {velocityKmH.toLocaleString()} km/h. High likelihood of cloned cheque or stolen identity.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center gap-3 text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-[#D6E8D8] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block">VELOCITY PROFILE NORMAL</span>
                    <span className="text-emerald-300">
                      Transit speed conforms within realistic local geographical movement limits.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Simulation Sliders */}
          <div
            className={`p-6 rounded-[28px] border shadow-xs transition-colors ${
              isDarkMode ? "bg-[#11221C] border-[#1E3B30]" : "bg-[#F4F5F7] border-slate-200/70"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                Simulate Transit Scenarios
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Interactive Sandbox</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className={`font-medium block mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  Elapsed Time: <span className={`font-bold ${isDarkMode ? "text-[#D6E8D8]" : "text-[#182C25]"}`}>{elapsedMinutes} mins</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="180"
                  value={elapsedMinutes}
                  onChange={(e) => setElapsedMinutes(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className={`font-medium block mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  Geographical Distance: <span className={`font-bold ${isDarkMode ? "text-[#D6E8D8]" : "text-[#182C25]"}`}>{distanceKm} km</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="2500"
                  step="25"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Factors & Interventions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Active Cheque Details */}
          <div
            className={`p-6 rounded-[28px] border shadow-xs transition-colors ${
              isDarkMode ? "bg-[#11221C] border-[#1E3B30]" : "bg-white border-slate-200/80"
            }`}
          >
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
              Evaluated Transaction Leaf
            </span>
            <div
              className={`flex justify-between items-start mb-3 pb-3 border-b ${
                isDarkMode ? "border-[#1E3B30]" : "border-slate-100"
              }`}
            >
              <div>
                <span className={`text-sm font-bold block ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>
                  {activeCheque?.payeeName || "Rameshwar Prasad Sharma"}
                </span>
                <span className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Payer: {activeCheque?.payerName || "Kisan Micro Agri Ltd"}
                </span>
              </div>
              <span className={`text-sm font-mono font-black ${isDarkMode ? "text-[#D6E8D8]" : "text-[#182C25]"}`}>
                ₹{(activeCheque?.amountNumeric || amountValue).toLocaleString()}
              </span>
            </div>

            <div className="space-y-2">
              <span className={`text-xs font-bold block ${isDarkMode ? "text-slate-200" : "text-[#182C25]"}`}>
                Identified Risk Signals:
              </span>
              {flags.length > 0 ? (
                flags.map((flag, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-[11px] flex items-start gap-2 ${
                      isDarkMode
                        ? "bg-rose-950/40 border-rose-800/60 text-rose-200"
                        : "bg-rose-50 border-rose-100 text-rose-900"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span className="leading-tight">{flag}</span>
                  </div>
                ))
              ) : (
                <div
                  className={`p-3 rounded-2xl text-[11px] font-semibold flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-[#162D24] text-[#D6E8D8] border border-[#234537]"
                      : "bg-[#D6E8D8] text-[#182C25]"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No security flags triggered. Clean risk profile.</span>
                </div>
              )}
            </div>
          </div>

          {/* Intervention Box */}
          <div className="p-6 rounded-[28px] bg-[#10201A] text-white border border-emerald-900/50 shadow-lg">
            <span className="text-[10px] font-bold text-[#D6E8D8] uppercase tracking-wider block mb-1">
              Automated Protocol Recommendation
            </span>
            <h3 className="text-base font-bold text-white mb-2">
              {riskLevel === "RED"
                ? "Mandatory Voice IVR Escalation Required"
                : riskLevel === "YELLOW"
                ? "Trigger SMS / IVR Push Authorization"
                : "Eligible for Automatic Instant Clearance"}
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {riskLevel === "RED"
                ? "Do not clear cheque automatically. Initiate an automated phone call to the account holder's registered mobile number to collect one-tap voice PIN approval."
                : "Proceed with CTS-2010 cryptographic blockchain timestamping."}
            </p>

            <button
              onClick={() => {
                if (activeCheque) {
                  onTriggerIvr(activeCheque);
                }
              }}
              className="w-full py-4 rounded-full bg-[#D6E8D8] hover:bg-white text-[#182C25] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Launch IVR Call Simulator</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

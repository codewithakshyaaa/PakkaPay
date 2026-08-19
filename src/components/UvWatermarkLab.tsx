import React, { useState } from "react";
import {
  Sparkles,
  Sun,
  Moon,
  Search,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";
import { generateChequeSvg } from "../data/sampleCheques";

interface UvWatermarkLabProps {
  language: LanguageCode;
  isDarkMode?: boolean;
  onNavigateToTab?: (tab: string) => void;
}

export const UvWatermarkLab: React.FC<UvWatermarkLabProps> = ({
  language,
  isDarkMode = false,
  onNavigateToTab,
}) => {
  const t = translations[language]?.strings || translations.en.strings;

  const [isUvOn, setIsUvOn] = useState<boolean>(true);
  const [uvIntensity, setUvIntensity] = useState<number>(85);
  const [selectedChequeType, setSelectedChequeType] = useState<"GENUINE" | "TAMPERED">("GENUINE");

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
              id="uv-back-home-btn"
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
              Smartphone Flash Optical Simulation
            </span>
            <span className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              365nm Fluorescent Analysis
            </span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-[#182C25]"
            }`}
          >
            {t.uvScannerTitle}
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            Replaces expensive multi-thousand-dollar laboratory UV scanners with a cost-effective smartphone flash modulation algorithm to detect hidden security fibers and chemical wash tampering.
          </p>
        </div>

        {/* UV Power Switch */}
        <div
          className={`flex items-center gap-2 p-1.5 rounded-full border shadow-xs ${
            isDarkMode ? "bg-[#11221C] border-[#1E3B30]" : "bg-[#F4F5F7] border-slate-200/80"
          }`}
        >
          <button
            onClick={() => setIsUvOn(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              !isUvOn
                ? isDarkMode
                  ? "bg-[#D6E8D8] text-[#0A1411] shadow-xs"
                  : "bg-[#182C25] text-white shadow-xs"
                : isDarkMode
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-[#182C25]"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>White Light</span>
          </button>
          <button
            onClick={() => setIsUvOn(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isUvOn
                ? isDarkMode
                  ? "bg-[#D6E8D8] text-[#0A1411] shadow-xs"
                  : "bg-[#182C25] text-[#D6E8D8] shadow-xs"
                : isDarkMode
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-[#182C25]"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>UV 365nm Beam</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visual UV Inspection Canvas (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="p-6 rounded-[32px] bg-[#10201A] text-white border border-emerald-950/80 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D6E8D8] animate-pulse" />
                <span className="font-bold text-white">
                  {isUvOn ? "Active 365nm Optical Fluorescence Mode" : "Standard Ambient Illumination"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Sample:</span>
                <button
                  onClick={() => setSelectedChequeType("GENUINE")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                    selectedChequeType === "GENUINE" ? "bg-[#D6E8D8] text-[#182C25]" : "text-slate-300 hover:text-white"
                  }`}
                >
                  Genuine CTS-2010
                </button>
                <button
                  onClick={() => setSelectedChequeType("TAMPERED")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                    selectedChequeType === "TAMPERED" ? "bg-rose-500 text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  Tampered / Altered
                </button>
              </div>
            </div>

            {/* Simulated Cheque Rendering under UV */}
            <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-2 border border-white/10">
              <img
                src={generateChequeSvg({
                  bankName: "State Bank of India",
                  payeeName: selectedChequeType === "GENUINE" ? "Rameshwar Prasad Sharma" : "Fraudulent Syndicate Ltd",
                  amountNumeric: selectedChequeType === "GENUINE" ? 45000 : 500000,
                  amountWords: selectedChequeType === "GENUINE" ? "Forty Five Thousand Rupees Only" : "Fifty Thousand Rupees Only",
                  accountNo: "918237192841",
                  chequeNo: "482019",
                  micrCode: "110002014",
                  ifscCode: "SBIN0001824",
                  date: "2026-08-19",
                  signatureText: "Authorized Signatory",
                  isTampered: selectedChequeType === "TAMPERED",
                  hasUvGlow: isUvOn,
                })}
                alt="UV Specimen"
                className="w-full h-full object-contain transition-all duration-500"
                style={{
                  filter: isUvOn
                    ? `brightness(${uvIntensity}%) hue-rotate(250deg) contrast(170%) saturate(220%)`
                    : "none",
                }}
              />

              {/* Optical Fiber Overlay */}
              {isUvOn && selectedChequeType === "GENUINE" && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-around opacity-75">
                  <div className="w-1.5 h-6 bg-green-400 rotate-45 blur-[0.5px] animate-pulse" />
                  <div className="w-2 h-4 bg-cyan-400 -rotate-12 blur-[0.5px] animate-pulse" />
                  <div className="w-1.5 h-8 bg-emerald-300 rotate-75 blur-[0.5px] animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Security Verification Breakdown (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div
            className={`p-6 rounded-[28px] border shadow-xs transition-colors ${
              isDarkMode ? "bg-[#11221C] border-[#1E3B30]" : "bg-white border-slate-200/80"
            }`}
          >
            <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>
              Optical Security Findings
            </h3>
            <div className="space-y-3 text-xs">
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"
                }`}
              >
                <div>
                  <span className="font-bold block">UV Fluorescent Fibers</span>
                  <span className="text-[11px] text-slate-400">365nm Excitation</span>
                </div>
                <span className={`font-bold ${selectedChequeType === "GENUINE" ? "text-emerald-400" : "text-rose-400"}`}>
                  {selectedChequeType === "GENUINE" ? "VERIFIED (12 Fibers)" : "ABSENT / CLONE"}
                </span>
              </div>

              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"
                }`}
              >
                <div>
                  <span className="font-bold block">Chemical Wash Trace</span>
                  <span className="text-[11px] text-slate-400">Bleach & Solvent Reaction</span>
                </div>
                <span className={`font-bold ${selectedChequeType === "GENUINE" ? "text-emerald-400" : "text-rose-400"}`}>
                  {selectedChequeType === "GENUINE" ? "NONE DETECTED" : "CHEMICAL ERASURE DETECTED"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

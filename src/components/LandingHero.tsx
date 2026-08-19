import React, { useState } from "react";
import {
  Scan,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Lock,
  Layers,
  Star,
  Globe,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";

interface LandingHeroProps {
  language: LanguageCode;
  isDarkMode: boolean;
  onLaunchScanner: () => void;
  onNavigateTab: (tab: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  language,
  isDarkMode,
  onLaunchScanner,
  onNavigateTab,
}) => {
  const t = translations[language]?.strings || translations.en.strings;

  // Interactive Cheque Converter Simulation
  const [depositAmount, setDepositAmount] = useState<number>(50000);

  const getWordsForAmount = (num: number) => {
    if (num === 50000) return "Fifty Thousand Rupees Only";
    if (num === 45000) return "Forty Five Thousand Rupees Only";
    if (num === 100000) return "One Lakh Rupees Only";
    return `${num.toLocaleString("en-IN")} Rupees Only`;
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pb-24 ${
        isDarkMode
          ? "bg-[#0A1411] text-slate-100"
          : "bg-[#FBFBFB] text-[#182C25]"
      }`}
    >
      {/* 1. Main Hero Headline Section (Scroll animated, Poppins typography, localized) */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center animate-fade-in-up">
        {/* Brand Tag with pulse animation */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6E8D8] text-[#182C25] text-xs font-bold mb-6 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#182C25] animate-ping" />
          <span>{t.heroBadge}</span>
        </div>

        {/* Big Hero Title with Sage Green Pill Highlight */}
        <h1
          className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.18] mb-6 ${
            isDarkMode ? "text-white" : "text-[#182C25]"
          }`}
        >
          {t.sayGoodbyeTo}{" "}
          <span className="inline-flex items-center gap-2 bg-[#D6E8D8] text-[#182C25] px-4 sm:px-6 py-1.5 rounded-full whitespace-nowrap align-middle shadow-xs transform hover:scale-105 transition-transform">
            <span className="w-8 h-8 rounded-full bg-[#182C25] text-[#D6E8D8] flex items-center justify-center text-sm font-black">
              ₹
            </span>
            <span>{t.chequeQueues}</span>
          </span>
          <br />
          {t.andFraudUncertainty}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-10 ${
            isDarkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {t.heroDescription}
        </p>

        {/* Primary CTA Button */}
        <div className="flex items-center justify-center gap-4">
          <button
            id="hero-get-started-btn"
            onClick={onLaunchScanner}
            className={`px-10 py-4 rounded-full font-bold text-sm tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 ${
              isDarkMode
                ? "bg-[#D6E8D8] hover:bg-white text-[#0A1411]"
                : "bg-[#182C25] hover:bg-[#233F35] text-white"
            }`}
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Bento Grid Row 1: Quick & Easy QR Card + Cheque Converter Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card Left: "Quick and easy" with QR scanner code (5 cols) */}
          <div
            className={`lg:col-span-5 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between border shadow-xs transition-all hover:shadow-md ${
              isDarkMode
                ? "bg-[#12231D] border-emerald-950/80"
                : "bg-[#F4F5F7] border-slate-200/60"
            }`}
          >
            <div className="text-center mb-8">
              <h2
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${
                  isDarkMode ? "text-white" : "text-[#182C25]"
                }`}
              >
                {t.quickAndEasy}
              </h2>
              <p
                className={`text-sm max-w-sm mx-auto leading-relaxed ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {t.quickAndEasyDesc}
              </p>
            </div>

            {/* Central QR Code Frame */}
            <div className="my-auto flex flex-col items-center">
              <div
                onClick={onLaunchScanner}
                className="w-56 h-56 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative cursor-pointer group hover:scale-105 transition-all"
              >
                <div className="w-full h-full border-4 border-[#182C25] rounded-2xl p-2 relative flex items-center justify-center bg-slate-50">
                  <div className="grid grid-cols-5 gap-2 w-full h-full opacity-80">
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>

                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>

                    <div className="bg-transparent"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="w-8 h-8 rounded-full bg-[#182C25] text-[#D6E8D8] flex items-center justify-center font-bold text-xs mx-auto my-auto shadow-md">
                      P
                    </div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-transparent"></div>

                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>

                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                    <div className="bg-[#182C25] rounded-xs"></div>
                  </div>
                </div>
              </div>

              {/* Star Rating Badge */}
              <div
                className={`mt-6 flex items-center gap-1.5 text-xs font-bold ${
                  isDarkMode ? "text-slate-200" : "text-[#182C25]"
                }`}
              >
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span>{t.ratingText}</span>
              </div>
            </div>
          </div>

          {/* Card Right: Sage Green Cheque Converter / Verification Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#D6E8D8] rounded-[32px] p-6 sm:p-10 flex items-center justify-center border border-[#C2DEC5] shadow-xs">
            <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-sm w-full max-w-lg border border-slate-100 text-[#182C25]">
              {/* Box 1: You deposit / Numeric Amount */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 mb-2">
                <div className="text-xs text-slate-500 font-medium mb-1">{t.youDeposit}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#182C25] bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                    <span>🇮🇳 INR ₹</span>
                  </div>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="text-right font-bold text-2xl text-[#182C25] bg-transparent focus:outline-hidden w-40 font-mono"
                  />
                </div>
              </div>

              {/* Middle Switch Icon */}
              <div className="flex justify-center -my-3 relative z-10">
                <button
                  onClick={() => setDepositAmount(depositAmount === 50000 ? 45000 : 50000)}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm hover:scale-110 active:scale-95 transition-transform cursor-pointer font-black"
                >
                  ⇅
                </button>
              </div>

              {/* Box 2: Dual AI Verified Words */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 mt-2 mb-6">
                <div className="text-xs text-slate-500 font-medium mb-1">{t.dualAiVerifiedWords}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#182C25] bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>CTS-2010</span>
                  </div>
                  <span className="font-serif italic font-bold text-xs text-slate-800 text-right max-w-xs truncate">
                    "{getWordsForAmount(depositAmount)}"
                  </span>
                </div>
              </div>

              {/* Rate Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>—</span> {t.clearingTurnaround}
                  </span>
                  <span className="font-bold text-[#182C25]">{t.instantSpeed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>=</span> {t.geoVelocityRiskLabel}
                  </span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {t.safeScore}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>%</span> {t.wordsVsNumbersRatio}
                  </span>
                  <span className="font-bold text-emerald-700">{t.exactMatch}</span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                id="converter-continue-btn"
                onClick={onLaunchScanner}
                className="w-full py-4 rounded-full bg-[#182C25] hover:bg-[#233F35] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer"
              >
                {t.continueToScanner}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bento Grid Row 2: Insights Bar Chart Card + Categorization */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-fade-in-up">
        <div
          className={`rounded-[32px] p-8 sm:p-12 border shadow-xs transition-all ${
            isDarkMode
              ? "bg-[#12231D] border-emerald-950/80"
              : "bg-[#F4F5F7] border-slate-200/60"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Bar Graph Visual Card */}
            <div
              className={`lg:col-span-6 rounded-3xl p-6 sm:p-8 border shadow-sm ${
                isDarkMode
                  ? "bg-[#0E1A16] border-emerald-900/40 text-white"
                  : "bg-white border-slate-100 text-[#182C25]"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs text-slate-400 font-medium">{t.totalClearedMonth}</span>
                  <div className="text-3xl font-black tracking-tight mt-0.5 font-mono">
                    ₹1,24,080<span className="text-slate-400 text-lg font-normal">.80</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-[#D6E8D8] px-3 py-1 rounded-full">
                  {t.volumeGrowth}
                </span>
              </div>

              {/* Minimalist Bar Chart Representation */}
              <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-200/20">
                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-slate-200/30 rounded-t-lg h-[45%]"></div>
                  <span className="text-[10px] text-slate-400 font-medium">Mon</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-slate-200/30 rounded-t-lg h-[60%]"></div>
                  <span className="text-[10px] text-slate-400 font-medium">Tue</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#182C25] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap border border-[#D6E8D8]/40">
                    Avg ₹42k
                  </div>
                  <div className="w-full bg-[#D6E8D8] rounded-t-lg h-[85%]"></div>
                  <span className={`text-[10px] font-bold ${isDarkMode ? "text-[#D6E8D8]" : "text-[#182C25]"}`}>
                    Wed
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-slate-200/30 rounded-t-lg h-[35%]"></div>
                  <span className="text-[10px] text-slate-400 font-medium">Thu</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className={`w-full rounded-t-lg h-[95%] ${isDarkMode ? "bg-emerald-500" : "bg-[#182C25]"}`}></div>
                  <span className="text-[10px] text-slate-400 font-medium">Fri</span>
                </div>
              </div>
            </div>

            {/* Right: Insights Description */}
            <div className="lg:col-span-6 space-y-4">
              <h2
                className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                  isDarkMode ? "text-white" : "text-[#182C25]"
                }`}
              >
                {t.masterClearingTitle}
              </h2>
              <div className="space-y-3 pt-2">
                <h3 className={`text-base font-bold ${isDarkMode ? "text-[#D6E8D8]" : "text-[#182C25]"}`}>
                  {t.masterClearingDescTitle}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {t.masterClearingDesc}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => onNavigateTab("risk")}
                  className={`px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-[#D6E8D8] hover:bg-white text-[#0A1411]"
                      : "bg-[#182C25] hover:bg-[#233F35] text-white"
                  }`}
                >
                  <span>{t.viewRiskMetrics}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dark Green Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-fade-in-up">
        <div className="bg-[#12231D] text-white rounded-[36px] p-8 sm:p-14 shadow-xl border border-emerald-950/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t.startJourneyTitle}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.startJourneyDesc}
            </p>
          </div>

          {/* Grid of Minimalist Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            <div
              onClick={onLaunchScanner}
              className={`p-6 rounded-[24px] flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-sm border ${
                isDarkMode
                  ? "bg-[#0E1A16] border-emerald-900/50 text-slate-100"
                  : "bg-white border-transparent text-[#182C25]"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#D6E8D8] text-[#182C25] flex items-center justify-center mb-4">
                <Scan className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>{t.manageChequesTitle}</h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{t.manageChequesDesc}</p>
              </div>
            </div>

            <div
              onClick={() => onNavigateTab("risk")}
              className={`p-6 rounded-[24px] flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-sm border ${
                isDarkMode
                  ? "bg-[#0E1A16] border-emerald-900/50 text-slate-100"
                  : "bg-white border-transparent text-[#182C25]"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#D6E8D8] text-[#182C25] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>{t.secureReliableTitle}</h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{t.secureReliableDesc}</p>
              </div>
            </div>

            <div
              onClick={() => onNavigateTab("ivr")}
              className={`p-6 rounded-[24px] flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-sm border ${
                isDarkMode
                  ? "bg-[#0E1A16] border-emerald-900/50 text-slate-100"
                  : "bg-white border-transparent text-[#182C25]"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#D6E8D8] text-[#182C25] flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>{t.featurePhoneTitle}</h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{t.featurePhoneDesc}</p>
              </div>
            </div>

            <div
              onClick={() => onNavigateTab("uv")}
              className={`p-6 rounded-[24px] flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-sm border ${
                isDarkMode
                  ? "bg-[#0E1A16] border-emerald-900/50 text-slate-100"
                  : "bg-white border-transparent text-[#182C25]"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#D6E8D8] text-[#182C25] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>{t.costEffectiveUvTitle}</h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{t.costEffectiveUvDesc}</p>
              </div>
            </div>

            <div
              onClick={() => onNavigateTab("blockchain")}
              className={`p-6 rounded-[24px] flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-sm border ${
                isDarkMode
                  ? "bg-[#0E1A16] border-emerald-900/50 text-slate-100"
                  : "bg-white border-transparent text-[#182C25]"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#D6E8D8] text-[#182C25] flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>{t.tamperProofLedgerTitle}</h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{t.tamperProofLedgerDesc}</p>
              </div>
            </div>

            <div
              onClick={onLaunchScanner}
              className="p-6 rounded-[24px] bg-[#D6E8D8] text-[#182C25] flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-sm border border-[#C2DEC5]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#182C25] text-white flex items-center justify-center mb-4">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#182C25] mb-1">{t.startAutonomousScan}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">Instant camera scan with OCR & dual amount cross-check.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigateTab("risk")}
              className="px-8 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/40 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>{t.exploreModules}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D6E8D8]" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Bottom Showcase Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`rounded-[32px] p-8 border flex flex-col justify-between ${
              isDarkMode
                ? "bg-[#12231D] border-emerald-950/80"
                : "bg-[#F4F5F7] border-slate-200/60"
            }`}
          >
            <div>
              <h3
                className={`text-2xl font-extrabold mb-2 ${
                  isDarkMode ? "text-white" : "text-[#182C25]"
                }`}
              >
                {t.customerSupportVoiceTitle}
              </h3>
              <p
                className={`text-xs mb-6 ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {t.customerSupportVoiceDesc}
              </p>
            </div>

            <div
              className={`space-y-3 p-5 rounded-2xl border shadow-2xs mb-6 ${
                isDarkMode
                  ? "bg-[#0E1A16] border-emerald-900/40"
                  : "bg-white border-slate-100"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                  J
                </div>
                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-xs text-xs text-slate-800 max-w-xs">
                  {t.chatUserMsg}
                </div>
              </div>
              <div className="flex items-start gap-2.5 justify-end">
                <div className="bg-[#D6E8D8] text-[#182C25] p-3 rounded-2xl rounded-tr-xs text-xs font-medium max-w-xs">
                  {t.chatRepMsg}
                </div>
                <div className="w-7 h-7 rounded-full bg-[#182C25] text-[#D6E8D8] flex items-center justify-center font-bold text-xs">
                  P
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab("ivr")}
              className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:underline cursor-pointer ${
                isDarkMode ? "text-[#D6E8D8]" : "text-[#182C25]"
              }`}
            >
              <span>{t.tryVoiceSimulator}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            className={`rounded-[32px] p-8 border flex flex-col justify-between text-center items-center ${
              isDarkMode
                ? "bg-[#12231D] border-emerald-950/80"
                : "bg-[#F4F5F7] border-slate-200/60"
            }`}
          >
            <div>
              <h3
                className={`text-2xl font-extrabold mb-2 ${
                  isDarkMode ? "text-white" : "text-[#182C25]"
                }`}
              >
                {t.clearAcrossGlobeTitle}
              </h3>
              <p
                className={`text-xs max-w-sm mx-auto mb-6 ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {t.clearAcrossGlobeDesc}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xl font-serif font-black text-[#182C25] shadow-xs hover:scale-110 transition-transform">
                ₹
              </div>
              <div className="w-20 h-20 rounded-full bg-[#D6E8D8] border-2 border-[#182C25] flex items-center justify-center text-2xl font-serif font-black text-[#182C25] shadow-md hover:scale-110 transition-transform">
                $
              </div>
              <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xl font-serif font-black text-[#182C25] shadow-xs hover:scale-110 transition-transform">
                €
              </div>
            </div>

            <button
              onClick={onLaunchScanner}
              className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:underline cursor-pointer ${
                isDarkMode ? "text-[#D6E8D8]" : "text-[#182C25]"
              }`}
            >
              <span>{t.startAutonomousScan}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Scan,
  ShieldAlert,
  PhoneCall,
  Sparkles,
  Layers,
  Globe,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { LanguageCode } from "../types";
import { translations } from "../data/translations";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[language]?.strings || translations.en.strings;
  const currentLangObj = translations[language] || translations.en;

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navMenuItems = [
    { id: "landing", label: "Home Overview", desc: "Main landing & bento showcase", icon: null },
    { id: "scanner", label: t.scannerTitle, desc: "Autonomous AI Cheque OCR & dual words check", icon: Scan },
    { id: "risk", label: t.riskEngineTitle, desc: "Spatial-temporal physics fraud detection", icon: ShieldAlert },
    { id: "ivr", label: t.ivrSafetyTitle, desc: "Inbound telephone voice authorization for feature phones", icon: PhoneCall },
    { id: "uv", label: t.uvScannerTitle, desc: "365nm optical watermark & solvent detection", icon: Sparkles },
    { id: "blockchain", label: t.blockchainTitle, desc: "Immutable SHA-256 tamper-proof ledger", icon: Layers },
  ];

  const handleSelectNav = (id: string) => {
    setActiveTab(id);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 border-b backdrop-blur-md ${
          isDarkMode
            ? "bg-[#0E1A16]/90 border-emerald-950/60 text-slate-100"
            : "bg-[#FBFBFB]/90 border-slate-200/70 text-[#182C25]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            id="nav-logo"
            onClick={() => handleSelectNav("landing")}
            className="flex items-center gap-3 cursor-pointer group select-none transition-transform active:scale-95"
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-all ${
                isDarkMode
                  ? "bg-[#D6E8D8] text-[#0E1A16]"
                  : "bg-[#182C25] text-white"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-5 h-5 ${isDarkMode ? "text-[#0E1A16]" : "text-[#D6E8D8]"}`}
              >
                <circle cx="8" cy="8" r="3" />
                <circle cx="16" cy="16" r="3" />
                <circle cx="16" cy="8" r="3" />
                <path d="M8 11v5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight">
                  {t.appName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500">
                Autonomous Cheque AI
              </span>
            </div>
          </div>

          {/* Right Navigation & Controls: Language Selector + Theme Toggle + Aesthetic Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* 1. Language Toggle Dropdown Button */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="navbar-language-toggle"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border shadow-2xs ${
                  isDarkMode
                    ? "bg-[#142620] hover:bg-[#1B332B] text-slate-200 border-emerald-900/60"
                    : "bg-white hover:bg-slate-100 text-[#182C25] border-slate-200/80"
                }`}
                title="Change Language / भाषा बदलें"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">{currentLangObj.nativeName}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Floating Language Dropdown Menu */}
              {isLangDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDarkMode
                      ? "bg-[#11221C] border-emerald-900/80 text-slate-200"
                      : "bg-white border-slate-200 text-[#182C25]"
                  }`}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-emerald-950/80 mb-1">
                    Select Language / भाषा चुनें
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {(Object.keys(translations) as LanguageCode[]).map((code) => {
                      const item = translations[code];
                      const isSelected = language === code;
                      return (
                        <button
                          key={code}
                          id={`lang-option-${code}`}
                          onClick={() => {
                            setLanguage(code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? isDarkMode
                                ? "bg-[#D6E8D8] text-[#0E1A16] font-bold"
                                : "bg-[#182C25] text-white font-bold"
                              : isDarkMode
                              ? "hover:bg-white/10 text-slate-300"
                              : "hover:bg-slate-100 text-slate-700"
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{item.nativeName}</span>
                            <span
                              className={`text-[10px] ${
                                isSelected ? "opacity-80" : "text-slate-400"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Dark / Light Mode Toggle Button */}
            <button
              id="navbar-theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer border shadow-2xs ${
                isDarkMode
                  ? "bg-[#142620] hover:bg-[#1B332B] text-amber-300 border-emerald-900/60"
                  : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200/80"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#182C25] transition-transform rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* 3. Launch Scanner Fast CTA Button (Desktop) */}
            <button
              id="navbar-fast-scan-btn"
              onClick={() => handleSelectNav("scanner")}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-xs cursor-pointer transition-transform active:scale-95 ${
                activeTab === "scanner"
                  ? "bg-[#D6E8D8] text-[#182C25] ring-2 ring-[#182C25]"
                  : "bg-[#182C25] hover:bg-[#233F35] text-white"
              }`}
            >
              <Scan className="w-3.5 h-3.5 text-[#D6E8D8]" />
              <span>{t.scannerTitle}</span>
            </button>

            {/* 4. Aesthetic Animated Hamburger Button */}
            <button
              id="hamburger-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              className={`p-2.5 sm:px-3 sm:py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer border shadow-2xs group ${
                isDarkMode
                  ? "bg-[#142620] hover:bg-[#1B332B] text-slate-200 border-emerald-900/60"
                  : "bg-white hover:bg-slate-100 text-[#182C25] border-slate-200/80"
              }`}
            >
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span
                  className={`h-0.5 w-5 rounded-full transition-all group-hover:w-5 ${
                    isDarkMode ? "bg-[#D6E8D8]" : "bg-[#182C25]"
                  }`}
                />
                <span
                  className={`h-0.5 w-3.5 rounded-full transition-all group-hover:w-5 ${
                    isDarkMode ? "bg-[#D6E8D8]" : "bg-[#182C25]"
                  }`}
                />
                <span
                  className={`h-0.5 w-4.5 rounded-full transition-all group-hover:w-5 ${
                    isDarkMode ? "bg-[#D6E8D8]" : "bg-[#182C25]"
                  }`}
                />
              </div>
              <span className="hidden sm:inline text-xs font-bold tracking-wide">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Luxury Drawer Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div
              className={`w-screen max-w-md shadow-2xl flex flex-col justify-between border-l animate-in slide-in-from-right duration-300 ${
                isDarkMode
                  ? "bg-[#0F1E19] border-emerald-950 text-slate-100"
                  : "bg-[#FBFBFB] border-slate-200 text-[#182C25]"
              }`}
            >
              {/* Drawer Header */}
              <div
                className={`p-6 border-b flex items-center justify-between ${
                  isDarkMode
                    ? "bg-[#132520] border-emerald-900/60"
                    : "bg-white border-slate-200/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                      isDarkMode
                        ? "bg-[#D6E8D8] text-[#0E1A16]"
                        : "bg-[#182C25] text-[#D6E8D8]"
                    }`}
                  >
                    P
                  </div>
                  <div>
                    <h2 className="font-bold text-base">{t.appName} Navigation</h2>
                    <p className="text-xs text-slate-400">Autonomous Banking Modules</p>
                  </div>
                </div>
                <button
                  id="close-drawer-btn"
                  onClick={() => setIsDrawerOpen(false)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                    isDarkMode
                      ? "bg-white/10 hover:bg-white/20 text-slate-300"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  System Architecture & Features
                </div>

                {navMenuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={`drawer-nav-${item.id}`}
                      onClick={() => handleSelectNav(item.id)}
                      className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-[#D6E8D8] text-[#182C25] shadow-xs font-bold border border-[#C2DEC5]"
                          : isDarkMode
                          ? "bg-[#142620] hover:bg-[#1C332B] text-slate-200 border border-emerald-900/40"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive
                              ? "bg-[#182C25] text-[#D6E8D8]"
                              : isDarkMode
                              ? "bg-emerald-950 text-[#D6E8D8]"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {Icon ? <Icon className="w-5 h-5" /> : <span className="font-black text-sm">#</span>}
                        </div>
                        <div>
                          <div className="text-sm font-bold flex items-center gap-2">
                            <span>{item.label}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-[#182C25]" : "text-slate-400"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div
                className={`p-6 border-t ${
                  isDarkMode
                    ? "bg-[#132520] border-emerald-900/60 text-slate-400"
                    : "bg-white border-slate-200/80 text-slate-500"
                } text-xs flex items-center justify-between`}
              >
                <span>PakkaPay CTS-2010</span>
                <span className="text-[10px] font-mono">v2.4 Autonomous AI</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

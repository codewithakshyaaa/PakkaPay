import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  PhoneOff,
  PhoneForwarded,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ChequeData, LanguageCode, IVRCallSession } from "../types";
import { translations } from "../data/translations";
import {
  playDtmfTone,
  playPhoneRing,
  playSuccessChime,
  playAlertChime,
  speakIvrMessage,
  stopSpeech,
} from "../utils/audio";

interface VoiceIvrSimulatorProps {
  language: LanguageCode;
  isDarkMode?: boolean;
  activeCheque: ChequeData | null;
  onChequeAuthorized: (cheque: ChequeData) => void;
  onNavigateToBlockchain: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const VoiceIvrSimulator: React.FC<VoiceIvrSimulatorProps> = ({
  language,
  isDarkMode = false,
  activeCheque,
  onChequeAuthorized,
  onNavigateToBlockchain,
  onNavigateToTab,
}) => {
  const t = translations[language]?.strings || translations.en.strings;

  const [callSession, setCallSession] = useState<IVRCallSession>({
    callId: `ivr_${Date.now()}`,
    recipientPhone: "+91 98402 18491",
    recipientName: activeCheque?.payerName || "Kisan Micro Agri Ltd",
    amount: activeCheque?.amountNumeric || 45000,
    payee: activeCheque?.payeeName || "Rameshwar Prasad Sharma",
    bankName: activeCheque?.bankName || "State Bank of India",
    status: "IDLE",
    language: language,
    durationSeconds: 0,
  });

  const [deviceView, setDeviceView] = useState<"FEATURE_PHONE" | "SMARTPHONE">("FEATURE_PHONE");

  // Multi-lingual voice prompt scripts
  const getPromptScript = () => {
    const amt = callSession.amount.toLocaleString();
    const payee = callSession.payee;

    switch (language) {
      case "hi":
        return `नमस्ते! आपकी बैंक शाखा में ₹${amt} का चेक ${payee} के नाम से भुगतान के लिए प्रस्तुत हुआ है। यदि आपने यह चेक जारी किया है, तो भुगतान स्वीकृत करने के लिए 1 दबाएं। इस भुगतान को तुरंत रोकने और खाता सुरक्षित करने के लिए 9 दबाएं।`;
      case "ta":
        return `வணக்கம்! உங்கள் கணக்கிலிருந்து ₹${amt} காசோலை ${payee} க்கு வழங்க சமர்ப்பிக்கப்பட்டுள்ளது. அனுமதிக்க 1 அழுத்தவும், நிறுத்த 9 அழுத்தவும்.`;
      case "te":
        return `నమస్కారం! మీ ఖాతా నుండి ₹${amt} చెక్ ${payee} కొరకు సమర్పించబడింది. ఆమోదించడానికి 1 నొక్కండి, ఆపడానికి 9 నొక్కండి.`;
      case "mr":
        return `नमस्कार! आपल्या खात्यातून ₹${amt} चा चेक ${payee} यांच्यासाठी सादर झाला आहे. मंजुरीसाठी 1 दाबा, थांबवण्यासाठी 9 दाबा.`;
      case "bn":
        return `নমস্কার! আপনার অ্যাকাউন্ট থেকে ₹${amt} টাকার একটি চেক ${payee} এর নামে জমা পড়েছে। অনুমোদন করতে ১ টিপুন, বাতিল করতে ৯ টিপুন।`;
      case "gu":
        return `નમસ્તે! તમારા ખાતામાંથી ₹${amt} નો ચેક ${payee} માટે રજૂ થયો છે. મંજૂર કરવા ૧ દબાવો, રોકવા ૯ દબાવો.`;
      case "es":
        return `¡Hola! Se ha presentado un cheque por $${amt} para ${payee}. Presione 1 para autorizar o 9 para bloquear de inmediato.`;
      case "fr":
        return `Bonjour ! Un chèque de ${amt} euros pour ${payee} est présenté. Tapez 1 pour approuver ou 9 pour bloquer.`;
      case "ar":
        return `مرحباً! تم تقديم شيك بمبلغ ${amt} لصالح ${payee}. اضغط 1 للموافقة أو 9 للإيقاف فوراً.`;
      default:
        return `Namaste! A cheque of ₹${amt} has been presented at your bank branch payable to ${payee}. If authorized by you, press 1 to approve payment. Press 9 immediately to reject and freeze this transaction.`;
    }
  };

  // Trigger Outbound IVR Call
  const startCall = () => {
    stopSpeech();
    setCallSession((prev) => ({
      ...prev,
      status: "RINGING",
      durationSeconds: 0,
      selectedOption: null,
    }));

    playPhoneRing(2);

    setTimeout(() => {
      setCallSession((prev) => ({
        ...prev,
        status: "CONNECTED",
        startTime: Date.now(),
      }));

      const script = getPromptScript();
      speakIvrMessage(script, language, () => {});
    }, 2800);
  };

  // Handle Keypad Press
  const handleKeyPress = (digit: string) => {
    playDtmfTone(digit);

    if (callSession.status !== "CONNECTED") return;

    if (digit === "1") {
      stopSpeech();
      playSuccessChime();
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
      } catch (e) {}

      setCallSession((prev) => ({
        ...prev,
        status: "APPROVED",
        selectedOption: "1",
      }));

      if (activeCheque) {
        onChequeAuthorized({
          ...activeCheque,
          status: "IVR_AUTHORIZED",
          riskLevel: "GREEN",
          notes: `Authorized by account holder via Multi-Lingual Inbound IVR confirmation (DTMF 1 - Token verified).`,
        });
      }
    } else if (digit === "9") {
      stopSpeech();
      playAlertChime();

      setCallSession((prev) => ({
        ...prev,
        status: "REJECTED",
        selectedOption: "9",
      }));

      if (activeCheque) {
        onChequeAuthorized({
          ...activeCheque,
          status: "REJECTED",
          riskLevel: "RED",
          notes: `Emergency Account Freeze triggered by customer via Outbound IVR Telephony alert (DTMF 9).`,
        });
      }
    }
  };

  // End Call
  const endCall = () => {
    stopSpeech();
    setCallSession((prev) => ({
      ...prev,
      status: "IDLE",
      durationSeconds: 0,
    }));
  };

  // Duration timer when in call
  useEffect(() => {
    let interval: any;
    if (callSession.status === "CONNECTED") {
      interval = setInterval(() => {
        setCallSession((prev) => ({
          ...prev,
          durationSeconds: prev.durationSeconds + 1,
        }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      stopSpeech();
    };
  }, [callSession.status]);

  const keypad = [
    { key: "1", sub: "APP" },
    { key: "2", sub: "ABC" },
    { key: "3", sub: "DEF" },
    { key: "4", sub: "GHI" },
    { key: "5", sub: "JKL" },
    { key: "6", sub: "MNO" },
    { key: "7", sub: "PQRS" },
    { key: "8", sub: "TUV" },
    { key: "9", sub: "BLOCK" },
    { key: "*", sub: "" },
    { key: "0", sub: "+" },
    { key: "#", sub: "" },
  ];

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
              id="ivr-back-home-btn"
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
              Rural Inbound Safety Architecture
            </span>
            <span className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Bridges the Digital Divide
            </span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-[#182C25]"
            }`}
          >
            {t.ivrSafetyTitle}
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            Enables basic feature phone owners (Nokia, KaiOS, JioPhone) to verify cheque clearances via synthetic multi-lingual automated phone calls with zero internet requirement.
          </p>
        </div>

        {/* Device Switcher Pills */}
        <div
          className={`flex items-center gap-1 p-1.5 rounded-full border shadow-xs ${
            isDarkMode ? "bg-[#11221C] border-[#1E3B30]" : "bg-[#F4F5F7] border-slate-200/80"
          }`}
        >
          <button
            onClick={() => setDeviceView("FEATURE_PHONE")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              deviceView === "FEATURE_PHONE"
                ? isDarkMode
                  ? "bg-[#D6E8D8] text-[#0A1411] shadow-xs"
                  : "bg-[#182C25] text-white shadow-xs"
                : isDarkMode
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-[#182C25]"
            }`}
          >
            Feature Phone (IVR Keypad)
          </button>
          <button
            onClick={() => setDeviceView("SMARTPHONE")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              deviceView === "SMARTPHONE"
                ? isDarkMode
                  ? "bg-[#D6E8D8] text-[#0A1411] shadow-xs"
                  : "bg-[#182C25] text-white shadow-xs"
                : isDarkMode
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-[#182C25]"
            }`}
          >
            Smartphone Push Alert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Phone Simulator Canvas (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {deviceView === "FEATURE_PHONE" ? (
            <div className="w-full max-w-xs sm:max-w-sm bg-[#10201A] p-6 rounded-[44px] shadow-2xl border-4 border-emerald-950/80 flex flex-col items-center">
              <div className="w-16 h-1.5 bg-white/20 rounded-full mb-4" />

              {/* LCD Screen Display */}
              <div className="w-full bg-[#D6E8D8] text-[#182C25] p-4 rounded-2xl shadow-inner font-mono min-h-[160px] flex flex-col justify-between border-2 border-[#C2DEC5] mb-6 select-none">
                <div className="flex justify-between text-[10px] font-bold border-b border-[#C2DEC5] pb-1">
                  <span>PAKKAPAY TEL</span>
                  <span>
                    {callSession.status === "CONNECTED"
                      ? "● IN-CALL"
                      : callSession.status === "RINGING"
                      ? "RINGING..."
                      : "READY"}
                  </span>
                </div>

                <div className="my-auto text-center py-2">
                  {callSession.status === "IDLE" && (
                    <div className="text-xs font-bold">
                      <div>INCOMING CALL SIMULATOR</div>
                      <div className="text-[10px] mt-1 text-slate-700">Tap 'Trigger Call' to begin</div>
                    </div>
                  )}

                  {callSession.status === "RINGING" && (
                    <div className="animate-pulse">
                      <div className="text-xs font-bold">INCOMING BANK CALL...</div>
                      <div className="text-sm font-black mt-1 text-[#182C25]">PAKKAPAY VERIFY</div>
                    </div>
                  )}

                  {callSession.status === "CONNECTED" && (
                    <div>
                      <div className="text-[11px] font-bold text-[#182C25]">
                        ₹{callSession.amount.toLocaleString()} FOR {callSession.payee.slice(0, 15)}
                      </div>
                      <div className="text-[10px] mt-1 bg-white/60 px-2 py-1 rounded font-bold">
                        [1]=APPROVE | [9]=REJECT
                      </div>
                    </div>
                  )}

                  {callSession.status === "APPROVED" && (
                    <div className="text-[#182C25]">
                      <div className="text-xs font-black">✓ CHEQUE APPROVED</div>
                      <div className="text-[10px]">AUTHORIZED VIA DTMF '1'</div>
                    </div>
                  )}

                  {callSession.status === "REJECTED" && (
                    <div className="text-rose-900">
                      <div className="text-xs font-black">⚠️ FRAUD BLOCKED!</div>
                      <div className="text-[10px]">REJECTED VIA DTMF '9'</div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-[9px] font-bold border-t border-[#C2DEC5] pt-1 text-slate-700">
                  <span>[OPTIONS]</span>
                  <span>[BACK]</span>
                </div>
              </div>

              {/* Action Buttons: Dial / Hangup */}
              <div className="w-full grid grid-cols-3 gap-2 mb-4 px-2">
                <button
                  onClick={startCall}
                  disabled={callSession.status === "CONNECTED" || callSession.status === "RINGING"}
                  className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-md disabled:opacity-40"
                >
                  <PhoneCall className="w-4 h-4" />
                </button>
                <div className="rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 text-xs font-bold">
                  OK
                </div>
                <button
                  onClick={endCall}
                  className="py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-md"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>

              {/* Physical Keypad Grid */}
              <div className="w-full grid grid-cols-3 gap-2.5 px-2">
                {keypad.map((k) => (
                  <button
                    key={k.key}
                    onClick={() => handleKeyPress(k.key)}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-emerald-600 border border-slate-700 text-white flex flex-col items-center justify-center cursor-pointer transition-all shadow-xs"
                  >
                    <span className="font-bold text-base leading-none">{k.key}</span>
                    {k.sub && <span className="text-[8px] text-slate-400 font-mono mt-0.5">{k.sub}</span>}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xs sm:max-w-sm bg-[#10201A] p-5 rounded-[44px] shadow-2xl border-4 border-emerald-950/80 flex flex-col items-center min-h-[500px]">
              <div className="w-20 h-4 bg-black rounded-full mb-6" />
              <div className="w-full bg-[#162D24] p-5 rounded-3xl border border-[#254A3B] text-slate-100 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-[#D6E8D8]">Bank Cheque Clearing Alert</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">Authorization Request</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cheque #{activeCheque?.chequeNumber || "482019"} for ₹{(activeCheque?.amountNumeric || 45000).toLocaleString()} presented to {activeCheque?.payeeName || "Rameshwar Prasad"}.
                  </p>
                </div>

                <div className="space-y-2 mt-6">
                  <button
                    onClick={() => handleKeyPress("1")}
                    className="w-full py-3 rounded-2xl bg-[#D6E8D8] text-[#0A1411] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Clearing</span>
                  </button>
                  <button
                    onClick={() => handleKeyPress("9")}
                    className="w-full py-3 rounded-2xl bg-rose-600/20 text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Reject & Freeze</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: IVR Call Flow & Telephony Metadata (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Call Script Preview */}
          <div
            className={`p-6 rounded-[28px] border shadow-xs transition-colors ${
              isDarkMode ? "bg-[#11221C] border-[#1E3B30]" : "bg-white border-slate-200/80"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Synthetic Multi-Lingual Speech Prompt
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#D6E8D8] text-[#182C25] px-2 py-0.5 rounded">
                Language: {language.toUpperCase()}
              </span>
            </div>
            <p
              className={`text-xs leading-relaxed italic p-4 rounded-2xl border ${
                isDarkMode
                  ? "bg-[#0B1612] border-[#183027] text-slate-200"
                  : "bg-slate-50 border-slate-100 text-slate-700"
              }`}
            >
              "{getPromptScript()}"
            </p>
          </div>

          {/* Telephony Session Details */}
          <div
            className={`p-6 rounded-[28px] border shadow-xs transition-colors ${
              isDarkMode ? "bg-[#11221C] border-[#1E3B30]" : "bg-white border-slate-200/80"
            }`}
          >
            <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>
              Telephony Session Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div
                className={`p-3 rounded-2xl border ${
                  isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Registered MSISDN</span>
                <span className={`font-mono font-bold ${isDarkMode ? "text-slate-200" : "text-[#182C25]"}`}>
                  {callSession.recipientPhone}
                </span>
              </div>
              <div
                className={`p-3 rounded-2xl border ${
                  isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Call Status</span>
                <span
                  className={`font-bold ${
                    callSession.status === "APPROVED"
                      ? "text-emerald-400"
                      : callSession.status === "REJECTED"
                      ? "text-rose-400"
                      : isDarkMode
                      ? "text-[#D6E8D8]"
                      : "text-[#182C25]"
                  }`}
                >
                  {callSession.status}
                </span>
              </div>
            </div>

            {callSession.status === "APPROVED" && (
              <div className="mt-5">
                <button
                  id="ivr-view-blockchain-btn"
                  onClick={onNavigateToBlockchain}
                  className="w-full py-3.5 rounded-full bg-[#D6E8D8] hover:bg-white text-[#182C25] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>View On-Chain Cryptographic Receipt</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

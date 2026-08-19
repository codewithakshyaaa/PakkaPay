import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LandingHero } from "./components/LandingHero";
import { ChequeScanner } from "./components/ChequeScanner";
import { GeoVelocityDashboard } from "./components/GeoVelocityDashboard";
import { VoiceIvrSimulator } from "./components/VoiceIvrSimulator";
import { UvWatermarkLab } from "./components/UvWatermarkLab";
import { BlockchainExplorer } from "./components/BlockchainExplorer";
import { ReceiptModal } from "./components/ReceiptModal";
import { ChequeData, LanguageCode, BlockchainBlock } from "./types";
import { sampleCheques } from "./data/sampleCheques";
import { INITIAL_GENESIS_CHAIN, sha256 } from "./utils/crypto";
import { translations } from "./data/translations";

export default function App() {
  // Navigation, Theme & Localization
  const [activeTab, setActiveTab] = useState<string>("landing");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Active Transaction & Blockchain State
  const [activeCheque, setActiveCheque] = useState<ChequeData | null>(sampleCheques[0]);
  const [blockchainBlocks, setBlockchainBlocks] = useState<BlockchainBlock[]>(INITIAL_GENESIS_CHAIN);
  const [receiptModalBlock, setReceiptModalBlock] = useState<BlockchainBlock | null>(null);

  // Add newly processed cheque
  const handleChequeProcessed = async (cheque: ChequeData) => {
    setActiveCheque(cheque);

    // If cheque is verified and words match numbers, record on blockchain
    if (cheque.isWordsNumbersMatch && cheque.riskLevel === "GREEN") {
      const prevBlock = blockchainBlocks[blockchainBlocks.length - 1];
      const newIndex = blockchainBlocks.length;
      const timestamp = new Date().toISOString();
      const rawData = `${newIndex}${prevBlock.hash}${cheque.chequeNumber}${cheque.amountNumeric}${cheque.payerName}${cheque.payeeName}${timestamp}`;
      const blockHash = await sha256(rawData);
      const merkleRoot = await sha256(cheque.micrCode + cheque.chequeNumber);

      const newBlock: BlockchainBlock = {
        index: newIndex,
        timestamp,
        chequeNumber: cheque.chequeNumber,
        payer: cheque.payerName,
        payee: cheque.payeeName,
        amount: cheque.amountNumeric,
        currency: "INR",
        prevHash: prevBlock.hash,
        hash: blockHash,
        merkleRoot: merkleRoot,
        nonce: 1024,
        validatorNode: "NODE_IN_RURAL_04_BIHAR",
        status: "VALID",
      };

      setBlockchainBlocks((prev) => [...prev, newBlock]);
    }
  };

  // When IVR authorizes a cheque
  const handleChequeAuthorized = async (cheque: ChequeData) => {
    setActiveCheque(cheque);

    if (cheque.status === "IVR_AUTHORIZED") {
      const prevBlock = blockchainBlocks[blockchainBlocks.length - 1];
      const newIndex = blockchainBlocks.length;
      const timestamp = new Date().toISOString();
      const rawData = `${newIndex}${prevBlock.hash}${cheque.chequeNumber}${cheque.amountNumeric}${cheque.payerName}${cheque.payeeName}${timestamp}IVR_AUTH`;
      const blockHash = await sha256(rawData);
      const merkleRoot = await sha256(cheque.micrCode + cheque.chequeNumber + "_IVR_PIN_VERIFIED");

      const newBlock: BlockchainBlock = {
        index: newIndex,
        timestamp,
        chequeNumber: cheque.chequeNumber,
        payer: cheque.payerName,
        payee: cheque.payeeName,
        amount: cheque.amountNumeric,
        currency: "INR",
        prevHash: prevBlock.hash,
        hash: blockHash,
        merkleRoot: merkleRoot,
        nonce: 2048,
        validatorNode: "NODE_IVR_TELEPHONY_GATEWAY",
        status: "VALID",
      };

      setBlockchainBlocks((prev) => [...prev, newBlock]);
    }
  };

  const handleNavigateToTab = (tab: string, cheque?: ChequeData) => {
    if (cheque) {
      setActiveCheque(cheque);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = translations[language]?.strings || translations.en.strings;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 antialiased ${
        isDarkMode
          ? "bg-[#0A1411] text-slate-100 selection:bg-[#D6E8D8] selection:text-[#0A1411]"
          : "bg-[#FBFBFB] text-[#182C25] selection:bg-[#182C25] selection:text-white"
      }`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Top Universal Navbar with Language Dropdown & Theme Toggle */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === "landing" && (
          <LandingHero
            language={language}
            isDarkMode={isDarkMode}
            onLaunchScanner={() => handleNavigateToTab("scanner")}
            onNavigateTab={(tab) => handleNavigateToTab(tab)}
          />
        )}

        {activeTab === "scanner" && (
          <ChequeScanner
            language={language}
            isDarkMode={isDarkMode}
            onChequeProcessed={handleChequeProcessed}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === "risk" && (
          <GeoVelocityDashboard
            language={language}
            isDarkMode={isDarkMode}
            activeCheque={activeCheque}
            onTriggerIvr={(chq) => handleNavigateToTab("ivr", chq)}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === "ivr" && (
          <VoiceIvrSimulator
            language={language}
            isDarkMode={isDarkMode}
            activeCheque={activeCheque}
            onChequeAuthorized={handleChequeAuthorized}
            onNavigateToBlockchain={() => handleNavigateToTab("blockchain")}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === "uv" && (
          <UvWatermarkLab
            language={language}
            isDarkMode={isDarkMode}
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === "blockchain" && (
          <BlockchainExplorer
            language={language}
            isDarkMode={isDarkMode}
            blocks={blockchainBlocks}
            setBlocks={setBlockchainBlocks}
            onOpenReceiptModal={(block) => setReceiptModalBlock(block)}
            onNavigateToTab={handleNavigateToTab}
          />
        )}
      </main>

      {/* Certificate Modal */}
      {receiptModalBlock && (
        <ReceiptModal
          block={receiptModalBlock}
          onClose={() => setReceiptModalBlock(null)}
          language={language}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Modern Clean Footer */}
      <footer
        className={`border-t py-8 mt-12 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#0E1A16] border-emerald-950/80 text-slate-400"
            : "bg-white border-slate-200/80 text-slate-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                isDarkMode ? "bg-[#D6E8D8] text-[#0E1A16]" : "bg-[#182C25] text-white"
              }`}
            >
              P
            </div>
            <span className={`font-bold ${isDarkMode ? "text-white" : "text-[#182C25]"}`}>
              {t.appName}
            </span>
            <span>• Next-Gen Autonomous Cheque Settlement (CTS-2010)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-lingual IVR & AI OCR Active</span>
            </span>
            <span>•</span>
            <span>Zero-Queue Banking</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

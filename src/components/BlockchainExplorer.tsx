import React, { useState } from "react";
import {
  Layers,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { BlockchainBlock, LanguageCode } from "../types";
import { translations } from "../data/translations";

interface BlockchainExplorerProps {
  language: LanguageCode;
  isDarkMode?: boolean;
  blocks: BlockchainBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockchainBlock[]>>;
  onOpenReceiptModal: (block: BlockchainBlock) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const BlockchainExplorer: React.FC<BlockchainExplorerProps> = ({
  language,
  isDarkMode = false,
  blocks,
  setBlocks,
  onOpenReceiptModal,
  onNavigateToTab,
}) => {
  const t = translations[language]?.strings || translations.en.strings;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const isChainTampered = blocks.some((b) => b.status === "TAMPERED");

  const handleTamper = (index: number) => {
    setBlocks((prev) =>
      prev.map((b, idx) => {
        if (idx === index) {
          return {
            ...b,
            amount: 950000,
            status: "TAMPERED",
          };
        }
        if (idx > index) {
          return {
            ...b,
            status: "TAMPERED",
          };
        }
        return b;
      })
    );
  };

  const handleRestore = () => {
    setBlocks((prev) =>
      prev.map((b) => ({
        ...b,
        amount: b.index === 0 ? 0 : 45000,
        status: "VALID",
      }))
    );
  };

  const filteredBlocks = blocks.filter(
    (b) =>
      b.chequeNumber.includes(searchTerm) ||
      b.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              id="blockchain-back-home-btn"
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
              Cryptographic Audit Trail
            </span>
            <span className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Immutable SHA-256 Ledger
            </span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-[#182C25]"
            }`}
          >
            {t.blockchainTitle}
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            Every approved cheque leaf is cryptographically sealed onto a distributed immutable ledger node.
          </p>
        </div>

        {/* Chain Health Badge & Reset Button */}
        <div className="flex items-center gap-3">
          <div
            className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
              isChainTampered
                ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                : isDarkMode
                ? "bg-[#11221C] border-[#1E3B30] text-[#D6E8D8]"
                : "bg-[#D6E8D8] border-[#C2DEC5] text-[#182C25]"
            }`}
          >
            {isChainTampered ? (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>LEDGER TAMPER FLAGGED</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ALL SHA-256 MERKLE ROOTS VALID</span>
              </>
            )}
          </div>

          {isChainTampered && (
            <button
              onClick={handleRestore}
              className="px-4 py-2 rounded-2xl bg-[#182C25] hover:bg-[#233F35] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#D6E8D8]" />
              <span>Restore Chain</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border shadow-xs ${
            isDarkMode ? "bg-[#11221C] border-[#1E3B30]" : "bg-white border-slate-200/80"
          }`}
        >
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search block hash, payee name, or cheque #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full text-xs bg-transparent focus:outline-hidden ${
              isDarkMode ? "text-white placeholder-slate-500" : "text-[#182C25]"
            }`}
          />
        </div>
      </div>

      {/* Blockchain Blocks Horizontal Stream / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBlocks.map((block) => (
          <div
            key={block.hash}
            className={`p-6 rounded-[28px] border shadow-xs transition-all flex flex-col justify-between ${
              block.status === "TAMPERED"
                ? "bg-rose-950/40 border-rose-800 text-rose-100"
                : isDarkMode
                ? "bg-[#11221C] border-[#1E3B30] text-slate-100"
                : "bg-white border-slate-200/80 text-[#182C25]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#D6E8D8] text-[#182C25] text-[10px] font-black uppercase">
                  Block #{block.index}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    block.status === "TAMPERED" ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {block.status === "TAMPERED" ? "BROKEN SIGNATURE" : "CRYPTOGRAPHIC PASS"}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold truncate">{block.payee}</span>
                  <span className="text-sm font-mono font-black">
                    ₹{block.amount.toLocaleString()}
                  </span>
                </div>
                <div className={`text-[11px] font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Cheque #{block.chequeNumber} • {block.payer}
                </div>
              </div>

              {/* Hash Box */}
              <div
                className={`p-3 rounded-2xl border font-mono text-[10px] space-y-1 ${
                  isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="truncate">
                  <span className="text-slate-500">HASH: </span>
                  <span className={block.status === "TAMPERED" ? "text-rose-400" : "text-emerald-400"}>
                    {block.hash}
                  </span>
                </div>
                <div className="truncate text-slate-500">
                  <span>PREV: </span>
                  <span>{block.prevHash.slice(0, 16)}...</span>
                </div>
              </div>
            </div>

            {/* Block Actions */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenReceiptModal(block)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                  isDarkMode ? "bg-[#183027] hover:bg-[#204034] text-slate-100" : "bg-slate-100 hover:bg-slate-200 text-[#182C25]"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Certificate</span>
              </button>

              {block.index > 0 && block.status === "VALID" && (
                <button
                  onClick={() => handleTamper(block.index)}
                  className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                >
                  Simulate Fraud Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

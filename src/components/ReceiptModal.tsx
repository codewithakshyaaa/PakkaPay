import React from "react";
import {
  X,
  ShieldCheck,
  Printer,
} from "lucide-react";
import { BlockchainBlock, LanguageCode } from "../types";

interface ReceiptModalProps {
  block: BlockchainBlock | null;
  onClose: () => void;
  language: LanguageCode;
  isDarkMode?: boolean;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  block,
  onClose,
  isDarkMode = false,
}) => {
  if (!block) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] transition-colors ${
          isDarkMode
            ? "bg-[#10201A] border-[#1E3B30] text-slate-100"
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDarkMode ? "border-[#1E3B30] bg-[#0E1A16]" : "border-slate-100 bg-slate-50/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-sm">
              P
            </div>
            <div>
              <h3 className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                CTS-2010 Clearance Certificate
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                BLOCK #{block.index} • VERIFIED ON-CHAIN
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
              isDarkMode ? "bg-[#183027] text-slate-300 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-500"
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Body (Printable & Aesthetic) */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className={`text-center pb-4 border-b ${isDarkMode ? "border-[#1E3B30]" : "border-slate-100"}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/40 text-emerald-300 border border-emerald-700/50 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cryptographically Certified & Settled</span>
            </div>
            <div className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              ₹{block.amount.toLocaleString()}
            </div>
            <span className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              INR Direct Interbank Autonomous Clearance
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Cheque Number</span>
              <span className={`font-mono font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{block.chequeNumber}</span>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Settlement Date</span>
              <span className={`font-mono font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {new Date(block.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Drawer / Payer</span>
              <span className={`font-bold truncate block ${isDarkMode ? "text-white" : "text-slate-900"}`}>{block.payer}</span>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? "bg-[#0B1612] border-[#183027]" : "bg-slate-50 border-slate-100"}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Payee / Beneficiary</span>
              <span className={`font-bold truncate block ${isDarkMode ? "text-white" : "text-slate-900"}`}>{block.payee}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[10px] space-y-1.5 overflow-hidden border border-emerald-950">
            <div className="flex justify-between gap-2">
              <span className="text-slate-500 font-bold shrink-0">BLOCK HASH:</span>
              <span className="truncate text-emerald-400">{block.hash}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-slate-500 font-bold shrink-0">MERKLE ROOT:</span>
              <span className="truncate text-slate-400">{block.merkleRoot}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${isDarkMode ? "border-[#1E3B30] bg-[#0E1A16]" : "border-slate-100 bg-slate-50"}`}>
          <button
            onClick={handlePrint}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              isDarkMode ? "bg-[#183027] hover:bg-[#204034] text-white" : "bg-white hover:bg-slate-100 text-slate-800 border border-slate-200"
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#D6E8D8] text-[#0A1411] hover:bg-white text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

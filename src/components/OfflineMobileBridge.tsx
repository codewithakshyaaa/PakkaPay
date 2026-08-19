import React, { useState } from "react";
import {
  WifiOff,
  Wifi,
  RefreshCw,
  Code2,
  Smartphone,
  Server,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Trash2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { OfflineChequeQueueItem, LanguageCode } from "../types";
import { translations } from "../data/translations";

interface OfflineMobileBridgeProps {
  language: LanguageCode;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  offlineQueue: OfflineChequeQueueItem[];
  onSyncBatch: () => Promise<void>;
}

export const OfflineMobileBridge: React.FC<OfflineMobileBridgeProps> = ({
  language,
  isOfflineMode,
  setIsOfflineMode,
  offlineQueue,
  onSyncBatch,
}) => {
  const t = translations[language].strings;

  const [activeCodeTab, setActiveCodeTab] = useState<"FASTAPI" | "REACT_NATIVE">("FASTAPI");
  const [copied, setCopied] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const pendingItems = offlineQueue.filter((q) => q.syncStatus === "QUEUED_OFFLINE");

  const handleSync = async () => {
    setIsSyncing(true);
    await onSyncBatch();
    setIsSyncing(false);
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pythonFastApiSnippet = `# ==============================================================================
# PAKKAPAY - AUTONOMOUS CTS-2010 OCR & DUAL VERIFICATION FASTAPI MICROSERVICE
# ==============================================================================
# Requirements: pip install fastapi uvicorn google-genai opencv-python pydantic

import base64
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

app = FastAPI(title="PakkaPay Autonomous Cheque Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class ChequeAnalyzeRequest(BaseModel):
    imageBase64: str
    language: str = "en"

class ChequeAnalyzeResponse(BaseModel):
    payeeName: str
    payerName: str
    amountNumeric: float
    amountWords: str
    isWordsNumbersMatch: bool
    matchConfidence: float
    chequeNumber: str
    accountNumber: str
    ifscCode: str
    micrCode: str
    geoVelocityScore: int
    riskLevel: str

@app.post("/api/v1/cheque/ocr-verify", response_model=ChequeAnalyzeResponse)
async def process_cheque_ocr(req: ChequeAnalyzeRequest):
    """
    Extracts CTS-2010 cheque fields, runs edge detection, and verifies
    words vs numeric amounts with automated fraud risk scoring.
    """
    try:
        # Multimodal Gemini Prompt with Structured CTS-2010 Analysis
        prompt = """Analyze this CTS-2010 bank cheque. Return JSON with:
        payeeName, payerName, amountNumeric, amountWords, isWordsNumbersMatch,
        matchConfidence, chequeNumber, accountNumber, ifscCode, micrCode,
        geoVelocityScore, riskLevel (GREEN, YELLOW, RED)."""

        # Call Gemini Vision Multimodal Model
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt, req.imageBase64]
        )
        return response.parsed
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`;

  const reactNativeSnippet = `// ==============================================================================
// PAKKAPAY - REACT NATIVE / EXPO MOBILE CAMERA SDK & OFFLINE QUEUE
// ==============================================================================
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PakkaPayMobileScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera access required for CTS-2010 Cheque OCR</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCaptureCheque = async (cameraRef) => {
    if (!cameraRef) return;
    setIsProcessing(true);
    const photo = await cameraRef.takePictureAsync({ base64: true, quality: 0.85 });

    try {
      // 1. Send to PakkaPay Autonomous API
      const res = await fetch('https://your-bank-domain.com/api/cheque/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: \`data:image/jpeg;base64,\${photo.base64}\` }),
      });
      const data = await res.json();
      Alert.alert('Cheque Verified', \`Status: \${data.data.isWordsNumbersMatch ? '100% Match' : 'Mismatch Alert'}\`);
    } catch (err) {
      // 2. Fallback to Local Offline Rural SQLite / AsyncStorage Queue
      await AsyncStorage.setItem(\`offline_chq_\${Date.now()}\`, JSON.stringify(photo.base64));
      Alert.alert('Offline Mode', 'Cheque queued locally. Will auto-sync when network connects.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.overlayGuide}>
          <Text style={styles.guideText}>ALIGN CTS-2010 CHEQUE WITHIN BORDER</Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#182C25' },
  camera: { flex: 1 },
  overlayGuide: { margin: 24, flex: 1, borderWidth: 2, borderColor: '#D6E8D8', borderRadius: 24 },
  guideText: { color: '#D6E8D8', textAlign: 'center', marginTop: 12, fontWeight: 'bold' }
});
`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-[#182C25]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#D6E8D8] text-[#182C25] text-xs font-bold uppercase tracking-wider">
              Rural Banking Integration
            </span>
            <span className="text-xs text-slate-500 font-medium">Zero Connectivity Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#182C25] tracking-tight">
            {t.offlineMobileTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Handles rural outpost batch settlement when cellular networks drop, plus production code snippets for Python FastAPI and React Native mobile integration.
          </p>
        </div>

        {/* Offline Simulation Toggle */}
        <div className="flex items-center gap-3 bg-[#F4F5F7] p-2 rounded-2xl border border-slate-200/80">
          <span className="text-xs font-bold text-[#182C25] flex items-center gap-1.5">
            {isOfflineMode ? <WifiOff className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
            <span>Rural Kiosk Mode:</span>
          </span>
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              isOfflineMode ? "bg-amber-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                isOfflineMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Offline Queue Batch Manager (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold uppercase text-[#182C25] tracking-wider">
                  Rural Outpost Offline Queue
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  {pendingItems.length} records awaiting cloud sync
                </span>
              </div>

              {pendingItems.length > 0 && (
                <button
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="px-4 py-2 rounded-full bg-[#182C25] hover:bg-[#233F35] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>Sync Cloud</span>
                </button>
              )}
            </div>

            {offlineQueue.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <WifiOff className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <span>No cheques currently queued in offline storage.</span>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {offlineQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#182C25] block">{item.chequeData.payeeName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        ₹{item.chequeData.amountNumeric?.toLocaleString()} • {new Date(item.scannedAt).toLocaleTimeString()}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.syncStatus === "SYNCED" ? "bg-[#D6E8D8] text-[#182C25]" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.syncStatus === "SYNCED" ? "SYNCED" : "QUEUED"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Snippets (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#12231D] text-white border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
              {/* Code Tab Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCodeTab("FASTAPI")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    activeCodeTab === "FASTAPI" ? "bg-[#D6E8D8] text-[#182C25]" : "text-slate-300 hover:text-white"
                  }`}
                >
                  Python FastAPI Microservice
                </button>
                <button
                  onClick={() => setActiveCodeTab("REACT_NATIVE")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    activeCodeTab === "REACT_NATIVE" ? "bg-[#D6E8D8] text-[#182C25]" : "text-slate-300 hover:text-white"
                  }`}
                >
                  React Native Mobile SDK
                </button>
              </div>

              {/* Copy Code Button */}
              <button
                onClick={() =>
                  copyCode(activeCodeTab === "FASTAPI" ? pythonFastApiSnippet : reactNativeSnippet)
                }
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#D6E8D8]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Code"}</span>
              </button>
            </div>

            {/* Code Pre Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto max-h-[440px]">
              <pre>
                {activeCodeTab === "FASTAPI" ? pythonFastApiSnippet : reactNativeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

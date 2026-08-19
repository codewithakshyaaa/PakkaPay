export type LanguageCode =
  | "en"
  | "hi"
  | "ta"
  | "te"
  | "bn"
  | "mr"
  | "gu"
  | "es"
  | "fr"
  | "ar";

export type RiskLevel = "GREEN" | "YELLOW" | "RED";

export interface ChequeData {
  id: string;
  payeeName: string;
  payerName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  chequeNumber: string;
  micrCode: string;
  date: string;
  amountNumeric: number;
  amountWords: string;
  currency: string;
  isWordsNumbersMatch: boolean;
  matchConfidence: number;
  mismatchReason?: string;
  signatureDetected: boolean;
  signatureConfidence: number;
  uvSecurityFibersDetected: boolean;
  tamperEvidence: "none" | "erasure_detected" | "amount_overwriting" | "date_alteration";
  geoVelocityScore: number;
  riskLevel: RiskLevel;
  notes: string;
  imageThumbnail?: string;
  status: "PENDING_SCAN" | "SCANNED" | "VERIFIED" | "IVR_AUTHORIZED" | "ON_CHAIN_RECORDED" | "REJECTED";
}

export interface GeoLocation {
  lat: number;
  lng: number;
  name: string;
  state?: string;
  timestampMinutesAgo: number;
}

export interface GeoVelocityAnalysis {
  lastLocation: GeoLocation;
  currentLocation: GeoLocation;
  distanceKm: number;
  timeHours: number;
  velocityKmH: number;
  riskScore: number;
  riskLevel: RiskLevel;
  flags: string[];
  recommendation: string;
}

export interface BlockchainBlock {
  index: number;
  timestamp: string;
  chequeNumber: string;
  payer: string;
  payee: string;
  amount: number;
  currency: string;
  prevHash: string;
  hash: string;
  merkleRoot: string;
  nonce: number;
  validatorNode: string;
  status: "VALID" | "TAMPERED";
}

export interface OfflineChequeQueueItem {
  id: string;
  scannedAt: string;
  chequeData: Partial<ChequeData>;
  imageDataUrl?: string;
  syncStatus: "QUEUED_OFFLINE" | "SYNCING" | "SYNCED" | "FAILED";
  geoCoords?: { lat: number; lng: number };
}

export interface IVRCallSession {
  callId: string;
  recipientPhone: string;
  recipientName: string;
  amount: number;
  payee: string;
  bankName: string;
  status: "IDLE" | "RINGING" | "CONNECTED" | "APPROVED" | "REJECTED" | "TIMED_OUT";
  language: LanguageCode;
  selectedOption?: "1" | "9" | null;
  startTime?: number;
  durationSeconds: number;
}

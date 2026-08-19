import { ChequeData } from "../types";

// Helper to generate a realistic stylized cheque SVG data URL
export function generateChequeSvg(params: {
  bankName: string;
  payeeName: string;
  amountNumeric: number;
  amountWords: string;
  accountNo: string;
  chequeNo: string;
  micrCode: string;
  ifscCode: string;
  date: string;
  signatureText: string;
  isTampered?: boolean;
  hasUvGlow?: boolean;
}): string {
  const {
    bankName,
    payeeName,
    amountNumeric,
    amountWords,
    accountNo,
    chequeNo,
    micrCode,
    ifscCode,
    date,
    signatureText,
    isTampered,
    hasUvGlow,
  } = params;

  const bgFill = hasUvGlow ? "#090d16" : "#fbfcfe";
  const primaryText = hasUvGlow ? "#4ade80" : "#1e293b";
  const secondaryText = hasUvGlow ? "#38bdf8" : "#475569";
  const borderStroke = hasUvGlow ? "#6366f1" : "#cbd5e1";
  const inkColor = hasUvGlow ? "#22d3ee" : "#0f172a";
  const stampOpacity = hasUvGlow ? "0.95" : "0.08";

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" width="900" height="420">
    <defs>
      <pattern id="guilloche" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 0 15 Q 7.5 0, 15 15 T 30 15" fill="none" stroke="${hasUvGlow ? '#1e1b4b' : '#f1f5f9'}" stroke-width="1.2"/>
        <path d="M 0 0 Q 15 15, 30 0" fill="none" stroke="${hasUvGlow ? '#312e81' : '#e2e8f0'}" stroke-width="0.8"/>
      </pattern>
      <linearGradient id="uvGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2"/>
        <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#ec4899" stop-opacity="0.2"/>
      </linearGradient>
    </defs>

    <!-- Cheque Paper Canvas -->
    <rect width="900" height="420" rx="8" fill="${bgFill}" stroke="${borderStroke}" stroke-width="2"/>
    <rect width="880" height="400" x="10" y="10" fill="url(#guilloche)" rx="6"/>
    
    ${hasUvGlow ? `<rect width="880" height="400" x="10" y="10" fill="url(#uvGlowGrad)" rx="6"/>` : ''}

    <!-- Top Security Header / Bank Branding -->
    <rect x="25" y="25" width="850" height="50" rx="4" fill="${hasUvGlow ? '#111827' : '#f8fafc'}" stroke="${borderStroke}" stroke-width="1"/>
    
    <!-- Bank Logo Emblem -->
    <circle cx="55" cy="50" r="16" fill="${hasUvGlow ? '#6366f1' : '#1e3a8a'}"/>
    <text x="55" y="55" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">₹</text>
    
    <text x="82" y="44" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="bold" font-size="16" fill="${primaryText}">${bankName}</text>
    <text x="82" y="62" font-family="monospace" font-size="11" fill="${secondaryText}">IFSC: ${ifscCode} | RTGS/NEFT VALID CTS-2010 COMPLIANT</text>
    
    <!-- Cheque Date Boxes -->
    <g transform="translate(680, 32)">
      <text x="0" y="10" font-family="Arial" font-size="10" font-weight="bold" fill="${secondaryText}">DATE</text>
      <rect x="35" y="-3" width="160" height="26" fill="${hasUvGlow ? '#1f2937' : '#ffffff'}" stroke="${borderStroke}" rx="3"/>
      <text x="115" y="15" font-family="monospace" font-weight="bold" font-size="13" fill="${inkColor}" text-anchor="middle">${date}</text>
    </g>

    <!-- Payee Row -->
    <text x="35" y="115" font-family="sans-serif" font-size="13" font-weight="600" fill="${secondaryText}">PAY</text>
    <line x1="75" y1="118" x2="680" y2="118" stroke="${borderStroke}" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="85" y="112" font-family="'Caveat', 'Segoe Script', cursive, sans-serif" font-size="22" font-weight="bold" fill="${inkColor}">${payeeName}</text>
    <text x="695" y="115" font-family="sans-serif" font-size="11" font-weight="600" fill="${secondaryText}">OR BEARER</text>

    <!-- Amount in Words -->
    <text x="35" y="165" font-family="sans-serif" font-size="13" font-weight="600" fill="${secondaryText}">RUPEES</text>
    <line x1="100" y1="168" x2="630" y2="168" stroke="${borderStroke}" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="105" y="162" font-family="'Caveat', 'Segoe Script', cursive, sans-serif" font-size="19" font-weight="bold" fill="${inkColor}">${amountWords}</text>

    <!-- Amount Box (Digits) -->
    <g transform="translate(645, 140)">
      <rect width="220" height="42" rx="6" fill="${hasUvGlow ? '#0f172a' : '#f1f5f9'}" stroke="${hasUvGlow ? '#38bdf8' : '#64748b'}" stroke-width="1.5"/>
      <rect x="2" y="2" width="38" height="38" rx="4" fill="${hasUvGlow ? '#38bdf8' : '#0f172a'}"/>
      <text x="21" y="26" font-family="sans-serif" font-weight="bold" font-size="18" fill="${hasUvGlow ? '#0f172a' : '#ffffff'}" text-anchor="middle">₹</text>
      <text x="52" y="28" font-family="monospace" font-weight="900" font-size="20" fill="${isTampered ? '#ef4444' : inkColor}">
        ${amountNumeric.toLocaleString('en-IN')}/-
      </text>
    </g>

    <!-- Account Number Box -->
    <g transform="translate(35, 210)">
      <text x="0" y="0" font-family="sans-serif" font-size="11" font-weight="bold" fill="${secondaryText}">A/C NO.</text>
      <rect x="60" y="-14" width="220" height="32" rx="4" fill="${hasUvGlow ? '#1e293b' : '#ffffff'}" stroke="${borderStroke}"/>
      <text x="75" y="8" font-family="monospace" font-weight="bold" font-size="15" fill="${inkColor}">${accountNo}</text>
    </g>

    <!-- Payer Branch / Security Seal -->
    <g transform="translate(450, 200)" opacity="${stampOpacity}">
      <circle cx="60" cy="50" r="45" fill="none" stroke="${hasUvGlow ? '#a855f7' : '#3b82f6'}" stroke-width="2" stroke-dasharray="4,2"/>
      <text x="60" y="45" font-family="sans-serif" font-size="9" font-weight="bold" fill="${hasUvGlow ? '#c084fc' : '#1d4ed8'}" text-anchor="middle">PAKKAPAY AUTH</text>
      <text x="60" y="60" font-family="monospace" font-size="8" fill="${hasUvGlow ? '#c084fc' : '#1d4ed8'}" text-anchor="middle">CTS-2010 VALID</text>
    </g>

    <!-- Signature Block -->
    <g transform="translate(640, 240)">
      <line x1="0" y1="50" x2="220" y2="50" stroke="${borderStroke}" stroke-width="1"/>
      <text x="110" y="66" font-family="sans-serif" font-size="10" font-weight="bold" fill="${secondaryText}" text-anchor="middle">AUTHORIZED SIGNATORY</text>
      <text x="110" y="38" font-family="'Caveat', cursive" font-size="28" font-weight="bold" fill="${inkColor}" text-anchor="middle">${signatureText}</text>
    </g>

    <!-- Bottom MICR Code Band (Machine-Readable Optical Area) -->
    <rect x="10" y="340" width="880" height="60" fill="${hasUvGlow ? '#030712' : '#f8fafc'}" rx="4"/>
    <line x1="10" y1="340" x2="890" y2="340" stroke="${borderStroke}" stroke-width="1"/>
    <text x="450" y="378" font-family="'Courier New', Courier, monospace" font-weight="bold" font-size="21" letter-spacing="4" fill="${hasUvGlow ? '#4ade80' : '#0f172a'}" text-anchor="middle">
      c${chequeNo}c  ${micrCode}:  000${accountNo.slice(-4)}s  29
    </text>

    ${hasUvGlow ? `
      <!-- UV Watermark Overlay Layer -->
      <g opacity="0.85">
        <text x="450" y="180" font-family="Impact, sans-serif" font-size="44" fill="#38bdf8" text-anchor="middle" transform="rotate(-12, 450, 180)" letter-spacing="4" opacity="0.35">
          ★ PAKKAPAY CTS-2010 SECURE ★
        </text>
        <!-- Fluorescent security fibers -->
        <path d="M 120 70 Q 150 90, 180 60" stroke="#f43f5e" stroke-width="2" fill="none" opacity="0.8"/>
        <path d="M 520 120 Q 550 160, 580 130" stroke="#22c55e" stroke-width="1.8" fill="none" opacity="0.8"/>
        <path d="M 320 280 Q 360 250, 400 300" stroke="#06b6d4" stroke-width="2.2" fill="none" opacity="0.8"/>
        <path d="M 750 80 Q 770 120, 810 100" stroke="#eab308" stroke-width="1.8" fill="none" opacity="0.8"/>
      </g>
    ` : ''}

    ${isTampered ? `
      <!-- Visual Tampering Smudge Warning -->
      <g opacity="0.7">
        <rect x="710" y="145" width="45" height="30" fill="#fca5a5" opacity="0.4" rx="4"/>
        <text x="732" y="165" font-family="sans-serif" font-size="8" font-weight="bold" fill="#b91c1c" text-anchor="middle">ALTERED</text>
      </g>
    ` : ''}
  </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const sampleCheques: ChequeData[] = [
  {
    id: "chq_sample_01",
    payeeName: "Rameshwar Prasad Sharma",
    payerName: "Kisan Micro Agri Ltd",
    accountNumber: "918020048291039",
    bankName: "State Bank of India - Samastipur Branch",
    ifscCode: "SBIN0004921",
    chequeNumber: "482019",
    micrCode: "800002014",
    date: "2026-08-15",
    amountNumeric: 45000,
    amountWords: "Forty Five Thousand Rupees Only",
    currency: "INR",
    isWordsNumbersMatch: true,
    matchConfidence: 99,
    signatureDetected: true,
    signatureConfidence: 96,
    uvSecurityFibersDetected: true,
    tamperEvidence: "none",
    geoVelocityScore: 12,
    riskLevel: "GREEN",
    notes: "Verified agricultural credit disbursement cheque. Words and numbers match with zero alteration indicators.",
    status: "VERIFIED",
    imageThumbnail: generateChequeSvg({
      bankName: "State Bank of India - Samastipur Rural Branch",
      payeeName: "Rameshwar Prasad Sharma",
      amountNumeric: 45000,
      amountWords: "Forty Five Thousand Rupees Only",
      accountNo: "918020048291039",
      chequeNo: "482019",
      micrCode: "800002014",
      ifscCode: "SBIN0004921",
      date: "15/08/2026",
      signatureText: "R. Sharma",
    }),
  },
  {
    id: "chq_sample_02_mismatch",
    payeeName: "Sunil Kumar Verma",
    payerName: "Gramin Vikas Sahakari",
    accountNumber: "40291827401",
    bankName: "Punjab National Bank - Dehat Branch",
    ifscCode: "PUNB0182900",
    chequeNumber: "392011",
    micrCode: "110024018",
    date: "2026-08-18",
    amountNumeric: 500000,
    amountWords: "Fifty Thousand Rupees Only",
    currency: "INR",
    isWordsNumbersMatch: false,
    matchConfidence: 15,
    mismatchReason: "Critical Mismatch: Numeric box shows ₹5,00,000 (Five Lakhs) with an added trailing zero, while amount written in words explicitly states 'Fifty Thousand Rupees Only' (₹50,000).",
    signatureDetected: true,
    signatureConfidence: 82,
    uvSecurityFibersDetected: true,
    tamperEvidence: "amount_overwriting",
    geoVelocityScore: 88,
    riskLevel: "RED",
    notes: "CRITICAL FRAUD ALERT: Numeric box shows tampering with an added '0'. Words vs Numbers mismatch detected.",
    status: "REJECTED",
    imageThumbnail: generateChequeSvg({
      bankName: "Punjab National Bank - Dehat Branch",
      payeeName: "Sunil Kumar Verma",
      amountNumeric: 500000,
      amountWords: "Fifty Thousand Rupees Only",
      accountNo: "40291827401",
      chequeNo: "392011",
      micrCode: "110024018",
      ifscCode: "PUNB0182900",
      date: "18/08/2026",
      signatureText: "S. Verma",
      isTampered: true,
    }),
  },
  {
    id: "chq_sample_03_velocity",
    payeeName: "Meenakshi Sundaram",
    payerName: "Apex Logistics & Trade Corp",
    accountNumber: "60192847102",
    bankName: "HDFC Bank - Madurai Rural Hub",
    ifscCode: "HDFC0001924",
    chequeNumber: "720914",
    micrCode: "625240002",
    date: "2026-08-19",
    amountNumeric: 185000,
    amountWords: "One Lakh Eighty Five Thousand Rupees Only",
    currency: "INR",
    isWordsNumbersMatch: true,
    matchConfidence: 97,
    signatureDetected: true,
    signatureConfidence: 88,
    uvSecurityFibersDetected: true,
    tamperEvidence: "none",
    geoVelocityScore: 78,
    riskLevel: "RED",
    notes: "Geo-Velocity Alert: Account holder's mobile & ATM was authenticated in New Delhi (1,950 km away) just 20 minutes ago. Physical presentation in Madurai requires mandatory IVR voice confirmation.",
    status: "SCANNED",
    imageThumbnail: generateChequeSvg({
      bankName: "HDFC Bank - Madurai Rural Hub",
      payeeName: "Meenakshi Sundaram",
      amountNumeric: 185000,
      amountWords: "One Lakh Eighty Five Thousand Rupees Only",
      accountNo: "60192847102",
      chequeNo: "720914",
      micrCode: "625240002",
      ifscCode: "HDFC0001924",
      date: "19/08/2026",
      signatureText: "M. Sundaram",
    }),
  },
  {
    id: "chq_sample_04_uv_watermark",
    payeeName: "Lakshmi Self-Help Group",
    payerName: "NABARD Micro Watershed Fund",
    accountNumber: "20948172901",
    bankName: "Canara Bank - Rayagada Tribal Branch",
    ifscCode: "CNRB0002811",
    chequeNumber: "510294",
    micrCode: "765015002",
    date: "2026-08-17",
    amountNumeric: 80000,
    amountWords: "Eighty Thousand Rupees Only",
    currency: "INR",
    isWordsNumbersMatch: true,
    matchConfidence: 98,
    signatureDetected: true,
    signatureConfidence: 94,
    uvSecurityFibersDetected: true,
    tamperEvidence: "none",
    geoVelocityScore: 15,
    riskLevel: "GREEN",
    notes: "UV watermark fluorescence reveals authentic fluorescent security seal and randomized cyan-magenta security fibers.",
    status: "ON_CHAIN_RECORDED",
    imageThumbnail: generateChequeSvg({
      bankName: "Canara Bank - Rayagada Tribal Branch",
      payeeName: "Lakshmi Self-Help Group",
      amountNumeric: 80000,
      amountWords: "Eighty Thousand Rupees Only",
      accountNo: "20948172901",
      chequeNo: "510294",
      micrCode: "765015002",
      ifscCode: "CNRB0002811",
      date: "17/08/2026",
      signatureText: "L. Devi",
      hasUvGlow: true,
    }),
  },
];

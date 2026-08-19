import { BlockchainBlock } from "../types";

// Standard SHA-256 implementation using Web Crypto API or pure JS fallback
export async function sha256(message: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Simple deterministic fallback hash
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "0x" + Math.abs(hash).toString(16).padStart(64, "0");
}

export function computeBlockDataString(block: {
  index: number;
  timestamp: string;
  chequeNumber: string;
  payer: string;
  payee: string;
  amount: number;
  currency: string;
  prevHash: string;
  nonce: number;
}): string {
  return `${block.index}|${block.timestamp}|${block.chequeNumber}|${block.payer}|${block.payee}|${block.amount}|${block.currency}|${block.prevHash}|${block.nonce}`;
}

export async function createNewBlock(
  prevBlock: BlockchainBlock,
  chequeNumber: string,
  payer: string,
  payee: string,
  amount: number,
  currency: string = "INR"
): Promise<BlockchainBlock> {
  const index = prevBlock.index + 1;
  const timestamp = new Date().toISOString();
  const nonce = Math.floor(Math.random() * 90000) + 10000;
  
  const rawData = computeBlockDataString({
    index,
    timestamp,
    chequeNumber,
    payer,
    payee,
    amount,
    currency,
    prevHash: prevBlock.hash,
    nonce,
  });

  const hash = await sha256(rawData);
  const merkleRoot = await sha256(`${hash}:${prevBlock.merkleRoot}`);

  const validators = [
    "node-rbi-clearing-mumbai.pakkapay.eth",
    "node-sbi-rural-patna.pakkapay.eth",
    "node-nabard-agri-hub.pakkapay.eth",
    "node-hdfc-core-validator.pakkapay.eth",
  ];
  const validatorNode = validators[Math.floor(Math.random() * validators.length)];

  return {
    index,
    timestamp,
    chequeNumber,
    payer,
    payee,
    amount,
    currency,
    prevHash: prevBlock.hash,
    hash,
    merkleRoot,
    nonce,
    validatorNode,
    status: "VALID",
  };
}

export const INITIAL_GENESIS_CHAIN: BlockchainBlock[] = [
  {
    index: 0,
    timestamp: "2026-08-01T00:00:00.000Z",
    chequeNumber: "GENESIS-000000",
    payer: "Reserve Bank CTS Clearing Node",
    payee: "PakkaPay Decentralized Settlement Hub",
    amount: 0,
    currency: "INR",
    prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    hash: "0000a9482b9921ec94a02981bc8819ef3901b092147acb1837190bade8190012",
    merkleRoot: "7fa01928bc182903102948172901481902847192038190471902847190284719",
    nonce: 10482,
    validatorNode: "node-rbi-clearing-mumbai.pakkapay.eth",
    status: "VALID",
  },
  {
    index: 1,
    timestamp: "2026-08-15T09:30:14.000Z",
    chequeNumber: "482019",
    payer: "Kisan Micro Agri Ltd",
    payee: "Rameshwar Prasad Sharma",
    amount: 45000,
    currency: "INR",
    prevHash: "0000a9482b9921ec94a02981bc8819ef3901b092147acb1837190bade8190012",
    hash: "3b9f182740921820491028371029384710928374019283740192837401928374",
    merkleRoot: "9180293847109283740192837401928374019283740192837401928374019283",
    nonce: 83921,
    validatorNode: "node-sbi-rural-patna.pakkapay.eth",
    status: "VALID",
  },
  {
    index: 2,
    timestamp: "2026-08-17T14:12:45.000Z",
    chequeNumber: "510294",
    payer: "NABARD Micro Watershed Fund",
    payee: "Lakshmi Self-Help Group",
    amount: 80000,
    currency: "INR",
    prevHash: "3b9f182740921820491028371029384710928374019283740192837401928374",
    hash: "6e49201928374019283740192837401928374019283740192837401928374019",
    merkleRoot: "4920182749102938471029384710293847102938471029384710293847102938",
    nonce: 49201,
    validatorNode: "node-nabard-agri-hub.pakkapay.eth",
    status: "VALID",
  },
];

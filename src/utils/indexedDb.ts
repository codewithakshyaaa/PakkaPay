import { OfflineChequeQueueItem, ChequeData } from "../types";

const STORAGE_KEY = "pakkapay_offline_cheque_queue";

export function getOfflineQueue(): OfflineChequeQueueItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading offline queue:", e);
    return [];
  }
}

export function saveOfflineQueue(items: OfflineChequeQueueItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Error saving offline queue:", e);
  }
}

export function addChequeToOfflineQueue(
  item: Omit<OfflineChequeQueueItem, "id" | "scannedAt" | "syncStatus">
): OfflineChequeQueueItem {
  const queue = getOfflineQueue();
  const newItem: OfflineChequeQueueItem = {
    ...item,
    id: `chq_offline_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    scannedAt: new Date().toISOString(),
    syncStatus: "QUEUED_OFFLINE",
  };
  queue.unshift(newItem);
  saveOfflineQueue(queue);
  return newItem;
}

export function addToOfflineQueue(
  chequeData: Partial<ChequeData>,
  imageDataUrl?: string
): OfflineChequeQueueItem {
  return addChequeToOfflineQueue({
    chequeData,
    imageDataUrl,
  });
}

export function markSynced(id: string): void {
  updateOfflineQueueItemStatus(id, "SYNCED");
}

export function updateOfflineQueueItemStatus(
  id: string,
  status: OfflineChequeQueueItem["syncStatus"]
): void {
  const queue = getOfflineQueue();
  const updated = queue.map((it) => (it.id === id ? { ...it, syncStatus: status } : it));
  saveOfflineQueue(updated);
}

export function clearSyncedOfflineQueue(): void {
  const queue = getOfflineQueue();
  const remaining = queue.filter((it) => it.syncStatus !== "SYNCED");
  saveOfflineQueue(remaining);
}

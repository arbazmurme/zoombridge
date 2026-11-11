"use client";

export interface ConsentRecord {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: string;
}

export const CONSENT_STORAGE_KEY = "zbr_cookie_consent_v1";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function readStoredConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (typeof parsed.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === "undefined") return;
  const consent = readStoredConsent();
  if (!consent?.analytics) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}


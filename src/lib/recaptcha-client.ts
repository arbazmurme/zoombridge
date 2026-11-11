"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export async function getRecaptchaToken(
  action: string
): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  if (!siteKey || typeof window === "undefined") return undefined;

  if (!window.grecaptcha) {
    await new Promise<void>((resolve) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src*="recaptcha/api.js"]'
      );
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.head.appendChild(script);
    });
  }

  if (!window.grecaptcha) return undefined;

  return new Promise<string | undefined>((resolve) => {
    window.grecaptcha?.ready(async () => {
      try {
        const token = await window.grecaptcha?.execute(siteKey, { action });
        resolve(token);
      } catch {
        resolve(undefined);
      }
    });
  });
}


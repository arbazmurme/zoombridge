"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import {
  CONSENT_STORAGE_KEY,
  ConsentRecord,
  trackEvent,
} from "@/lib/analytics";

interface ConsentContextValue {
  consent: ConsentRecord | null;
  openPreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  openPreferences: () => {},
});

export function useCookieConsent() {
  return useContext(ConsentContext);
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";

const consentListeners = new Set<() => void>();

function subscribeConsent(listener: () => void) {
  consentListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    consentListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getRawConsentSnapshot(): string | null {
  if (typeof window === "undefined") return "ssr";
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function ConsentAnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const rawSnapshot = useSyncExternalStore(
    subscribeConsent,
    getRawConsentSnapshot,
    () => "ssr"
  );

  let consent: ConsentRecord | null = null;
  if (rawSnapshot && rawSnapshot !== "ssr") {
    try {
      const parsed = JSON.parse(rawSnapshot) as ConsentRecord;
      if (typeof parsed.analytics === "boolean") {
        consent = parsed;
      }
    } catch {
      consent = null;
    }
  }

  const bannerVisible = rawSnapshot !== "ssr" && consent === null;
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsToggle, setAnalyticsToggle] = useState(true);
  const [marketingToggle, setMarketingToggle] = useState(false);
  const trackedDepthsRef = useRef<Set<number>>(new Set());

  const persistConsent = useCallback(
    (analytics: boolean, marketing: boolean) => {
      const record: ConsentRecord = {
        essential: true,
        analytics,
        marketing,
        updatedAt: new Date().toISOString(),
        version: "1.0",
      };
      try {
        window.localStorage.setItem(
          CONSENT_STORAGE_KEY,
          JSON.stringify(record)
        );
      } catch {
        // Ignore storage quota errors cleanly
      }
      consentListeners.forEach((fn) => fn());
      setModalOpen(false);
    },
    []
  );

  const openPreferences = useCallback(() => {
    setAnalyticsToggle(consent?.analytics ?? false);
    setMarketingToggle(consent?.marketing ?? false);
    setModalOpen(true);
  }, [consent]);

  useEffect(() => {
    trackedDepthsRef.current.clear();
    if (consent?.analytics) {
      trackEvent("page_view", { page_path: pathname });
    }
  }, [pathname, consent?.analytics]);

  useEffect(() => {
    if (!consent?.analytics) return;

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((window.scrollY / docHeight) * 100);
      for (const milestone of [25, 50, 75, 90]) {
        if (pct >= milestone && !trackedDepthsRef.current.has(milestone)) {
          trackedDepthsRef.current.add(milestone);
          trackEvent("scroll_depth", {
            percent_scrolled: milestone,
            page_path: pathname,
          });
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (
        href.startsWith("http") &&
        !href.includes(window.location.hostname)
      ) {
        trackEvent("outbound_link_click", {
          link_url: href,
          page_path: pathname,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, [consent?.analytics, pathname]);

  const analyticsAllowed = Boolean(consent?.analytics);

  return (
    <ConsentContext.Provider value={{ consent, openPreferences }}>
      {analyticsAllowed && GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="zbr-ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {analyticsAllowed && GTM_ID ? (
        <Script id="zbr-gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      ) : null}

      {children}

      {bannerVisible && !modalOpen ? (
        <aside
          role="dialog"
          aria-label="Cookie consent preferences"
          className="fixed bottom-4 left-4 right-4 z-[900] mx-auto max-w-4xl rounded-2xl border border-white/15 bg-[#0A1628]/95 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md md:bottom-6 md:p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5 md:max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Privacy-First Cookie Controls
              </div>
              <p className="text-sm leading-relaxed text-slate-200">
                We use essential cookies to keep this site secure and functional.
                Analytics cookies remain disabled unless you grant consent. Read
                our{" "}
                <a
                  href="/privacy-policy"
                  className="underline decoration-[#22D3EE]/60 underline-offset-4 hover:text-white"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/gdpr"
                  className="underline decoration-[#22D3EE]/60 underline-offset-4 hover:text-white"
                >
                  GDPR Notice
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/40 hover:text-white"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                Manage Preferences
              </button>
              <button
                type="button"
                onClick={() => persistConsent(false, false)}
                className="inline-flex min-h-[44px] items-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => persistConsent(true, true)}
                className="inline-flex min-h-[44px] items-center rounded-lg bg-[#1E5EFF] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3B7BFF]"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      {modalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-[950] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0A1628] p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2
                  id="cookie-modal-title"
                  className="font-display text-xl font-semibold text-white"
                >
                  Manage Cookie Preferences
                </h2>
                <p className="mt-1 text-xs text-slate-300">
                  Control how ZoomBridge Research uses optional measurement
                  cookies. Your preferences are saved locally and can be updated
                  anytime from the footer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close cookie preferences"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#0F1E38] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Essential Cookies
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      Required for security, form submission protection, and
                      storing your consent selection.
                    </p>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#22D3EE]">
                    Always Active
                  </span>
                </div>
              </div>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0F1E38] p-4 transition hover:border-white/25">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Analytics &amp; Performance (GA4 / GTM)
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Helps us measure page performance, navigation flows, and CTA
                    effectiveness. Never loaded before consent.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsToggle}
                  onChange={(e) => setAnalyticsToggle(e.target.checked)}
                  className="h-5 w-5 rounded border-white/30 accent-[#1E5EFF]"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0F1E38] p-4 transition hover:border-white/25">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Attribution &amp; Campaign Measurement
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Allows aggregate campaign attribution when arriving from B2B
                    research or LinkedIn channels.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingToggle}
                  onChange={(e) => setMarketingToggle(e.target.checked)}
                  className="h-5 w-5 rounded border-white/30 accent-[#1E5EFF]"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2.5 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => persistConsent(false, false)}
                className="min-h-[44px] rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => persistConsent(analyticsToggle, marketingToggle)}
                className="min-h-[44px] rounded-lg bg-[#1E5EFF] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3B7BFF]"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={() => persistConsent(true, true)}
                className="min-h-[44px] rounded-lg bg-[#22D3EE] px-4 py-2 text-xs font-semibold text-[#0A1628] transition hover:opacity-90"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </ConsentContext.Provider>
  );
}

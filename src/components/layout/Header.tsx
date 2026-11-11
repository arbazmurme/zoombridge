"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { HEADER_LINKS } from "@/data/site";
import { SERVICES } from "@/data/services";
import { ZbrLogo } from "@/components/ui/ZbrLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpenPath, setServicesOpenPath] = useState<string | null>(null);
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const servicesOpen = servicesOpenPath === pathname;
  const mobileOpen = mobileOpenPath === pathname;

  const setServicesOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    setServicesOpenPath((prevPath) => {
      const curr = prevPath === pathname;
      const resolved = typeof next === "function" ? next(curr) : next;
      return resolved ? pathname : null;
    });
  };

  const setMobileOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    setMobileOpenPath((prevPath) => {
      const curr = prevPath === pathname;
      const resolved = typeof next === "function" ? next(curr) : next;
      return resolved ? pathname : null;
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpenPath(null);
        setMobileOpenPath(null);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpenPath(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0A1628]/92 py-3 shadow-[0_8px_32px_rgba(10,22,40,0.28)] backdrop-blur-md"
          : "bg-gradient-to-b from-[#0A1628]/85 to-transparent py-5"
      )}
    >
      <div className="zbr-container flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="ZoomBridge Research Home"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-[#22D3EE]"
        >
          <ZbrLogo light size={36} />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {HEADER_LINKS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            if (item.hasDropdown) {
              return (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((prev) => !prev)}
                    className={cn(
                      "group relative inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-[#22D3EE]"
                        : "text-slate-200 hover:text-white"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        servicesOpen ? "rotate-180 text-[#22D3EE]" : ""
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "absolute bottom-1.5 left-3.5 right-3.5 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#1E5EFF] to-[#22D3EE] transition-transform duration-200",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full mt-2 w-[540px] rounded-2xl border border-white/15 bg-[#0A1628]/98 p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                      >
                        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Demand Generation Services
                          </span>
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:underline"
                          >
                            All Services
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {SERVICES.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => {
                                setServicesOpen(false);
                                trackEvent("service_nav_click", {
                                  service_slug: service.slug,
                                });
                              }}
                              className="group/item rounded-xl border border-transparent p-3 transition hover:border-white/15 hover:bg-[#0F1E38]"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-white group-hover/item:text-[#22D3EE]">
                                  {service.title}
                                </span>
                                <ArrowUpRight
                                  className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-[#22D3EE]"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                                {service.tagline}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative inline-flex min-h-[44px] items-center rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-[#22D3EE]"
                    : "text-slate-200 hover:text-white"
                )}
              >
                <span>{item.label}</span>
                <span
                  className={cn(
                    "absolute bottom-1.5 left-3.5 right-3.5 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#1E5EFF] to-[#22D3EE] transition-transform duration-200",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Primary CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <MagneticButton
            href="/book-a-call"
            variant="primary"
            onClick={() =>
              trackEvent("cta_click", {
                cta_location: "header",
                cta_label: "Book a Strategy Call",
              })
            }
          >
            <span>Book a Strategy Call</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </MagneticButton>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#0A1628]/98 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="zbr-container flex flex-col gap-1 py-5"
            >
              {HEADER_LINKS.map((item) => (
                <div key={item.href} className="flex flex-col">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium",
                      pathname === item.href
                        ? "bg-white/10 text-[#22D3EE]"
                        : "text-slate-100 hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown ? (
                    <div className="ml-4 mt-1 grid grid-cols-1 gap-1 border-l border-white/10 pl-3">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="flex min-h-[40px] items-center text-sm text-slate-300 hover:text-[#22D3EE]"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="mt-4 pt-3 border-t border-white/10">
                <Link
                  href="/book-a-call"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_location: "mobile_drawer",
                      cta_label: "Book a Strategy Call",
                    })
                  }
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#1E5EFF] px-5 py-3 text-sm font-semibold text-white"
                >
                  Book a Strategy Call
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

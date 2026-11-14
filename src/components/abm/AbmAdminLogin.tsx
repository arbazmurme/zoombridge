"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { ZbrLogo } from "@/components/ui/ZbrLogo";

interface AbmAdminLoginProps {
  onSuccess: (adminEmail: string) => void;
}

export function AbmAdminLogin({ onSuccess }: AbmAdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      // Check admin credentials
      const isAdminEmail =
        cleanEmail === "sales@wearezbr.com" ||
        cleanEmail === "admin@zoombridgeresearch.com" ||
        cleanEmail === "admin@wearezbr.com" ||
        cleanEmail === "admin";

      const isValidPassword =
        password.trim() === "Ferrari@786" ||
        cleanPass.toLowerCase() === "ferrari@786" ||
        cleanPass === "admin2026" ||
        cleanPass === "admin123" ||
        cleanPass === "zbrAdmin2026!" ||
        cleanPass === "admin";

      if (isAdminEmail && isValidPassword) {
        const resolvedEmail = cleanEmail.includes("@") ? cleanEmail : "sales@wearezbr.com";
        const sessionPayload = JSON.stringify({
          email: resolvedEmail,
          authenticated: true,
          role: "Administrator",
          timestamp: Date.now(),
        });

        if (rememberMe) {
          localStorage.setItem("zbr_abm_admin_session", sessionPayload);
        } else {
          sessionStorage.setItem("zbr_abm_admin_session", sessionPayload);
        }
        setLoading(false);
        onSuccess(resolvedEmail);
      } else {
        setLoading(false);
        if (!isAdminEmail) {
          setError(
            "Access Restricted: Only authorized administrators (sales@wearezbr.com) can access the ABM Scoring platform."
          );
        } else {
          setError("Invalid admin password. Please enter the correct password (Ferrari@786) or click Demo Admin Fill.");
        }
      }
    }, 450);
  };

  const handleQuickDemoFill = () => {
    setEmail("sales@wearezbr.com");
    setPassword("Ferrari@786");
    setError(null);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 bg-[#070e1b] overflow-hidden">
      {/* Background Cyber Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(30,94,255,0.2) 60%, transparent 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[380px] w-[380px] rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(59,130,246,0.18) 60%, transparent 80%)",
        }}
      />

      {/* Main Glassmorphism Frame — Compact & Balanced */}
      <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-blue-500/25 bg-[#0b172a]/90 p-5 sm:p-7 lg:p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Branding, Value Prop & 3D Globe */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-7">
            {/* Top Brand Logo */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 transition hover:opacity-90"
                aria-label="ZoomBridge Research Home"
              >
                <ZbrLogo light size={32} />
              </Link>
            </div>

            {/* Headline & Description */}
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-3xl leading-[1.18]">
                Smarter B2B Growth <br className="hidden sm:inline" />
                with{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                  AI &amp; Research
                </span>
              </h1>
              <p className="max-w-md text-xs sm:text-sm leading-relaxed text-slate-300">
                AI-powered insights, verified data, and human expertise to help
                you find the right opportunities.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2 pt-0.5">
              {[
                "Verified B2B Data",
                "Human Intelligence",
                "Global Coverage",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-white">
                  <div className="flex h-4 w-4 items-center justify-center rounded bg-cyan-500/20 text-cyan-400 border border-cyan-400/40">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* 3D Holographic Globe Illustration */}
            <div className="relative pt-1 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[1024/682]">
                <Image
                  src="/images/abm-scoring/login-globe.webp"
                  alt="ZoomBridge B2B Global Intelligence Platform"
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-contain drop-shadow-[0_10px_25px_rgba(30,94,255,0.35)]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Sleek White Login Card (Compact) */}
          <div className="w-full lg:col-span-5">
            <div className="relative rounded-2xl bg-white p-5 sm:p-7 text-slate-900 shadow-xl">
              {/* User Avatar Circle */}
              <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 shadow-sm border border-blue-100">
                <User className="h-5 w-5" />
              </div>

              {/* Card Titles */}
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Welcome Back
                </h2>
                <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500">
                  Sign in to your ZoomBridge Research account
                </p>

                {/* Admin Access Only Badge */}
                <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-blue-200/80 bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
                  <Lock className="h-3 w-3 text-blue-600" />
                  <span>Admin Access Only</span>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div
                  role="alert"
                  className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-[11px] text-red-700 leading-snug"
                >
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Access Denied</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="block text-[11px] font-semibold text-slate-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <input
                      id="admin-email"
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="admin-password"
                      className="text-[11px] font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Lock className="h-3.5 w-3.5" />
                    </div>
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-9 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-[11px] text-slate-600 font-medium">
                      Remember me
                    </span>
                  </label>

                  <span className="text-[10px] font-mono text-slate-400">
                    256-Bit SSL
                  </span>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1.5 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 py-2.5 px-4 font-semibold text-xs sm:text-sm text-white shadow-md shadow-blue-500/20 transition hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-75"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Fill Admin Access Helper */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="group inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition"
                >
                  <Sparkles className="h-3 w-3 text-amber-500 group-hover:text-blue-600" />
                  <span>Demo Admin Fill (1-Click)</span>
                </button>
                <p className="mt-1.5 text-[10px] text-slate-400 text-center">
                  Credentials: <code className="text-slate-600 font-mono">sales@wearezbr.com</code> / <code className="text-slate-600 font-mono">Ferrari@786</code>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-sm rounded-xl bg-white p-5 text-slate-900 shadow-2xl">
            <div className="flex items-center gap-2 text-blue-600 mb-1.5">
              <ShieldCheck className="h-4 w-4" />
              <h3 className="font-bold text-sm">Admin Password Reset</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because ABM Scoring is restricted to enterprise administrators,
              credentials can only be reset through our infrastructure security desk:
            </p>
            <div className="mt-2.5 rounded-md bg-slate-50 p-2 text-xs font-mono text-slate-700 border border-slate-200">
              admin-security@zoombridgeresearch.com
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Or use the <strong>Demo Admin Fill</strong> button to sign in directly.
            </p>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="mt-3.5 w-full rounded-lg bg-slate-900 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

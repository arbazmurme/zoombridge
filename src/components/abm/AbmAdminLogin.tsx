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
      // Valid admin accounts: admin@zoombridgeresearch.com, admin@wearezbr.com, or contains "admin"
      const isAdminEmail =
        cleanEmail === "admin@zoombridgeresearch.com" ||
        cleanEmail === "admin@wearezbr.com" ||
        cleanEmail === "admin" ||
        cleanEmail.startsWith("admin@");

      const isValidPassword =
        cleanPass === "admin2026" ||
        cleanPass === "admin123" ||
        cleanPass === "zbrAdmin2026!" ||
        cleanPass === "admin";

      if (isAdminEmail && isValidPassword) {
        if (rememberMe) {
          localStorage.setItem(
            "zbr_abm_admin_session",
            JSON.stringify({
              email: cleanEmail.includes("@") ? cleanEmail : "admin@zoombridgeresearch.com",
              authenticated: true,
              role: "Administrator",
              timestamp: Date.now(),
            })
          );
        } else {
          sessionStorage.setItem(
            "zbr_abm_admin_session",
            JSON.stringify({
              email: cleanEmail.includes("@") ? cleanEmail : "admin@zoombridgeresearch.com",
              authenticated: true,
              role: "Administrator",
              timestamp: Date.now(),
            })
          );
        }
        setLoading(false);
        onSuccess(cleanEmail.includes("@") ? cleanEmail : "admin@zoombridgeresearch.com");
      } else {
        setLoading(false);
        if (!isAdminEmail) {
          setError(
            "Access Restricted: Only authorized ZBR administrators can access the ABM Scoring platform. Non-admin accounts do not have permission."
          );
        } else {
          setError("Invalid admin credentials. Please enter your administrator password or use Demo Admin.");
        }
      }
    }, 600);
  };

  const handleQuickDemoFill = () => {
    setEmail("admin@zoombridgeresearch.com");
    setPassword("admin2026");
    setError(null);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-[#070e1b] overflow-hidden">
      {/* Background Cyber Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full opacity-35 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(30,94,255,0.2) 60%, transparent 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[500px] w-[500px] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(59,130,246,0.18) 60%, transparent 80%)",
        }}
      />

      {/* Main Glassmorphism Frame Matching Design */}
      <div className="relative w-full max-w-6xl rounded-[32px] border border-blue-500/25 bg-[#0b172a]/85 p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Branding, Value Prop & 3D Globe */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-7">
            {/* Top Brand Logo */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3 transition hover:opacity-90"
                aria-label="ZoomBridge Research Home"
              >
                <ZbrLogo light size={38} />
              </Link>
            </div>

            {/* Headline & Description */}
            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.15]">
                Smarter B2B Growth <br className="hidden sm:inline" />
                with{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                  AI &amp; Research
                </span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                AI-powered insights, verified data, and human expertise to help
                you find the right opportunities.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-3 pt-1">
              {[
                "Verified B2B Data",
                "Human Intelligence",
                "Global Coverage",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-400/40">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            {/* 3D Holographic Globe Illustration */}
            <div className="relative pt-2 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[420px] aspect-[1024/682]">
                <Image
                  src="/images/abm-scoring/login-globe.webp"
                  alt="ZoomBridge B2B Global Intelligence Platform"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-contain drop-shadow-[0_15px_30px_rgba(30,94,255,0.4)]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Sleek White Login Card */}
          <div className="w-full lg:col-span-5">
            <div className="relative rounded-[28px] bg-white p-7 sm:p-10 text-slate-900 shadow-2xl">
              {/* User Avatar Circle */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 shadow-sm border border-blue-100">
                <User className="h-7 w-7" />
              </div>

              {/* Card Titles */}
              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome Back
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Sign in to your ZoomBridge Research account
                </p>

                {/* Admin Access Only Badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <Lock className="h-3.5 w-3.5 text-blue-600" />
                  <span>Admin Access Only</span>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 leading-snug"
                >
                  <ShieldAlert className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Access Denied</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="admin-email"
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="admin-password"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-11 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-600 font-medium">
                      Remember me
                    </span>
                  </label>

                  <span className="text-[11px] font-mono text-slate-400">
                    256-Bit SSL
                  </span>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 py-3.5 px-6 font-semibold text-sm text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-75"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Fill Admin Access Helper for Instant Testing */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 group-hover:text-blue-600" />
                  <span>Demo Admin Fill (1-Click)</span>
                </button>
                <p className="mt-2 text-[11px] text-slate-400 text-center">
                  Credentials: <code className="text-slate-600 font-mono">admin@zoombridgeresearch.com</code> / <code className="text-slate-600 font-mono">admin2026</code>
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
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-base">Admin Password Reset</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because ABM Scoring is restricted to enterprise administrators,
              credentials can only be reset through our infrastructure security desk:
            </p>
            <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs font-mono text-slate-700 border border-slate-200">
              admin-security@zoombridgeresearch.com
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Or use the <strong>Demo Admin Fill</strong> button to sign in directly.
            </p>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="mt-4 w-full rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

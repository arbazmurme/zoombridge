"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { BookCallInput, bookCallSchema } from "@/lib/validation";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function StrategyCallForm({
  idPrefix = "strategy",
  dark = true,
}: {
  idPrefix?: string;
  dark?: boolean;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookCallInput>({
    resolver: zodResolver(bookCallSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      company: "",
      pipelineGoal: "",
      website: "",
    },
  });

  const onSubmit = async (data: BookCallInput) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const recaptchaToken = await getRecaptchaToken("book_call");
      const response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setServerError(
          result.error ||
            "We could not submit your request right now. Please email sales@wearezbr.com."
        );
        return;
      }

      trackEvent("form_submit", { form_name: "book_strategy_call" });
      setSuccessMessage(
        result.message ||
          "Your strategy call request has been received. We will reply within one business day."
      );
      reset();
    } catch {
      setServerError(
        "Network error while submitting your request. Please check your connection or email sales@wearezbr.com."
      );
    }
  };

  const inputBase = cn(
    "peer block w-full rounded-xl border px-4 pb-2.5 pt-6 text-sm transition-all duration-200 focus:outline-none focus:ring-2",
    dark
      ? "border-white/15 bg-[#0A1628]/85 text-white placeholder-transparent focus:border-[#22D3EE] focus:ring-[#22D3EE]/30"
      : "border-slate-300 bg-white text-[#0F172A] placeholder-transparent focus:border-[#1E5EFF] focus:ring-[#1E5EFF]/20"
  );

  const labelBase = cn(
    "pointer-events-none absolute left-4 top-2 origin-left text-[11px] font-semibold transition-all duration-200",
    "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal",
    "peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold",
    dark
      ? "text-slate-400 peer-focus:text-[#22D3EE]"
      : "text-slate-500 peer-focus:text-[#1E5EFF]"
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      aria-label="Book a Strategy Call Form"
    >
      {/* Honeypot Field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input
          id={`${idPrefix}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {/* Full Name */}
      <div className="relative">
        <input
          id={`${idPrefix}-fullName`}
          type="text"
          placeholder="Full Name"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={
            errors.fullName ? `${idPrefix}-fullName-error` : undefined
          }
          disabled={isSubmitting}
          className={cn(
            inputBase,
            errors.fullName ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30" : ""
          )}
          {...register("fullName")}
        />
        <label
          htmlFor={`${idPrefix}-fullName`}
          className={labelBase}
        >
          Full Name *
        </label>
        {errors.fullName ? (
          <p
            id={`${idPrefix}-fullName-error`}
            className="mt-1.5 text-xs font-medium text-rose-400"
          >
            {errors.fullName.message}
          </p>
        ) : null}
      </div>

      {/* Work Email */}
      <div className="relative">
        <input
          id={`${idPrefix}-workEmail`}
          type="email"
          placeholder="Work Email"
          aria-invalid={Boolean(errors.workEmail)}
          aria-describedby={
            errors.workEmail ? `${idPrefix}-workEmail-error` : undefined
          }
          disabled={isSubmitting}
          className={cn(
            inputBase,
            errors.workEmail ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30" : ""
          )}
          {...register("workEmail")}
        />
        <label
          htmlFor={`${idPrefix}-workEmail`}
          className={labelBase}
        >
          Work Email *
        </label>
        {errors.workEmail ? (
          <p
            id={`${idPrefix}-workEmail-error`}
            className="mt-1.5 text-xs font-medium text-rose-400"
          >
            {errors.workEmail.message}
          </p>
        ) : null}
      </div>

      {/* Company */}
      <div className="relative">
        <input
          id={`${idPrefix}-company`}
          type="text"
          placeholder="Company"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={
            errors.company ? `${idPrefix}-company-error` : undefined
          }
          disabled={isSubmitting}
          className={cn(
            inputBase,
            errors.company ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30" : ""
          )}
          {...register("company")}
        />
        <label
          htmlFor={`${idPrefix}-company`}
          className={labelBase}
        >
          Company *
        </label>
        {errors.company ? (
          <p
            id={`${idPrefix}-company-error`}
            className="mt-1.5 text-xs font-medium text-rose-400"
          >
            {errors.company.message}
          </p>
        ) : null}
      </div>

      {/* Pipeline Goal */}
      <div className="relative">
        <textarea
          id={`${idPrefix}-pipelineGoal`}
          rows={4}
          placeholder="What's your pipeline goal?"
          aria-invalid={Boolean(errors.pipelineGoal)}
          aria-describedby={
            errors.pipelineGoal ? `${idPrefix}-pipelineGoal-error` : undefined
          }
          disabled={isSubmitting}
          className={cn(
            inputBase,
            "resize-y",
            errors.pipelineGoal
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30"
              : ""
          )}
          {...register("pipelineGoal")}
        />
        <label
          htmlFor={`${idPrefix}-pipelineGoal`}
          className={labelBase}
        >
          What&apos;s your pipeline goal? *
        </label>
        {errors.pipelineGoal ? (
          <p
            id={`${idPrefix}-pipelineGoal-error`}
            className="mt-1.5 text-xs font-medium text-rose-400"
          >
            {errors.pipelineGoal.message}
          </p>
        ) : null}
      </div>

      {/* Live Feedback Region */}
      <div aria-live="polite" aria-atomic="true">
        {serverError ? (
          <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs text-rose-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
            <span className={dark ? "text-rose-200" : "text-rose-700"}>
              {serverError}
            </span>
          </div>
        ) : null}

        {successMessage ? (
          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-xs">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
              aria-hidden="true"
            />
            <span className={dark ? "text-emerald-200" : "text-emerald-800"}>
              {successMessage}
            </span>
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#1E5EFF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(30,94,255,0.35)] transition hover:bg-[#3B7BFF] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <>
            <span>Book a Call</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </form>
  );
}

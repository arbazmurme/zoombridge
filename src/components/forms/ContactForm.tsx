"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { ContactInput, contactSchema } from "@/lib/validation";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function ContactForm({
  idPrefix = "contact",
  initialIntent = "",
}: {
  idPrefix?: string;
  initialIntent?: string;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const defaultIntentMessage =
    initialIntent === "abm-scores"
      ? "I would like to see sample ABM Fit, Intent, and Engagement scores for our target accounts."
      : initialIntent === "sample-data"
      ? "I would like to request sample verified decision-maker data for our Ideal Customer Profile."
      : "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: defaultIntentMessage,
      intent: initialIntent || "",
      website: "",
    },
  });

  useEffect(() => {
    if (initialIntent) {
      setValue("intent", initialIntent);
      if (defaultIntentMessage) {
        setValue("message", defaultIntentMessage);
      }
    }
  }, [initialIntent, defaultIntentMessage, setValue]);

  const onSubmit = async (data: ContactInput) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const recaptchaToken = await getRecaptchaToken("contact_form");
      const response = await fetch("/api/contact", {
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
            "Unable to send your message right now. Please email sales@wearezbr.com."
        );
        return;
      }

      trackEvent("form_submit", {
        form_name: "contact_us",
        intent: data.intent || "general",
      });
      setSuccessMessage(
        result.message ||
          "Thank you. We have received your inquiry and will reply within one business day."
      );
      reset();
    } catch {
      setServerError(
        "Network error while sending your message. Please try again or email sales@wearezbr.com."
      );
    }
  };

  const inputBase =
    "peer block w-full rounded-xl border border-slate-300 bg-white px-4 pb-2.5 pt-6 text-sm text-[#0F172A] placeholder-transparent transition-all duration-200 focus:border-[#1E5EFF] focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/20";

  const labelBase =
    "pointer-events-none absolute left-4 top-2 origin-left text-[11px] font-semibold text-slate-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#1E5EFF]";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      aria-label="Contact Us Form"
    >
      {/* Honeypot */}
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

      <input type="hidden" {...register("intent")} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative">
          <input
            id={`${idPrefix}-name`}
            type="text"
            placeholder="Name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
            disabled={isSubmitting}
            className={cn(
              inputBase,
              errors.name ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""
            )}
            {...register("name")}
          />
          <label
            htmlFor={`${idPrefix}-name`}
            className={labelBase}
          >
            Name *
          </label>
          {errors.name ? (
            <p
              id={`${idPrefix}-name-error`}
              className="mt-1.5 text-xs font-medium text-rose-600"
            >
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="relative">
          <input
            id={`${idPrefix}-email`}
            type="email"
            placeholder="Email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            disabled={isSubmitting}
            className={cn(
              inputBase,
              errors.email ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""
            )}
            {...register("email")}
          />
          <label
            htmlFor={`${idPrefix}-email`}
            className={labelBase}
          >
            Email *
          </label>
          {errors.email ? (
            <p
              id={`${idPrefix}-email-error`}
              className="mt-1.5 text-xs font-medium text-rose-600"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              errors.company ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""
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
              className="mt-1.5 text-xs font-medium text-rose-600"
            >
              {errors.company.message}
            </p>
          ) : null}
        </div>

        <div className="relative">
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            placeholder="Phone (Optional)"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
            disabled={isSubmitting}
            className={inputBase}
            {...register("phone")}
          />
          <label
            htmlFor={`${idPrefix}-phone`}
            className={labelBase}
          >
            Phone (Optional)
          </label>
          {errors.phone ? (
            <p
              id={`${idPrefix}-phone-error`}
              className="mt-1.5 text-xs font-medium text-rose-600"
            >
              {errors.phone.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="relative">
        <textarea
          id={`${idPrefix}-message`}
          rows={4}
          placeholder="Message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${idPrefix}-message-error` : undefined
          }
          disabled={isSubmitting}
          className={cn(
            inputBase,
            "resize-y",
            errors.message ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""
          )}
          {...register("message")}
        />
        <label
          htmlFor={`${idPrefix}-message`}
          className={labelBase}
        >
          Message *
        </label>
        {errors.message ? (
          <p
            id={`${idPrefix}-message-error`}
            className="mt-1.5 text-xs font-medium text-rose-600"
          >
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div aria-live="polite" aria-atomic="true">
        {serverError ? (
          <div className="flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-700">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
              aria-hidden="true"
            />
            <span>{serverError}</span>
          </div>
        ) : null}

        {successMessage ? (
          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-800">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
              aria-hidden="true"
            />
            <span>{successMessage}</span>
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0A1628] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1E5EFF] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>Submit</span>
          </>
        )}
      </button>
    </form>
  );
}

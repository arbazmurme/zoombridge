"use client";

import React, { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";

export function SocialShareBar({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Share:
      </span>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0A1628] transition hover:border-[#1E5EFF] hover:text-[#1E5EFF]"
      >
        <LinkedInIcon className="h-3.5 w-3.5" />
        <span>LinkedIn</span>
      </a>

      <a
        href={mailHref}
        aria-label="Share via Email"
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0A1628] transition hover:border-[#1E5EFF] hover:text-[#1E5EFF]"
      >
        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Email</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0A1628] transition hover:border-[#1E5EFF] hover:text-[#1E5EFF]"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}


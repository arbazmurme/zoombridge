import React from "react";

export function ZbrLogo({
  className = "",
  light = true,
  size = 36,
}: {
  className?: string;
  light?: boolean;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="zbr-brand-grad"
            x1="4"
            y1="4"
            x2="36"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1E5EFF" />
            <stop offset="55%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="10"
          fill="#0F1E38"
          stroke="url(#zbr-brand-grad)"
          strokeWidth="1.6"
        />
        <path
          d="M11 13H25L13 27H27"
          stroke="url(#zbr-brand-grad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="13" r="2.2" fill="#22D3EE" />
        <circle cx="11" cy="27" r="2.2" fill="#8B5CF6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-base font-bold tracking-tight ${
            light ? "text-white" : "text-[#0A1628]"
          }`}
        >
          ZoomBridge
        </span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
            light ? "text-[#22D3EE]" : "text-[#1E5EFF]"
          }`}
        >
          Research
        </span>
      </span>
    </span>
  );
}


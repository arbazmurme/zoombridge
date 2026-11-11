import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ZbrLogo({
  className = "",
  light = true,
  size = 36,
}: {
  className?: string;
  light?: boolean;
  size?: number;
}) {
  if (light) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src="/assets/ZBR-logo-footer.webp"
          alt="ZoomBridge Research"
          width={425}
          height={56}
          priority
          style={{ height: Math.max(24, Math.round(size * 0.78)), width: "auto" }}
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/assets/ZBR-logo-light.webp"
        alt="ZoomBridge Research"
        width={688}
        height={275}
        style={{ height: Math.max(30, size), width: "auto" }}
        className="object-contain"
      />
    </span>
  );
}

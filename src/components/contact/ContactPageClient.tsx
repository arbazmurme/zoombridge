"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { ContactSection } from "@/components/landing/ContactSection";

export function ContactPageClient() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent") || "";

  return <ContactSection initialIntent={intent} />;
}


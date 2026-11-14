"use client";

import React, { useSyncExternalStore } from "react";
import { AbmAdminLogin } from "@/components/abm/AbmAdminLogin";
import { AbmAdminDashboard } from "@/components/abm/AbmAdminDashboard";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("zbr_auth_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("zbr_auth_change", callback);
  };
}

function getSnapshot(): string {
  try {
    return (
      localStorage.getItem("zbr_abm_admin_session") ||
      sessionStorage.getItem("zbr_abm_admin_session") ||
      ""
    );
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return "";
}

export function AbmScoringClient() {
  const sessionString = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  let isAuthenticated = false;
  let adminEmail = "admin@zoombridgeresearch.com";

  if (sessionString) {
    try {
      const parsed = JSON.parse(sessionString);
      if (parsed.authenticated) {
        isAuthenticated = true;
        if (parsed.email) {
          adminEmail = parsed.email;
        }
      }
    } catch {
      // Ignore parse error
    }
  }

  const handleLoginSuccess = () => {
    window.dispatchEvent(new Event("zbr_auth_change"));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem("zbr_abm_admin_session");
      sessionStorage.removeItem("zbr_abm_admin_session");
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("zbr_auth_change"));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  if (!isAuthenticated) {
    return <AbmAdminLogin onSuccess={handleLoginSuccess} />;
  }

  return (
    <AbmAdminDashboard
      adminEmail={adminEmail}
      onSignOut={handleSignOut}
    />
  );
}

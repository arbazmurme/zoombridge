export async function verifyRecaptchaToken(
  token: string | undefined,
  expectedAction: string
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.RECAPTCHA_SECRET?.trim();
  if (!secret) {
    // reCAPTCHA secret not configured in environment; allow server validation + rate-limit + honeypot
    return { ok: true };
  }

  if (!token) {
    return { ok: false, reason: "Missing reCAPTCHA verification token." };
  }

  try {
    const params = new URLSearchParams({
      secret,
      response: token,
    });

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      return { ok: false, reason: "Unable to verify reCAPTCHA response." };
    }

    const result = (await response.json()) as {
      success: boolean;
      score?: number;
      action?: string;
    };

    if (!result.success) {
      return { ok: false, reason: "reCAPTCHA check did not pass." };
    }

    if (typeof result.score === "number" && result.score < 0.5) {
      return { ok: false, reason: "Automated submission detected." };
    }

    if (result.action && result.action !== expectedAction) {
      return { ok: false, reason: "reCAPTCHA action mismatch." };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "reCAPTCHA verification service error." };
  }
}

export async function syncHubSpotLead(payload: {
  email: string;
  firstName: string;
  lastName?: string;
  company: string;
  phone?: string;
  notes?: string;
}): Promise<void> {
  const token = process.env.HUBSPOT_TOKEN?.trim();
  if (!token) return;

  try {
    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          email: payload.email,
          firstname: payload.firstName,
          lastname: payload.lastName || "",
          company: payload.company,
          phone: payload.phone || "",
          hs_lead_status: "NEW",
          message: payload.notes || "",
        },
      }),
    });

    if (!res.ok && res.status !== 409) {
      console.warn("HubSpot CRM sync returned status:", res.status);
    }
  } catch (err) {
    console.warn("HubSpot CRM sync skipped due to network error:", err);
  }
}


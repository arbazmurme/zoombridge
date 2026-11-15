import { Resend } from "resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  // If user configured a verified custom domain, use it; otherwise fallback to Resend's active sandbox sender
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "ZoomBridge Research <onboarding@resend.dev>";
  const salesTo =
    process.env.SALES_NOTIFICATION_EMAIL?.trim() ||
    "arbazmurme.work@gmail.com";

  return { apiKey, from, salesTo };
}

export async function sendStrategyCallEmails(data: {
  fullName: string;
  workEmail: string;
  company: string;
  pipelineGoal: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { apiKey, from, salesTo } = getResendConfig();
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Email delivery is not configured yet (RESEND_API_KEY missing). Please reach us directly at sales@wearezbr.com.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    // 1. Primary Lead Notification to Sales Desk
    let activeFrom = from;
    let salesEmail = await resend.emails.send({
      from: activeFrom,
      to: [salesTo],
      replyTo: data.workEmail,
      subject: `🎯 New Strategy Call Request: ${data.company} (${data.fullName})`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;line-height:1.6;">
          <h2 style="color:#0A1628;border-bottom:2px solid #00D4FF;padding-bottom:8px;">New Strategy Call Request</h2>
          <p><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p><strong>Work Email:</strong> <a href="mailto:${escapeHtml(data.workEmail)}">${escapeHtml(data.workEmail)}</a></p>
          <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
          <p><strong>Pipeline Goal / Target:</strong></p>
          <div style="background:#F8FAFC;padding:14px;border-radius:8px;border:1px solid #E2E8F0;font-size:14px;">
            ${escapeHtml(data.pipelineGoal)}
          </div>
          <p style="margin-top:20px;font-size:12px;color:#64748B;">
            Sent from ZoomBridge Research Web Platform • Reply directly to this email to reach ${escapeHtml(data.fullName)}.
          </p>
        </div>
      `,
    });

    // If custom domain is not yet verified in Resend, automatically fallback to onboarding@resend.dev
    if (salesEmail.error && salesEmail.error.message?.includes("domain is not verified")) {
      console.warn("[Resend Warning] Domain not verified, retrying with onboarding@resend.dev...");
      activeFrom = "ZoomBridge Research <onboarding@resend.dev>";
      salesEmail = await resend.emails.send({
        from: activeFrom,
        to: [salesTo],
        replyTo: data.workEmail,
        subject: `🎯 New Strategy Call Request: ${data.company} (${data.fullName})`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;line-height:1.6;">
            <h2 style="color:#0A1628;border-bottom:2px solid #00D4FF;padding-bottom:8px;">New Strategy Call Request</h2>
            <p><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
            <p><strong>Work Email:</strong> <a href="mailto:${escapeHtml(data.workEmail)}">${escapeHtml(data.workEmail)}</a></p>
            <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
            <p><strong>Pipeline Goal / Target:</strong></p>
            <div style="background:#F8FAFC;padding:14px;border-radius:8px;border:1px solid #E2E8F0;font-size:14px;">
              ${escapeHtml(data.pipelineGoal)}
            </div>
            <p style="margin-top:20px;font-size:12px;color:#64748B;">
              Sent from ZoomBridge Research Web Platform • Reply directly to this email to reach ${escapeHtml(data.fullName)}.
            </p>
          </div>
        `,
      });
    }

    if (salesEmail.error) {
      console.error("[Resend Error - Sales Lead]:", salesEmail.error);
      return {
        ok: false,
        error: salesEmail.error.message || "Unable to deliver your request right now. Please email sales@wearezbr.com.",
      };
    }

    // 2. Client Auto-Acknowledgment (Non-blocking: if Resend sandbox restricts third-party recipients, don't fail the lead)
    try {
      await resend.emails.send({
        from: activeFrom,
        to: [data.workEmail],
        replyTo: salesTo,
        subject: "ZoomBridge Research — Strategy Call Request Received",
        html: `
          <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;line-height:1.6;">
            <h2 style="color:#0A1628;">Thank you, ${escapeHtml(data.fullName)}.</h2>
            <p>We have received your strategy call request for <strong>${escapeHtml(data.company)}</strong>.</p>
            <p>A specialist from ZoomBridge Research will respond within one business day (&lt; 24h) to confirm your session and discuss sample data for your Ideal Customer Profile.</p>
            <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0;" />
            <p style="color:#64748B;font-size:13px;">ZoomBridge Research • <a href="mailto:${salesTo}">${salesTo}</a> • wearezbr.com</p>
          </div>
        `,
      });
    } catch (clientEmailErr) {
      console.warn("[Resend Notice] Client auto-acknowledgment skipped (sandbox mode):", clientEmailErr);
    }

    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Email service error";
    console.error("[Email Exception]:", message);
    return {
      ok: false,
      error: "Email service error while submitting your request. Please try again or email sales@wearezbr.com.",
    };
  }
}

export async function sendContactEmails(data: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  intent?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { apiKey, from, salesTo } = getResendConfig();
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Email delivery is not configured yet (RESEND_API_KEY missing). Please reach us directly at sales@wearezbr.com.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    let activeFrom = from;
    let salesEmail = await resend.emails.send({
      from: activeFrom,
      to: [salesTo],
      replyTo: data.email,
      subject: `📩 Contact Inquiry${data.intent ? ` [${data.intent}]` : ""}: ${data.company} (${data.name})`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;line-height:1.6;">
          <h2 style="color:#0A1628;border-bottom:2px solid #00D4FF;padding-bottom:8px;">New Contact Inquiry</h2>
          ${
            data.intent
              ? `<p><strong>Intent:</strong> ${escapeHtml(data.intent)}</p>`
              : ""
          }
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
          <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
          ${
            data.phone
              ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`
              : ""
          }
          <p><strong>Message:</strong></p>
          <div style="background:#F8FAFC;padding:14px;border-radius:8px;border:1px solid #E2E8F0;font-size:14px;">
            ${escapeHtml(data.message)}
          </div>
          <p style="margin-top:20px;font-size:12px;color:#64748B;">
            Sent from ZoomBridge Research Web Platform • Reply directly to this email to reach ${escapeHtml(data.name)}.
          </p>
        </div>
      `,
    });

    if (salesEmail.error && salesEmail.error.message?.includes("domain is not verified")) {
      console.warn("[Resend Warning] Domain not verified, retrying with onboarding@resend.dev...");
      activeFrom = "ZoomBridge Research <onboarding@resend.dev>";
      salesEmail = await resend.emails.send({
        from: activeFrom,
        to: [salesTo],
        replyTo: data.email,
        subject: `📩 Contact Inquiry${data.intent ? ` [${data.intent}]` : ""}: ${data.company} (${data.name})`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;line-height:1.6;">
            <h2 style="color:#0A1628;border-bottom:2px solid #00D4FF;padding-bottom:8px;">New Contact Inquiry</h2>
            ${
              data.intent
                ? `<p><strong>Intent:</strong> ${escapeHtml(data.intent)}</p>`
                : ""
            }
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
            <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
            ${
              data.phone
                ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`
                : ""
            }
            <p><strong>Message:</strong></p>
            <div style="background:#F8FAFC;padding:14px;border-radius:8px;border:1px solid #E2E8F0;font-size:14px;">
              ${escapeHtml(data.message)}
            </div>
            <p style="margin-top:20px;font-size:12px;color:#64748B;">
              Sent from ZoomBridge Research Web Platform • Reply directly to this email to reach ${escapeHtml(data.name)}.
            </p>
          </div>
        `,
      });
    }

    if (salesEmail.error) {
      console.error("[Resend Error - Contact Lead]:", salesEmail.error);
      return {
        ok: false,
        error: salesEmail.error.message || "Unable to send your message right now. Please email sales@wearezbr.com.",
      };
    }

    try {
      await resend.emails.send({
        from: activeFrom,
        to: [data.email],
        replyTo: salesTo,
        subject: "ZoomBridge Research — Inquiry Received",
        html: `
          <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;line-height:1.6;">
            <h2 style="color:#0A1628;">We received your message, ${escapeHtml(data.name)}.</h2>
            <p>Thank you for contacting ZoomBridge Research. Our team reviews every inquiry and responds within one business day.</p>
            <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0;" />
            <p style="color:#64748B;font-size:13px;">ZoomBridge Research • <a href="mailto:${salesTo}">${salesTo}</a> • wearezbr.com</p>
          </div>
        `,
      });
    } catch (clientEmailErr) {
      console.warn("[Resend Notice] Client auto-acknowledgment skipped (sandbox mode):", clientEmailErr);
    }

    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Email service error";
    console.error("[Email Exception]:", message);
    return {
      ok: false,
      error: "Email service error while sending your message. Please try again or email sales@wearezbr.com.",
    };
  }
}

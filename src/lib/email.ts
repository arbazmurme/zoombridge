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
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "ZoomBridge Research <noreply@wearezbr.com>";
  const salesTo =
    process.env.SALES_NOTIFICATION_EMAIL?.trim() || "sales@wearezbr.com";

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
    const salesEmail = await resend.emails.send({
      from,
      to: [salesTo],
      replyTo: data.workEmail,
      subject: `Strategy Call Request: ${data.company} (${data.fullName})`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;">
          <h2 style="color:#0A1628;">New Strategy Call Request</h2>
          <p><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p><strong>Work Email:</strong> ${escapeHtml(data.workEmail)}</p>
          <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
          <p><strong>Pipeline Goal:</strong></p>
          <p style="background:#F8FAFC;padding:12px;border-radius:8px;border:1px solid #E2E8F0;">${escapeHtml(
            data.pipelineGoal
          )}</p>
        </div>
      `,
    });

    if (salesEmail.error) {
      return {
        ok: false,
        error: "Unable to deliver your request right now. Please email sales@wearezbr.com.",
      };
    }

    // Send acknowledgement email to requester
    await resend.emails.send({
      from,
      to: [data.workEmail],
      replyTo: salesTo,
      subject: "ZoomBridge Research — Strategy Call Request Received",
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;">
          <h2 style="color:#0A1628;">Thank you, ${escapeHtml(data.fullName)}.</h2>
          <p>We have received your strategy call request for <strong>${escapeHtml(
            data.company
          )}</strong>.</p>
          <p>A specialist from ZoomBridge Research will respond within one business day (&lt; 24h) to confirm your session and discuss sample data for your Ideal Customer Profile.</p>
          <p style="margin-top:24px;color:#475569;font-size:13px;">ZoomBridge Research • sales@wearezbr.com • wearezbr.com</p>
        </div>
      `,
    });

    return { ok: true };
  } catch {
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
    const salesEmail = await resend.emails.send({
      from,
      to: [salesTo],
      replyTo: data.email,
      subject: `Contact Inquiry${data.intent ? ` [${data.intent}]` : ""}: ${
        data.company
      } (${data.name})`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;">
          <h2 style="color:#0A1628;">New Contact Inquiry</h2>
          ${
            data.intent
              ? `<p><strong>Intent:</strong> ${escapeHtml(data.intent)}</p>`
              : ""
          }
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
          ${
            data.phone
              ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`
              : ""
          }
          <p><strong>Message:</strong></p>
          <p style="background:#F8FAFC;padding:12px;border-radius:8px;border:1px solid #E2E8F0;">${escapeHtml(
            data.message
          )}</p>
        </div>
      `,
    });

    if (salesEmail.error) {
      return {
        ok: false,
        error: "Unable to send your message right now. Please email sales@wearezbr.com.",
      };
    }

    await resend.emails.send({
      from,
      to: [data.email],
      replyTo: salesTo,
      subject: "ZoomBridge Research — Inquiry Received",
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;max-width:600px;">
          <h2 style="color:#0A1628;">We received your message, ${escapeHtml(
            data.name
          )}.</h2>
          <p>Thank you for contacting ZoomBridge Research. Our team reviews every inquiry and responds within one business day.</p>
          <p style="margin-top:24px;color:#475569;font-size:13px;">ZoomBridge Research • sales@wearezbr.com • wearezbr.com</p>
        </div>
      `,
    });

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Email service error while sending your message. Please try again or email sales@wearezbr.com.",
    };
  }
}


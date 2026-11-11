import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { checkRateLimit, extractClientIp } from "@/lib/rate-limit";
import { syncHubSpotLead, verifyRecaptchaToken } from "@/lib/security";
import { sendContactEmails } from "@/lib/email";

export async function POST(request: Request) {
  const ip = extractClientIp(request);
  const rate = checkRateLimit(`contact:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: "Too many requests from this IP. Please try again in a few minutes.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || "form");
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      {
        error: "Please review the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  if (data.website && data.website.length > 0) {
    return NextResponse.json(
      { error: "Spam validation failed." },
      { status: 400 }
    );
  }

  const recaptcha = await verifyRecaptchaToken(
    data.recaptchaToken,
    "contact_form"
  );
  if (!recaptcha.ok) {
    return NextResponse.json(
      { error: recaptcha.reason || "Security verification failed." },
      { status: 403 }
    );
  }

  const emailResult = await sendContactEmails({
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone,
    message: data.message,
    intent: data.intent,
  });

  if (!emailResult.ok) {
    return NextResponse.json(
      { error: emailResult.error || "Unable to submit message." },
      { status: 503 }
    );
  }

  const nameParts = data.name.split(" ");
  await syncHubSpotLead({
    email: data.email,
    firstName: nameParts[0] || data.name,
    lastName: nameParts.slice(1).join(" "),
    company: data.company,
    phone: data.phone,
    notes: `${data.intent ? `[${data.intent}] ` : ""}${data.message}`,
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        "Thank you. We have received your message and will respond within one business day.",
    },
    { status: 200 }
  );
}


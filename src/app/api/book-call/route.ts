import { NextResponse } from "next/server";
import { bookCallSchema } from "@/lib/validation";
import { checkRateLimit, extractClientIp } from "@/lib/rate-limit";
import { syncHubSpotLead, verifyRecaptchaToken } from "@/lib/security";
import { sendStrategyCallEmails } from "@/lib/email";

export async function POST(request: Request) {
  const ip = extractClientIp(request);
  const rate = checkRateLimit(`book-call:${ip}`);
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

  const parsed = bookCallSchema.safeParse(body);
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
    "book_call"
  );
  if (!recaptcha.ok) {
    return NextResponse.json(
      { error: recaptcha.reason || "Security verification failed." },
      { status: 403 }
    );
  }

  const emailResult = await sendStrategyCallEmails({
    fullName: data.fullName,
    workEmail: data.workEmail,
    company: data.company,
    pipelineGoal: data.pipelineGoal,
  });

  if (!emailResult.ok) {
    return NextResponse.json(
      { error: emailResult.error || "Unable to submit request." },
      { status: 503 }
    );
  }

  const nameParts = data.fullName.split(" ");
  await syncHubSpotLead({
    email: data.workEmail,
    firstName: nameParts[0] || data.fullName,
    lastName: nameParts.slice(1).join(" "),
    company: data.company,
    notes: `Strategy Call Goal: ${data.pipelineGoal}`,
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        "Strategy call request received. Our team will respond within one business day.",
    },
    { status: 200 }
  );
}


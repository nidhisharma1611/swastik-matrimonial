import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { FormKind, schemas } from "@/lib/forms/schemas";

const destinations: Record<FormKind, { url?: string; secret?: string; prefix: string }> = {
  registration: { url: process.env.GOOGLE_SHEETS_REGISTRATION_URL, secret: process.env.GOOGLE_SHEETS_REGISTRATION_SECRET, prefix: "REG" },
  grievance: { url: process.env.GOOGLE_SHEETS_GRIEVANCE_URL, secret: process.env.GOOGLE_SHEETS_GRIEVANCE_SECRET, prefix: "GRV" },
  onboarding: { url: process.env.GOOGLE_SHEETS_ONBOARDING_URL, secret: process.env.GOOGLE_SHEETS_ONBOARDING_SECRET, prefix: "ONB" }
};

const attempts = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: NextRequest, kind: FormKind) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(`${kind}:${forwarded}`).digest("hex");
}

function rateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

function referenceId(prefix: string) {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `${prefix}-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function handleForm(request: NextRequest, kind: FormKind) {
  if (rateLimited(clientKey(request, kind))) {
    return NextResponse.json({ message: "Too many attempts. Please wait and try again." }, { status: 429, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const body = await request.json();
    const parsed = schemas[kind].parse(body);
    if (Date.now() - parsed.startedAt < 2500) return NextResponse.json({ message: "Please review the form and try again." }, { status: 400 });

    const destination = destinations[kind];
    if (!destination.url || !destination.secret) {
      console.error(`Missing Google Sheets configuration for ${kind}`);
      return NextResponse.json({ message: "This form is temporarily unavailable. Please contact us by phone or email." }, { status: 503, headers: { "Cache-Control": "no-store" } });
    }

    const id = referenceId(destination.prefix);
    const submittedAt = new Date().toISOString();
    const response = await fetch(destination.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: destination.secret, kind, referenceId: id, submittedAt, data: parsed }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok) throw new Error(`Destination returned ${response.status}`);
    const result = await response.json().catch(() => ({ ok: true })) as { ok?: boolean };
    if (result.ok === false) throw new Error("Destination rejected submission");

    return NextResponse.json({ message: "Thank you. Your submission has been received.", referenceId: id }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ message: "Please check the highlighted information and try again.", issues: error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })) }, { status: 400, headers: { "Cache-Control": "no-store" } });
    console.error(`Form submission failed: ${kind}`, error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ message: "We could not submit the form safely. Please try again later or contact us directly." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}

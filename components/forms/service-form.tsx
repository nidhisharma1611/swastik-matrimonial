"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Kind = "registration" | "grievance" | "onboarding";
type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  hint?: string;
};
type FormState = {
  status: "idle" | "sending" | "success" | "error";
  message?: string;
  referenceId?: string;
};

export function ServiceForm({
  kind,
  fields,
  consentLabel,
}: {
  kind: Kind;
  fields: Field[];
  consentLabel: string;
}) {
  const startedAt = useRef(0);
  const [state, setState] = useState<FormState>({ status: "idle" });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status !== "success" && state.status !== "error") return;
    const timeout = window.setTimeout(() => setState({ status: "idle" }), 8000);
    return () => window.clearTimeout(timeout);
  }, [state.status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "sending" });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.startedAt = String(startedAt.current);
    try {
      const response = await fetch(`/api/forms/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      const result = (await response.json()) as {
        message?: string;
        referenceId?: string;
      };
      if (!response.ok)
        throw new Error(result.message || "We could not submit the form.");
      form.reset();
      setState({
        status: "success",
        message: result.message,
        referenceId: result.referenceId,
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  const showNotification =
    state.status === "success" || state.status === "error";

  return (
    <>
      <form
        className="rounded-3xl border border-line bg-cream p-5 sm:p-8 lg:p-12"
        onSubmit={submit}
        noValidate
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              className={`flex flex-col gap-2 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}
              key={field.name}
            >
              <label className="text-sm font-extrabold" htmlFor={field.name}>
                {field.label}
                {field.required && <span aria-hidden="true"> *</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  className="w-full resize-y rounded-xl border border-[#bdae9f] bg-white px-3.5 py-3 text-ink"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows={5}
                  aria-describedby={
                    field.hint ? `${field.name}-hint` : undefined
                  }
                />
              ) : field.type === "select" ? (
                <select
                  className="w-full rounded-xl border border-[#bdae9f] bg-white px-3.5 py-3 text-ink"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="w-full rounded-xl border border-[#bdae9f] bg-white px-3.5 py-3 text-ink"
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  required={field.required}
                  aria-describedby={
                    field.hint ? `${field.name}-hint` : undefined
                  }
                />
              )}
              {field.hint && (
                <small className="text-muted" id={`${field.name}-hint`}>
                  {field.hint}
                </small>
              )}
            </div>
          ))}
        </div>
        <div
          className="absolute -left-[10000px] size-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="my-7 mb-3 flex items-start gap-3">
          <input
            className="mt-1 size-5 accent-wine"
            type="checkbox"
            name="consent"
            value="yes"
            required
          />
          <span>{consentLabel}</span>
        </label>
        <p className="text-xs text-muted">
          Do not submit identity documents, photographs, payment details or
          sensitive medical information through this form.
        </p>
        <button
          className="inline-flex min-h-13 cursor-pointer items-center justify-center rounded-full border border-wine bg-wine px-6 py-5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-wine-dark hover:shadow-lg disabled:cursor-wait disabled:opacity-65 disabled:hover:translate-y-0"
          type="submit"
          disabled={state.status === "sending"}
        >
          {state.status === "sending" ? "Submitting…" : "Submit securely"}
        </button>
      </form>
      {showNotification && (
        <div
          className="fixed top-24 right-4 left-4 z-[200] sm:left-auto sm:w-full sm:max-w-md"
          role={state.status === "error" ? "alert" : "status"}
          aria-live={state.status === "error" ? "assertive" : "polite"}
          aria-atomic="true"
        >
          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md sm:p-5 ${state.status === "success" ? "border-green-200 bg-green-50/95 text-green-950" : "border-red-200 bg-red-50/95 text-red-950"}`}
          >
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full text-lg font-black text-white ${state.status === "success" ? "bg-green-700" : "bg-red-700"}`}
              aria-hidden="true"
            >
              {state.status === "success" ? "✓" : "!"}
            </span>
            <div className="min-w-0 flex-1">
              <strong className="block font-extrabold">
                {state.status === "success"
                  ? "Submission received"
                  : "Submission failed"}
              </strong>
              <p className="mt-1 mb-0 text-sm leading-relaxed">
                {state.message}
              </p>
              {state.referenceId && (
                <p className="mt-2 mb-0 text-sm">
                  <span className="font-semibold">Reference:</span>{" "}
                  <code className="rounded bg-green-100 px-1.5 py-0.5 font-mono font-bold break-all">
                    {state.referenceId}
                  </code>
                </p>
              )}
            </div>
            <button
              className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-xl leading-none opacity-65 transition hover:bg-black/5 hover:opacity-100"
              type="button"
              onClick={() => setState({ status: "idle" })}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { describe, expect, it } from "vitest";
import { grievanceSchema, registrationSchema } from "@/lib/forms/schemas";

const base = { fullName: "Test Person", email: "person@example.com", phone: "+91 98765 43210", consent: "yes", website: "", startedAt: Date.now() - 5000 };

describe("form schemas", () => {
  it("accepts a valid registration", () => {
    expect(registrationSchema.safeParse({ ...base, city: "Delhi", registeringFor: "Self", age: 30, preferredContact: "Phone", preferences: "Delhi based match" }).success).toBe(true);
  });

  it("rejects a honeypot value", () => {
    expect(registrationSchema.safeParse({ ...base, website: "spam.example", city: "Delhi", registeringFor: "Self", age: 30, preferredContact: "Phone" }).success).toBe(false);
  });

  it("requires grievance details", () => {
    expect(grievanceSchema.safeParse({ ...base, category: "Privacy concern", details: "x" }).success).toBe(false);
  });
});

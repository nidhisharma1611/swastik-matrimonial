import { z } from "zod";

const phone = z.string().trim().regex(/^[+()\-\s0-9]{8,18}$/, "Enter a valid phone number");
const requiredText = z.string().trim().min(2).max(500);
const base = {
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone,
  consent: z.literal("yes"),
  website: z.string().max(0).optional().default(""),
  startedAt: z.coerce.number().int().positive()
};

export const registrationSchema = z.object({
  ...base,
  city: requiredText,
  registeringFor: z.enum(["Self", "Son", "Daughter", "Sibling", "Relative / friend"]),
  age: z.coerce.number().int().min(18).max(100),
  preferredContact: z.enum(["Phone", "Email", "WhatsApp"]),
  preferences: z.string().trim().max(1000).optional().default("")
});

export const grievanceSchema = z.object({
  ...base,
  category: z.enum(["Service concern", "Privacy concern", "Profile or conduct concern", "Data correction", "Other"]),
  existingReference: z.string().trim().max(50).optional().default(""),
  details: requiredText.max(2000)
});

export const onboardingSchema = z.object({
  ...base,
  registrationReference: z.string().trim().min(4).max(50),
  occupation: requiredText,
  education: requiredText,
  location: requiredText,
  introduction: z.string().trim().min(20).max(1500)
});

export const schemas = { registration: registrationSchema, grievance: grievanceSchema, onboarding: onboardingSchema } as const;
export type FormKind = keyof typeof schemas;

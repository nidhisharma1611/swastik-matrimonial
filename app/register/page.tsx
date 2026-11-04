import type { Metadata } from "next";
import { ServiceForm } from "@/components/forms/service-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Registration",
  "Register your interest in Swastik Matrimonial Services through a secure server-routed form.",
  "/register",
);

export default function RegisterPage() {
  return (
    <section className="pb-20 sm:pb-24 lg:pb-36 pt-10 sm:pt-12 lg:pt-18">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-12 px-4 sm:px-7 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
        <aside>
          <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
            Before you submit
          </p>
          <h2>A few important points</h2>
          <ul className="mt-6 list-none p-0 [&>li]:relative [&>li]:border-b [&>li]:border-line [&>li]:py-4 [&>li]:pr-0 [&>li]:pl-8 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:font-black [&>li]:before:text-wine [&>li]:before:content-['✓']">
            <li>
              The person concerned should know about and consent to the enquiry.
            </li>
            <li>
              Do not include Aadhaar, PAN, financial, medical or
              identity-document details.
            </li>
            <li>Registration does not guarantee a match or introduction.</li>
            <li>Keep the reference ID shown after submission.</li>
          </ul>
        </aside>
        <ServiceForm
          kind="registration"
          consentLabel="I confirm that the information is accurate, the person concerned is aware of this enquiry, and I consent to its use for responding to this registration."
          fields={[
            { name: "fullName", label: "Your full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "city", label: "City", required: true },
            {
              name: "registeringFor",
              label: "Registering for",
              type: "select",
              options: [
                "Self",
                "Son",
                "Daughter",
                "Sibling",
                "Relative / friend",
              ],
              required: true,
            },
            {
              name: "age",
              label: "Age of prospective member",
              type: "text",
              required: true,
            },
            {
              name: "preferredContact",
              label: "Preferred contact",
              type: "select",
              options: ["Phone", "Email", "WhatsApp"],
              required: true,
            },
            {
              name: "preferences",
              label: "Brief preferences (optional)",
              type: "textarea",
              hint: "Avoid sensitive personal data. Maximum 1,000 characters.",
            },
          ]}
        />
      </div>
    </section>
  );
}

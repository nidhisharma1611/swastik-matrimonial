import type { Metadata } from "next";
import { ServiceForm } from "@/components/forms/service-form";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Grievance support",
  "Submit a service, privacy, profile or conduct concern through a dedicated grievance channel.",
  "/grievance",
);

export default function GrievancePage() {
  return (
    <>
      <section className="pb-20 sm:pb-24 lg:pb-36 pt-10 sm:pt-14 lg:pt-18">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-12 px-4 sm:px-7 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <aside>
            <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
              Help us respond
            </p>
            <h2>Be specific, but stay safe</h2>
            <ul className="mt-6 list-none p-0 [&>li]:relative [&>li]:border-b [&>li]:border-line [&>li]:py-4 [&>li]:pr-0 [&>li]:pl-8 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:font-black [&>li]:before:text-wine [&>li]:before:content-['✓']">
              <li>Describe what happened and the outcome you are seeking.</li>
              <li>Include an existing reference if you have one.</li>
              <li>
                Do not submit passwords, financial information or identity
                documents.
              </li>
              <li>
                For urgent personal safety concerns, contact the appropriate
                local authority.
              </li>
            </ul>
          </aside>
          <ServiceForm
            kind="grievance"
            consentLabel="I consent to the use of this information for reviewing and responding to my grievance."
            fields={[
              { name: "fullName", label: "Full name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              {
                name: "category",
                label: "Concern category",
                type: "select",
                options: [
                  "Service concern",
                  "Privacy concern",
                  "Profile or conduct concern",
                  "Data correction",
                  "Other",
                ],
                required: true,
              },
              {
                name: "existingReference",
                label: "Existing reference (optional)",
              },
              {
                name: "details",
                label: "What happened?",
                type: "textarea",
                required: true,
                hint: "Describe the issue and requested resolution. Maximum 2,000 characters.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ServiceForm } from "@/components/forms/service-form";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Member onboarding",
  "Continue matrimonial onboarding after receiving a registration reference from the team.",
  "/onboarding",
);

export default function OnboardingPage() {
  return (
    <>
      <section className="pb-20 sm:pb-24 lg:pb-36 pt-10 sm:pt-14 lg:pt-18">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-12 px-4 sm:px-7 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <aside>
            <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
              Secure storage deferred
            </p>
            <h2>No uploads in this release</h2>
            <p className="mt-5 text-muted">
              The website intentionally does not accept photos or identity
              documents. Secure storage, access logs, retention controls and
              deletion workflows must be implemented and audited before uploads
              are enabled.
            </p>
          </aside>
          <ServiceForm
            kind="onboarding"
            consentLabel="I confirm that the prospective member is aware of this onboarding and consent to this information being used to continue the requested service."
            fields={[
              {
                name: "fullName",
                label: "Prospective member's full name",
                required: true,
              },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              {
                name: "registrationReference",
                label: "Registration reference",
                required: true,
              },
              { name: "occupation", label: "Occupation", required: true },
              { name: "education", label: "Education", required: true },
              { name: "location", label: "Current city", required: true },
              {
                name: "introduction",
                label: "Short personal introduction",
                type: "textarea",
                required: true,
                hint: "20–1,500 characters. Do not add sensitive identifiers.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}

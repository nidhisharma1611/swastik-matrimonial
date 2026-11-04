import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Call, email or find Swastik Matrimonial Services in Sector 22, Rohini, Delhi.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <section className="bg-linear-to-br from-cream to-paper pt-6 pb-8 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-7">
        <div className="max-w-[780px]">
          <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
            Contact
          </p>
          <h1 className="mb-7 text-wine">
            Start with a simple conversation.
          </h1>
          <p className="max-w-[690px] text-[clamp(1.12rem,2vw,1.35rem)] text-muted">
            Call or email for registration, service information or help choosing the right form. Please confirm office availability before visiting.
          </p>
        </div>
      </div>
    </section>
      <section className="pb-8 sm:pb-12 lg:pb-14">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-5 px-4 sm:px-7 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr]">
          {[
            [
              "Call",
              <>
                <a key="p1" href={`tel:${siteConfig.phones[0]}`}>
                  9599100440
                </a>
                <small
                  key="p2"
                  className="mt-3 block font-sans text-base text-muted"
                >
                  <a href={`tel:${siteConfig.phones[1]}`}>9718100440</a>
                </small>
              </>,
            ],
            [
              "Email",
              <>
                <a key="e1" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <small
                  key="e2"
                  className="mt-3 block font-sans text-base text-muted"
                >
                  For general, non-sensitive enquiries.
                </small>
              </>,
            ],
            [
              "Visit",
              <a key="v1" href={`https://maps.app.goo.gl/xmQo5Qf8dZA3p6Jr5`} target="_blank" rel="noopener noreferrer">
                Rohini, Delhi
                <small
                  key="v1"
                  className="mt-3 block font-sans text-base text-muted"
                >
                  <address>{siteConfig.address}</address>
                </small>
              </a>,
            ],
          ].map(([label, content]) => (
            <article
              className="rounded-3xl border border-line p-8"
              key={String(label)}
            >
              <span className="text-xs font-black tracking-[0.14em] text-wine uppercase">
                {label}
              </span>
              <h2 className="mt-6 text-[clamp(1.4rem,2.5vw,2.2rem)] [overflow-wrap:anywhere]">
                {content}
              </h2>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-cream py-20 sm:py-24 lg:py-36">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-9 px-4 sm:px-7 md:grid-cols-2 lg:gap-28">
          <div>
            <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
              Choose the right route
            </p>
            <h2>Forms with a clear purpose</h2>
          </div>
          <div className="grid gap-px bg-line">
            {[
              [
                "New registration",
                "Begin a matrimonial service enquiry →",
                "/register",
              ],
              [
                "Existing member onboarding",
                "Continue after receiving a reference →",
                "/onboarding",
              ],
              [
                "Grievance or privacy concern",
                "Use the dedicated, trackable channel →",
                "/grievance",
              ],
            ].map(([title, text, href]) => (
              <Link
                className="flex flex-col justify-between gap-2 bg-paper p-6 no-underline sm:flex-row sm:gap-5"
                href={href}
                key={href}
              >
                <strong>{title}</strong>
                <span className="text-wine">{text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

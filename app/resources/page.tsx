import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Matrimonial resources", "Practical, privacy-conscious guidance for beginning a matrimonial search and evaluating introductions.", "/resources");

const resources = [
  ["Before you register", "Agree as a family on who will communicate, what information may be shared and which preferences are essential versus flexible."],
  ["Protect personal information", "Start with broad details. Share addresses, IDs, financial records and private contact information only when necessary and through an agreed secure process."],
  ["Evaluate at your own pace", "A suggested introduction is not an obligation. Verify important claims independently and allow both people space to decide."],
  ["Watch for pressure", "Urgency around money, secrecy, documents or immediate commitments is a reason to pause and seek advice."],
  ["Record consent", "Before publishing a story or sharing a profile beyond the intended recipient, confirm the person has agreed."],
  ["Use the grievance channel", "If something feels wrong, preserve relevant non-sensitive records and use the dedicated grievance form with a clear description."]
] as const;

export default function ResourcesPage() { return <><PageHero eyebrow="Practical guidance" title="A safer, more considered matrimonial search." description="These general resources help families begin thoughtfully. They are not legal advice, background verification or a guarantee against misuse." />
  <section className="py-20 sm:py-24 lg:py-36"><div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-5 px-4 sm:px-7 md:grid-cols-2">{resources.map(([title, text], index) => <article className="rounded-3xl border border-line p-8 sm:p-10" key={title}><span className="font-black tracking-[0.15em] text-gold">0{index + 1}</span><h2 className="my-7 text-3xl">{title}</h2><p className="mb-0 text-muted">{text}</p></article>)}</div></section>
  <section className="bg-cream py-20 text-center sm:py-24 lg:py-36"><div className="mx-auto w-full max-w-[780px] px-4 sm:px-7"><p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">Need service-specific help?</p><h2>Speak with the team before sharing more.</h2><p className="mt-5">Use general contact details for questions and the dedicated grievance route for privacy or conduct concerns.</p><div className="mt-7 flex flex-wrap items-center justify-center gap-6"><Link href="/contact" className="inline-flex min-h-13 items-center justify-center rounded-full border border-wine bg-wine px-6 py-3.5 font-bold text-white no-underline transition hover:-translate-y-0.5 hover:bg-wine-dark hover:shadow-lg">Contact us</Link><Link href="/grievance" className="inline-flex gap-2 border-b border-wine/30 pb-1 font-extrabold text-wine no-underline hover:border-wine">Grievance support →</Link></div></div></section></> }

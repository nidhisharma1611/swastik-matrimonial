import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { SectionCta } from "@/components/section-cta";
import { Testimonials } from "@/components/testimonials";
import { serviceItems, siteConfig } from "@/lib/site";

const milestones = [
  ["5000+", "Successful Matches"],
  ["1500+", "Happy Families"],
  ["98%", "Success Rate"],
  ["10+", "Years of Trust"],
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_80%_20%,#f0dfbd_0,transparent_26%),linear-gradient(135deg,#fffdf9_0,#f8eee5_100%)] py-12 sm:py-8 lg:py-12">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-14 px-4 sm:px-7 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <Reveal className="max-w-3xl">
            <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
              Welcome to
            </p>
            <h1 className="mb-7 text-[clamp(3.25rem,5.7vw,5.6rem)] text-wine">
              Finding <em>Perfect Matches,</em> Building Happy Families.
            </h1>
            <p className="mb-8 max-w-[690px] text-[clamp(1.12rem,2vw,1.35rem)] text-muted">
              Swastik Matrimonial Services helps families and individuals find
              trusted, verified, and compatible life partners through
              personalized matchmaking.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/register"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-wine bg-wine px-6 py-3.5 font-bold text-white no-underline transition hover:-translate-y-0.5 hover:bg-wine-dark hover:shadow-lg"
              >
                Request a Callback
              </Link>
              <Link
                href="/#process"
                className="inline-flex gap-2 border-b border-wine/30 pb-1 font-extrabold text-wine no-underline hover:border-wine"
              >
                How it works <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs font-extrabold tracking-[0.08em] text-muted uppercase">
              <span>Established {siteConfig.founded}</span>
              <span>Rohini, Delhi</span>
            </div>
          </Reveal>
          <Reveal className="relative mx-auto max-w-[560px]" delay={120}>
            <div className="overflow-hidden rounded-t-[240px] rounded-b-[28px] bg-[#eadac8] shadow-soft">
              <Image
                src="/media/hero-1080.webp"
                alt="Wedding couple in traditional attire"
                width={1080}
                height={1183}
                priority
                fetchPriority="high"
                sizes="(max-width: 800px) 92vw, 47vw"
                className="aspect-[.91] h-auto w-full object-cover object-[50%_28%]"
              />
            </div>
            <div className="relative mx-4 -mt-3 rounded-2xl border border-white bg-paper/95 p-5 shadow-soft backdrop-blur-sm sm:absolute sm:bottom-8 sm:-left-8 sm:m-0 sm:w-[210px]">
              <span className="font-serif text-xl font-semibold text-wine">
                स्वस्तिक
              </span>
              <p className="mt-2 mb-0 text-sm text-muted">
                Respectful guidance for a meaningful decision.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-36">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-9 px-4 sm:px-7 md:grid-cols-2 lg:gap-28">
          <Reveal>
            <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
              A measured approach
            </p>
            <h2>
              Matchmaking is personal.
              <br />
              The process should feel that way.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[clamp(1.1rem,1.7vw,1.3rem)] text-muted">
              A biodata can describe the basics. A thoughtful conversation reveals
              priorities, temperament, family context and what a compatible future
              might look like. Our service is designed around that conversation.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Service milestones" className="bg-wine text-white">
        <dl className="mx-auto grid w-full max-w-[1180px] grid-cols-2 px-4 py-12 sm:px-7 sm:py-16 lg:grid-cols-4 lg:py-18">
          {milestones.map(([value, label], index) => (
            <Reveal
              className={`px-4 py-5 text-center sm:px-8 ${
                index % 2 === 0 ? "border-r border-white/20" : ""
              } ${index < 2 ? "border-b border-white/20 lg:border-b-0" : ""} ${
                index === 1 ? "lg:border-r" : ""
              } ${index === 2 ? "lg:border-r lg:border-white/20" : ""}`}
              delay={index * 80}
              key={label}
            >
              <dd className="mb-2 font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-semibold text-white">
                {value}
              </dd>
              <dt className="text-xs font-bold tracking-wide text-white/90 sm:text-sm">
                {label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </section>

      <section
        className="scroll-mt-10 bg-cream py-20 sm:py-24 lg:py-36"
        id="process"
      >
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-7">
          <Reveal className="mb-12 max-w-3xl md:mb-16">
            <div>
              <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
                A smooth and transparent journey to finding your life partner.
              </p>
              <h2>Our Simple Process</h2>
            </div>
          </Reveal>
          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div
              aria-hidden="true"
              className="absolute top-8 right-[8%] left-[8%] hidden h-px bg-gold/35 lg:block"
            />
            {serviceItems.map((item, index) => (
              <Reveal
                className="relative h-full"
                delay={index * 90}
                key={item.title}
              >
                <article className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-paper p-7 shadow-[0_16px_45px_rgb(64_27_32_/_6%)] transition duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-soft">
                  <span className="relative z-10 mb-8 grid size-16 place-items-center rounded-full border-[6px] border-cream bg-wine font-serif text-xl font-semibold text-white shadow-sm transition duration-300 group-hover:bg-gold group-hover:text-wine-dark">
                    {item.icon}
                  </span>
                  <h3 className="mb-3 text-[1.45rem]">{item.title}</h3>
                  <p className="mb-0 text-muted">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-cream py-20 sm:py-24 lg:py-36">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-9 px-4 sm:px-7 md:grid-cols-2 lg:gap-28">
          <div>
            <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
              Questions, answered plainly
            </p>
            <h2>Before you register</h2>
            <p>
              No account is required. The initial form asks only for information
              needed to understand your enquiry.
            </p>
          </div>
          <Faq
            items={[
              {
                question: "Does registering guarantee a match?",
                answer:
                  "No. Registration begins a conversation; it cannot guarantee compatibility, an introduction or a marriage outcome.",
              },
              {
                question: "Should I upload photographs or documents?",
                answer:
                  "Not through this website. Secure file storage has intentionally been deferred. The team will explain any later verification process directly.",
              },
              {
                question: "How is my information used?",
                answer:
                  "Information submitted through a service form is intended only for handling that request. Review the Privacy page for details and contact the grievance channel with concerns.",
              },
              {
                question: "Can a parent register for their child?",
                answer:
                  "Yes, the registration form allows family-led enquiries. Please ensure the person concerned is aware and has consented to the process.",
              },
            ]}
          />
        </div>
      </section>
      <SectionCta />
    </>
  );
}

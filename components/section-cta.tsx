import Link from "next/link";

export function SectionCta({
  title = "Ready for a considered first conversation?",
  text = "Tell us what you are looking for. A member of the team can contact you to explain the next steps.",
}) {
  return (
    <section className="py-20 sm:py-24 lg:py-36">
      <div className="mx-auto flex w-[calc(100%-2rem)] max-w-[1180px] flex-col items-start justify-between gap-12 rounded-3xl bg-wine p-9 text-white sm:w-[calc(100%-3.5rem)] sm:p-14 lg:flex-row lg:items-end lg:gap-16 lg:p-20">
        <div>
          <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-[#f3cc79] uppercase">
            Begin thoughtfully
          </p>
          <h2 className="mb-5 max-w-[720px]">{title}</h2>
          <p className="max-w-[620px] text-[#e5cdd1]">{text}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            href="/register"
            className="inline-flex min-h-13 items-center justify-center rounded-full border border-gold bg-gold px-6 py-3.5 font-bold text-wine-dark no-underline transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Request a Callback
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-13 items-center justify-center rounded-full border border-white bg-transparent px-6 py-3.5 font-bold text-white no-underline transition hover:-translate-y-0.5 hover:bg-white hover:text-wine"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

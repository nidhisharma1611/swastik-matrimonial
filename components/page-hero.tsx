import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  action?: { href: string; label: string };
};

export function PageHero({ eyebrow, title, description, action }: Props) {
  return (
    <section className="bg-linear-to-br from-cream to-paper pt-10 pb-14 sm:pt-14 sm:pb-28 lg:pt-20 lg:pb-36">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-7">
        <div className="max-w-[780px]">
          <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-wine uppercase">
            {eyebrow}
          </p>
          <h1 className="mb-7 text-[clamp(3.3rem,8vw,7rem)] text-wine">
            {title}
          </h1>
          <p className="max-w-[690px] text-[clamp(1.12rem,2vw,1.35rem)] text-muted">
            {description}
          </p>
          {action && (
            <Link
              className="mt-5 inline-flex min-h-13 items-center justify-center rounded-full border border-wine bg-wine px-6 py-3.5 font-bold text-white no-underline transition hover:-translate-y-0.5 hover:bg-wine-dark hover:shadow-lg"
              href={action.href}
            >
              {action.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site";

const legal = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Grievance", "/grievance"],
] as const;

export function Footer() {
  return (
    <footer className="bg-[#251316] py-20 pb-6 text-white lg:pt-24">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 px-4 sm:px-7 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_.7fr_.8fr] lg:gap-14">
        <div>
          <p className="mb-4 text-xs font-extrabold tracking-[0.18em] text-[#f3cc79] uppercase">
            Since {siteConfig.founded}
          </p>
          <h2 className="text-[clamp(2.1rem,4vw,4rem)]">
            Thoughtful introductions.
            <br />
            Respectful support.
          </h2>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-xs font-extrabold tracking-[0.15em] text-[#f3cc79] uppercase">
            Visit
          </h3>
          <address className="my-2 block text-[#dac9cc]">
            {siteConfig.address}
          </address>
          <a
            className="my-2 block text-[#dac9cc] no-underline hover:text-white"
            href={`tel:${siteConfig.phones[0]}`}
          >
            {siteConfig.phoneDisplay}
          </a>
          <a
            className="my-2 block text-[#dac9cc] no-underline hover:text-white"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-xs font-extrabold tracking-[0.15em] text-[#f3cc79] uppercase">
            Explore
          </h3>
          <Link
            className="my-2 block text-[#dac9cc] no-underline hover:text-white"
            href="/#process"
          >
            Services
          </Link>
          <Link
            className="my-2 block text-[#dac9cc] no-underline hover:text-white"
            href="/resources"
          >
            Resources
          </Link>
          <Link
            className="my-2 block text-[#dac9cc] no-underline hover:text-white"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="my-2 block text-[#dac9cc] no-underline hover:text-white"
            href="/onboarding"
          >
            Member onboarding
          </Link>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-xs font-extrabold tracking-[0.15em] text-[#f3cc79] uppercase">
            Legal & support
          </h3>
          {legal.map(([label, href]) => (
            <Link
              className="my-2 block text-[#dac9cc] no-underline hover:text-white"
              key={href}
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-16 flex w-full max-w-[1180px] flex-col justify-between gap-3 border-t border-white/15 px-4 pt-5 text-xs text-[#ad999c] sm:px-7 md:flex-row">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span>No login required. Your privacy matters.</span>
      </div>
    </footer>
  );
}

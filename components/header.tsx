"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNavigation } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-wine/10 bg-paper/95 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-[1180px] items-center justify-between gap-7 px-4 sm:h-20 sm:px-7">
        <Link
          href="/"
          className="flex items-center gap-3 leading-none text-wine no-underline"
          aria-label="Swastik Matrimonial home"
        >
          <Image
            className="size-14 shrink-0 object-contain sm:size-16"
            src="/media/swastik-logo.png"
            alt=""
            width={64}
            height={64}
            priority
          />
          <span>
            <strong className="block font-serif text-xl font-semibold sm:text-2xl">
              Swastik
            </strong>
            <small className="mt-1 block text-[0.52rem] font-extrabold tracking-[0.17em] text-muted uppercase sm:text-[0.59rem]">
              Matrimonial Services
            </small>
          </span>
        </Link>
        <button
          className="cursor-pointer border-0 bg-transparent text-3xl text-wine lg:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav
          id="primary-navigation"
          className={`${open ? "flex" : "hidden"} absolute top-[72px] right-4 left-4 flex-col items-stretch gap-5 rounded-2xl border border-line bg-paper p-5 shadow-soft lg:static lg:flex lg:flex-row lg:items-center lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
          aria-label="Primary navigation"
        >
          {mainNavigation.map((item) => (
            <Link
              className={`text-sm font-bold no-underline transition-colors hover:text-wine ${pathname === item.href ? "text-wine" : "text-ink"}`}
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-wine bg-wine px-5 py-2 text-sm font-bold text-white no-underline transition hover:-translate-y-0.5 hover:bg-wine-dark hover:shadow-lg"
            onClick={() => setOpen(false)}
          >
            Request a Callback
          </Link>
        </nav>
      </div>
    </header>
  );
}

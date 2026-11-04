import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${siteConfig.shortName}`,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: absoluteUrl("/media/hero-1080.webp"), width: 1080, height: 1183, alt: "A wedding couple representing matrimonial services" }]
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/media/hero-1080.webp")] }
  };
}

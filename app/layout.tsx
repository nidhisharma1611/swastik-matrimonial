import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Delhi`, template: `%s | ${siteConfig.shortName}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: absoluteUrl("/") },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { title: siteConfig.name, description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, locale: "en_IN", type: "website" },
  icons: { icon: "/media/swastik-logo.png", apple: "/media/swastik-logo.png" }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#701e2d", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org", "@type": "ProfessionalService", name: siteConfig.name, url: siteConfig.url,
    telephone: siteConfig.phones[0], email: siteConfig.email, foundingDate: siteConfig.founded, logo: absoluteUrl("/media/swastik-logo.png"),
    address: { "@type": "PostalAddress", streetAddress: "128, Pocket-6, Sector-22", addressLocality: "Rohini", addressRegion: "Delhi", postalCode: "110086", addressCountry: "IN" },
    areaServed: { "@type": "City", name: "Delhi" }
  };
  return <html lang="en-IN"><body><a className="fixed -top-20 left-4 z-[1000] rounded-lg border-2 border-wine bg-white px-4 py-3 text-wine focus:top-4" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replaceAll("<", "\\u003c") }} /></body></html>;
}

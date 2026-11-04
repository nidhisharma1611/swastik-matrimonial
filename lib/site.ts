export const siteConfig = {
  name: "Swastik Matrimonial Services",
  shortName: "Swastik Matrimonial",
  description: "Personalised matrimonial assistance for individuals and families in Delhi, with a privacy-conscious and human-led approach.",
  phoneDisplay: "9599100440, 9718100440",
  phones: ["+919599100440", "+919718100440"],
  email: "info@swastikmatrimonial.com",
  address: "128, Pocket-6, Sector-22, Rohini, Delhi – 110086",
  founded: "2009",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.swastikmatrimonial.com"
} as const;

export const mainNavigation = [
  { href: "/", label: "Home" },
  { href: "/#process", label: "Services" },
  { href: "/#testimonials", label: "Stories" },
  { href: "/contact", label: "Contact" }
] as const;

export const serviceItems = [
  { title: "Register", text: "Create your profile or request a callback.", icon: "01" },
  { title: "Verification", text: "We verify every profile for authenticity.", icon: "02" },
  { title: "Matching", text: "Receive personalized match suggestions.", icon: "03" },
  { title: "Family Interaction", text: "Families connect and get to know each other.", icon: "04" },
  { title: "Celebrate", text: "Begin your beautiful journey together.", icon: "05" },
] as const;

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}

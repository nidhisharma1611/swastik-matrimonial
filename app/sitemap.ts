import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const paths = ["", "/about", "/contact", "/register", "/grievance", "/onboarding", "/resources", "/privacy", "/terms", "/data-deletion"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: absoluteUrl(path || "/"), lastModified: new Date("2026-10-21"), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 }));
}

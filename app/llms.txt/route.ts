import { siteConfig } from "@/lib/site";

export function GET() {
  const body = `# ${siteConfig.name}\n\n> Personalised matrimonial assistance based in Rohini, Delhi.\n\n## Important pages and sections\n- /about: Business and approach\n- /#process: Service overview and process\n- /#testimonials: Member testimonials\n- /register: Initial registration form\n- /grievance: Dedicated support route\n- /privacy: Privacy notice\n- /terms: Terms of use\n\n## Factual notes\n- Published address: ${siteConfig.address}\n- Published phones: ${siteConfig.phoneDisplay}\n- No login is required.\n- No photo or document uploads are accepted in this release.\n- The service does not guarantee matches or marriage outcomes.\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
}

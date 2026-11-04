# Swastik Matrimonial Services

A production-oriented Next.js App Router website for Swastik Matrimonial Services. It provides public information, Delhi-local pages and three server-routed enquiry flows without user accounts.

## Stack

- Next.js App Router, React, TypeScript and Tailwind CSS v4
- Tailwind design tokens and responsive utilities across every page and component
- Server-rendered content with small client islands only where interaction is necessary
- Zod validation for registration, onboarding and grievance submissions
- Google Apps Script webhooks writing to three separate Google Sheets
- Vitest schema tests and ESLint/Core Web Vitals rules

## Local setup

Requirements: Node.js 20.9 or newer.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The informational pages work without environment values. Form submissions return a safe “temporarily unavailable” response until their URL and secret are configured.

## Environment and form setup

Copy `.env.example` to `.env.local`. Keep every Google Sheets URL and secret server-only. Follow `integrations/google-apps-script/README.md` to create three isolated destinations.

Every accepted submission gets an ID such as `REG-20261021-A1B2C3` and an ISO timestamp. Requests use Zod validation, a honeypot, a minimum completion time and a best-effort per-instance rate limit. Production infrastructure should add an edge/WAF rate limit because memory-based limits are not globally consistent across serverless instances.

Form POST routes use `cache: "no-store"` and return `Cache-Control: no-store`. Personal data, grievances, onboarding records and credentials must never be cached. The current application does not read public data from Sheets. If a future feature does, use a separate read-only endpoint containing only approved public fields and Next.js `revalidate` caching; do not reuse the write destinations.

## Images and performance

`npm run optimize:images` generates responsive WebP and AVIF hero variants from the source image. The page uses a compressed WebP input with Next Image format negotiation. The hero is the LCP candidate and uses `priority`/`fetchPriority="high"`; future below-the-fold images should use the default lazy-loading behavior.

App Router automatically splits code by route. Interactive navigation and form code are isolated client components; the rest stays server-rendered. There is currently no genuinely large optional UI/library that benefits from a dynamic import. Use `next/dynamic` only when adding a substantial below-the-fold component (for example, a map or media gallery).

Next production builds minify JavaScript and CSS. Immutable fingerprinted `/_next/static` assets are cached by Next, and `/media/*` has a one-year immutable cache header. HTML and form/API responses are intentionally not given immutable caching.

## Verification

```bash
npm run lint
npm test
npm run build
```

Run `npm run analyze` to repeat the production build and review the per-route first-load sizes printed in its route table. For deeper browser performance work, run the production server and test mobile/desktop in Lighthouse; verify LCP, CLS, INP, image transfer size, keyboard navigation and reduced-motion mode.

## SEO and discovery

The app provides per-page metadata, canonicals, Open Graph data, `sitemap.xml`, `robots.txt`, `llms.txt`, semantic headings, internal links and factual `ProfessionalService` structured data. Set `NEXT_PUBLIC_SITE_URL` to the real canonical HTTPS origin before building for production. SEO readiness does not guarantee rankings.

## Security and privacy checklist before launch

- Obtain business/legal approval for the draft Privacy Notice and Terms.
- Confirm the exact business name, founded year, address, phone numbers and service descriptions.
- Define access roles, retention periods, deletion procedures and incident response for all Sheets.
- Enable MFA for accounts with access to Sheets and Apps Script.
- Add production edge/WAF rate limiting and abuse monitoring.
- Confirm grievance ownership and response procedures.
- Do not enable document/photo uploads until encrypted storage, access controls, audit logs, malware scanning, retention and verified deletion are designed and tested.

## Deployment

No deployment is performed by this repository change. Run the built application with `npm start`. Put a CDN/reverse proxy in front of the runtime, preserve the security headers, cache only fingerprinted static assets/public media, and never cache form POSTs or sensitive responses.

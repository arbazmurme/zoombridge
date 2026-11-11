# ZoomBridge Research (ZBR) — Enterprise B2B Website

Production-ready Next.js App Router website for **ZoomBridge Research** (`wearezbr.com`), combining research-led B2B demand generation storytelling, interactive 3D visuals, a 15-technique parallax motion system, GDPR-gated analytics, and Resend/HubSpot-backed lead capture APIs.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + CSS Design Tokens (`src/app/globals.css`)
- **Motion & Smooth Scrolling:** GSAP + ScrollTrigger synchronized with Lenis; Framer Motion (`AnimatePresence`, magnetic & accordion interactions); `lottie-web` signal pulse
- **3D Graphics:** Three.js + React Three Fiber + Drei (`next/dynamic` lazy-loaded with WebGL & reduced-motion fallbacks)
- **Forms & Validation:** React Hook Form + Zod + Google reCAPTCHA v3 (optional) + Honeypot + Rate Limiting (`5 req / 10 min / IP`)
- **Email & CRM:** Resend (`RESEND_API_KEY`) + HubSpot CRM Contacts API (`HUBSPOT_TOKEN`, optional)
- **Icons:** Lucide React

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and supply your server and client keys:

```bash
cp .env.example .env.local
```

Key environment variables:
- `NEXT_PUBLIC_SITE_URL` — Canonical site URL (defaults to `https://wearezbr.com`)
- `RESEND_API_KEY` — Required for sending strategy call & contact emails to `sales@wearezbr.com` and acknowledgement emails
- `RESEND_FROM_EMAIL` — Verified sender address in Resend
- `SALES_NOTIFICATION_EMAIL` — Destination inbox (defaults to `sales@wearezbr.com`)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` & `RECAPTCHA_SECRET` — Optional Google reCAPTCHA v3 protection
- `HUBSPOT_TOKEN` — Optional HubSpot Private App token to sync leads
- `NEXT_PUBLIC_GA_ID` & `NEXT_PUBLIC_GTM_ID` — Optional analytics IDs (strictly gated until user grants cookie consent)

### 3. Development, Typecheck, Lint & Production Build

```bash
pnpm dev           # Start local development server
pnpm exec tsc --noEmit  # Run TypeScript check
pnpm lint          # Run ESLint
pnpm build         # Build production bundle
pnpm start         # Serve production build
```

## Implemented Routes

- `/` — Home Page (Hero + 3D Network, Trusted By marquee, Who We Are, Why ZoomBridge 4-stage sticky, Mission & Vision split-screen, 6 Services, ZoomBridge Advantage comparison, Global Reach + 3D Globe, Data & Compliance, FAQ, Book Strategy Call, Contact Us)
- `/about`, `/why-zbr`, `/contact`, `/book-a-call`
- `/services` + `/services/email-marketing`, `/services/account-based-marketing`, `/services/content-syndication`, `/services/contact-discovery`, `/services/lead-generation`, `/services/data-enrichment`
- `/abm-scoring` — Interactive ABM Scoring Engine simulator (explicitly labeled illustrative sample data)
- `/blog`, `/blog/[slug]`, `/resources`, `/case-studies` — CMS-ready editorial structure & verified empty states
- `/privacy-policy`, `/terms`, `/gdpr`, `/ccpa`
- `/404`, `/500`, `/sitemap.xml`, `/robots.txt`
- `POST /api/book-call` & `POST /api/contact`

## Deployment

Deploy on Vercel or any Node.js 20.9+ host supporting Next.js App Router:

```bash
pnpm build && pnpm start
```

Configure all secrets (`RESEND_API_KEY`, `RECAPTCHA_SECRET`, `HUBSPOT_TOKEN`) as server-side environment variables in your hosting provider.

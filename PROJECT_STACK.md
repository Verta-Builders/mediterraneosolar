# Project Stack & Guidelines

> This document contains configuration strategies and workflow rules that every AI agent (and human contributor) **must** follow when working on a project built with this stack. Treat this as the single source of truth for how a new project is set up and maintained.

---

## Table of Contents

1. [Core Framework](#1-core-framework)
2. [Styling, Theming & Design Tokens](#2-styling-theming--design-tokens)
3. [UI Components — shadcn/ui + Radix UI](#3-ui-components--shadcnui--radix-ui)
4. [Animations & Interactions](#4-animations--interactions)
5. [Icons](#5-icons)
6. [Internationalization & Localization (i18n / l10n)](#6-internationalization--localization-i18n--l10n)
7. [SEO & GEO (Generative Engine Optimization)](#7-seo--geo-generative-engine-optimization)
8. [Date & Time](#8-date--time)
9. [Backend & Integrations](#9-backend--integrations)
10. [Fonts & Typography](#10-fonts--typography)
11. [Architecture & Directory Structure](#11-architecture--directory-structure)
12. [State Management](#12-state-management)
13. [Analytics & Monitoring](#13-analytics--monitoring)
14. [Security](#14-security)
15. [Key Constraints](#15-key-constraints)
16. [AI Agent — First-Loop Discovery Protocol](#16-ai-agent--first-loop-discovery-protocol)

---

## 1. Core Framework

| Tool | Version / Notes |
|---|---|
| **Next.js** | 16+ — Always use the **App Router** (`app/` directory). |
| **TypeScript** | Strict mode enabled. Every file must be `.ts` or `.tsx`. |
| **React** | 19+ — Use Server Components by default; add `"use client"` only when truly needed. |
| **shadcn/ui** | Latest — **First choice** for UI components. Always install via CLI before building custom. |
| **Radix UI** | Headless primitives (underneath shadcn) **+** theming system (`@radix-ui/themes`). |
| **ESLint** | 9+ (flat config) — `next/core-web-vitals`, `next/typescript`. Sensible defaults, not overly strict. |
| **Prettier** | Runs on save / pre-commit. Single source of formatting truth — no style debates. |

### Why Next.js?

- **SSR / SSG / ISR** out of the box — critical for SEO & GEO.
- **Built-in routing** with layouts, loading states, and error boundaries.
- **Image / Font / Script optimization** via `next/image`, `next/font`, `next/script`.
- **Server Actions** for secure, zero-API-route mutations.
- **Middleware** for locale detection, redirects, and auth guards.

### Linting & Formatting

#### ESLint

Next.js 16 ships with ESLint 9 flat config out of the box (`eslint.config.mjs`). The default extends:

- `next/core-web-vitals` — catches common React & Next.js mistakes.
- `next/typescript` — TypeScript-aware rules (leverages `@typescript-eslint`).

**Philosophy**: Keep linting **helpful, not hostile**. The goal is to catch real bugs and enforce consistency — not to nitpick every line. If a rule causes more friction than value, disable it with a comment explaining why.

**Extending the config** — add plugins as needed (e.g., `eslint-plugin-tailwindcss` for class ordering). Install via npm, then add to the flat config array.

#### Prettier

- Format on save (editor integration) **and** via a pre-commit hook (e.g., `lint-staged` + `husky`).
- Prettier config lives in `.prettierrc` or `prettier.config.mjs` at the project root.
- Recommended settings:

  ```json
  {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "tabWidth": 2,
    "printWidth": 100,
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```

- The `prettier-plugin-tailwindcss` plugin **auto-sorts Tailwind classes** — providing the class-ordering auto-completions you'd expect.

> **Rule**: ESLint handles code quality; Prettier handles code formatting. Never let the two conflict — use `eslint-config-prettier` if adding ESLint stylistic rules.

---

## 2. Styling, Theming & Design Tokens

### Core Principle — _"Change once, apply everywhere"_

All visual properties (colors, spacing, radii, fonts, shadows, etc.) are defined as **design tokens** in dedicated config files. No component should ever hardcode a raw value.

### Priority Order

| Priority | Layer | Responsibility |
|---|---|---|
| **1st** | **Radix UI Themes** (`@radix-ui/themes`) | Global theming — colors, color scales, dark/light mode, radius, scaling, typography base. This is the **single source of truth** for the design system's look and feel. |
| **2nd** | **Tailwind CSS v4** | Utility classes for layout, spacing, responsive breakpoints, and any **custom styling** not covered by the Radix theme. |
| **3rd** | **CSS custom properties** (`tokens/`) | Low-level overrides and project-specific tokens that feed into both Radix and Tailwind. |

> **Rule**: Reach for Radix UI's theming system first. Only drop down to Tailwind utilities when you need something Radix doesn't provide (custom layout, one-off spacing, responsive overrides, etc.).

### File Hierarchy

```
├── tailwind.config.ts          # Tailwind theme extensions, plugins, content paths
├── src/
│   ├── styles/
│   │   ├── globals.css         # Tailwind directives, Radix theme import, CSS custom properties
│   │   ├── tokens/
│   │   │   ├── colors.css      # --color-primary, --color-secondary, etc.
│   │   │   ├── typography.css  # --font-body, --font-heading, --font-size-*, --line-height-*
│   │   │   ├── spacing.css     # --spacing-*, --radius-*
│   │   │   └── shadows.css     # --shadow-sm, --shadow-md, etc.
│   │   └── animations.css      # Keyframe definitions & animation tokens
```

### 2.1 Radix UI Theming (Primary)

Radix UI serves a **dual role** in this stack:

1. **Headless primitives** — the accessible, unstyled components underneath shadcn/ui.
2. **Theming system** (`@radix-ui/themes`) — provides a cohesive design system with built-in color scales, dark mode, and consistent spacing/radius.

#### Setup

- Wrap the app in `<Theme>` from `@radix-ui/themes` in the root layout.
- Configure the accent color, gray scale, radius, and scaling via `<Theme>` props:

  ```tsx
  import { Theme } from '@radix-ui/themes';
  import '@radix-ui/themes/styles.css';

  <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">
    {children}
  </Theme>
  ```

- To change the brand color palette across the entire project, change the `accentColor` prop — everything inherits automatically.

#### What Radix Handles

- **Color scales** — full light/dark palettes with proper contrast ratios built in.
- **Dark / light mode** — toggle via `appearance` prop on `<Theme>`, or use `next-themes` for system preference detection.
- **Radius & scaling** — consistent border radius and sizing scale across all components.
- **Typography base** — font size scale, line heights, letter spacing.

> **Rule**: Never manually define color palettes that duplicate what Radix Themes already provides. Use Radix's color tokens (`var(--accent-9)`, `var(--gray-3)`, etc.) for all themed values.

### 2.2 Tailwind CSS v4 (Secondary)

- **CSS-first configuration**: Import Tailwind via `@import "tailwindcss";` inside `globals.css`.
- **Plugin**: `@tailwindcss/postcss`.
- Tailwind is used **alongside** Radix Themes for:
  - **Layout & spacing**: `flex`, `grid`, `gap-*`, `p-*`, `m-*`, responsive breakpoints.
  - **Custom one-off styles**: Anything project-specific that falls outside the Radix theme scope.
  - **Animations**: `tw-animate-css` utilities, transition classes.
- Custom theme values in `tailwind.config.ts` should reference CSS custom properties from the `tokens/` folder when needed.

### 2.3 CSS Custom Properties (Tokens)

For project-specific values that need to feed into **both** Radix and Tailwind, use the `tokens/` folder:

```css
/* src/styles/tokens/colors.css */
:root {
  --color-primary: 222 47% 31%;       /* HSL values (no hsl() wrapper) */
  --color-primary-foreground: 0 0% 100%;
  --color-secondary: 39 70% 56%;
  --color-background: 0 0% 100%;
  --color-foreground: 222 47% 11%;
  --color-muted: 210 20% 96%;
  --color-muted-foreground: 215 16% 47%;
  --color-accent: 210 20% 96%;
  --color-accent-foreground: 222 47% 11%;
  --color-destructive: 0 84% 60%;
  --color-border: 214 32% 91%;
  --color-ring: 222 47% 31%;
  --color-radius: 0.5rem;
}

.dark {
  --color-primary: 210 40% 80%;
  --color-primary-foreground: 222 47% 11%;
  /* ... dark overrides ... */
}
```

> **Rule**: These tokens are for bridging values between systems and for shadcn/ui component styling. For general theming (accent colors, grays, dark mode), prefer Radix UI's built-in color scales over manually defining CSS custom properties.

**Never add inline styles or ad-hoc class names to Radix primitives.** Always go through the shadcn wrapper or the Radix/token system.

---

## 3. UI Components — shadcn/ui + Radix UI

### Installation Rule

> **Always install shadcn components via the CLI instead of building them from scratch.**

```bash
# Initialize shadcn/ui (first time only)
npx shadcn@latest init

# Add a component
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add calendar
# ...and so on
```

This ensures:
- Correct Radix + Tailwind wiring.
- Accessibility out of the box (`aria-*` attributes, keyboard navigation, focus traps).
- Easier upgrades when shadcn releases improvements.

### Customization Flow

1. Install the component via CLI → lands in `src/components/ui/`.
2. Open the generated file; adjust **only** the Tailwind classes / CSS variables.
3. If the component needs project-specific logic, create a **wrapper** in `src/components/` that imports from `ui/`.

### Component Inventory (install as needed)

| Category | Components |
|---|---|
| **Layout** | `card`, `separator`, `aspect-ratio`, `scroll-area` |
| **Navigation** | `navigation-menu`, `tabs`, `breadcrumb`, `pagination` |
| **Forms** | `button`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `slider`, `form`, `label` |
| **Feedback** | `alert`, `alert-dialog`, `toast`, `sonner`, `skeleton`, `progress` |
| **Overlay** | `dialog`, `drawer`, `sheet`, `popover`, `tooltip`, `dropdown-menu`, `context-menu`, `hover-card` |
| **Data** | `table`, `data-table`, `badge`, `avatar`, `calendar`, `date-picker`, `command`, `combobox` |
| **Typography** | Use Tailwind prose / custom token classes — no dedicated shadcn component needed. |

---

## 4. Animations & Interactions

| Tool | Usage |
|---|---|
| **Framer Motion** | Page transitions, layout animations, scroll-triggered reveals, complex orchestrations. |
| **tw-animate-css** | Simple utility-class-driven animations (fade-in, slide-up, etc.). |
| **CSS `@keyframes`** | Defined in `src/styles/animations.css` for token-level reuse. |

### Guidelines

- Prefer CSS-based animations for micro-interactions (hover, focus, active states).
- Use Framer Motion when you need spring physics, gesture handling, or `AnimatePresence`.
- Always respect the user's `prefers-reduced-motion` media query.

---

## 5. Icons

| Library | When to Use |
|---|---|
| **Lucide React** | **Default choice** — works natively with shadcn/ui. Import individual icons for tree-shaking. |
| **Iconify** _(optional)_ | Only when a specific icon is not available in Lucide. Install via `@iconify-icon/react` (npm) — **never load via CDN**. |

---

## 6. Internationalization & Localization (i18n / l10n)

### Library — `next-intl`

- **Locale routing**: `src/app/[locale]/` — every page and layout receives `locale` as a param.
- **Message files**: `messages/en.json`, `messages/el.json` (extend with more locales as needed).
- **Default locale**: English (`en`), or the system's / browser's detected locale.

### Rules

1. **No hardcoded user-facing strings.** Every piece of text — buttons, headings, labels, errors, `aria-label`, `alt`, meta descriptions — comes from the message files.
2. **Keys are structured by page/section**:
   ```json
   {
     "home": {
       "hero": {
         "title": "Welcome to …",
         "subtitle": "…"
       }
     },
     "common": {
       "cta": {
         "bookNow": "Book Now",
         "learnMore": "Learn More"
       }
     }
   }
   ```
3. **Pluralization & formatting**: Use `next-intl`'s ICU message syntax for numbers, dates, and plurals.
4. **RTL readiness**: Although not immediately needed, keep layout classes free of hard `left/right` — prefer logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end` in Tailwind).
5. **New locale checklist**: Add the JSON file → update `i18n.ts` config → update `middleware.ts` matcher → test.

---

## 7. SEO & GEO (Generative Engine Optimization)

> **📄 Mandatory Reference:** Before implementing or modifying any SEO/GEO features, always read and follow the full framework in **[`GEO.md`](./GEO.md)**. That file is the authoritative source for the project's SEO and Generative Engine Optimization strategy, including `llms.txt`, advanced JSON-LD patterns, citable content architecture, and the audit-ready checklist.

> Every page must be optimized for both **search engines** (Google, Bing) and **AI retrieval engines** (ChatGPT, Perplexity, Gemini, etc.).

### 7.1 Technical SEO (Next.js built-ins)

| Concern | Implementation |
|---|---|
| **Metadata** | Use `export const metadata: Metadata` (or `generateMetadata()` for dynamic pages) in every `page.tsx`. Include `title`, `description`, `openGraph`, `twitter`, `alternates` (for hreflang), and `robots`. |
| **Sitemap** | Auto-generate via `app/sitemap.ts` — include all localized pages. |
| **Robots** | `app/robots.ts` — allow all crawlers, include sitemap URL. |
| **Open Graph Images** | Dynamic OG images via `app/[locale]/opengraph-image.tsx` using `ImageResponse`. |
| **Canonical URLs** | Set `alternates.canonical` on every page. |
| **Hreflang** | Set `alternates.languages` with all supported locales. |
| **Structured Data (JSON-LD)** | Add `<script type="application/ld+json">` in the page `<head>` for `Organization`, `LocalBusiness`, `FAQPage`, `BreadcrumbList`, etc. |
| **Heading Hierarchy** | Exactly **one `<h1>`** per page; logical `<h2>` → `<h6>` nesting. |
| **Semantic HTML** | `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>` — always. |

### 7.2 Content SEO

- Write **natural, human-readable** copy — avoid keyword stuffing.
- Include the target keyword in the `<h1>`, first paragraph, and meta description.
- Use descriptive `alt` text on every image.
- Internal linking between related pages.

### 7.3 GEO — Generative Engine Optimization

GEO ensures that AI-powered engines can accurately understand, cite, and summarize your site's content.

| Practice | Details |
|---|---|
| **Structured Data** | Comprehensive JSON-LD schemas — the richer, the better. |
| **FAQ Sections** | Mark up with `FAQPage` schema. AI engines love Q&A format. |
| **Clear, Concise Answers** | Write at least one paragraph per page that directly answers the main query in simple language. |
| **Entity Consistency** | Always refer to the brand/product with the same name, spelling, and casing. |
| **Cite Sources** | If referencing data, link to authoritative sources. |
| **About / Author Signals** | Provide an `Organization` schema with `sameAs` pointing to official social profiles. |
| **Freshness** | Use `datePublished` / `dateModified` in schemas. Keep content up to date. |

### 7.4 Performance (Core Web Vitals)

- **LCP < 2.5s**: Use `next/image` with `priority` on hero images; preload critical fonts.
- **FID / INP < 200ms**: Minimize client-side JS; use Server Components.
- **CLS < 0.1**: Set explicit `width` / `height` on images & media; avoid layout shifts from fonts or lazy-loaded content.

### 7.5 Image Handling & Asset Strategy

> **Rule**: During the initial build phase, the AI Agent should use **placeholders** for all images and focus on providing high-quality **alt text**. 

#### Placeholder Strategy
- Use a consistent placeholder service (e.g., `https://placehold.co/600x400?text=Hero+Image`) or a simple colored `div` with a fixed aspect ratio.
- **Mandatory Alt Text**: Every image must have a descriptive `alt` attribute that accurately describes the *intended* final content. This is critical for both SEO and GEO.
- **Example**: `<Image src="/assets/hero/villa-exterior.jpg" alt="Luxury villa exterior with sunset view and infinity pool" width={1200} height={800} />` (Even if the file doesn't exist yet, the structure and SEO value are preserved).

#### Assets Directory Structure
Create a logical folder structure in `public/assets/` to keep images organized. The user will replace these placeholders with final assets later.

```
public/
└── assets/
    ├── brand/              # Logos, favicons, brand marks
    ├── hero/               # Hero section backgrounds/images
    ├── sections/           # Images for specific sections (Features, About, etc.)
    └── ui/                 # UI-specific graphics (background patterns, etc.)
```

---

## 8. Date & Time

| Library | Usage |
|---|---|
| **date-fns** | Date manipulation, formatting, locale-aware display. |
| **react-day-picker** | Calendar component (used inside shadcn's `calendar`). |

---

## 9. Backend & Integrations

| Service | Purpose |
|---|---|
| **Stripe** _(optional)_ | Payment processing, booking deposits, webhooks. |
| **Resend** _(optional)_ | Transactional emails (booking confirmations, contact form submissions). |

- All secrets live in `.env.local` (never committed).
- Vercel environment variables for staging / production.

---

## 10. Fonts & Typography

### Loading Strategy — `next/font`

All fonts **must** be loaded via `next/font/google` or `next/font/local` — **never via CDN `<link>` tags or external stylesheets**. This ensures:

- **Zero layout shift** — fonts are automatically size-adjusted and preloaded.
- **Self-hosted** — Google Fonts are downloaded at build time; no requests to external servers at runtime.
- **Automatic `font-display: swap`** handling.

### Setup Pattern

```tsx
// src/app/layout.tsx (or src/lib/fonts.ts for reuse)
import { Inter, Playfair_Display } from 'next/font/google';

const bodyFont = Inter({
  subsets: ['latin', 'greek'],  // add subsets as needed
  variable: '--font-body',
  display: 'swap',
});

const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

// Apply on <body> or <html>:
<body className={`${bodyFont.variable} ${headingFont.variable}`}>
```

> The specific fonts above are **examples** — choose fonts that match the project's brand during the [First-Loop Discovery Protocol](#14-ai-agent--first-loop-discovery-protocol).

### Token Integration

- Font families are set as CSS custom properties (`--font-body`, `--font-heading`) and mapped in `tailwind.config.ts`.
- Change the heading or body font in **one place** (the `next/font` import + variable) → applies everywhere.
- The `tokens/typography.css` file holds font-size scale, line-height, and letter-spacing tokens — **not** font-family definitions (those come from `next/font`).

---

## 11. Architecture & Directory Structure

```
src/
├── app/                        # Next.js App Router
│   ├── [locale]/               # Locale-prefixed routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── …
│   ├── api/                    # API routes (webhooks, external integrations)
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx     # Dynamic OG image generation
├── public/                     # Static files
│   └── assets/                 # Organized image and media files
├── components/
│   ├── ui/                     # shadcn/ui components (auto-generated via CLI)
│   ├── layout/                 # Header, Footer, Navigation, Sidebar
│   ├── sections/               # Page sections (Hero, Features, Reviews, etc.)
│   └── shared/                 # Reusable project-level components
├── lib/                        # Utilities & helpers (utils.ts, stripe.ts, availability.ts)
├── config/                     # Site-wide configuration (site metadata, navigation links, etc.)
├── actions/                    # Server Actions (Stripe checkout, email, availability checks)
├── styles/
│   ├── globals.css             # Tailwind directives + token imports
│   ├── tokens/                 # Design tokens (colors, typography, spacing, shadows)
│   └── animations.css          # Keyframes & animation tokens
├── hooks/                      # Custom React hooks
├── types/                      # Shared TypeScript types & interfaces
└── i18n/                       # next-intl configuration
messages/
├── en.json                     # English translations
└── el.json                     # Greek translations
```

---

## 12. State Management

- **No global state library.** Use React Context or local component state.
- For server-derived data, rely on **Server Components** and Next.js caching.
- If a global state library becomes necessary in the future, prefer **Zustand** for simplicity.

---

## 13. Analytics & Monitoring

Every project includes analytics **by default**. Both tools below should be set up during initial project scaffolding.

| Tool | Purpose | Setup |
|---|---|---|
| **Google Analytics 4** | Traffic, user behavior, conversions, audience insights. | Install via `@next/third-parties` — use the `<GoogleAnalytics gtag={GA_ID} />` component in the root layout. The measurement ID (`G-XXXXXXXXXX`) lives in `.env.local` as `NEXT_PUBLIC_GA_ID`. |
| **Vercel Analytics** | Core Web Vitals, real-user performance monitoring, page views. | Install `@vercel/analytics` via npm. Add `<Analytics />` to the root layout. Zero-config on Vercel deployments. |
| **Vercel Speed Insights** _(optional)_ | Detailed performance scoring per route. | Install `@vercel/speed-insights` via npm. Add `<SpeedInsights />` to the root layout. |

### Setup Pattern

```tsx
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
```

> **Rule**: Never load analytics via raw `<script>` tags or CDN. Always use the official npm packages listed above.

---

## 14. Security

> Security is **not optional**. Every project must follow these practices from day one — not as an afterthought.

### 14.1 Environment Variables & Secrets

| Rule | Detail |
|---|---|
| **Never commit secrets** | All API keys, tokens, and credentials live in `.env.local` (git-ignored). Use `.env.example` (committed) to document required variables with placeholder values. |
| **`NEXT_PUBLIC_` prefix** | Only variables that are **safe to expose to the browser** use this prefix. Server-only secrets (Stripe secret key, database URLs, etc.) must **never** have this prefix. |
| **Vercel env management** | Use Vercel's environment variable UI for staging / production. Never hardcode secrets in code, config files, or CI scripts. |

### 14.2 Input Validation & Sanitization

- **Validate all user input** on the server — never trust the client. Use **Zod** for schema validation in Server Actions and API routes.
- **Sanitize rendered content** — if displaying user-generated content, sanitize HTML to prevent XSS. Use `DOMPurify` or equivalent.
- **Form validation**: Validate on both client (for UX) and server (for security). shadcn/ui `<Form>` + `react-hook-form` + Zod is the standard pattern.

### 14.3 Authentication & Authorization

- When auth is needed, use a proven library — **NextAuth.js (Auth.js)** or **Clerk** — never roll your own.
- Protect Server Actions and API routes with session checks. Never rely solely on client-side route guards.
- Use Next.js **Middleware** (`middleware.ts`) for route-level protection (redirect unauthenticated users before the page renders).

### 14.4 HTTP Security Headers

Configure security headers in `next.config.ts` (or via Vercel's `vercel.json`). At minimum:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` (or `SAMEORIGIN` if embedding is needed) |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Restrict unused browser APIs (`camera=(), microphone=(), geolocation=()`, etc.) |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Content-Security-Policy` | Define a strict CSP. Start restrictive, loosen only as needed for specific integrations. |

### 14.5 CSRF & API Protection

- **Server Actions** have built-in CSRF protection in Next.js — prefer them over custom API routes for mutations.
- For API routes that accept external requests (webhooks), verify signatures (e.g., Stripe's `stripe.webhooks.constructEvent`).
- Apply **rate limiting** on public-facing API routes and form submissions (use Vercel's built-in or `upstash/ratelimit`).

### 14.6 Dependency Security

- Run `npm audit` regularly (and in CI). Address critical / high vulnerabilities immediately.
- Keep dependencies updated — use Dependabot or Renovate for automated PRs.
- Minimize the number of dependencies. Fewer packages = smaller attack surface.

### 14.7 Error Handling & Information Leakage

- **Never expose stack traces, internal paths, or database errors** to the client. Use Next.js `error.tsx` boundaries to show user-friendly error pages.
- Log detailed errors **server-side only** (e.g., via `console.error` or a logging service).
- Return generic error messages to the client (`"Something went wrong"`) — never raw error objects.

---

## 15. Key Constraints

| Constraint | Detail |
|---|---|
| **No CDN Loading** | Every dependency must be installed via npm and bundled. Never load libraries via external CDN `<script>` or `<link>` tags — this ensures reproducible builds, better performance, and no third-party runtime dependencies. |
| **No Raw CSS Values in Components** | All values reference design tokens. A component should never contain a raw hex code, pixel value, or font name. |
| **Accessibility First** | Every interactive element must be keyboard-navigable, have visible focus indicators, proper ARIA attributes, and sufficient color contrast (WCAG AA minimum). |
| **Mobile-First Responsive** | All layouts start from mobile and scale up via Tailwind breakpoints. |

---

## 16. AI Agent — First-Loop Discovery Protocol

> **Before writing a single line of code**, the AI agent **must** ask the user the following questions (adapt wording as needed) to gather all necessary context. Do not proceed until every relevant question is answered or explicitly skipped.

### 16.1 Project Identity & Branding

1. What is the **project / brand name**?
2. What is the **tagline or one-liner** describing the project?
3. Do you have a **logo** (provide file or describe it)?
4. What is the **brand color palette**? (Primary, secondary, accent, neutrals — provide hex/HSL or describe the vibe.)
5. Any **typography preferences**? (Serif headings + sans body? Specific Google Fonts?)
6. What is the desired overall **visual style / mood**? (e.g., minimal, luxurious, playful, corporate, dark-mode-first?)

### 16.2 Purpose & Audience

7. What is the **primary purpose** of the website? (Portfolio, SaaS, e-commerce, booking platform, blog, landing page, etc.)
8. Who is the **target audience**? (Demographics, tech-savviness, location.)
9. What **action** should a visitor take? (Book, buy, sign up, contact, read?)
10. Are there **competitor or inspiration** websites you'd like to reference?

### 16.3 Content & Pages

11. What **pages / sections** are needed? (Home, About, Services, Pricing, FAQ, Contact, Blog, etc.)
12. Do you have **ready content** (text, images, videos), or should we use placeholders and then finalize?
13. Do you need a **blog / news section**? If yes, what CMS (or markdown-based)?
14. Any **legal pages** needed? (Privacy Policy, Terms of Service, Cookie Policy.)

### 16.4 Features & Functionality

15. Do you need **user authentication**? (Sign up / login, OAuth providers?)
16. Do you need **payments / e-commerce**? (Stripe, one-time, subscriptions, deposits?)
17. Do you need a **booking / calendar** system?
18. Do you need **contact forms**? What fields, and where should submissions go (email, CRM)?
19. Any **third-party integrations** beyond the defaults (Google Analytics, Vercel Analytics)? (Chat widget, CRM, email marketing, maps?)
20. Do you need a **dark mode** toggle?

### 16.5 Localization

21. What **languages** should the site support?
22. What is the **default / fallback locale**? (Default: English, or system-detected.)
23. Are there any **region-specific** content differences beyond translation?

### 16.6 SEO & GEO

24. What are the **target keywords** or topics for SEO?
25. Is the business **local**? If yes, provide the address, phone, and Google Business profile link for `LocalBusiness` schema.
26. Do you need **blog-style content** for organic traffic?
27. Any existing **Google Search Console / Analytics** accounts to connect?

### 16.7 Deployment & Infrastructure

28. Where will this be **deployed**? (Vercel recommended for Next.js — confirm or provide alternative.)
29. Do you have a **domain** ready?
30. Do you need **CI/CD** beyond Vercel's defaults? (GitHub Actions, preview environments?)
31. Any **environment variables / secrets** to configure up front?

### 16.8 Design & UX Preferences

32. Do you prefer a **single-page scrolling** layout or **multi-page** navigation?
33. Any specific **animation / interaction** preferences? (Scroll-triggered reveals, parallax, micro-interactions?)
34. Any **accessibility** requirements beyond WCAG AA?
35. **Mobile-first** — any specific mobile UX requirements or gestures?

### 16.9 Timeline & Priorities

36. What is the **MVP scope**? (What absolutely must be in v1?)
37. What are the **nice-to-haves** for later iterations?
38. Any **hard deadlines** or launch dates?

---

> _This document is a living reference. Update it whenever the stack evolves or new conventions are adopted._

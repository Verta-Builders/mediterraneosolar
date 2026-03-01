# Project Stack & Guidelines

> This document extends `CORE_STACK.md` with opinionated decisions, configuration strategies, and workflow rules that every AI agent (and human contributor) **must** follow when working on a project built with this stack. Treat this as the single source of truth for how a new project is set up and maintained.

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
13. [Key Constraints](#13-key-constraints)
14. [AI Agent — First-Loop Discovery Protocol](#14-ai-agent--first-loop-discovery-protocol)

---

## 1. Core Framework

| Tool | Version / Notes |
|---|---|
| **Next.js** | 14+ — Always use the **App Router** (`app/` directory). |
| **TypeScript** | Strict mode enabled. Every file must be `.ts` or `.tsx`. |
| **React** | 18+ — Use Server Components by default; add `"use client"` only when truly needed. |

### Why Next.js?

- **SSR / SSG / ISR** out of the box — critical for SEO & GEO.
- **Built-in routing** with layouts, loading states, and error boundaries.
- **Image / Font / Script optimization** via `next/image`, `next/font`, `next/script`.
- **Server Actions** for secure, zero-API-route mutations.
- **Middleware** for locale detection, redirects, and auth guards.

---

## 2. Styling, Theming & Design Tokens

### Core Principle — _"Change once, apply everywhere"_

All visual properties (colors, spacing, radii, fonts, shadows, etc.) are defined as **design tokens** in dedicated config files. No component should ever hardcode a raw value.

### File Hierarchy

```
├── tailwind.config.ts          # Tailwind theme extensions, plugins, content paths
├── src/
│   ├── styles/
│   │   ├── globals.css         # Tailwind directives, CSS custom properties (tokens)
│   │   ├── tokens/
│   │   │   ├── colors.css      # --color-primary, --color-secondary, etc.
│   │   │   ├── typography.css  # --font-body, --font-heading, --font-size-*, --line-height-*
│   │   │   ├── spacing.css     # --spacing-*, --radius-*
│   │   │   └── shadows.css     # --shadow-sm, --shadow-md, etc.
│   │   └── animations.css      # Keyframe definitions & animation tokens
```

### 2.1 Tailwind CSS v4

- **CSS-first configuration**: Import Tailwind via `@import "tailwindcss";` inside `globals.css`.
- **Plugin**: `@tailwindcss/postcss`.
- All custom theme values reference the CSS custom properties from the `tokens/` folder — for example:

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

> **Rule**: To change the primary brand color across the entire project, edit **one line** in `colors.css`. Everything — Tailwind utilities, shadcn components, Radix primitives — inherits automatically.

### 2.2 Radix UI Theming

Radix UI is used as the **headless primitive layer** underneath shadcn/ui. Radix components receive their visual styling exclusively through:

1. **Tailwind utility classes** applied in the shadcn component wrappers.
2. **CSS custom properties** from the tokens files (so Radix components stay in sync with the rest of the design system).

**Never add inline styles or ad-hoc class names to Radix primitives.** Always go through the shadcn wrapper or the token system.

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
| **Lucide React** | Default choice — works natively with shadcn/ui. Import individual icons for tree-shaking. |
| **Iconify** | When a specific icon is not available in Lucide. Load via `<iconify-icon>` web component (CDN). |

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
| **Flatpickr** | Secondary date picker (loaded via CDN in `layout.tsx` if needed). |

---

## 9. Backend & Integrations

| Service | Purpose |
|---|---|
| **Stripe** | Payment processing, booking deposits, webhooks. |
| **Resend** | Transactional emails (booking confirmations, contact form submissions). |
| **iCal Parsing** | Syncing availability with external platforms (Airbnb, Booking.com). |

- All secrets live in `.env.local` (never committed).
- Vercel environment variables for staging / production.

---

## 10. Fonts & Typography

| Font | Role | Source |
|---|---|---|
| **Inter** | Body text | `next/font/google` |
| **Cormorant Garamond** | Headings (elegant variant) | `next/font/google` |
| **EB Garamond** | Headings (alternate) | `next/font/google` |

- Font families are set as CSS custom properties in `tokens/typography.css` and mapped in `tailwind.config.ts`.
- Change the heading font in **one place** (`tokens/typography.css`) → applies everywhere.

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

## 13. Key Constraints

| Constraint | Detail |
|---|---|
| **Hybrid Asset Loading** | Some libraries (Iconify, Flatpickr) are loaded via CDN in `layout.tsx`; the rest are bundled via npm. |
| **No Raw CSS Values in Components** | All values reference design tokens. A component should never contain a raw hex code, pixel value, or font name. |
| **Accessibility First** | Every interactive element must be keyboard-navigable, have visible focus indicators, proper ARIA attributes, and sufficient color contrast (WCAG AA minimum). |
| **Mobile-First Responsive** | All layouts start from mobile and scale up via Tailwind breakpoints. |

---

## 14. AI Agent — First-Loop Discovery Protocol

> **Before writing a single line of code**, the AI agent **must** ask the user the following questions (adapt wording as needed) to gather all necessary context. Do not proceed until every relevant question is answered or explicitly skipped.

### 14.1 Project Identity & Branding

1. What is the **project / brand name**?
2. What is the **tagline or one-liner** describing the project?
3. Do you have a **logo** (provide file or describe it)?
4. What is the **brand color palette**? (Primary, secondary, accent, neutrals — provide hex/HSL or describe the vibe.)
5. Any **typography preferences**? (Serif headings + sans body? Specific Google Fonts?)
6. What is the desired overall **visual style / mood**? (e.g., minimal, luxurious, playful, corporate, dark-mode-first?)

### 14.2 Purpose & Audience

7. What is the **primary purpose** of the website? (Portfolio, SaaS, e-commerce, booking platform, blog, landing page, etc.)
8. Who is the **target audience**? (Demographics, tech-savviness, location.)
9. What **action** should a visitor take? (Book, buy, sign up, contact, read?)
10. Are there **competitor or inspiration** websites you'd like to reference?

### 14.3 Content & Pages

11. What **pages / sections** are needed? (Home, About, Services, Pricing, FAQ, Contact, Blog, etc.)
12. Do you have **ready content** (text, images, videos), or should we use placeholders and then finalize?
13. Do you need a **blog / news section**? If yes, what CMS (or markdown-based)?
14. Any **legal pages** needed? (Privacy Policy, Terms of Service, Cookie Policy.)

### 14.4 Features & Functionality

15. Do you need **user authentication**? (Sign up / login, OAuth providers?)
16. Do you need **payments / e-commerce**? (Stripe, one-time, subscriptions, deposits?)
17. Do you need a **booking / calendar** system?
18. Do you need **contact forms**? What fields, and where should submissions go (email, CRM)?
19. Any **third-party integrations**? (Analytics, chat widget, CRM, email marketing, maps?)
20. Do you need a **dark mode** toggle?

### 14.5 Localization

21. What **languages** should the site support?
22. What is the **default / fallback locale**? (Default: English, or system-detected.)
23. Are there any **region-specific** content differences beyond translation?

### 14.6 SEO & GEO

24. What are the **target keywords** or topics for SEO?
25. Is the business **local**? If yes, provide the address, phone, and Google Business profile link for `LocalBusiness` schema.
26. Do you need **blog-style content** for organic traffic?
27. Any existing **Google Search Console / Analytics** accounts to connect?

### 14.7 Deployment & Infrastructure

28. Where will this be **deployed**? (Vercel recommended for Next.js — confirm or provide alternative.)
29. Do you have a **domain** ready?
30. Do you need **CI/CD** beyond Vercel's defaults? (GitHub Actions, preview environments?)
31. Any **environment variables / secrets** to configure up front?

### 14.8 Design & UX Preferences

32. Do you prefer a **single-page scrolling** layout or **multi-page** navigation?
33. Any specific **animation / interaction** preferences? (Scroll-triggered reveals, parallax, micro-interactions?)
34. Any **accessibility** requirements beyond WCAG AA?
35. **Mobile-first** — any specific mobile UX requirements or gestures?

### 14.9 Timeline & Priorities

36. What is the **MVP scope**? (What absolutely must be in v1?)
37. What are the **nice-to-haves** for later iterations?
38. Any **hard deadlines** or launch dates?

---

> _This document is a living reference. Update it whenever the stack evolves or new conventions are adopted._

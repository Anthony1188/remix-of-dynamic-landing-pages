# DryJet Solutions — Website

A professional marketing website for **DryJet Solutions**, a waterless dry ice cleaning and cold-chain solutions company serving premium automotive, marine, and industrial clients.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| Styling | TailwindCSS 3 + custom design tokens |
| UI Components | shadcn/ui (Radix primitives) |
| Animations | Framer Motion |
| Routing | React Router DOM v6 |
| Data Fetching | TanStack Query v5 |
| PDF Generation | jsPDF |
| Backend (optional) | Supabase (pre-wired, not yet activated) |

---

## Design System

The site uses a **USDA-inspired dark luxury** design language:

- **Background:** Near-black (`#050505`)
- **Primary accent:** Sky blue (`#9ED8FF` — `brand-cyan`)
- **Secondary accent:** Gold (`#CFAE6E` — `brand-gold`)
- **Display font:** Michroma (uppercase, tight tracking)
- **Body font:** Inter (light weight, relaxed leading)
- **Borders:** Hairline, sharp corners (radius: 0)

Key CSS utilities: `.eyebrow`, `.hover-gold`, `.glass`, `.font-display`, `.text-gradient-brand`

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero with animated 3D grid, stats, method, services, process, testimonials, CTA |
| `/services` | Services | Detailed breakdown of Automotive, Marine, and Industrial services |
| `/about` | About | Company story, principles, positioning |
| `/insights` | Blog/Insights | Article grid with featured post and category tags |
| `/faq` | FAQ | Accordion FAQ organized by Technology, Services, and Compliance |
| `/contact` | Contact | Quote request form + interactive QuoteWidget with PDF export |

---

## Getting Started

Install dependencies and start the development server:

    npm install
    npm run dev
    npm run build

---

## Adding Features in Manus

Suggested next steps:

- **Supabase integration** — Connect the contact form to a Supabase table for lead capture
- **Blog article pages** — Add individual article routes under `/insights/:id`
- **Image gallery** — Before/after slider for service case studies
- **Booking calendar** — Appointment scheduling integration
- **Admin dashboard** — Quote and lead management interface
- **SEO enhancements** — Structured data, Open Graph tags, sitemap

---

*Built with Manus — April 2026*

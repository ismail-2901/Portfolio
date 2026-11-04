# Portfolio Architecture

## Stack Overview

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| Database | PostgreSQL via Neon (serverless) |
| ORM | Prisma 6.12 |
| Auth | Auth.js v5 (beta) + bcryptjs |
| File Storage | Vercel Blob |
| Email | Resend |
| Testing | Vitest + Playwright |
| Deployment | Vercel |

---

## Repository Structure

```
Portfolio/
├── prisma/
│   ├── schema.prisma          # Database models
│   └── seed.ts                # Initial data seed script
├── src/
│   ├── app/
│   │   ├── (site)/            # Public portfolio routes
│   │   │   ├── page.tsx       # Home / hero
│   │   │   ├── about/         # About page
│   │   │   ├── projects/      # Projects list + detail
│   │   │   ├── blog/          # Articles list + detail
│   │   │   ├── contact/       # Contact form
│   │   │   ├── resume/        # Resume redirect
│   │   │   └── layout.tsx     # Site shell (header + footer)
│   │   ├── admin/             # Private admin dashboard
│   │   │   ├── login/
│   │   │   ├── profile/
│   │   │   ├── projects/
│   │   │   ├── articles/
│   │   │   ├── skills/
│   │   │   ├── messages/
│   │   │   └── media/
│   │   ├── api/
│   │   │   ├── auth/          # Auth.js endpoints
│   │   │   └── health/        # Health check
│   │   ├── globals.css        # Design tokens + base styles
│   │   └── layout.tsx         # Root layout (metadata, font)
│   ├── components/
│   │   ├── site/              # Public-facing components
│   │   └── ui/                # Shared primitives (Button, etc.)
│   ├── lib/
│   │   ├── queries.ts         # All public data fetching (cached)
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # Auth.js config
│   │   ├── public-data.ts     # withPublicData error wrapper
│   │   └── utils.ts           # Utility helpers
│   └── middleware.ts          # Route protection (admin)
├── tests/
│   ├── unit/                  # Vitest unit tests
│   └── e2e/                   # Playwright E2E tests
├── docs/                      # Reference and architecture docs
└── public/                    # Static assets
```

---

## Data Architecture

### Database Models

| Model | Purpose |
|---|---|
| `Profile` | Singleton owner identity (name, bio, links, availability) |
| `Project` | Portfolio case studies with images and tags |
| `ProjectImage` | Per-project image gallery |
| `Article` | Blog / case study articles |
| `Skill` | Technical skills with level and category |
| `Experience` | Work / academic experience timeline |
| `Education` | Formal education entries |
| `Tag` | Shared taxonomy for projects and articles |
| `ContactMessage` | Inbound contact form submissions |
| `AdminUser` | Admin account (bcrypt-hashed password) |
| `AuditLog` | Admin action log |

### Public Data Flow

```
Page (RSC) → queries.ts (cached) → withPublicData() → Prisma → Neon PostgreSQL
                                           ↓ (if DB unavailable)
                                     fallback constants (dev-only)
```

All public queries are wrapped in `withPublicData()` which catches DB errors and returns `{ available: false }` gracefully. Pages render a `<DatabaseUnavailableNotice />` rather than crashing.

All public query functions are `React.cache()`-wrapped to deduplicate within a single render cycle.

---

## Authentication

- Admin routes (`/admin/*`) protected by `middleware.ts` using Auth.js session check.
- Login at `/admin/login` — email + password, session stored as encrypted cookie.
- Password hashed with bcryptjs (12 rounds).
- Bootstrap flow: seed `ADMIN_EMAIL` / `ADMIN_PASSWORD` from environment variables.

---

## Design System

Design tokens are defined in [`src/app/globals.css`](../src/app/globals.css) using Tailwind CSS v4 `@theme`:

| Token Group | Examples |
|---|---|
| Colors | `--color-canvas`, `--color-copy`, `--color-muted`, `--color-accent` |
| Spacing | `--spacing-header-public`, container widths |
| Typography | `text-display`, `text-heading`, `text-body`, `text-metadata` |
| Borders | `--color-rule`, `border-rule` utility |

Accent color: `#73dee5` (teal). Dark editorial aesthetic.

---

## Rendering Strategy

| Route | Strategy | Revalidation |
|---|---|---|
| `/` | Static (ISR) | 5 min |
| `/about` | Static (ISR) | 5 min |
| `/projects` | Static (ISR) | 5 min |
| `/projects/[slug]` | Dynamic (SSR) | on-demand |
| `/blog` | Static (ISR) | 5 min |
| `/contact` | Static (ISR) | 5 min |
| `/admin/*` | Dynamic (SSR) | — |
| `/api/*` | Dynamic | — |

---

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `AUTH_SECRET` | Yes | Auth.js session encryption key |
| `ADMIN_EMAIL` | Seed only | Initial admin account email |
| `ADMIN_PASSWORD` | Seed only | Initial admin account password |
| `BLOB_READ_WRITE_TOKEN` | Yes | Vercel Blob storage access |
| `RESEND_API_KEY` | Yes | Email delivery via Resend |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL for metadata |

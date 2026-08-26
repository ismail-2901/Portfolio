# Senior Engineer Portfolio

A production-oriented personal portfolio built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma, PostgreSQL, Auth.js, Framer Motion, Three.js, Zod, Resend, Vercel Blob, Vitest, and Playwright.

## Architecture

- `src/app/(site)` contains public pages: Home, About, Projects, Project Details, Blog, Article Details, Contact, Resume, and Privacy.
- `src/app/(auth)` contains the admin login route.
- `src/app/(dashboard)` contains the protected admin dashboard.
- `src/components` holds UI primitives, site components, motion components, and admin forms.
- `src/lib` holds Prisma, Auth.js helpers, validation, rate limiting, security utilities, markdown rendering, Server Actions, and queries.
- `prisma/schema.prisma` defines `AdminUser`, `Project`, `ProjectImage`, `Article`, `Tag`, `Skill`, `Experience`, `Profile`, `ContactMessage`, and `AuditLog`.

## Security Model

- Admin login uses Auth.js credentials with bcrypt-hashed passwords stored in `AdminUser.passwordHash`.
- `/admin` routes are guarded by server-side session checks and a middleware pre-check.
- Server Actions validate all external input with Zod and enforce same-origin checks.
- Contact, login, and upload flows use rate limiting. Upstash Redis is supported through REST env vars; local development falls back to an in-memory limiter.
- Markdown/MDX rendering is constrained with `rehype-sanitize` and a fixed component map.
- Contact messages store a hashed IP fingerprint for abuse prevention.
- Mutations write `AuditLog` records.

## Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Required for local database:

```env
DATABASE_URL="postgresql://portfolio:portfolio@localhost:5432/portfolio?schema=public"
AUTH_SECRET="replace-with-openssl-rand-base64-32"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="replace-with-a-long-random-password"
ADMIN_NAME="Portfolio Admin"
```

Optional services:

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` for contact notifications.
- `BLOB_READ_WRITE_TOKEN` for Vercel Blob image uploads.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` for distributed rate limiting.

## Local Development

Install dependencies:

```powershell
npm.cmd install
```

Start PostgreSQL:

```powershell
docker compose up -d
```

Generate Prisma Client:

```powershell
npm.cmd run db:generate
```

Create/update local schema:

```powershell
npm.cmd run db:push
```

Seed safe placeholder content and the initial admin:

```powershell
npm.cmd run db:seed
```

Start the app:

```powershell
npm.cmd run dev
```

Open `http://localhost:3000`. Admin is at `http://localhost:3000/admin`.

## Testing And Quality

Type-check:

```powershell
npm.cmd run typecheck
```

Lint:

```powershell
npm.cmd run lint
```

Unit tests:

```powershell
npm.cmd run test
```

Playwright smoke tests:

```powershell
npm.cmd run test:e2e
```

Production build:

```powershell
npm.cmd run build
```

Start the production server:

```powershell
npm.cmd run start
```

## Deployment

1. Create a PostgreSQL database on Neon or Supabase.
2. Set `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`, and admin seed env vars in Vercel.
3. Add Resend, Vercel Blob, and Upstash env vars when those services are enabled.
4. Run `npm.cmd run db:migrate` locally against your production branch database or apply migrations in CI.
5. Deploy to Vercel with the build command `npm run build`.

Before launch, replace all `[YOUR ...]` placeholders from `/admin/profile`, add real projects/articles, and replace `src/app/(site)/privacy/page.tsx` with policy language reviewed for your jurisdiction.

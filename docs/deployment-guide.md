# Deployment Guide

## Platform

This portfolio is deployed on **Vercel** connected to the `main` branch of `https://github.com/ismail-2901/Portfolio.git`.

Every push to `main` triggers an automatic production deployment.

---

## Prerequisites

| Service | Purpose | Setup |
|---|---|---|
| Vercel | Hosting and CI/CD | [vercel.com](https://vercel.com) |
| Neon | Serverless PostgreSQL | [neon.tech](https://neon.tech) |
| Vercel Blob | Image storage | Enabled in Vercel dashboard |
| Resend | Email delivery | [resend.com](https://resend.com) |

---

## Environment Variables

Set all of the following in the Vercel project dashboard under **Settings → Environment Variables**:

| Variable | Example / Notes |
|---|---|
| `DATABASE_URL` | `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require` |
| `AUTH_SECRET` | 32-char random string — generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Your admin login email |
| `ADMIN_PASSWORD` | Strong password (12+ chars) — only needed for seeding |
| `ADMIN_NAME` | Display name for admin account |
| `BLOB_READ_WRITE_TOKEN` | From Vercel Blob settings |
| `RESEND_API_KEY` | From Resend dashboard |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` or custom domain |

> [!CAUTION]
> `ADMIN_EMAIL` and `ADMIN_PASSWORD` are only used during seeding. After seeding you may remove them from Vercel env vars for security, since they are no longer needed at runtime.

---

## Initial Deployment Steps

### 1. Connect repository to Vercel

```bash
# Install Vercel CLI (optional — can also connect via dashboard)
npm i -g vercel
vercel login
vercel link
```

Or connect via the Vercel dashboard: **New Project → Import Git Repository → ismail-2901/Portfolio**

### 2. Add environment variables

In Vercel dashboard → Project → Settings → Environment Variables, add all variables from the table above.

### 3. Deploy

```bash
git push origin main
```

Vercel builds automatically. Build command: `prisma generate && next build`

### 4. Seed the database

After the first successful deployment, run the seed script **once** from your local machine (which has the same `DATABASE_URL`):

```bash
npm run db:seed
```

This creates:
- Admin user account
- Singleton `Profile` record (Md Ismail Hossain)
- FixMyCampus and ELARIS projects
- Skills (13 technologies)
- DIU education entry
- DIU experience entry
- FixMyCampus article

### 5. Verify

- Visit `https://your-domain.vercel.app` — portfolio should render with your data
- Visit `https://your-domain.vercel.app/admin/login` — log in with your admin credentials
- Visit `https://your-domain.vercel.app/api/health` — should return `{ "status": "ok" }`

---

## Ongoing Deployments

Every `git push origin main` triggers a Vercel production deployment automatically.

Preview deployments are created for every pull request (if PRs are used).

---

## Schema Changes

When you change `prisma/schema.prisma`:

```bash
# Push schema changes to Neon (non-destructive)
npx prisma db push

# Or create a migration (for production migrations with history)
npx prisma migrate dev --name describe-your-change
```

> [!WARNING]
> `prisma db push` is fast but does not create migration history. For production schema changes that could be destructive (dropping columns, renaming), use `prisma migrate` instead and review the generated SQL before applying.

---

## Custom Domain

In Vercel dashboard → Project → Settings → Domains:
1. Add your custom domain
2. Update DNS records as instructed by Vercel
3. Update `NEXT_PUBLIC_SITE_URL` to match the custom domain

---

## Monitoring

- **Build logs:** Vercel dashboard → Deployments
- **Function logs:** Vercel dashboard → Logs (real-time)
- **Database:** Neon dashboard → Branches → Tables / Query editor
- **Email delivery:** Resend dashboard → Emails

---

## Rollback

To roll back to a previous deployment:

Vercel dashboard → Deployments → Select a previous deployment → **Promote to Production**

Or via CLI:
```bash
vercel rollback
```

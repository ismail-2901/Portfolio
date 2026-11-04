# Admin Dashboard Guide

## Overview

The admin dashboard is a private, authentication-gated section at `/admin`. It provides full CRUD management for all portfolio content without touching code or the database directly.

---

## Accessing the Dashboard

1. Navigate to `/admin/login`
2. Enter your admin email and password
3. You are redirected to `/admin` on success

> [!IMPORTANT]
> The admin dashboard is not publicly listed — there is no visible link from the public portfolio pages (except a small footer link). Keep your credentials secure.

---

## First-Time Setup (Bootstrap)

If no admin account exists yet:

1. Set environment variables in your Vercel project (or `.env` for local):
   ```
   ADMIN_EMAIL=your@email.com
   ADMIN_PASSWORD=yourpassword123
   ADMIN_NAME=Your Name
   ```

2. Run the seed script:
   ```bash
   npm run db:seed
   ```

   This creates the admin user, profile, default skills, projects, and education entry.

3. After first login, you can change your password via the Profile page.

> [!CAUTION]
> Never commit `ADMIN_EMAIL` or `ADMIN_PASSWORD` to version control. Use Vercel environment variable settings or `.env.local` (which is gitignored).

---

## Content Management

### Profile

**Route:** `/admin/profile`

Manages the singleton `Profile` record — the core identity of the portfolio:

| Field | Description |
|---|---|
| Name | Full name displayed across all pages |
| Role | Subtitle shown in header, footer, hero |
| Location | Shown in hero eyebrow and footer |
| Short Bio | Paragraph shown on about page |
| Email | Used in contact and footer links |
| GitHub URL | Linked in footer and contact |
| LinkedIn URL | Linked in footer and contact |
| Twitter URL | Optional — linked if provided |
| Resume URL | Used by `/resume` redirect |
| Profile Image | Displayed on about page |
| Availability Status | Label shown in hero badge |
| Available for Hire | Toggles the "Open to..." badge |

---

### Projects

**Routes:** `/admin/projects`, `/admin/projects/new`, `/admin/projects/[id]`

Each project record contains:

| Field | Description |
|---|---|
| Title | Project name |
| Slug | URL-safe identifier (`/projects/[slug]`) |
| Summary | Short one-paragraph description |
| Body | Full case study in Markdown |
| Tech Tags | Comma-separated technology labels |
| GitHub URL | Optional link to repository |
| Live URL | Optional link to deployed site |
| Featured | Marks the lead project on homepage and projects page |
| Order | Controls display sequence |
| Status | `DRAFT` / `PUBLISHED` / `ARCHIVED` |
| Tags | Linked taxonomy tags |
| Images | Cover and gallery images (uploaded via Vercel Blob) |

> [!TIP]
> Set exactly **one** project as `featured: true`. It appears as the hero card on both the home and projects pages.

---

### Skills

**Route:** `/admin/skills`

Skills are displayed in the "How I work" section and the about page capabilities cluster.

| Field | Description |
|---|---|
| Name | Technology name |
| Category | Groups skills (`Frontend`, `Backend`, `Database`, `Tools`) |
| Level | `WORKING` / `ADVANCED` / `EXPERT` |
| Featured | Appears in the hero toolkit strip |
| Order | Controls display sequence within category |

---

### Articles

**Routes:** `/admin/articles`, `/admin/articles/new`, `/admin/articles/[id]`

Blog and case study articles displayed at `/blog`.

| Field | Description |
|---|---|
| Title | Article heading |
| Slug | URL identifier (`/blog/[slug]`) |
| Excerpt | Short description for list cards |
| Body | Full article content in Markdown |
| SEO Title | Optional override for `<title>` tag |
| SEO Description | Optional override for meta description |
| Status | `DRAFT` / `PUBLISHED` / `ARCHIVED` |
| Reading Minutes | Auto-calculated from body length |
| Tags | Linked taxonomy tags |

---

### Messages

**Route:** `/admin/messages`

Inbound contact form submissions. Each message shows:
- Sender name and email
- Company (optional)
- Message body
- Received timestamp
- Read / unread status

You can mark messages as read or archive them.

---

### Media

**Route:** `/admin/media`

Manages images uploaded to Vercel Blob storage. Images are linked to projects as cover or gallery images.

---

## Audit Log

Every admin action (create, update, delete, login) is recorded in the `AuditLog` table with the actor, action, entity, and timestamp. This is viewable in the database directly — there is no admin UI for it yet.

---

## Security Notes

- Sessions expire after inactivity (Auth.js default).
- All admin server actions validate the session before executing.
- Contact form has rate limiting and IP hashing — raw IPs are never stored.
- Uploaded images are stored in Vercel Blob behind a read-write token — not publicly guessable.

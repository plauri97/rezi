# Resume Builder SaaS

Production-ready Resume Builder web application built with Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, React Hook Form + Zod, Prisma, PostgreSQL, Auth.js (NextAuth v5), and OpenAI.

## Features

- **Authentication**: Register / Login (credentials), protected routes
- **Dashboard**: List, create, edit, delete resumes
- **Resume Builder**: Structured form (Personal Info, Work Experience, Education, Skills, Projects), autosave, live A4 preview
- **AI**: Improve bullet points and generate professional summary via OpenAI
- **Export**: PDF export via @react-pdf/renderer
- **Responsive**: Desktop and mobile usable

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **React Hook Form** + **Zod**
- **Prisma** + **PostgreSQL**
- **Auth.js (NextAuth v5)** with credentials provider + Prisma adapter
- **OpenAI API** (optional, for AI features)
- **@react-pdf/renderer** for PDF export

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set:

   - `DATABASE_URL` – PostgreSQL connection string (required)
   - `AUTH_SECRET` – random string for session encryption (e.g. `openssl rand -base64 32`)
   - `NEXTAUTH_URL` – app URL (e.g. `http://localhost:3000`)
   - `OPENAI_API_KEY` – (optional) for AI Improve Summary / Improve Bullets

3. **Database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/                    # App Router pages and layouts
    actions/              # Server Actions (auth, resume, AI)
    api/auth/             # Auth.js route handler
    dashboard/            # Dashboard (list resumes)
    login|register/        # Auth pages
    resumes/[slug]/        # Resume editor + preview
      sections/           # Form section components
  auth.config.ts          # Auth.js config (providers, callbacks)
  auth.ts                 # Auth.js instance + Prisma adapter
  components/ui/          # shadcn-style UI components
  lib/
    db.ts                 # Prisma client singleton
    resume-types.ts       # ResumeContent and defaults
    utils.ts              # cn(), slugify()
    validations/          # Zod schemas (auth, resume)
  types/                  # next-auth.d.ts
prisma/
  schema.prisma           # User, Account, Session, Resume
```

## Architecture Notes

- **Resume content** is stored as JSON in `Resume.content` (see `ResumeContent` in `src/lib/resume-types.ts`) for flexibility and a single source of truth for form and preview/PDF.
- **Autosave**: Form state is watched; changes are debounced (1.5s) and persisted via `updateResume` server action.
- **Protected routes**: Middleware uses `auth()` to redirect unauthenticated users from `/dashboard` and `/resumes/*` to `/login`.
- **PDF export**: Client-side; `ResumePdfDocument` mirrors the resume structure using @react-pdf/renderer; blob is generated and downloaded.
- **AI**: Server actions in `src/app/actions/ai.ts` call OpenAI (gpt-4o-mini) for summary generation and bullet improvement; optional if `OPENAI_API_KEY` is not set.

## Deployment (Vercel)

1. Connect the repo to Vercel.
2. Set env vars: `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL` (e.g. `https://your-app.vercel.app`), optionally `OPENAI_API_KEY`.
3. Use a Vercel Postgres or external PostgreSQL and run migrations (`prisma migrate deploy` or `prisma db push`) as part of your deploy or manually.

## Scripts

- `npm run dev` – development server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run db:generate` – generate Prisma client
- `npm run db:push` – push schema to DB (no migrations)
- `npm run db:migrate` – run migrations
- `npm run db:studio` – open Prisma Studio

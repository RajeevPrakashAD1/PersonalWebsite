# Personal Website — Retro Arcade Edition 🕹️

A personal site styled like a retro arcade game. **Quests** (learning journey),
**Projects**, **Logs** (blog), and **Fitness** (weight stats + goal checklist),
all managed from a built-in **`/admin`** dashboard backed by Supabase.

**Stack:** React 19 · Vite · Tailwind CSS v4 · React Router · Supabase · react-markdown

## Getting started

```bash
npm install
npm run dev
```

The site runs immediately on local sample content in `src/content/` — no setup
required. Connect Supabase (below) to manage content from `/admin` instead.

## Content

Content comes from one of two sources, switched automatically:

| Mode | When | How you add content |
|------|------|---------------------|
| **Local sample** | no `.env` | edit files in `src/content/` |
| **Supabase (live)** | `.env` set | log in at `/admin` and use the forms |

The `/admin` dashboard has tabs for **Quests**, **Projects**, **Logs**,
**Weight**, and **Profile**. Linking a project or log to a quest groups it under
that quest on the Quests page. Logs with category `fitness` appear on the Fitness
page instead of Logs.

## Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → paste [`supabase-schema.sql`](./supabase-schema.sql) → **Run**.
3. Copy `.env.example` to `.env` and add your **Project URL** and **publishable
   (anon) key** from *Project Settings → API*.
4. **Authentication → Users → Add user** to create your `/admin` login. (Disable
   "Confirm email" under *Providers → Email* so it's active immediately.)
5. Restart `npm run dev`.

The publishable key is safe to expose — Row Level Security (from the schema) lets
anyone read but only your authenticated admin write.

## Deployment

`npm run build` outputs static files to `dist/`.

- **Vercel / Netlify** — connect the repo, build command `npm run build`, output
  `dist`. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment
  variables in the dashboard.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.js`.

## Personalization

Edit `src/config.js` for your name, role, bio, email, and social links (set a
link to `''` to hide it).

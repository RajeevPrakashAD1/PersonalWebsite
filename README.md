# Personal Website — Retro Arcade Edition 🕹️

A React + Vite + Tailwind personal site styled like a retro arcade game, with
**Quests** (learning journey), **Fitness** (weight stats + goal checklist),
**Projects**, and **Logs** (blog), all managed from a built-in **/admin**
dashboard backed by Supabase.

## Running it locally

```bash
npm install      # first time only
npm run dev      # start the dev server, then open the URL it prints
```

> On Windows PowerShell, if `npm` is blocked by the execution policy, use
> `npm.cmd` instead, or run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

The site **runs immediately** using the local sample content in `src/content/`.
To get the live "add content from a form" experience, connect Supabase below.

## 🎮 How content works

There are two modes, and the site switches automatically:

| Mode | When | How you add content |
|------|------|---------------------|
| **Local sample** | No `.env` yet | Edit files in `src/content/` (fallback only) |
| **Supabase (live)** | `.env` is set | Log in at **/admin**, fill a form, hit save — appears instantly |

Once Supabase is connected you never edit code to publish — you use `/admin`.

## ⚡ Connect Supabase (one-time, ~10 min, free)

1. **Create a project** at [supabase.com](https://supabase.com) (free tier).
2. **Create the tables**: in Supabase go to **SQL Editor → New query**, paste the
   whole contents of [`supabase-schema.sql`](./supabase-schema.sql), and hit **Run**.
3. **Add your credentials**: copy `.env.example` to `.env` and paste your
   **Project URL** and **anon public key** (Supabase → *Project Settings → API*).
4. **Create your admin login**: Supabase → **Authentication → Users → Add user**
   (set an email + password). That's the login you'll use at `/admin`.
   - Tip: under *Authentication → Providers → Email*, turn **off** "Confirm email"
     so the user is active immediately.
5. **Restart** `npm run dev`. Visit **/admin**, log in, and start adding content.

Your data now lives in the Supabase database; visitors see new content on their
next page load. The anon key is safe to expose — writes are locked down by Row
Level Security (set up by the SQL script) so only your logged-in admin can edit.

## ✍️ Using the admin (`/admin`)

Tabs — **Quests**, **Projects**, **Logs**, **Weight**, **Profile**:

- **Quests** — your learning journey. Title, *why*, status
  (active/planned/complete), a manual progress %, and start/target dates.
- **Projects** — title, description, tags, a video (YouTube/Vimeo URL or
  `/videos/x.mp4`), an image URL, GitHub + demo links, and an optional **quest link**.
- **Logs (Blog)** — title, date, summary, Markdown body, optional **goal link**, and
  a **category**: `dev` posts appear in **LOGS**, `fitness` posts appear on the
  **Fitness** page (same reader either way).
- **Weight** — log a weigh-in (date + number) so Current/Change stay up to date.
- **Profile** — your start weight, goal weight, and unit (kg/lbs).

Linking a project or log to a quest makes it show up under that quest on the
**Quests** page — tying your projects and posts into one learning story.

The **Fitness** page (`/health`) shows your start / current / goal weight + change,
a fitness **goal checklist** (when logged in you add, tick off, and delete goals
inline; visitors see it read-only), and your **Fitness Logs** — weekly fitness
write-ups, kept separate from the dev Logs. To post one: `/admin` → LOGS → set
category to **fitness**.

## Your info / name / links

Edit **`src/config.js`** — name, role, bio, email, and social links. Leave a link
as `''` to hide it.

## Deploying (free static hosting)

`npm run build` outputs static files to `dist/`. Works on any static host:

- **Netlify / Vercel** — connect the repo; build command `npm run build`, publish
  directory `dist`. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as
  environment variables in the host's dashboard.
- **GitHub Pages** — set `base: '/repo-name/'` in `vite.config.js` for a project site.
"# PersonalWebsite" 

-- ============================================================
--  DATABASE SCHEMA for the personal website
--  Run this once in Supabase: Dashboard → SQL Editor → New query
--  → paste this whole file → Run.
-- ============================================================

-- ---- Tables -------------------------------------------------
create table if not exists goals (
  id          bigint generated always as identity primary key,
  title       text not null,
  why         text,
  status      text not null default 'active',   -- 'active' | 'planned' | 'complete'
  progress    int  not null default 0,          -- 0..100
  started_at  date,
  target_at   date,
  created_at  timestamptz not null default now()
);

create table if not exists projects (
  id          bigint generated always as identity primary key,
  title       text not null,
  description text,
  tags        text[] default '{}',
  video       text,
  image       text,
  github      text,
  demo        text,
  goal_id     bigint references goals(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table if not exists posts (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  title       text not null,
  summary     text,
  date        date,
  body        text,
  category    text not null default 'dev',   -- 'dev' (Logs) | 'fitness' (Fitness page)
  goal_id     bigint references goals(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ---- Row Level Security -------------------------------------
-- Everyone can READ (so visitors see your site).
-- Only logged-in (authenticated) users can WRITE (so only you edit).
alter table goals    enable row level security;
alter table projects enable row level security;
alter table posts    enable row level security;

-- Public read
create policy "public read goals"    on goals    for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read posts"    on posts    for select using (true);

-- Authenticated write (insert / update / delete)
create policy "auth write goals"    on goals    for all to authenticated using (true) with check (true);
create policy "auth write projects" on projects for all to authenticated using (true) with check (true);
create policy "auth write posts"    on posts    for all to authenticated using (true) with check (true);

-- ============================================================
--  HEALTH / FITNESS tracking
-- ============================================================

-- Your weight goal + units (a single row, id = 1)
create table if not exists health_profile (
  id           int primary key default 1,
  start_weight numeric,
  goal_weight  numeric,
  unit         text default 'kg',     -- 'kg' | 'lbs'
  height_cm    numeric,
  updated_at   timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- One row per weigh-in (drives the chart)
create table if not exists weight_logs (
  id         bigint generated always as identity primary key,
  date       date not null,
  weight     numeric not null,
  created_at timestamptz not null default now()
);

-- A simple fitness to-do checklist (add / tick off / delete)
create table if not exists fitness_goals (
  id         bigint generated always as identity primary key,
  text       text not null,
  done       boolean not null default false,
  created_at timestamptz not null default now()
);

alter table health_profile enable row level security;
alter table weight_logs    enable row level security;
alter table fitness_goals  enable row level security;

create policy "public read health_profile" on health_profile for select using (true);
create policy "public read weight_logs"     on weight_logs     for select using (true);
create policy "public read fitness_goals"   on fitness_goals   for select using (true);

create policy "auth write health_profile" on health_profile for all to authenticated using (true) with check (true);
create policy "auth write weight_logs"     on weight_logs     for all to authenticated using (true) with check (true);
create policy "auth write fitness_goals"   on fitness_goals   for all to authenticated using (true) with check (true);

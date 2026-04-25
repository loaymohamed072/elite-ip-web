-- ============================================================
-- Elite IP Client Portal — Supabase Schema
-- Apply this in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- UUID extension (already enabled in Supabase, but safe to repeat)
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- 1. profiles — mirrors auth.users, stores role
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  email       text,
  role        text not null default 'client'
                check (role in ('client', 'admin')),
  created_at  timestamptz not null default now()
);

-- 2. clients — law firm client records
create table if not exists public.clients (
  id           uuid primary key default uuid_generate_v4(),
  profile_id   uuid references public.profiles(id) on delete set null,
  full_name    text not null,
  email        text not null,
  phone        text,
  company_name text,
  created_at   timestamptz not null default now()
);

-- 3. matters — IP matters / cases
create table if not exists public.matters (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid not null references public.clients(id) on delete cascade,
  title         text not null,
  matter_type   text not null,
  current_stage text not null default 'Intake Received',
  progress      integer not null default 12
                  check (progress between 0 and 100),
  status        text not null default 'Active',
  next_step     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 4. matter_updates — timeline updates visible to client
create table if not exists public.matter_updates (
  id               uuid primary key default uuid_generate_v4(),
  matter_id        uuid not null references public.matters(id) on delete cascade,
  update_title     text not null,
  update_body      text not null,
  visible_to_client boolean not null default true,
  created_by       uuid references public.profiles(id) on delete set null,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_clients_profile_id      on public.clients(profile_id);
create index if not exists idx_matters_client_id       on public.matters(client_id);
create index if not exists idx_matters_updated_at      on public.matters(updated_at desc);
create index if not exists idx_updates_matter_id       on public.matter_updates(matter_id);
create index if not exists idx_updates_visible         on public.matter_updates(matter_id, visible_to_client);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- updated_at auto-maintenance on matters
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_matters_updated_at on public.matters;
create trigger trg_matters_updated_at
  before update on public.matters
  for each row execute function public.set_updated_at();

-- Auto-create profile on auth.users insert
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'client')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- ROLE HELPER — used by RLS policies
-- ============================================================

create or replace function public.get_user_role()
returns text language sql security definer stable as $$
  select role from public.profiles where id = auth.uid();
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles      enable row level security;
alter table public.clients       enable row level security;
alter table public.matters       enable row level security;
alter table public.matter_updates enable row level security;

-- ── Drop all policies first (makes schema re-runnable) ────

drop policy if exists "profiles_select_own"        on public.profiles;
drop policy if exists "profiles_select_admin"       on public.profiles;
drop policy if exists "profiles_insert_admin"       on public.profiles;
drop policy if exists "profiles_update_admin"       on public.profiles;

drop policy if exists "clients_select_own"          on public.clients;
drop policy if exists "clients_select_admin"        on public.clients;
drop policy if exists "clients_insert_admin"        on public.clients;
drop policy if exists "clients_update_admin"        on public.clients;

drop policy if exists "matters_select_own"          on public.matters;
drop policy if exists "matters_select_admin"        on public.matters;
drop policy if exists "matters_insert_admin"        on public.matters;
drop policy if exists "matters_update_admin"        on public.matters;

drop policy if exists "updates_select_own_visible"  on public.matter_updates;
drop policy if exists "updates_select_admin"        on public.matter_updates;
drop policy if exists "updates_insert_admin"        on public.matter_updates;
drop policy if exists "updates_update_admin"        on public.matter_updates;

-- ── profiles ──────────────────────────────────────────────

create policy "profiles_select_own"
  on public.profiles for select
  using (id = auth.uid());

create policy "profiles_select_admin"
  on public.profiles for select
  using (public.get_user_role() = 'admin');

create policy "profiles_insert_admin"
  on public.profiles for insert
  with check (public.get_user_role() = 'admin');

create policy "profiles_update_admin"
  on public.profiles for update
  using (public.get_user_role() = 'admin');

-- ── clients ───────────────────────────────────────────────

create policy "clients_select_own"
  on public.clients for select
  using (profile_id = auth.uid());

create policy "clients_select_admin"
  on public.clients for select
  using (public.get_user_role() = 'admin');

create policy "clients_insert_admin"
  on public.clients for insert
  with check (public.get_user_role() = 'admin');

create policy "clients_update_admin"
  on public.clients for update
  using (public.get_user_role() = 'admin');

-- ── matters ───────────────────────────────────────────────

create policy "matters_select_own"
  on public.matters for select
  using (
    client_id in (
      select id from public.clients
      where profile_id = auth.uid()
    )
  );

create policy "matters_select_admin"
  on public.matters for select
  using (public.get_user_role() = 'admin');

create policy "matters_insert_admin"
  on public.matters for insert
  with check (public.get_user_role() = 'admin');

create policy "matters_update_admin"
  on public.matters for update
  using (public.get_user_role() = 'admin');

-- ── matter_updates ────────────────────────────────────────

create policy "updates_select_own_visible"
  on public.matter_updates for select
  using (
    visible_to_client = true
    and matter_id in (
      select m.id from public.matters m
      join public.clients c on c.id = m.client_id
      where c.profile_id = auth.uid()
    )
  );

create policy "updates_select_admin"
  on public.matter_updates for select
  using (public.get_user_role() = 'admin');

create policy "updates_insert_admin"
  on public.matter_updates for insert
  with check (public.get_user_role() = 'admin');

create policy "updates_update_admin"
  on public.matter_updates for update
  using (public.get_user_role() = 'admin');
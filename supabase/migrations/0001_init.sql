-- SUPPLY POWER GROUP — schema initial
-- A executer dans l'editeur SQL du projet Supabase (Database > SQL Editor).

-- ============================================================
-- 1. PROFILES
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  company text,
  phone text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (
    auth.uid() = id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-creation du profil a l'inscription (auth.users -> public.profiles)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, company, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'company',
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 2. QUOTE REQUESTS (demandes de devis / etude)
-- ============================================================
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete cascade,
  full_name text not null,
  company text,
  email text not null,
  phone text not null,
  assistance_type text not null,
  equipment_type text,
  power_kva integer,
  location text,
  description text not null,
  status text not null default 'received'
    check (status in ('received', 'in_review', 'quote_sent', 'validated', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

create policy "quote_requests_select_own_or_admin"
  on public.quote_requests for select
  using (
    client_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "quote_requests_insert_own"
  on public.quote_requests for insert
  with check (client_id = auth.uid());

create policy "quote_requests_update_admin"
  on public.quote_requests for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_quote_requests_updated on public.quote_requests;
create trigger on_quote_requests_updated
  before update on public.quote_requests
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- 3. MESSAGES (fil de discussion par demande)
-- ============================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "messages_select_participants"
  on public.messages for select
  using (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id
        and (
          qr.client_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

create policy "messages_insert_participants"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id
        and (
          qr.client_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

-- Realtime sur les messages (messagerie instantanee)
alter publication supabase_realtime add table public.messages;

-- ============================================================
-- 4. Index utiles
-- ============================================================
create index if not exists idx_quote_requests_client_id on public.quote_requests (client_id);
create index if not exists idx_quote_requests_status on public.quote_requests (status);
create index if not exists idx_messages_quote_request_id on public.messages (quote_request_id);

-- ============================================================
-- 5. Premier compte admin (a executer manuellement APRES inscription)
-- ============================================================
-- update public.profiles set role = 'admin' where id = '<uuid-du-compte-exauce-matadi>';

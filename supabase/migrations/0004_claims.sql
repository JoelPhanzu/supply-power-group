-- SUPPLY POWER GROUP — module reclamations (SAV)
-- A executer dans l'editeur SQL du projet Supabase (Database > SQL Editor).

-- ============================================================
-- 1. CLAIMS (reclamation sur une demande de devis / commande)
-- ============================================================
create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests (id) on delete cascade,
  client_id uuid not null references public.profiles (id) on delete cascade,
  subject text not null,
  description text not null,
  status text not null default 'open'
    check (status in ('open', 'in_progress', 'resolved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.claims enable row level security;

create policy "claims_select_own_or_admin"
  on public.claims for select
  using (
    client_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "claims_insert_own"
  on public.claims for insert
  with check (
    client_id = auth.uid()
    and exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id and qr.client_id = auth.uid()
    )
  );

create policy "claims_update_admin"
  on public.claims for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop trigger if exists on_claims_updated on public.claims;
create trigger on_claims_updated
  before update on public.claims
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- 2. CLAIM MESSAGES (droit de reponse client + administrateur)
-- ============================================================
create table if not exists public.claim_messages (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid not null references public.claims (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.claim_messages enable row level security;

create policy "claim_messages_select_participants"
  on public.claim_messages for select
  using (
    exists (
      select 1 from public.claims c
      where c.id = claim_id
        and (
          c.client_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

create policy "claim_messages_insert_participants"
  on public.claim_messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.claims c
      where c.id = claim_id
        and (
          c.client_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

-- Realtime sur les reponses de reclamation (suivi instantane)
alter publication supabase_realtime add table public.claim_messages;

-- ============================================================
-- 3. Index utiles
-- ============================================================
create index if not exists idx_claims_quote_request_id on public.claims (quote_request_id);
create index if not exists idx_claims_client_id on public.claims (client_id);
create index if not exists idx_claims_status on public.claims (status);
create index if not exists idx_claim_messages_claim_id on public.claim_messages (claim_id);

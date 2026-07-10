-- SUPPLY POWER GROUP — correction de la recursion RLS sur profiles
-- A executer dans l'editeur SQL du projet Supabase (Database > SQL Editor).
--
-- Les policies "*_select_own_or_admin" et "*_update_admin" verifiaient le role
-- admin via "exists (select 1 from public.profiles where ...)" directement
-- dans la policy de profiles elle-meme : Postgres relance la RLS de profiles
-- pour ce sous-select, qui la relance a nouveau, etc. -> erreur 42P17
-- "infinite recursion detected in policy for relation profiles".
--
-- Fix : une fonction security definer qui contourne le RLS pour cette
-- verification, utilisee partout a la place du sous-select direct.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================
-- profiles
-- ============================================================
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (
    auth.uid() = id
    or public.is_admin()
  );

-- ============================================================
-- quote_requests
-- ============================================================
drop policy if exists "quote_requests_select_own_or_admin" on public.quote_requests;
create policy "quote_requests_select_own_or_admin"
  on public.quote_requests for select
  using (
    client_id = auth.uid()
    or public.is_admin()
  );

drop policy if exists "quote_requests_update_admin" on public.quote_requests;
create policy "quote_requests_update_admin"
  on public.quote_requests for update
  using (public.is_admin());

-- ============================================================
-- messages
-- ============================================================
drop policy if exists "messages_select_participants" on public.messages;
create policy "messages_select_participants"
  on public.messages for select
  using (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id
        and (
          qr.client_id = auth.uid()
          or public.is_admin()
        )
    )
  );

drop policy if exists "messages_insert_participants" on public.messages;
create policy "messages_insert_participants"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id
        and (
          qr.client_id = auth.uid()
          or public.is_admin()
        )
    )
  );

-- ============================================================
-- claims
-- ============================================================
drop policy if exists "claims_select_own_or_admin" on public.claims;
create policy "claims_select_own_or_admin"
  on public.claims for select
  using (
    client_id = auth.uid()
    or public.is_admin()
  );

drop policy if exists "claims_update_admin" on public.claims;
create policy "claims_update_admin"
  on public.claims for update
  using (public.is_admin());

-- ============================================================
-- claim_messages
-- ============================================================
drop policy if exists "claim_messages_select_participants" on public.claim_messages;
create policy "claim_messages_select_participants"
  on public.claim_messages for select
  using (
    exists (
      select 1 from public.claims c
      where c.id = claim_id
        and (
          c.client_id = auth.uid()
          or public.is_admin()
        )
    )
  );

drop policy if exists "claim_messages_insert_participants" on public.claim_messages;
create policy "claim_messages_insert_participants"
  on public.claim_messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.claims c
      where c.id = claim_id
        and (
          c.client_id = auth.uid()
          or public.is_admin()
        )
    )
  );

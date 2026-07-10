-- SUPPLY POWER GROUP — autoriser les demandes de devis anonymes
-- A executer dans l'editeur SQL du projet Supabase (Database > SQL Editor).
-- Le formulaire de contact public doit pouvoir creer une demande de devis
-- meme si le visiteur n'a pas de compte.

alter table public.quote_requests
  alter column client_id drop not null;

drop policy if exists "quote_requests_insert_own" on public.quote_requests;

create policy "quote_requests_insert_own_or_anonymous"
  on public.quote_requests for insert
  with check (
    client_id is null
    or client_id = auth.uid()
  );

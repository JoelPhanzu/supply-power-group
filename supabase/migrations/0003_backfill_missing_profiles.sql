-- SUPPLY POWER GROUP — backfill des profils manquants
-- A executer dans l'editeur SQL du projet Supabase (Database > SQL Editor).
-- Corrige les comptes crees dans auth.users AVANT que le trigger
-- handle_new_user (migration 0001) n'existe : ils n'ont pas de ligne
-- correspondante dans public.profiles, ce qui fait echouer toute
-- insertion dans quote_requests (contrainte de cle etrangere client_id)
-- pour ces comptes une fois connectes.

insert into public.profiles (id, full_name, company, phone)
select
  u.id,
  u.raw_user_meta_data ->> 'full_name',
  u.raw_user_meta_data ->> 'company',
  u.raw_user_meta_data ->> 'phone'
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
);

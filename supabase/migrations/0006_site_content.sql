-- SUPPLY POWER GROUP — gestion du contenu du site par l'administrateur
-- Textes : table public.site_content (une ligne JSON par section du site).
-- Photos : bucket de stockage public "site-media".

-- ============================================================
-- 1. SITE CONTENT
-- ============================================================
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id) on delete set null
);

alter table public.site_content enable row level security;

drop policy if exists "site_content_select_public" on public.site_content;
create policy "site_content_select_public"
  on public.site_content for select
  using (true);

drop policy if exists "site_content_insert_admin" on public.site_content;
create policy "site_content_insert_admin"
  on public.site_content for insert
  with check (public.is_admin());

drop policy if exists "site_content_update_admin" on public.site_content;
create policy "site_content_update_admin"
  on public.site_content for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "site_content_delete_admin" on public.site_content;
create policy "site_content_delete_admin"
  on public.site_content for delete
  using (public.is_admin());

drop trigger if exists on_site_content_updated on public.site_content;
create trigger on_site_content_updated
  before update on public.site_content
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- 2. STORAGE : photos du site
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760, -- 10 Mo
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Lecture publique via l'URL publique du bucket ; l'écriture est réservée à l'admin.
drop policy if exists "site_media_admin_insert" on storage.objects;
create policy "site_media_admin_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.is_admin());

drop policy if exists "site_media_admin_update" on storage.objects;
create policy "site_media_admin_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.is_admin());

drop policy if exists "site_media_admin_delete" on storage.objects;
create policy "site_media_admin_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.is_admin());

drop policy if exists "site_media_admin_select" on storage.objects;
create policy "site_media_admin_select"
  on storage.objects for select to authenticated
  using (bucket_id = 'site-media' and public.is_admin());

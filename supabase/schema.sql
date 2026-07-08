-- Espacio Home — esquema de catalogo (Supabase)
-- Ejecutar en el SQL Editor del proyecto de Supabase.

create extension if not exists pgcrypto;

create table if not exists public.productos (
  id             uuid primary key default gen_random_uuid(),
  categoria      text not null check (categoria in ('dormitorio', 'bano', 'cocina', 'decoracion', 'organizacion')),
  seccion        text not null,
  nombre         text not null,
  descripcion    text,
  color          text,
  talle          text,
  material       text,
  foto_1         text,
  foto_2         text,
  whatsapp_link  text,
  activo         boolean not null default true,
  precio_costo   numeric(10, 2),
  precio_venta   numeric(10, 2),
  stock          integer,
  created_at     timestamptz not null default now()
);

comment on column public.productos.whatsapp_link is
  'Guardado por compatibilidad con la planilla Excel importada. La app arma el link de consulta dinamicamente (nombre + variante + WHATSAPP_NUMBER), no usa este campo para renderizar.';

create index if not exists productos_categoria_idx on public.productos (categoria);
create index if not exists productos_activo_idx on public.productos (activo);

-- Row Level Security: catalogo publico, solo lectura, solo productos activos.
-- No hay login de usuarios: el rol "anon" (anon key del front) es el unico que consulta esta tabla.
alter table public.productos enable row level security;

drop policy if exists "productos_publicos_select" on public.productos;
create policy "productos_publicos_select"
  on public.productos
  for select
  to anon
  using (activo = true);

-- Storage: bucket publico para foto_1 / foto_2.
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do nothing;

drop policy if exists "productos_fotos_publicas" on storage.objects;
create policy "productos_fotos_publicas"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'productos');

# Espacio Home — Catálogo

Catálogo online de Espacio Home (blanquería y deco). Next.js + Tailwind + Supabase. Sin carrito ni login: toda consulta se cierra por WhatsApp.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres, solo lectura pública vía RLS)
- Deploy: Vercel

## Setup local

1. Instalar dependencias:
   ```
   npm install
   ```
2. Crear un proyecto en [supabase.com](https://supabase.com), y correr `supabase/schema.sql` en el SQL Editor (crea la tabla `productos`, la policy de RLS de solo lectura para `activo = true`, y el bucket público `productos` en Storage).
3. Copiar `.env.local.example` a `.env.local` y completar:
   - `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API en Supabase)
   - `WHATSAPP_NUMBER` (número real del cliente en formato internacional, sin `+` ni espacios — ej `5493513450795`)
4. Cargar los 38 productos de `EspacioHome_Productos.xlsx`:
   - Generar el SQL: `npm install --save-dev xlsx && node scripts/import-productos.mjs && npm uninstall xlsx` (crea `supabase/seed_productos.sql`).
   - Correrlo en el SQL Editor de Supabase.
   - Subir las fotos al bucket `productos` de Storage con el mismo nombre de archivo que figura en la planilla (columnas `FOTO 1`/`FOTO 2`) — el SQL ya generó las URLs públicas esperadas para esos nombres. Los productos sin foto en la planilla (Bata de Baño, Set Recipientes Baño, Estrella de Macramé, Bolso Estrella) muestran el placeholder "Foto próximamente" hasta que se agreguen.
   - `precio_costo`/`precio_venta`/`stock` quedan en null (la planilla todavía no los tiene completos) — completarlos directo en la tabla `productos` cuando el cliente los confirme.
5. Correr en desarrollo:
   ```
   npm run dev
   ```

## Deploy

1. Subir el repo a GitHub.
2. Importar el repo en [vercel.com](https://vercel.com).
3. Cargar las mismas 3 variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `WHATSAPP_NUMBER`) en Project Settings → Environment Variables.
4. Deploy.

Antes de publicar: reemplazar `WHATSAPP_NUMBER` por el número definitivo del cliente (ver `EspacioHome_Resumen_Completo_1.docx`, el número actual es de prueba).

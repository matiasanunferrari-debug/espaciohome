// Lee EspacioHome_Productos.xlsx y genera supabase/seed_productos.sql
//
// Uso (xlsx no queda instalado de forma permanente: tiene vulnerabilidades sin parchear
// y solo hace falta para este script puntual):
//   npm install --save-dev xlsx
//   node scripts/import-productos.mjs
//   npm uninstall xlsx
//
// Por que genera SQL en vez de insertar directo:
// la anon key del proyecto solo tiene permiso de lectura (RLS de productos_publicos_select).
// Insertar requiere la service_role key, que no conviene pegar en un script/env local.
// El SQL generado se corre a mano en el SQL Editor de Supabase, igual que schema.sql.

import xlsx from 'xlsx';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const excelPath = join(root, 'EspacioHome_Productos.xlsx');
const outPath = join(root, 'supabase', 'seed_productos.sql');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? readEnvLocal('NEXT_PUBLIC_SUPABASE_URL');

function readEnvLocal(key) {
  try {
    const content = readFileSync(join(root, '.env.local'), 'utf-8');
    const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
    return match ? match[1].trim() : '';
  } catch {
    return '';
  }
}

const CATEGORIA_MAP = [
  [/dormitorio/i, 'dormitorio'],
  [/ba[ñn]o/i, 'bano'],
  [/cocina/i, 'cocina'],
  [/decoraci[oó]n/i, 'decoracion'],
  [/organizaci[oó]n/i, 'organizacion'],
];

function mapCategoria(raw) {
  const found = CATEGORIA_MAP.find(([re]) => re.test(raw));
  if (!found) throw new Error(`Categoria no reconocida: "${raw}"`);
  return found[1];
}

function sqlString(value) {
  if (value === null || value === undefined || value === '') return 'null';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlNumber(value) {
  if (value === null || value === undefined || value === '') return 'null';
  const n = Number(value);
  return Number.isFinite(n) ? String(n) : 'null';
}

function fotoUrl(filename) {
  if (!filename) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/productos/${encodeURIComponent(String(filename).trim())}`;
}

const workbook = xlsx.readFile(excelPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 3, defval: '' });
// range: 3 -> arranca en la fila 4 (0-indexed), donde empiezan los datos reales
// (filas 1-3 son titulo, nota y encabezados de columna)

let categoriaActual = '';
let seccionActual = '';
const values = [];

for (const row of rows) {
  const [categoria, seccion, nombre, descripcion, color, talle, material, , , , stock, foto1, foto2, wspLink, activo] = row;

  if (!nombre) continue; // fila vacia de separacion

  if (categoria) categoriaActual = categoria;
  if (seccion) seccionActual = seccion;

  values.push({
    categoria: mapCategoria(categoriaActual),
    seccion: seccionActual,
    nombre,
    descripcion: descripcion || null,
    color: color || null,
    talle: talle || null,
    material: material || null,
    foto_1: fotoUrl(foto1),
    foto_2: fotoUrl(foto2),
    whatsapp_link: wspLink || null,
    activo: String(activo).trim().toUpperCase() === 'SI',
    stock: stock === '' ? null : stock,
  });
}

const inserts = values.map((v) => {
  const cols = ['categoria', 'seccion', 'nombre', 'descripcion', 'color', 'talle', 'material', 'foto_1', 'foto_2', 'whatsapp_link', 'activo', 'stock'];
  const rowValues = [
    sqlString(v.categoria),
    sqlString(v.seccion),
    sqlString(v.nombre),
    sqlString(v.descripcion),
    sqlString(v.color),
    sqlString(v.talle),
    sqlString(v.material),
    sqlString(v.foto_1),
    sqlString(v.foto_2),
    sqlString(v.whatsapp_link),
    v.activo,
    sqlNumber(v.stock),
  ];
  return `  (${cols.map((c, i) => rowValues[i]).join(', ')})`;
});

const sql = `-- Generado automaticamente por scripts/import-productos.mjs
-- Fuente: EspacioHome_Productos.xlsx (${values.length} productos)
-- Correr en el SQL Editor de Supabase.
--
-- precio_costo y precio_venta quedan en null: la planilla todavia no los tiene completos.
-- foto_1/foto_2 apuntan al bucket publico "productos" en Storage -- subir los archivos
-- con el mismo nombre que figura en la planilla para que las imagenes se vean.

insert into public.productos
  (categoria, seccion, nombre, descripcion, color, talle, material, foto_1, foto_2, whatsapp_link, activo, stock)
values
${inserts.join(',\n')}
;
`;

writeFileSync(outPath, sql, 'utf-8');
console.log(`OK: ${values.length} productos -> ${outPath}`);

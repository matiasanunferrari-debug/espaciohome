export type Categoria = 'dormitorio' | 'bano' | 'cocina' | 'decoracion' | 'organizacion';

export const CATEGORIAS: { value: Categoria; label: string; emoji: string }[] = [
  { value: 'dormitorio', label: 'Dormitorio', emoji: '🛏️' },
  { value: 'bano', label: 'Baño', emoji: '🛁' },
  { value: 'cocina', label: 'Cocina', emoji: '🍽️' },
  { value: 'decoracion', label: 'Decoración', emoji: '🌿' },
  { value: 'organizacion', label: 'Organización', emoji: '🧺' },
];

export interface Producto {
  id: string;
  categoria: Categoria;
  seccion: string;
  nombre: string;
  descripcion: string | null;
  color: string | null;
  talle: string | null;
  material: string | null;
  foto_1: string | null;
  foto_2: string | null;
  whatsapp_link: string | null;
  activo: boolean;
  precio_costo: number | null;
  precio_venta: number | null;
  stock: number | null;
  created_at: string;
}

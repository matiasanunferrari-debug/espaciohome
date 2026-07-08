import type { Producto } from '@/types/producto';

// Combina color + talle en el texto de variante que se muestra entre parentesis.
// El material queda afuera: es un dato informativo de la ficha, no hace falta en el mensaje.
export function buildVariante(producto: Pick<Producto, 'color' | 'talle'>): string | null {
  const partes = [producto.color, producto.talle].filter((v): v is string => Boolean(v && v.trim()));
  return partes.length > 0 ? partes.join(', ') : null;
}

export function buildWhatsAppLink(numero: string, nombre: string, variante?: string | null): string {
  const mensaje = variante ? `Hola! Quiero consultar por ${nombre} (${variante})` : `Hola! Quiero consultar por ${nombre}`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

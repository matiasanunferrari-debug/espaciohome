import { supabase } from '@/lib/supabase/client';
import type { Producto } from '@/types/producto';

export async function getProductosActivos(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error al traer productos de Supabase:', error.message);
    return [];
  }

  return data ?? [];
}

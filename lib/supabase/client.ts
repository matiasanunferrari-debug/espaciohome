import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Solo lectura publica (sin login): la RLS de la tabla productos ya restringe
// a activo = true para el rol anon, asi que este cliente es seguro de usar
// tanto en Server como en Client Components.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

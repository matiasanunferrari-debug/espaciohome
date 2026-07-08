import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { getProductosActivos } from '@/lib/supabase/queries';

export const revalidate = 60;

export default async function Home() {
  const productos = await getProductosActivos();

  return (
    <>
      <Header />
      <Hero />
      <ProductGrid productos={productos} />
      <Contact />
      <Footer />
    </>
  );
}

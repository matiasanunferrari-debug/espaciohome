'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { CATEGORIAS, type Categoria, type Producto } from '@/types/producto';

type Filtro = 'todos' | Categoria;

export function ProductGrid({ productos }: { productos: Producto[] }) {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const visibles = useMemo(
    () => (filtro === 'todos' ? productos : productos.filter((p) => p.categoria === filtro)),
    [productos, filtro],
  );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 border-b border-borde bg-white px-8 py-4">
        <button
          type="button"
          onClick={() => setFiltro('todos')}
          className={`whitespace-nowrap rounded-full border px-4 py-[0.4rem] text-[0.75rem] uppercase tracking-[0.1em] transition-all ${
            filtro === 'todos'
              ? 'border-verde bg-verde text-white'
              : 'border-borde bg-transparent text-texto-suave hover:border-verde hover:bg-verde hover:text-white'
          }`}
        >
          Todos
        </button>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setFiltro(cat.value)}
            className={`whitespace-nowrap rounded-full border px-4 py-[0.4rem] text-[0.75rem] uppercase tracking-[0.1em] transition-all ${
              filtro === cat.value
                ? 'border-verde bg-verde text-white'
                : 'border-borde bg-transparent text-texto-suave hover:border-verde hover:bg-verde hover:text-white'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <section id="productos" className="mx-auto max-w-[1200px] px-8 py-16">
        <h2 className="mb-[0.4rem] font-serif text-[2rem] tracking-[0.04em] text-texto">Catálogo</h2>
        <p className="mb-10 text-[0.85rem] text-texto-suave">
          Consultá por cualquier producto y te respondemos por WhatsApp.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] sm:gap-6">
          {visibles.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        {visibles.length === 0 && (
          <p className="py-12 text-center text-[0.85rem] text-texto-suave">
            No hay productos en esta categoría por el momento.
          </p>
        )}
      </section>
    </>
  );
}

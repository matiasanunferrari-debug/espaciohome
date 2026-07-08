import Image from 'next/image';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { buildVariante, buildWhatsAppLink } from '@/lib/whatsapp';
import type { Producto } from '@/types/producto';

function formatPrecio(precio: number | null): string {
  if (precio === null) return 'Consultar precio';
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(
    precio,
  );
}

export function ProductCard({ producto }: { producto: Producto }) {
  const variante = buildVariante(producto);
  const numero = process.env.WHATSAPP_NUMBER ?? '';
  const wspHref = buildWhatsAppLink(numero, producto.nombre, variante);

  const detalle = [producto.color, producto.talle, producto.material].filter(Boolean).join(' · ');

  return (
    <div className="overflow-hidden rounded-[4px] border border-borde bg-white transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(74,124,89,0.10)]">
      {producto.foto_1 ? (
        <div className="relative aspect-square w-full bg-crema">
          <Image src={producto.foto_1} alt={producto.nombre} fill className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-[0.4rem] bg-crema-oscura text-texto-suave">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="opacity-30">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21l4-4 4 4" />
          </svg>
          <span className="text-[0.72rem] uppercase tracking-[0.1em] opacity-50">Foto próximamente</span>
        </div>
      )}

      <div className="px-[1.1rem] pb-[1.2rem] pt-4">
        <p className="mb-[0.3rem] text-[0.68rem] uppercase tracking-[0.12em] text-verde">{producto.seccion}</p>
        <p className="mb-[0.2rem] font-serif text-[1.1rem] leading-[1.3] text-texto">{producto.nombre}</p>
        {detalle && <p className="mb-[0.6rem] text-[0.78rem] text-texto-suave">{detalle}</p>}
        <p className="mb-[0.9rem] text-[0.78rem] font-medium uppercase tracking-[0.08em] text-texto-suave">
          {formatPrecio(producto.precio_venta)}
        </p>
        <WhatsAppButton href={wspHref} />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-crema px-8 py-24 text-center before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_70%_50%,rgba(74,124,89,0.07)_0%,transparent_70%)]"
    >
      <div className="relative max-w-[600px]">
        <p className="mb-[1.2rem] text-[0.72rem] uppercase tracking-[0.22em] text-verde">
          Textiles &amp; Decoración para el hogar
        </p>
        <h1 className="mb-[1.2rem] font-serif text-[clamp(2.8rem,6vw,4.5rem)] font-light leading-[1.1] tracking-[0.02em] text-texto">
          Tu hogar,
          <br />
          <em className="italic text-verde">tu espacio</em>
        </h1>
        <p className="mx-auto mb-8 max-w-[400px] text-[0.95rem] leading-[1.7] text-texto-suave">
          Encontrá ropa de cama, toallas, almohadones y accesorios para transformar cada rincón de tu casa.
        </p>
        <a
          href="#productos"
          className="inline-block rounded-sm bg-verde px-8 py-[0.85rem] text-[0.78rem] uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-px hover:bg-verde-claro"
        >
          Ver catálogo
        </a>
      </div>
    </section>
  );
}

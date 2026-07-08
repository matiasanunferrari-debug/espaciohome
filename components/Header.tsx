'use client';

import { useState } from 'react';

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[100] flex h-16 items-center justify-between border-b border-borde bg-white px-8">
        <a href="#inicio" className="font-serif text-2xl tracking-[0.12em] text-texto">
          Espacio Home
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.78rem] tracking-[0.14em] text-texto-suave uppercase transition-colors hover:text-verde"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          className="flex flex-col gap-[5px] border-none bg-transparent p-1 sm:hidden"
        >
          <span className="block h-[1.5px] w-[22px] bg-texto transition-all" />
          <span className="block h-[1.5px] w-[22px] bg-texto transition-all" />
          <span className="block h-[1.5px] w-[22px] bg-texto transition-all" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-16 z-[99] flex flex-col gap-[1.2rem] border-b border-borde bg-white px-8 py-6 sm:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[0.85rem] tracking-[0.12em] text-texto-suave uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

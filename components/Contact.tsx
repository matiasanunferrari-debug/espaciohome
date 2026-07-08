import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export function Contact() {
  const numero = process.env.WHATSAPP_NUMBER ?? '';
  const mensaje = 'Hola! Quiero hacer una consulta sobre sus productos';
  const href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <section id="contacto" className="border-t border-borde bg-crema px-8 py-20 text-center">
      <div className="mx-auto max-w-[500px]">
        <h2 className="mb-[0.4rem] font-serif text-[2rem] tracking-[0.04em] text-texto">Contacto</h2>
        <p className="mb-8 text-[0.85rem] text-texto-suave">
          ¿Tenés alguna consulta? Escribinos directo por WhatsApp.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 inline-flex items-center gap-[0.6rem] rounded-sm bg-[#25d366] px-8 py-[0.9rem] text-[0.85rem] font-medium uppercase tracking-[0.1em] text-white transition-all hover:-translate-y-px hover:opacity-90"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Escribinos por WhatsApp
        </a>
        <p className="text-[0.82rem] leading-[1.8] text-texto-suave">
          Respondemos de lunes a sábado
          <br />
          📍 Córdoba, Argentina
        </p>
      </div>
    </section>
  );
}

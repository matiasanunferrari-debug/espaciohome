import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export function WhatsAppButton({ href, label = 'Consultar' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-[0.45rem] rounded-sm bg-verde px-[0.65rem] py-[0.65rem] text-[0.75rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-verde-claro"
    >
      <WhatsAppIcon className="h-4 w-4 shrink-0" />
      {label}
    </a>
  );
}

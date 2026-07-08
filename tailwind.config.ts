import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        verde: '#4a7c59',
        'verde-claro': '#6a9e77',
        crema: '#f7f4ef',
        'crema-oscura': '#ede9e1',
        texto: '#2a2a2a',
        'texto-suave': '#7a7a7a',
        borde: '#e0dbd2',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

'use client';

import { motion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';

/* Pictogrammes au trait 1,5 px, grille 24 px (mêmes tracés que le Figma). */
const PATHS: Record<string, ReactNode> = {
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  clarify: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>,
  build: <><path d="M12 4l8.5 4.5L12 13 3.5 8.5z" /><path d="M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5" /></>,
  rise: <><path d="M4 18l6-6 4 4 6-8" /><path d="M15 8h5v5" /></>,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
};
export type IconName = keyof typeof PATHS;

export function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {PATHS[name]}
    </svg>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
      <span className="size-1.5 rounded-full bg-vert-500 shadow-[0_0_8px_var(--color-vert-500)]" />
      {children}
    </span>
  );
}

export function Button({ children, href = '#tarifs', variant = 'primaire', arrow = true, size = 'L', className = '' }: {
  children: ReactNode; href?: string; variant?: 'primaire' | 'secondaire'; arrow?: boolean; size?: 'M' | 'L'; className?: string;
}) {
  const base = size === 'L' ? 'text-base py-2 pl-6 pr-2 gap-3' : 'text-sm py-1.5 pl-4 pr-1.5 gap-3';
  const look = variant === 'primaire'
    ? 'bg-texte text-fond hover:bg-vert-300'
    : 'glass text-texte hover:border-vert-500/60';
  return (
    <a href={href} className={`group inline-flex items-center justify-center rounded-full font-semibold transition-colors ${base} ${look} ${arrow ? '' : size === 'L' ? 'pr-6' : 'pr-4'} ${className}`}>
      {children}
      {arrow && (
        <span className={`grid place-items-center rounded-full transition-transform group-hover:translate-x-0.5 ${size === 'L' ? 'size-8' : 'size-6'} ${variant === 'primaire' ? 'bg-fond text-texte' : 'bg-bordure'}`}>
          <Icon name="arrow" className={size === 'L' ? 'size-4' : 'size-3.5'} />
        </span>
      )}
    </a>
  );
}

export function Chip({ icon, size = 'M' }: { icon: IconName; size?: 'S' | 'M' | 'L' }) {
  const s = { S: 'size-8 rounded-lg', M: 'size-10 rounded-xl', L: 'size-12 md:size-14 rounded-2xl' }[size];
  const i = { S: 'size-4', M: 'size-5', L: 'size-6 md:size-7' }[size];
  return (
    <span className={`inline-grid shrink-0 place-items-center border border-vert-500 bg-vert-900 text-vert-300 shadow-[0_0_24px_rgb(34_197_122/0.35)] ${s}`}>
      <Icon name={icon} className={i} />
    </span>
  );
}

export type Seg = string | { icon: IconName };

/** Titre deux tons : la seconde ligne en gris, avec une pastille icône entre deux mots. */
export function Headline({ lines, hero = false }: { lines: Seg[][]; hero?: boolean }) {
  const Tag = hero ? 'h1' : 'h2';
  const size = hero ? 'text-[40px] md:text-[56px] leading-[1.12]' : 'text-[28px] md:text-[40px] leading-[1.2]';
  return (
    <Tag className={`font-display font-medium tracking-[-0.03em] text-balance text-center ${size}`}>
      {lines.map((line, i) => (
        <span key={i} className={`flex flex-wrap items-center justify-center gap-x-[0.28em] ${i > 0 ? 'text-texte-2' : ''}`}>
          {line.map((seg, j) => (typeof seg === 'string' ? <span key={j}>{seg}</span> : <Chip key={j} icon={seg.icon} size={hero ? 'L' : 'M'} />))}
        </span>
      ))}
    </Tag>
  );
}

export function SectionHead({ tag, lines, sub }: { tag: string; lines: Seg[][]; sub?: string }) {
  return (
    <Reveal className="flex flex-col items-center gap-4 text-center">
      <Tag>{tag}</Tag>
      <Headline lines={lines} />
      {sub && <p className="max-w-[560px] text-sm text-texte-2 md:text-base">{sub}</p>}
    </Reveal>
  );
}

/** Halo vert : dégradé radial flou, jamais de tache dure. */
export function Glow({ className = '', style, strength = 0.45 }: { className?: string; style?: CSSProperties; strength?: number }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-2xl ${className}`}
      style={{ background: `radial-gradient(closest-side, rgb(34 197 122 / ${strength}), transparent)`, ...style }}
    />
  );
}

/** Emplacement photo : l'image de public/images recouvre l'icône dès qu'elle existe. */
export function Photo({ src, className = '' }: { src: string; className?: string }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-emplacement text-texte-2 ${className}`}>
      <Icon name="image" className="size-8" />
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/images/${src})` }} />
    </div>
  );
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

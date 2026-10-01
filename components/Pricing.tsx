'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { OFFERS, VIDEOS } from './content';
import { Button, Glow, Icon, Photo, Reveal, SectionHead } from './ui';

export function VideoCard({ v, photo, className = '' }: { v: (typeof VIDEOS)[number]; photo: string; className?: string }) {
  return (
    <article className={`glass flex flex-col gap-4 rounded-3xl p-3 pb-5 ${className}`}>
      <div className="relative">
        <Photo src={photo} className="h-56 rounded-2xl" />
        <button aria-label={`Lire le témoignage de ${v.name}`} className="absolute inset-0 m-auto grid size-12 place-items-center rounded-full bg-texte text-fond shadow-[0_0_32px_rgb(34_197_122/0.5)] transition-transform hover:scale-105">
          <Icon name="play" className="size-5" />
        </button>
      </div>
      <p className="px-2 text-sm">{v.quote}</p>
      <div className="flex items-center gap-3 px-2">
        <Photo src={photo} className="size-8 rounded-full" />
        <div><p className="text-sm font-medium leading-tight">{v.name}</p><p className="text-xs text-texte-2">{v.role}</p></div>
      </div>
    </article>
  );
}

export default function Pricing() {
  const [active, setActive] = useState(OFFERS[0].id);
  const o = OFFERS.find((x) => x.id === active)!;
  return (
    <section id="tarifs" className="px-2 py-16 md:py-24">
      <SectionHead tag="Tarifs" lines={[['Un', { icon: 'check' }, 'prix'], ['un accompagnement complet']]} sub="Paiement en une fois ou en trois fois sans frais. Sans reconduction après les 90 jours." />
      <Reveal className="mt-8 flex justify-center">
        <div role="tablist" className="glass flex gap-1 rounded-full p-1">
          {OFFERS.map((x) => (
            <button key={x.id} role="tab" aria-selected={x.id === active} onClick={() => setActive(x.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${x.id === active ? 'text-texte' : 'text-texte-2 hover:text-texte'}`}>
              {x.id === active && <motion.span layoutId="tab" className="absolute inset-0 rounded-full border border-vert-500 bg-vert-900" transition={{ type: 'spring', duration: 0.4 }} />}
              <span className="relative">{x.tab}</span>
            </button>
          ))}
        </div>
      </Reveal>
      <Reveal className="mx-auto mt-8 grid max-w-[888px] gap-6 md:grid-cols-[1fr_384px]">
        <div className="glass relative flex flex-col gap-6 overflow-hidden rounded-3xl p-8">
          <Glow className="-right-24 -top-32 h-64 w-96" strength={0.35} />
          <AnimatePresence mode="wait">
            <motion.div key={o.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="relative flex flex-1 flex-col gap-6">
              <div>
                <p className="font-display text-xl font-semibold">{o.name}</p>
                <p className="mt-4 font-display text-[40px] font-medium leading-none tracking-[-0.03em]">{o.price}</p>
                <p className="mt-2 text-xs text-texte-2">{o.terms}</p>
              </div>
              <p className="text-sm text-texte-2">{o.desc}</p>
              <ul className="flex flex-col gap-3 border-t border-bordure pt-6 text-sm">
                {o.items.map((it) => <li key={it} className="flex items-center gap-3"><Icon name="check" className="size-5 text-vert-300" />{it}</li>)}
              </ul>
              <Button href="#faq" className="mt-auto w-full justify-between">{o.cta}</Button>
            </motion.div>
          </AnimatePresence>
        </div>
        <VideoCard v={{ name: 'Karim Haddad', role: 'Ex-ingénieur commercial', quote: "« En 90 jours, j'ai signé quatre clients et posé ma démission sereinement. »" }} photo="video-tarifs.jpg" />
      </Reveal>
    </section>
  );
}

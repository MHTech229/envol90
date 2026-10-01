'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { FAQ, VIDEOS } from './content';
import { VideoCard } from './Pricing';
import { Icon, SectionHead } from './ui';

export function Testimonials() {
  const loop = [...VIDEOS, ...VIDEOS];
  return (
    <section id="temoignages" className="py-16 md:py-24">
      <div className="px-2"><SectionHead tag="Témoignages" lines={[['Ce que nos'], ['clients', { icon: 'play' }, 'en disent']]} /></div>
      <div className="fade-x mt-12 overflow-hidden">
        <div className="marquee flex w-max gap-4 md:gap-6">
          {loop.map((v, i) => <VideoCard key={i} v={v} photo={`temoignage-${(i % VIDEOS.length) + 1}.jpg`} className="w-[300px] shrink-0 md:w-[360px]" />)}
        </div>
      </div>
    </section>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative px-2 pt-16 md:pt-24">
      <SectionHead tag="FAQ" lines={[['Vous vous', { icon: 'clarify' }, 'posez'], ['sûrement ces questions']]} />
      <ul className="relative z-10 mx-auto mt-12 flex max-w-[720px] flex-col gap-3">
        {FAQ.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <li key={q} className="glass rounded-2xl">
              <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-center gap-4 py-4 pl-6 pr-4 text-left font-medium">
                <span className="flex-1">{q}</span>
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg border transition-colors ${isOpen ? 'border-vert-500 bg-vert-900 text-vert-300' : 'border-bordure'}`}>
                  <Icon name={isOpen ? 'minus' : 'plus'} className="size-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden px-6 text-sm text-texte-2">
                    <span className="block pb-5">{a}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

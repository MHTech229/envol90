'use client';

import { motion } from 'motion/react';
import SpotlightCard from './reactbits/SpotlightCard';
import { COMPANIES } from './content';
import { Chip, Glow, Reveal, SectionHead } from './ui';

export function Companies() {
  return (
    <section className="px-2 py-12 md:py-14">
      <p className="mb-6 text-center text-xs font-medium text-texte-2">Nos clients venaient de</p>
      <ul className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-12 gap-y-4 md:justify-between">
        {COMPANIES.map((c) => <li key={c} className="font-display text-lg font-semibold text-texte-2/60 md:text-xl">{c}</li>)}
      </ul>
    </section>
  );
}

function Gauge() {
  const r = 56;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative size-32">
        <svg viewBox="0 0 128 128" className="size-full -rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="var(--color-bordure)" strokeWidth="8" />
          <motion.circle cx="64" cy="64" r={r} fill="none" stroke="var(--color-vert-500)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={c} initial={{ strokeDashoffset: c }} whileInView={{ strokeDashoffset: c * 0.1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 6px rgb(34 197 122 / 0.6))' }} />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-2xl font-medium">90 j</span>
      </div>
      <span className="glass rounded-full px-3 py-1 text-xs text-texte-2">Plan sur 90 jours</span>
    </div>
  );
}

function Chips() {
  return (
    <div className="flex items-center gap-3">
      <Chip icon="clarify" /><Chip icon="build" size="L" /><Chip icon="rise" />
    </div>
  );
}

function Bars() {
  return (
    <div className="flex w-64 flex-col gap-5">
      {([['Objectif revenu', '78 %', 0.78], ['Premiers clients', '3 sur 4', 0.75]] as const).map(([label, value, ratio]) => (
        <div key={label} className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between"><span className="text-texte-2">{label}</span><span className="text-vert-300">{value}</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-bordure">
            <motion.div className="h-full rounded-full bg-vert-500 shadow-[0_0_12px_var(--color-vert-500)]" initial={{ width: 0 }} whileInView={{ width: `${ratio * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const STEPS = [
  { title: 'Clarifier', desc: 'On définit votre offre, votre client idéal et le revenu dont vous avez besoin pour partir.', art: <Gauge /> },
  { title: 'Construire', desc: 'Vous fixez vos tarifs, créez votre présence en ligne et décrochez vos premiers rendez-vous.', art: <Chips /> },
  { title: 'Décoller', desc: 'Vous signez vos premiers clients et préparez votre départ avec un plan financier clair.', art: <Bars /> },
];

export default function Method() {
  return (
    <section id="methode" className="relative px-2 py-16 md:py-24">
      <SectionHead tag="Méthode" lines={[['Devenir indépendant'], ['avec Envol 90', { icon: 'check' }, 'est simple']]} sub="Trois étapes claires, une séance par semaine et des actions concrètes entre chaque séance." />
      <div className="relative mx-auto mt-12 grid max-w-[1200px] gap-4 md:grid-cols-3 md:gap-6">
        <Glow className="-bottom-40 left-1/2 h-[280px] w-[80%] -translate-x-1/2" strength={0.4} />
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <SpotlightCard className="glass h-full rounded-3xl p-3" spotlightColor="rgba(34, 197, 122, 0.18)">
              <div className="relative grid h-56 place-items-center overflow-hidden rounded-2xl bg-fond">
                <Glow className="-bottom-20 left-1/2 h-40 w-64 -translate-x-1/2" strength={0.3} />
                <div className="relative">{s.art}</div>
              </div>
              <div className="flex flex-col gap-2 px-2 pb-3 pt-5">
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-texte-2">{s.desc}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

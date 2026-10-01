'use client';

import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui';

/** Simulation d'appel découverte : [coach ?, message]. */
const MESSAGES: [boolean, string][] = [
  [false, "Je n'ai pas le temps de me lancer, je finis déjà mes semaines épuisé."],
  [true, "Je comprends. Si vous libériez 3 heures par semaine, qu'en feriez-vous ?"],
  [false, "Je travaillerais enfin sur mon idée de conseil en marketing. J'y pense depuis deux ans."],
  [true, 'Alors commençons par une séance de cadrage de 90 min pour la tester. On regarde vos créneaux ?'],
];

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [count, setCount] = useState(1);
  const [typing, setTyping] = useState(false);

  // Chaque message : indicateur de saisie, puis bulle. La conversation boucle tant qu'elle est visible.
  useEffect(() => {
    if (!inView) return;
    let t: ReturnType<typeof setTimeout>;
    const step = (i: number) => {
      if (i >= MESSAGES.length) {
        t = setTimeout(() => { setCount(0); step(0); }, 4000);
        return;
      }
      setTyping(true);
      t = setTimeout(() => {
        setTyping(false);
        setCount(i + 1);
        t = setTimeout(() => step(i + 1), 900);
      }, 1100);
    };
    step(0);
    return () => clearTimeout(t);
  }, [inView]);

  const nextIsCoach = count < MESSAGES.length && MESSAGES[count][0];

  return (
    <div ref={ref} className="glass w-full overflow-hidden rounded-3xl text-left">
      <div className="flex items-center gap-3 border-b border-bordure px-5 py-4">
        <div className="grid size-10 place-items-center rounded-full bg-emplacement text-texte-2"><Icon name="user" /></div>
        <div className="flex-1">
          <p className="text-sm font-medium">Appel découverte</p>
          <p className="flex items-center gap-1.5 text-xs text-texte-2"><span className="size-1.5 rounded-full bg-vert-500" />Coach Envol 90 · en ligne</p>
        </div>
        <span className="rounded-full border border-vert-500 bg-vert-900 px-3 py-1 text-xs font-medium">15 min</span>
      </div>

      <div className="flex h-[380px] flex-col justify-end gap-4 bg-fond/60 p-4 md:h-[400px] md:p-6">
        <AnimatePresence initial={false}>
          {MESSAGES.slice(0, count).map(([coach, msg]) => (
            <motion.div
              key={msg}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col gap-1 ${coach ? 'items-end' : 'items-start'}`}
            >
              <span className="text-xs text-texte-2">{coach ? 'Coach Envol 90' : 'Thomas'}</span>
              <p className={`max-w-[300px] px-4 py-3 text-sm ${coach ? 'rounded-2xl rounded-br-sm border border-vert-500 bg-vert-900' : 'rounded-2xl rounded-bl-sm border border-bordure bg-surface'}`}>{msg}</p>
            </motion.div>
          ))}
          {typing && (
            <motion.div key="typing" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`flex ${nextIsCoach ? 'justify-end' : 'justify-start'}`}>
              <span className="flex gap-1 rounded-2xl border border-bordure bg-surface px-4 py-3">
                {[0, 1, 2].map((d) => (
                  <motion.span key={d} className="size-1.5 rounded-full bg-texte-2" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-bordure p-3 md:p-4">
        <div className="flex items-center gap-2 rounded-full border border-bordure bg-surface py-1.5 pl-5 pr-1.5">
          <span className="flex-1 text-sm text-texte-2">Écrire un message</span>
          <span className="grid size-9 place-items-center rounded-full bg-texte text-fond"><Icon name="arrow" className="size-4" /></span>
        </div>
      </div>
    </div>
  );
}

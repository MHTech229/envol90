import SpotlightCard from './reactbits/SpotlightCard';
import { PROFILES } from './content';
import { Button, Icon, type IconName, Photo, Reveal, SectionHead } from './ui';

const POINT_ICONS: IconName[] = ['calendar', 'check', 'rise', 'user'];

export default function Results() {
  return (
    <section id="resultats" className="px-2 py-16 md:py-24">
      <SectionHead tag="Résultats clients" lines={[['Ils ont franchi'], ['le pas', { icon: 'user' }, 'avec nous']]} sub="Des salariés comme vous, devenus indépendants en 90 jours." />
      <div className="mx-auto mt-12 flex max-w-[880px] flex-col gap-4">
        {PROFILES.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className={i === 2 ? 'opacity-40 [mask-image:linear-gradient(#000,transparent)]' : ''}>
            <SpotlightCard className="glass flex flex-col gap-4 rounded-3xl p-4 md:flex-row md:gap-6" spotlightColor="rgba(34, 197, 122, 0.15)">
              <Photo src={p.photo} className="h-56 w-full shrink-0 rounded-2xl md:size-52" />
              <div className="flex shrink-0 flex-col gap-3 md:w-64">
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="text-xs text-texte-2">{p.path}</p>
                <ul className="flex flex-col gap-2 text-sm">
                  {p.points.map((pt, j) => (
                    <li key={pt} className="flex items-center gap-2"><Icon name={POINT_ICONS[j]} className="size-4 text-vert-300" />{pt}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-texte-2">{p.story}</p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="secondaire" size="M" arrow={false} href="#temoignages">Lire son histoire</Button>
                  <Button size="M">Réserver un appel</Button>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex justify-center"><Button variant="secondaire" size="M" arrow={false} href="#temoignages">Voir toutes les histoires</Button></div>
    </section>
  );
}

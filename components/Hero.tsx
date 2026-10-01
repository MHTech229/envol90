import LightRays from './reactbits/LightRays';
import { NAV } from './content';
import { Button, Glow, Headline, Photo, Reveal, Tag } from './ui';

export function Logo({ big = false }: { big?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-2 font-display font-semibold ${big ? 'text-3xl' : 'text-xl'}`}>
      <svg viewBox="0 0 24 24" className={big ? 'size-9' : 'size-6'} aria-hidden>
        <clipPath id="sky"><rect width="24" height="15" /></clipPath>
        <circle cx="12" cy="15" r="8" fill="var(--color-vert-500)" clipPath="url(#sky)" />
        <rect x="2" y="17" width="20" height="2" rx="1" fill="currentColor" />
        <rect x="6" y="21" width="12" height="2" rx="1" fill="currentColor" />
      </svg>
      Envol 90
    </a>
  );
}

function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
      <Logo />
      <ul className="hidden gap-10 text-sm font-medium text-texte-2 md:flex">
        {NAV.map(([label, href]) => (
          <li key={href}><a href={href} className="transition-colors hover:text-texte">{label}</a></li>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        <a href="#contact" className="hidden text-sm font-medium md:block">Se connecter</a>
        <Button variant="secondaire" size="M" arrow={false}>Réserver</Button>
      </div>
    </nav>
  );
}

export default function Hero() {
  return (
    <header className="glass relative overflow-hidden rounded-3xl md:rounded-[32px]">
      <div className="absolute inset-0 opacity-70">
        <LightRays raysOrigin="top-center" raysColor="#22c57a" raysSpeed={0.6} lightSpread={0.9} rayLength={1.3} fadeDistance={0.9} followMouse mouseInfluence={0.06} noiseAmount={0.06} distortion={0.03} />
      </div>
      <Glow className="-bottom-40 -left-48 h-[360px] w-[640px]" strength={0.55} />
      <Glow className="-bottom-40 -right-48 h-[360px] w-[640px]" strength={0.55} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-vert-500 to-transparent" />

      <Navbar />
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 pt-10 text-center md:px-10 md:pt-14">
        <Reveal><Tag>Bienvenue chez Envol 90</Tag></Reveal>
        <Reveal delay={0.05}><Headline hero lines={[['De salarié épuisé'], ['à indépendant', { icon: 'rise' }, 'serein']]} /></Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[600px] text-base text-texte-2 md:text-xl">Un accompagnement de 90 jours pour construire votre offre, signer vos premiers clients et quitter votre poste sans sauter dans le vide.</p>
        </Reveal>
        <Reveal delay={0.15}><Button>Réserver mon appel</Button></Reveal>

        <Reveal delay={0.2} className="relative mt-6 flex w-full max-w-[880px] flex-col items-center">
          <div className="glass relative z-10 -mb-5 flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-left">
            <Photo src="fondateur.jpg" className="size-8 rounded-full" />
            <div>
              <p className="text-sm font-medium leading-tight">Antoine Mercier</p>
              <p className="text-xs text-texte-2">Fondateur d&apos;Envol 90</p>
            </div>
          </div>
          <div className="glass relative w-full overflow-hidden rounded-3xl p-1.5 md:rounded-b-none md:p-2 md:pb-0">
            <Glow className="-bottom-24 left-1/2 h-[260px] w-[80%] -translate-x-1/2" strength={0.35} />
            <video className="relative block aspect-video w-full rounded-[20px] object-cover md:rounded-b-none" src="/videos/hero.mp4" poster="/images/fondateur.jpg" autoPlay muted loop playsInline preload="metadata" />
          </div>
        </Reveal>
      </div>
    </header>
  );
}

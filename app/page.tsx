import Faq, { Testimonials } from '../components/Faq';
import Hero, { Logo } from '../components/Hero';
import Method, { Companies } from '../components/Method';
import Pricing from '../components/Pricing';
import Results from '../components/Results';
import { NAV } from '../components/content';
import LaserBeam from '../components/LaserBeam';
import { Button, Glow } from '../components/ui';

function Footer() {
  return (
    <footer id="contact" className="relative pb-6">
      <div className="relative -mb-10 h-80 md:h-[420px]"><LaserBeam height={0.95} intensity={1.2} fog={0.8} /></div>
      <div className="glass relative flex flex-col justify-between gap-10 overflow-hidden rounded-3xl p-8 md:flex-row md:rounded-[32px] md:p-12">
        <Glow className="-bottom-32 -left-40 h-72 w-[560px]" strength={0.45} />
        <div className="relative flex flex-col items-start gap-6">
          <Logo big />
          <Button size="M">Réserver un appel</Button>
        </div>
        <div className="relative flex gap-16 text-sm text-texte-2">
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="hover:text-texte">Mentions légales</a></li>
            <li><a href="#" className="hover:text-texte">Confidentialité</a></li>
            <li><a href="mailto:contact@envol90.fr" className="hover:text-texte">contact@envol90.fr</a></li>
          </ul>
          <ul className="flex flex-col gap-3">
            {NAV.map(([label, href]) => <li key={href}><a href={href} className="hover:text-texte">{label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex flex-col justify-between gap-2 px-2 text-xs text-texte-2 md:flex-row">
        <p>© 2026 Envol 90. Tous droits réservés.</p>
        <p>Concept fictif, projet de portfolio MHT Global Services.</p>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="mx-auto max-w-[1440px] overflow-x-clip p-2 md:p-4">
      <Hero />
      <Companies />
      <Method />
      <Results />
      <div className="relative -mb-10 h-56"><LaserBeam height={0.85} intensity={0.6} /></div>
      <Pricing />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}

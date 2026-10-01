import type { Metadata } from 'next';
import { Hanken_Grotesk, Onest } from 'next/font/google';
import './globals.css';

const onest = Onest({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-onest' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-hanken' });

export const metadata: Metadata = {
  title: 'Envol 90 · De salarié épuisé à indépendant serein',
  description: 'Un accompagnement de 90 jours pour construire votre offre, signer vos premiers clients et quitter votre poste sereinement. Concept fictif, portfolio MHT Global Services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${onest.variable} ${hanken.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

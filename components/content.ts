// Contenus fictifs du concept Envol 90.
export const NAV = [['Méthode', '#methode'], ['Résultats', '#resultats'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']] as const;
export const COMPANIES = ['Norvalis', 'Groupe Altiva', 'Bellerive & Co', 'Transcéa', 'Maison Orphéo'];

export const PROFILES = [
  { name: 'Claire Morel', photo: 'client-claire.jpg', path: 'Ex-cheffe de projet · consultante PMO', points: ['90 jours de programme', 'Premier client en 3 semaines', '2 400 € le premier mois', '4 clients récurrents'], story: "J'avais peur de lâcher mon salaire. Avec un plan clair et un rendez-vous chaque semaine, j'ai signé mon premier contrat trois semaines après le lancement." },
  { name: 'Karim Haddad', photo: 'client-karim.jpg', path: 'Ex-ingénieur commercial · consultant avant-vente', points: ['90 jours de programme', 'Revenu doublé en 3 mois', '6 000 € de chiffre mensuel', '3 clients grands comptes'], story: 'Je pensais devoir repartir de zéro. On a transformé mon expertise en offre claire, et mes revenus ont suivi.' },
  { name: 'Julie Ferrand', photo: 'client-julie.jpg', path: 'Ex-responsable RH · consultante recrutement', points: ['90 jours de programme', 'Démission sereine en 4 mois', '6 mois de trésorerie', '5 clients récurrents'], story: 'Je suis partie avec six mois de trésorerie et un carnet de commandes. Aucune nuit blanche.' },
];

export const OFFERS = [
  { id: 'programme', tab: 'Programme Envol 90', name: 'Programme Envol 90', price: '1 290 €', terms: 'ou 3 x 450 €, sans frais', desc: "90 jours d'accompagnement pour passer de salarié à indépendant, étape par étape.", cta: 'Rejoindre le programme', items: ['12 séances individuelles', 'Construction de votre offre et de vos tarifs', 'Méthode pour trouver vos premiers clients', 'Modèles de devis, contrats et relances', 'Accès à la communauté des anciens'] },
  { id: 'cadrage', tab: 'Séance de cadrage', name: 'Séance de cadrage', price: '90 €', terms: 'Paiement unique', desc: "Une séance de 90 minutes pour clarifier votre projet et savoir s'il tient la route.", cta: 'Réserver ma séance', items: ['Diagnostic de votre situation', "Analyse de votre idée d'offre", "Plan d'action sur 30 jours", 'Compte rendu écrit', 'Questions par e-mail pendant 7 jours'] },
];

export const VIDEOS = [
  { name: 'Sophie Laurent', role: 'Ex-acheteuse', quote: "« L'accompagnement m'a donné un cadre et des échéances : j'ai démissionné avec trois clients signés. »" },
  { name: 'Marc Dubreuil', role: 'Ex-contrôleur de gestion', quote: "« Le rendez-vous hebdomadaire m'a évité de procrastiner. En deux mois, j'avais mes premiers clients. »" },
  { name: 'Nadia Benali', role: 'Ex-chargée de formation', quote: "« Ce qui m'a rassurée, c'est le plan financier. Je savais quand poser ma démission. »" },
  { name: 'Julien Roche', role: 'Ex-chef de produit', quote: "« Je pensais que prospecter n'était pas pour moi. Les scripts m'ont donné confiance dès le premier appel. »" },
  { name: 'Élodie Martin', role: 'Ex-juriste', quote: '« Des séances concrètes, sans jargon. Chaque semaine, trois actions précises à mener. »' },
];

export const FAQ = [
  ["Je n'ai pas le temps, est-ce vraiment pour moi ?", 'Le programme demande environ 3 heures par semaine, séances comprises. Tout est pensé pour avancer en gardant votre poste.'],
  ['Et si je ne trouve aucun client ?', 'Trouver vos premiers clients est au cœur de la phase Construire. Vous repartez avec une méthode de prospection et des scripts adaptés à votre métier.'],
  ["À qui s'adresse le programme ?", "Aux salariés avec au moins 5 ans d'expérience qui veulent vendre leur expertise en indépendant : conseil, formation, freelance."],
  ['Quand vais-je voir les premiers résultats ?', 'La plupart des personnes accompagnées décrochent leurs premiers rendez-vous entre la 4e et la 8e semaine.'],
  ['Suis-je engagé sur la durée ?', 'Le programme dure 90 jours, sans reconduction automatique. La séance de cadrage est sans engagement.'],
];

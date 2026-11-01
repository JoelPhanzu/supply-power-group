// Contenu éditable du site vitrine.
// Chaque section est stockée dans une ligne de la table public.site_content
// (key = nom de la section, value = JSON). Les valeurs ci-dessous servent de
// contenu par défaut tant que l'admin n'a rien modifié.

export interface SiteImage {
  url: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export const ICON_OPTIONS = [
  { value: "buildings", label: "Bâtiments" },
  { value: "gear", label: "Engrenage" },
  { value: "leaf", label: "Feuille" },
  { value: "lightning", label: "Éclair" },
  { value: "sun", label: "Soleil" },
  { value: "plug", label: "Prise" },
  { value: "gaspump", label: "Pompe à carburant" },
  { value: "truck", label: "Camion" },
  { value: "wrench", label: "Clé" },
  { value: "battery", label: "Batterie" },
  { value: "factory", label: "Usine" },
  { value: "shield", label: "Bouclier" },
] as const;

export const COLOR_OPTIONS = [
  { value: "blue", label: "Bleu" },
  { value: "green", label: "Vert" },
  { value: "orange", label: "Orange" },
] as const;

export type IconName = (typeof ICON_OPTIONS)[number]["value"];
export type ColorName = (typeof COLOR_OPTIONS)[number]["value"];

export interface SiteContent {
  brand: { logoLight: SiteImage; logoDark: SiteImage };
  seo: { title: string; description: string; ogImage: SiteImage };
  nav: { links: NavLink[]; ctaLabel: string };
  hero: {
    title: string;
    subtitle: string;
    image: SiteImage;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: { items: { value: string; label: string }[] };
  expertises: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: {
      icon: IconName;
      color: ColorName;
      title: string;
      intro: string;
      items: string[];
      linkLabel: string;
    }[];
  };
  mining: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    images: SiteImage[];
    blocks: { label: string; description: string }[];
  };
  simulator: {
    title: string;
    subtitle: string;
    cabineLabel: string;
    groupeLabel: string;
    solaireLabel: string;
    locations: string[];
    ctaLabel: string;
  };
  leadership: {
    eyebrow: string;
    title: string;
    body: string;
    cardEyebrow: string;
    personName: string;
    personRole: string;
    personPhoto: SiteImage;
    quote: string;
    phone: string;
    email: string;
  };
  contact: {
    title: string;
    subtitle: string;
    submitLabel: string;
    successMessage: string;
  };
  footer: {
    description: string;
    address: string;
    phone: string;
    email: string;
    links: NavLink[];
    copyright: string;
    partnerLine: string;
  };
}

export type SectionKey = keyof SiteContent;

export const DEFAULT_CONTENT: SiteContent = {
  brand: {
    logoLight: { url: "/logo/logo-light.png", alt: "Supply Power Group" },
    logoDark: { url: "/logo/logo-dark.png", alt: "Supply Power Group" },
  },
  seo: {
    title: "SUPPLY POWER GROUP | Énergie & Infrastructures Industrielles",
    description:
      "L'énergie globale au service de votre puissance industrielle. SUPPLY POWER GROUP conçoit, déploie, stocke et maintient vos infrastructures énergétiques complexes en RDC.",
    ogImage: { url: "/og-image.png", alt: "SUPPLY POWER GROUP" },
  },
  nav: {
    links: [
      { href: "/#hero", label: "Accueil" },
      { href: "/#expertises", label: "Nos expertises" },
      { href: "/#realisations", label: "Réalisations" },
      { href: "/#contact", label: "Contact" },
    ],
    ctaLabel: "Demander un devis",
  },
  hero: {
    title: "L'énergie globale au service de votre puissance industrielle.",
    subtitle:
      "De la production minière à la distribution connectée, SUPPLY POWER GROUP conçoit, déploie, stocke et maintient vos infrastructures énergétiques complexes. Nous transformons le potentiel énergétique en performance durable.",
    image: {
      url: "https://picsum.photos/seed/supply-power-wind-turbines-sunset/1920/1080",
      alt: "Éoliennes industrielles au coucher du soleil",
    },
    primaryCta: "Demander un devis",
    secondaryCta: "Configurer ma solution",
  },
  stats: {
    items: [
      { value: "50+ MW", label: "Capacité de production" },
      { value: "1000+ KM", label: "Lignes HT/BT déployées" },
      { value: "24/7", label: "Maintenance & intervention" },
      { value: "100%", label: "Solutions clés en main" },
    ],
  },
  expertises: {
    eyebrow: "Notre savoir-faire",
    title: "Une expertise intégrée sur toute la chaîne de valeur énergétique",
    subtitle:
      "Nous concevons des installations sécurisées et pérennes adaptées aux exigences des industries modernes.",
    cards: [
      {
        icon: "buildings",
        color: "blue",
        title: "Infrastructures & Réseaux",
        intro:
          "Nous assurons l'ingénierie lourde pour garantir le transport et la distribution d'énergie.",
        items: [
          "Construction & gestion de cabines BT & HT",
          "Centrales thermiques, solaires & hydroélectriques",
          "Réseaux de canalisation & lignes de transport",
        ],
        linkLabel: "Demander une étude",
      },
      {
        icon: "gear",
        color: "green",
        title: "Solutions & Fournitures",
        intro:
          "La flexibilité de notre chaîne d'approvisionnement répond à tous vos besoins en équipements de puissance.",
        items: [
          "Achat de gros & vente d'électricité, gaz, pétrole",
          "Fourniture de groupes électrogènes toutes puissances",
          "Distribution de matériels électriques certifiés",
        ],
        linkLabel: "Consulter le catalogue",
      },
      {
        icon: "leaf",
        color: "orange",
        title: "Transition & Efficacité",
        intro:
          "Optimisez vos factures énergétiques et préparez l'avenir grâce à nos audits technologiques.",
        items: [
          "Audits de consommation & Smart Grids",
          "Installation de bornes de recharge VE",
          "Rénovation énergétique basse consommation",
        ],
        linkLabel: "Lancer une transition",
      },
    ],
  },
  mining: {
    eyebrow: "Transition & acteur minier",
    title: "De la ressource minière à l'indépendance",
    paragraphs: [
      "SUPPLY POWER GROUP combine ses expertises énergétiques et son rôle d'acteur minier en RDC. Nous intervenons dans l'extraction et la transformation de ressources stratégiques d'uranium et d'hydrocarbures nécessaires à la souveraineté énergétique.",
      "Parallèlement, nous déployons des micro-réseaux et des solutions d'alimentation hybrides (solaire/diesel) directement sur les sites d'exploitation minière pour assurer un approvisionnement continu, propre et sans interruptions.",
    ],
    images: [
      {
        url: "https://picsum.photos/seed/supply-power-solar-panels/900/500",
        alt: "Ferme solaire industrielle",
      },
      {
        url: "https://picsum.photos/seed/supply-power-mining-excavator/450/400",
        alt: "Excavatrice sur site minier",
      },
      {
        url: "https://picsum.photos/seed/supply-power-industrial-equipment/450/400",
        alt: "Équipement industriel",
      },
    ],
    blocks: [
      { label: "Extraction", description: "Uranium et Hydrocarbures" },
      { label: "Infrastructure", description: "Cabines de raccordement dédiées" },
    ],
  },
  simulator: {
    title: "Simulateur de configuration énergétique",
    subtitle:
      "Estimez en quelques secondes la solution la mieux adaptée à votre besoin en puissance.",
    cabineLabel: "Cabine HT/BT",
    groupeLabel: "Groupe Élec",
    solaireLabel: "Solaire Hybride",
    locations: ["Kinshasa", "Lubumbashi", "Kolwezi", "Site minier isolé", "Autre province"],
    ctaLabel: "Valider et Demander le Devis à Exaucé Matadi",
  },
  leadership: {
    eyebrow: "Partenaire minier stratégique",
    title: "SUPPLY POWER GROUP & MAT DUREST",
    body:
      "Sous la direction de Mr Exaucé Matadi, notre alliance stratégique réunit le meilleur de l'ingénierie énergétique globale et de l'approvisionnement d'équipements industriels. Pendant que SUPPLY POWER GROUP conçoit et gère les infrastructures lourdes à l'échelle mégawatt, MAT DUREST garantit la réactivité locale, l'acheminement sécurisé des biens électriques et la maintenance urgente 24/7 sur toute l'étendue du territoire de la RDC.",
    cardEyebrow: "Savoir-faire conjoint",
    personName: "Exaucé Matadi",
    personRole: "Directeur Général",
    personPhoto: {
      url: "https://picsum.photos/seed/exauce-matadi-portrait/200/200",
      alt: "Exaucé Matadi",
    },
    quote:
      "La performance énergétique d'une industrie ne se négocie pas. Notre engagement est d'apporter à la République Démocratique du Congo des infrastructures électriques résilientes aux standards internationaux.",
    phone: "+243 816 283 633",
    email: "dgenerale@supplypower-group.com",
  },
  contact: {
    title: "Faire une Demande d'Étude",
    subtitle:
      "Remplissez ce formulaire d'avant-projet. Nos techniciens vous recontacteront sous 24 heures pour planifier un audit technique ou chiffrer vos fournitures.",
    submitLabel: "Soumettre mon projet",
    successMessage:
      "Merci ! Votre demande a bien été enregistrée. Notre équipe vous recontactera très prochainement.",
  },
  footer: {
    description:
      "Partenaire énergétique global de référence en RDC. De la construction de réseaux de transport à l'acheminement de matériels techniques critiques.",
    address: "Avenue Nyamuragira 59,\nCommune de la Gombe,\nKinshasa, Immeuble Beautour",
    phone: "+243 816 283 633",
    email: "dgenerale@supplypower-group.com",
    links: [
      { href: "/#hero", label: "Accueil" },
      { href: "/#expertises", label: "Nos Expertises" },
      { href: "/#realisations", label: "Transition & Acteur Minier" },
      { href: "/#simulateur", label: "Simulateur de Puissance" },
      { href: "/#synergie", label: "Synergie Supply Power Group" },
    ],
    copyright: "SUPPLY POWER GROUP. Tous droits réservés.",
    partnerLine: "En collaboration technique et commerciale avec MAT DUREST.",
  },
};

// ------------------------------------------------------------------
// Description des formulaires de l'éditeur admin
// ------------------------------------------------------------------

export type FieldDef =
  | { type: "text" | "textarea"; key: string; label: string; help?: string }
  | { type: "image"; key: string; label: string; help?: string }
  | { type: "select"; key: string; label: string; options: readonly { value: string; label: string }[] }
  | { type: "stringList"; key: string; label: string; itemLabel: string; multiline?: boolean }
  | { type: "list"; key: string; label: string; itemLabel: string; fields: FieldDef[] };

const linkFields: FieldDef[] = [
  { type: "text", key: "label", label: "Texte" },
  { type: "text", key: "href", label: "Lien", help: "Ex : /#contact ou https://..." },
];

export const SECTIONS: { key: SectionKey; label: string; description: string; fields: FieldDef[] }[] = [
  {
    key: "hero",
    label: "Accueil (bannière)",
    description: "Grand titre, texte d'introduction et photo de fond en haut du site.",
    fields: [
      { type: "textarea", key: "title", label: "Titre principal" },
      { type: "textarea", key: "subtitle", label: "Texte d'introduction" },
      { type: "image", key: "image", label: "Photo de fond" },
      { type: "text", key: "primaryCta", label: "Bouton principal" },
      { type: "text", key: "secondaryCta", label: "Bouton secondaire" },
    ],
  },
  {
    key: "stats",
    label: "Chiffres clés",
    description: "Bandeau de chiffres sous la bannière.",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Chiffres",
        itemLabel: "Chiffre",
        fields: [
          {
            type: "text",
            key: "value",
            label: "Valeur",
            help: "Ex : 50+ MW, 1000+ KM, 24/7. Si la valeur commence par un nombre, il est animé.",
          },
          { type: "text", key: "label", label: "Libellé" },
        ],
      },
    ],
  },
  {
    key: "expertises",
    label: "Expertises",
    description: "Section « Notre savoir-faire » et ses cartes.",
    fields: [
      { type: "text", key: "eyebrow", label: "Sur-titre" },
      { type: "textarea", key: "title", label: "Titre" },
      { type: "textarea", key: "subtitle", label: "Sous-titre" },
      {
        type: "list",
        key: "cards",
        label: "Cartes",
        itemLabel: "Carte",
        fields: [
          { type: "select", key: "icon", label: "Icône", options: ICON_OPTIONS },
          { type: "select", key: "color", label: "Couleur", options: COLOR_OPTIONS },
          { type: "text", key: "title", label: "Titre" },
          { type: "textarea", key: "intro", label: "Introduction" },
          { type: "stringList", key: "items", label: "Points clés", itemLabel: "Point" },
          { type: "text", key: "linkLabel", label: "Texte du lien" },
        ],
      },
    ],
  },
  {
    key: "mining",
    label: "Réalisations / Minier",
    description: "Section « Transition & acteur minier » avec ses photos.",
    fields: [
      { type: "text", key: "eyebrow", label: "Sur-titre" },
      { type: "textarea", key: "title", label: "Titre" },
      { type: "stringList", key: "paragraphs", label: "Paragraphes", itemLabel: "Paragraphe", multiline: true },
      {
        type: "list",
        key: "images",
        label: "Photos (la 1re est affichée en grand)",
        itemLabel: "Photo",
        fields: [
          { type: "image", key: "", label: "Photo" },
        ],
      },
      {
        type: "list",
        key: "blocks",
        label: "Encadrés",
        itemLabel: "Encadré",
        fields: [
          { type: "text", key: "label", label: "Titre" },
          { type: "text", key: "description", label: "Description" },
        ],
      },
    ],
  },
  {
    key: "simulator",
    label: "Simulateur",
    description: "Textes du simulateur de configuration énergétique.",
    fields: [
      { type: "text", key: "title", label: "Titre" },
      { type: "textarea", key: "subtitle", label: "Sous-titre" },
      { type: "text", key: "cabineLabel", label: "Libellé « Cabine »" },
      { type: "text", key: "groupeLabel", label: "Libellé « Groupe électrogène »" },
      { type: "text", key: "solaireLabel", label: "Libellé « Solaire »" },
      { type: "stringList", key: "locations", label: "Localisations proposées", itemLabel: "Localisation" },
      { type: "text", key: "ctaLabel", label: "Texte du bouton" },
    ],
  },
  {
    key: "leadership",
    label: "Direction & partenariat",
    description: "Section MAT DUREST, photo et citation du dirigeant.",
    fields: [
      { type: "text", key: "eyebrow", label: "Sur-titre" },
      { type: "text", key: "title", label: "Titre" },
      { type: "textarea", key: "body", label: "Texte" },
      { type: "text", key: "cardEyebrow", label: "Titre de l'encadré" },
      { type: "text", key: "personName", label: "Nom du dirigeant" },
      { type: "text", key: "personRole", label: "Fonction" },
      { type: "image", key: "personPhoto", label: "Photo du dirigeant" },
      { type: "textarea", key: "quote", label: "Citation" },
      { type: "text", key: "phone", label: "Téléphone" },
      { type: "text", key: "email", label: "E-mail" },
    ],
  },
  {
    key: "contact",
    label: "Formulaire de contact",
    description: "Textes autour du formulaire de demande d'étude.",
    fields: [
      { type: "text", key: "title", label: "Titre" },
      { type: "textarea", key: "subtitle", label: "Sous-titre" },
      { type: "text", key: "submitLabel", label: "Texte du bouton" },
      { type: "textarea", key: "successMessage", label: "Message de confirmation" },
    ],
  },
  {
    key: "nav",
    label: "Menu",
    description: "Liens du menu en haut de page.",
    fields: [
      { type: "list", key: "links", label: "Liens", itemLabel: "Lien", fields: linkFields },
      { type: "text", key: "ctaLabel", label: "Bouton du menu" },
    ],
  },
  {
    key: "footer",
    label: "Pied de page",
    description: "Coordonnées, adresse et liens du bas de page.",
    fields: [
      { type: "textarea", key: "description", label: "Présentation" },
      { type: "textarea", key: "address", label: "Adresse", help: "Une ligne par retour à la ligne." },
      { type: "text", key: "phone", label: "Téléphone" },
      { type: "text", key: "email", label: "E-mail" },
      { type: "list", key: "links", label: "Liens de navigation", itemLabel: "Lien", fields: linkFields },
      { type: "text", key: "copyright", label: "Mention de copyright" },
      { type: "text", key: "partnerLine", label: "Mention partenaire" },
    ],
  },
  {
    key: "brand",
    label: "Logo",
    description: "Logos affichés sur fond clair (menu) et sur fond sombre (pied de page).",
    fields: [
      { type: "image", key: "logoLight", label: "Logo sur fond clair" },
      { type: "image", key: "logoDark", label: "Logo sur fond sombre" },
    ],
  },
  {
    key: "seo",
    label: "Référencement (Google, partages)",
    description: "Titre et description affichés dans Google et lors des partages sur les réseaux.",
    fields: [
      { type: "text", key: "title", label: "Titre de la page" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "image", key: "ogImage", label: "Image de partage (1200×630 conseillé)" },
    ],
  },
];

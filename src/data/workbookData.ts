export interface ComparisonExample {
  id: number;
  label: string;
  beforeWords: string;
  beforeText: string;
  afterWords: string;
  afterSubject: string;
  afterCode: string;
  afterDesc: string;
  sampleOutputTitle: string;
  sampleOutputLines: string[];
}

export const COMPARISON_EXAMPLES: ComparisonExample[] = [
  {
    id: 0,
    label: 'Fachtext verstehen',
    beforeWords: '62 Wörter',
    beforeText:
      '„Bitte lies dir den folgenden sehr komplexen Fachtext genau durch. Ich möchte, dass du zuerst die allerwichtigsten Kernaussagen auf das Wesentliche zusammenfasst, ohne wichtige Fakten wegzulassen. Danach erkläre mir den Inhalt bitte noch einmal so einfach, klar und verständlich, dass ihn selbst ein fünfjähriges Kind ohne Vorwissen sofort begreifen kann. Verzichte dabei komplett auf komplizierte Fremdwörter.“',
    afterWords: '2 Kürzel',
    afterSubject: '[Fachtext einfügen]',
    afterCode: '/tldr /eli5',
    afterDesc:
      'Die KI kürzt den Text zuerst auf das Wesentliche und erklärt ihn direkt danach in kinderleichter Sprache ohne Fachchinesisch.',
    sampleOutputTitle: 'Beispiel-Ausgabe',
    sampleOutputLines: [
      'TL;DR: Drei Kernaussagen in jeweils einem knappen Satz.',
      'ELI5: Eine anschauliche Alltags-Analogie ohne Fachbegriffe.',
    ],
  },
  {
    id: 1,
    label: 'E-Mail professionell kürzen',
    beforeWords: '48 Wörter',
    beforeText:
      '„Überarbeite meinen folgenden E-Mail-Entwurf so, dass er deutlich professioneller und geschäftsmäßiger klingt, als würde er an einen wichtigen Kunden oder Vorgesetzten gehen. Behalte alle wichtigen Informationen bei, aber streiche unnötige Füllwörter und kürze den gesamten Text um ungefähr zwanzig Prozent, damit er knackig bleibt.“',
    afterWords: '3 Kürzel',
    afterSubject: '[Dein E-Mail-Entwurf]',
    afterCode: '/rewrite /formal /cut20',
    afterDesc:
      'Der Entwurf wird neu formuliert, wechselt in einen souveränen Business-Ton und wird um rund 20 Prozent gestrafft – bei gleichem Inhalt.',
    sampleOutputTitle: 'Beispiel-Ausgabe',
    sampleOutputLines: [
      'Tonfall: Höflich, präzise und direkt auf den Punkt gebracht.',
      'Länge: Ca. 20 % kompakter ohne Verlust von Fakten oder Terminen.',
    ],
  },
  {
    id: 2,
    label: 'Technik-Grafik erstellen',
    beforeWords: '54 Wörter',
    beforeText:
      '„Erstelle eine hochdetaillierte technische Illustration einer modernen Siebträgermaschine. Zerlege die Maschine in alle ihre einzelnen Bauteile, die sauber geordnet in der Luft schweben, und stelle das Ganze im Stil eines klassischen technischen Konstruktionsplans mit feinen weißen Linien auf einem tiefblauen Hintergrund dar.“',
    afterWords: '2 Kürzel',
    afterSubject: 'Siebträgermaschine',
    afterCode: '/explodedview /blueprint',
    afterDesc:
      'Deine Bild-KI zerlegt das Objekt in schwebende Einzelteile und rendert sie als präzisen Bauplan in weißen Linien auf blauem Grund.',
    sampleOutputTitle: 'Beispiel-Ausgabe',
    sampleOutputLines: [
      'Perspektive: Alle Baugruppen sauber entlang der Achse aufgefächert.',
      'Stil: Technische Blaupause mit feinen weißen Konturlinien.',
    ],
  },
];

export interface EliCode {
  num: string;
  code: string;
  label: string;
  tag?: string;
}

export const ELI_LADDER_CODES: EliCode[] = [
  { num: '001', code: '/ELI5', label: '5 Jahre · kinderleicht', tag: 'Einfach' },
  { num: '002', code: '/ELI10', label: '10 Jahre · Grundlagen' },
  { num: '004', code: '/ELICOLLEGE', label: 'Uni · Studiumsniveau' },
  { num: '005', code: '/ELIPHD', label: 'Doktor · Expertenniveau', tag: 'Experte' },
];

export interface VisualCode {
  num: string;
  code: string;
  desc: string;
}

export const VISUAL_CODES: VisualCode[] = [
  {
    num: '111',
    code: '/XRAY',
    desc: 'Röntgenblick: durchsichtige Hülle, Innenleben sichtbar',
  },
  {
    num: '112',
    code: '/EXPLODEDVIEW',
    desc: 'Zerlegt ein Objekt in schwebende Einzelteile',
  },
  {
    num: '191',
    code: '/PRODUCTSHOT',
    desc: 'Produktfoto im cleanen Studio-Look',
  },
];

export interface TopCheatCode {
  num: string;
  code: string;
  category: 'Text' | 'Visual';
  effect: string;
}

export const TOP_20_CODES: TopCheatCode[] = [
  { num: '001', code: '/ELI5', category: 'Text', effect: 'Erklärt komplexe Themen so einfach wie für ein 5-jähriges Kind.' },
  { num: '005', code: '/ELIPHD', category: 'Text', effect: 'Antwortet auf tiefem wissenschaftlichem Expertenniveau.' },
  { num: '012', code: '/TLDR', category: 'Text', effect: 'Fasst lange Texte sofort auf die wichtigsten Kernaussagen zusammen.' },
  { num: '018', code: '/REWRITE', category: 'Text', effect: 'Formuliert einen Entwurf sprachlich sauber und flüssig neu.' },
  { num: '024', code: '/FORMAL', category: 'Text', effect: 'Wechselt in einen seriösen, geschäftsmäßigen Tonfall.' },
  { num: '029', code: '/DIRECT', category: 'Text', effect: 'Streicht Floskeln und bringt Aussagen direkt auf den Punkt.' },
  { num: '034', code: '/CUT20', category: 'Text', effect: 'Kürzt den Text um rund 20 % bei gleichem Informationsgehalt.' },
  { num: '041', code: '/TABLE', category: 'Text', effect: 'Gibt Vergleiche, Aufgaben oder Daten sauber als Tabelle aus.' },
  { num: '048', code: '/MEETINGNOTES', category: 'Text', effect: 'Verwandelt chaotische Transkripte in strukturierte Protokolle.' },
  { num: '052', code: '/ACTIONITEMS', category: 'Text', effect: 'Extrahiert konkrete Aufgaben, Verantwortliche und Deadlines.' },
  { num: '064', code: '/FIRSTPRINCIPLES', category: 'Text', effect: 'Zerlegt Probleme auf ihre unumstößlichen Grundprinzipien.' },
  { num: '071', code: '/REDTEAM', category: 'Text', effect: 'Sucht gezielt Schwachstellen und Gegenargumente zu deiner Idee.' },
  { num: '076', code: '/PREMORTEM', category: 'Text', effect: 'Simuliert, warum ein Projekt scheitern könnte – vor dem Start.' },
  { num: '085', code: '/FLASHCARDS', category: 'Text', effect: 'Erstellt aus jedem Lernstoff fertige Frage-Antwort-Karten.' },
  { num: '097', code: '/OPENHARD', category: 'Text', effect: 'Schreibt aufmerksamkeitsstarke Einstiegssätze ohne Warmup.' },
  { num: '111', code: '/XRAY', category: 'Visual', effect: 'Röntgenansicht mit transparenter Hülle und sichtbarem Innenleben.' },
  { num: '112', code: '/EXPLODEDVIEW', category: 'Visual', effect: 'Zerlegt Produkte oder Geräte in schwebende Einzelteile.' },
  { num: '125', code: '/BLUEPRINT', category: 'Visual', effect: 'Technische Konstruktionszeichnung in weißen Linien auf Tiefblau.' },
  { num: '140', code: '/ISOMETRIC', category: 'Visual', effect: 'Saubere isometrische 3D-Perspektive für Grafiken und Szenen.' },
  { num: '191', code: '/PRODUCTSHOT', category: 'Visual', effect: 'Hochwertiges Studio-Produktfoto mit kontrollierter Ausleuchtung.' },
];

export interface FaqItem {
  question: string;
  answer: string;
  highlightCode?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'In welchen KI-Tools funktionieren die Codes?',
    answer:
      'Die 110 Text-Codes funktionieren in allen gängigen KI-Chats wie ChatGPT, Claude, Google Gemini, Microsoft Copilot oder Perplexity. Die 90 Visual-Codes sind speziell für Bild-KIs wie Midjourney, DALL-E, Flux, Ideogram oder Adobe Firefly konzipiert.',
  },
  {
    question: 'Gibt es wirklich kein Geheimmenü – wie funktionieren die Codes?',
    answer:
      'Wir spielen mit offenen Karten: Es gibt kein verstecktes Entwickler-Menü. KI-Modelle wurden mit riesigen Mengen an Internettexten, Fachforen und Design-Datenbanken trainiert. Kürzel wie /ELI5 oder /EXPLODEDVIEW rufen diese tief verankerten Konzepte sofort ab – wie ein stark komprimierter Profi-Prompt. Auch wenn die Kürzel selbst auf Englisch sind (z. B. /XRAY, /ELI5, /TLDR), antwortet deine KI automatisch auf Deutsch – bzw. immer in der Sprache, in der du deine Anfrage schreibst.',
  },
  {
    question: 'Muss ich Software oder ein Plugin installieren?',
    answer:
      'Nein, überhaupt nichts. Du tippst oder kopierst den jeweiligen Code einfach mit einem Schrägstrich (/) vor oder hinter deine normale Anfrage in das Eingabefeld deiner KI.',
  },
  {
    question: 'Was ist der Unterschied zwischen den beiden PDF-Versionen?',
    answer:
      'Du bekommst beide 13-seitigen A4-PDFs im Paket: Die Dark-Version im Navy-Blueprint-Look schont die Augen am Monitor oder Tablet. Die Druck-Version hat einen reinweißen Hintergrund, damit du dir deine Lieblingsseiten oder das gesamte Nachschlagewerk ohne hohen Tintenverbrauch ausdrucken kannst.',
  },
];

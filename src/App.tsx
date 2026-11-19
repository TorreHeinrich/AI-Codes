import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
  GraduationCap,
  Palette,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  COMPARISON_EXAMPLES,
  ELI_LADDER_CODES,
  FAQ_ITEMS,
  VISUAL_CODES,
} from './data/workbookData';
import { WorkbookBundleMockup } from './components/WorkbookBundleMockup';
import { InfoModal, ModalType } from './components/InfoModal';

export default function App() {
  const [activeExampleIdx, setActiveExampleIdx] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showSampleOutput, setShowSampleOutput] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadError, setLeadError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const activeExample = COMPARISON_EXAMPLES[activeExampleIdx];

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const tempInput = document.createElement('textarea');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = leadEmail.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      setLeadError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    setLeadError(null);
    setSubmittedEmail(trimmed);
    setLeadEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. COMPACT STICKY EINFÜHRUNGSPREIS BANNER */}
      <div className="bg-panel/95 border-b border-line sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-accent font-bold shrink-0">EINFÜHRUNGSPREIS:</span>
            <span className="text-ink font-medium truncate">
              Jetzt zum Start für <strong className="text-white">14,95 €</strong> sichern{' '}
              <span className="text-labelgray">(regulär demnächst 19,95 €)</span>
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#angebot"
              className="bg-accent hover:bg-accenthover text-navy font-display font-bold text-xs px-3.5 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white"
            >
              Jetzt sichern
            </a>
          </div>
        </div>
      </div>

      {/* 2. TOP BAR (3-ZONE CONTRACT) */}
      <header className="max-w-6xl w-full mx-auto px-4 pt-6 pb-4 flex items-center justify-between gap-8">
        <a
          href="#"
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-accent rounded"
        >
          <span className="w-8 h-8 rounded-[5px] bg-accent flex items-center justify-center font-display font-extrabold text-navy text-sm tracking-tight group-hover:scale-105 transition-transform">
            td
          </span>
          <span className="font-display font-bold text-ink text-xl tracking-tight">tedigital</span>
        </a>

        <nav
          aria-label="Hauptnavigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-labelgray"
        >
          <a
            href="#vorher-nachher"
            className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Beispiele
          </a>
          <a
            href="#einblick"
            className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Einblick
          </a>
          <a
            href="#gratis-probe"
            className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Gratis-Test
          </a>
          <a
            href="#faq"
            className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        <a
          href="#angebot"
          className="font-mono text-xs font-semibold text-accent border border-accent/40 hover:bg-accent/10 px-4 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          PDF-Paket · 14,95 €
        </a>
      </header>

      <main className="flex-1">
        {/* 3. HERO BEREICH */}
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Linke Spalte: Copy & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <p className="font-mono text-xs tracking-wide text-accent font-semibold">
                Für ChatGPT, Claude, Gemini &amp; Bild-KIs
              </p>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-ink leading-[1.08] tracking-tight text-balance">
                <span className="text-white">200 KI-Codes.</span>{' '}
                <span>Ein Wort statt </span>
                <span className="text-accent">200-Wörter-Prompt.</span>
              </h1>

              <p className="text-lg sm:text-xl text-bodytext leading-relaxed max-w-xl">
                Hör auf, lange Anweisungen zu tippen. Schreib einfach{' '}
                {['/XRAY', '/ELI5', '/TLDR'].map((code, idx) => (
                  <span key={code}>
                    <button
                      type="button"
                      onClick={() => handleCopy(code.toLowerCase(), `hero-${code}`)}
                      title={`${code} kopieren`}
                      className="font-mono text-sm sm:text-base font-bold text-accent bg-chiptag hover:bg-line px-2 py-0.5 rounded border border-line transition-colors cursor-pointer"
                    >
                      {copiedKey === `hero-${code}` ? 'Kopiert' : code}
                    </button>
                    {idx === 0 ? ', ' : idx === 1 ? ' oder ' : ''}
                  </span>
                ))}{' '}
                – und hol sofort bessere Ergebnisse aus deiner KI.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setModalType('checkout')}
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accenthover text-navy font-display font-bold text-base px-6 py-4 rounded-lg shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Jetzt PDF-Paket sichern – 14,95 €</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href="#gratis-probe"
                  className="inline-flex items-center justify-center bg-panel hover:bg-line/70 border border-line text-ink font-medium text-sm sm:text-base px-5 py-4 rounded-lg transition-colors whitespace-nowrap"
                >
                  Erst 20 Codes gratis testen
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-labelgray">
                <span>Sofort-Download als PDF</span>
                <span aria-hidden="true">·</span>
                <span>Dunkle &amp; helle Druck-Version</span>
                <span aria-hidden="true">·</span>
                <span>Geprüfte KI-Expertise (WBS Training, Google &amp; Vanderbilt)</span>
              </div>
            </div>

            {/* Rechte Spalte: Produkt-Mockup */}
            <div className="lg:col-span-6">
              <WorkbookBundleMockup />
            </div>
          </div>
        </section>

        {/* 4. INTERAKTIVER VORHER / NACHHER VERGLEICH */}
        <section id="vorher-nachher" className="max-w-6xl mx-auto px-4 py-16 border-t border-line/60">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="font-mono text-xs text-accent font-semibold mb-2">
              01. Der Direktvergleich
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink text-balance">
              Schluss mit Romanen im Eingabefeld
            </h2>
            <p className="mt-3 text-bodytext text-sm sm:text-base leading-relaxed">
              Wähle einen Anwendungsfall aus und sieh selbst, wie aus einem langen Prompt ein
              präziser Einzeiler wird.
            </p>
          </div>

          {/* Auswahl-Tabs */}
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
            role="tablist"
            aria-label="Anwendungsfälle vergleichen"
          >
            {COMPARISON_EXAMPLES.map((example, idx) => {
              const isActive = idx === activeExampleIdx;
              return (
                <button
                  key={example.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveExampleIdx(idx);
                    setShowSampleOutput(false);
                  }}
                  className={`font-mono text-xs font-bold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-accent text-navy'
                      : 'bg-panel border border-line text-ink hover:border-accent/60'
                  }`}
                >
                  {example.label}
                </button>
              );
            })}
          </div>

          {/* Vergleichs-Karten */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Vorher */}
            <div className="bg-panel/80 border border-line rounded-xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-line/60">
                  <span className="font-mono text-xs font-semibold text-red-300">
                    Vorher · Ohne Codes
                  </span>
                  <span className="font-mono text-xs tabular-nums text-labelgray">
                    {activeExample.beforeWords}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-bodytext leading-relaxed italic">
                  {activeExample.beforeText}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center gap-2 font-mono text-xs text-labelgray">
                <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Dauert jedes Mal 45–60 Sekunden zum Tippen.</span>
              </div>
            </div>

            {/* Nachher */}
            <div className="bg-panel border border-accent/70 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-line/60">
                  <span className="font-mono text-xs font-bold text-accent">
                    Nachher · Mit KI-Codes
                  </span>
                  <span className="font-mono text-xs tabular-nums text-accent font-bold">
                    {activeExample.afterWords}
                  </span>
                </div>

                <div className="bg-chip border border-line rounded-lg p-4 mb-4 flex items-center justify-between gap-3">
                  <div className="font-mono text-sm sm:text-base overflow-x-auto whitespace-nowrap">
                    <span className="text-labelgray">›</span>
                    <span className="text-white ml-1.5">{activeExample.afterSubject}</span>
                    <span className="text-accent font-bold ml-2">{activeExample.afterCode}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeExample.afterCode, 'comparison-copy')}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-panel hover:bg-line text-ink font-mono text-xs px-3 py-1.5 rounded border border-line transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {copiedKey === 'comparison-copy' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                        <span className="text-accent">Kopiert</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Kopieren</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-sm text-bodytext leading-relaxed">
                  <strong className="text-accent">Was passiert:</strong> {activeExample.afterDesc}
                </p>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setShowSampleOutput((prev) => !prev)}
                    className="font-mono text-xs text-xraycyan hover:text-accent transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>
                      {showSampleOutput ? 'Ergebnis-Vorschau ausblenden' : 'Ergebnis-Vorschau anzeigen'}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        showSampleOutput ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {showSampleOutput && (
                    <div className="mt-2.5 bg-chip/90 border border-line rounded-lg p-3.5 space-y-1.5 text-xs text-bodytext">
                      <div className="font-mono text-[11px] text-xraycyan font-semibold">
                        {activeExample.sampleOutputTitle}
                      </div>
                      {activeExample.sampleOutputLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60 flex items-center gap-2 font-mono text-xs text-xraycyan">
                <Zap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>In 2 Sekunden eingegeben. Sofort reproduzierbar.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. DREI KERN-NUTZEN */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '01.',
                title: 'Massiv Zeit sparen',
                body: 'Kein langes Überlegen mehr, wie du deine Anfrage formulieren musst. Ein kurzes Kürzel ersetzt ganze Absatz-Anweisungen.',
              },
              {
                num: '02.',
                title: 'Präzisere Antworten',
                body: 'KI-Modelle wurden mit Millionen Internettexten trainiert und kennen Konzepte wie /FIRSTPRINCIPLES oder /REDTEAM bis ins Detail.',
              },
              {
                num: '03.',
                title: 'Sofort anwendbar',
                body: 'Keine Plugins, kein Abo, keine Vorkenntnisse. PDF öffnen, Code ablesen, vor oder hinter deinen Text schreiben – fertig.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-panel border border-line rounded-xl p-6 sm:p-7 space-y-3"
              >
                <div className="font-display font-extrabold text-3xl text-accent tabular-nums">
                  {item.num}
                </div>
                <h3 className="font-display font-bold text-xl text-ink">{item.title}</h3>
                <p className="text-sm text-bodytext leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. EINBLICK INS WORKBOOK */}
        <section id="einblick" className="max-w-6xl mx-auto px-4 py-16 border-t border-line/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono text-xs text-accent font-semibold mb-2">
                02. Blick ins Buch
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink text-balance">
                13 Seiten komprimiertes Wissen ohne Fülltext
              </h2>
            </div>
            <div className="font-mono text-xs text-labelgray tabular-nums">
              13 Seiten A4 · Alle Codes nummeriert (001–200)
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Vorschau 1: Die ELI-Leiter */}
            <div className="bg-panel border border-line rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-labelgray pb-3 mb-4 border-b border-line">
                  <span>Seite 03 · Teil 1</span>
                  <span className="text-accent font-semibold">Text-Codes</span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-1">Die ELI-Leiter</h3>
                <p className="text-sm text-bodytext/80 mb-4">
                  „Explain like I’m …“ – wähl dein Niveau
                </p>

                <div className="bg-chip border border-line rounded-lg divide-y divide-line/70 overflow-hidden">
                  {ELI_LADDER_CODES.map((item) => (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => handleCopy(item.code.toLowerCase(), `eli-${item.num}`)}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-chiptag/60 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="font-mono text-xs text-accent font-bold tabular-nums">
                          {item.num} · {item.code}
                        </div>
                        <div className="text-xs text-ink font-medium mt-0.5">{item.label}</div>
                      </div>
                      <span className="font-mono text-[11px] text-labelgray">
                        {copiedKey === `eli-${item.num}` ? 'Kopiert' : item.tag ?? 'Kopieren'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-xs text-labelgray leading-relaxed">
                Plus 105 weitere Text-Codes für Schreiben, Lernen, Struktur &amp; Kritisches Denken.
              </p>
            </div>

            {/* Vorschau 2: Visual-Codes */}
            <div className="bg-panel border border-line rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-labelgray pb-3 mb-4 border-b border-line">
                  <span>Seite 07–09 · Teil 2</span>
                  <span className="text-accent font-semibold">Visual-Codes</span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-1">
                  90 Kürzel für Bild-KIs
                </h3>
                <p className="text-sm text-bodytext/80 mb-4">
                  Von der Röntgenansicht bis zum Produktfoto
                </p>

                <div className="space-y-2.5">
                  {VISUAL_CODES.map((item) => (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => handleCopy(item.code.toLowerCase(), `vis-${item.num}`)}
                      className="w-full text-left bg-chip hover:bg-chiptag/60 border border-line rounded-lg p-3.5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between font-mono text-xs tabular-nums">
                        <span className="text-accent font-bold">
                          {item.num} · {item.code}
                        </span>
                        <span className="text-[11px] text-labelgray">
                          {copiedKey === `vis-${item.num}` ? 'Kopiert' : 'Kopieren'}
                        </span>
                      </div>
                      <div className="text-xs text-bodytext mt-1 leading-relaxed">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-xs text-labelgray leading-relaxed">
                Perfekt für Midjourney, DALL-E, Flux, Ideogram &amp; Adobe Firefly.
              </p>
            </div>

            {/* Vorschau 3: Kombinieren & Regeln */}
            <div className="bg-panel border border-line rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-labelgray pb-3 mb-4 border-b border-line">
                  <span>Seite 10–13 · Teil 3</span>
                  <span className="text-accent font-semibold">Kombi-Rezepte</span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-1">
                  23 Rezepte &amp; 5 Kombi-Regeln
                </h3>
                <p className="text-sm text-bodytext/80 mb-4">
                  So werden aus einzelnen Codes ganze Workflows
                </p>

                <div className="bg-chip border border-line rounded-lg p-4 space-y-3.5">
                  <div>
                    <div className="font-mono text-[11px] text-labelgray">[Transkript]</div>
                    <div className="font-mono text-xs text-accent font-bold mt-0.5">
                      › /meetingnotes /actionitems /table
                    </div>
                    <div className="text-xs text-bodytext mt-1.5 leading-relaxed">
                      Strukturierte Notizen plus Aufgaben, Verantwortliche &amp; Termine als Tabelle.
                    </div>
                  </div>
                  <div className="pt-3 border-t border-line">
                    <div className="font-mono text-[11px] text-accent font-semibold mb-1.5">
                      Das beißt sich (nicht mischen)
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 font-mono text-xs text-ink">
                      <span>/FORMAL ≠ /CASUAL</span>
                      <span>/TLDR ≠ /DEEP</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-labelgray leading-relaxed">
                Inklusive Praxistipps, was tun, wenn ein Code mal nicht sofort greift.
              </p>
            </div>
          </div>
        </section>

        {/* 7. FÜR WEN IST DAS WORKBOOK? */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-panel border border-line rounded-2xl p-6 sm:p-10">
            <div className="max-w-2xl mb-8">
              <div className="font-mono text-xs text-accent font-semibold mb-2">
                03. Praxis statt Hype
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                Gemacht für deinen echten Alltag
              </h2>
              <p className="text-sm sm:text-base text-bodytext mt-2 leading-relaxed">
                Keine leeren „Werde-über-Nacht-reich“-Versprechen. Sondern ein ehrliches Werkzeug
                für alle, die KI täglich produktiv nutzen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-chip/80 border border-line rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-panel border border-line flex items-center justify-center text-accent">
                  <Briefcase className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-base text-ink">
                  Berufstätige &amp; Büroalltag
                </h3>
                <p className="text-xs sm:text-sm text-bodytext leading-relaxed">
                  E-Mails glätten (<span className="font-mono text-accent">/DIRECT</span>), lange
                  Protokolle auswerten (<span className="font-mono text-accent">/ACTIONITEMS</span>)
                  oder Konzepte kritisch prüfen lassen (
                  <span className="font-mono text-accent">/PREMORTEM</span>).
                </p>
              </div>

              <div className="bg-chip/80 border border-line rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-panel border border-line flex items-center justify-center text-accent">
                  <GraduationCap className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-base text-ink">
                  Studierende &amp; Lernende
                </h3>
                <p className="text-xs sm:text-sm text-bodytext leading-relaxed">
                  Komplexe Skripte herunterbrechen (
                  <span className="font-mono text-accent">/ELI15</span>), Lernkarten bauen (
                  <span className="font-mono text-accent">/FLASHCARDS</span>) oder Prüfungsfragen
                  simulieren (<span className="font-mono text-accent">/EXAMPREDICT</span>).
                </p>
              </div>

              <div className="bg-chip/80 border border-line rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-panel border border-line flex items-center justify-center text-accent">
                  <Palette className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-base text-ink">
                  Creator &amp; Selbstständige
                </h3>
                <p className="text-xs sm:text-sm text-bodytext leading-relaxed">
                  Starke Einstiegssätze schreiben (
                  <span className="font-mono text-accent">/OPENHARD</span>) und beeindruckende
                  Visuals generieren (<span className="font-mono text-accent">/XRAY</span>,{' '}
                  <span className="font-mono text-accent">/ISOMETRIC</span>,{' '}
                  <span className="font-mono text-accent">/PRODUCTSHOT</span>).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. GRATIS LEAD-MAGNET */}
        <section id="gratis-probe" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-panel to-chip border border-line rounded-2xl p-6 sm:p-10 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="font-mono text-xs text-xraycyan font-semibold">
                Kostenlose Kostprobe · 0 €
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink text-balance">
                Erst ausprobieren? Hol dir die „20 Top-Codes“ als 1-Seiten-Spickzettel.
              </h2>
              <p className="text-sm text-bodytext leading-relaxed">
                Trag deine E-Mail-Adresse ein und teste die 20 beliebtesten Text- und Visual-Codes
                sofort kostenlos in ChatGPT, Claude oder Midjourney. Jederzeit mit einem Klick
                abbestellbar.
              </p>
            </div>

            <div className="md:col-span-5">
              <form
                onSubmit={handleLeadSubmit}
                noValidate
                className="bg-navy/90 border border-line rounded-xl p-5 space-y-3"
              >
                <label
                  htmlFor="lead-email"
                  className="block font-mono text-xs text-labelgray font-semibold"
                >
                  Deine E-Mail-Adresse
                </label>
                <input
                  type="email"
                  id="lead-email"
                  value={leadEmail}
                  onChange={(e) => {
                    setLeadEmail(e.target.value);
                    if (leadError) setLeadError(null);
                  }}
                  placeholder="name@beispiel.de"
                  className="w-full bg-chip border border-line focus:border-accent focus:outline-none rounded-lg px-4 py-3 text-sm text-ink placeholder-labelgray"
                />
                {leadError && (
                  <p className="text-xs text-red-300 font-mono" role="alert">
                    {leadError}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-chiptag hover:bg-accent hover:text-navy border border-accent/50 text-accent font-display font-bold text-sm py-3.5 px-4 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Gratis-Spickzettel anfordern
                </button>

                {submittedEmail && (
                  <div className="bg-chip border border-xraycyan/40 rounded-lg p-3 space-y-2">
                    <p className="text-xs text-xraycyan font-mono">
                      Vorgemerkt für <strong className="text-white">{submittedEmail}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setModalType('cheatsheet')}
                      className="text-xs font-mono font-bold text-accent hover:underline cursor-pointer"
                    >
                      20 Top-Codes jetzt direkt im Browser öffnen →
                    </button>
                  </div>
                )}

                <p className="text-[11px] text-labelgray leading-snug">
                  Kein Spam. Mit dem Absenden stimmst du dem Erhalt des PDF-Spickzettels sowie
                  gelegentlichen KI-Tipps von tedigital zu.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* 9. ÜBER DEN AUTOR & GEPRÜFTE ZERTIFIZIERUNGEN */}
        <section id="autor" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-panel border border-line rounded-2xl p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-line/70">
              <div>
                <div className="font-mono text-xs text-accent font-semibold mb-1.5">
                  04. Geprüfte Expertise
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                  Entwickelt aus der Praxis, nicht aus dem Hype
                </h2>
                <p className="text-sm text-bodytext mt-1.5 max-w-2xl leading-relaxed">
                  Hinter <strong className="text-ink">tedigital</strong> steht{' '}
                  <strong className="text-ink">Torre Ehlers</strong>. Alle 200 KI-Codes basieren auf
                  fundierten Prompt-Engineering-Prinzipien und intensiven Tests in ChatGPT, Claude
                  &amp; modernen Bild-KIs.
                </p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-2 text-xs font-mono text-ink whitespace-nowrap">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Zertifiziert &amp; verifizierbar</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {/* Zertifikat 1: WBS TRAINING AG */}
              <div className="bg-chip/90 border border-line hover:border-accent/50 rounded-xl p-5 flex flex-col justify-between transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center shrink-0">
                    <span className="font-display font-extrabold text-xs tracking-tight text-[#0A1B31]">
                      WBS
                    </span>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-accent font-semibold">
                      WBS TRAINING AG
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink mt-0.5">
                      KI Medien- und Content Gestalter
                    </h3>
                    <p className="text-xs text-bodytext mt-1.5 leading-relaxed">
                      Umfassende staatlich anerkannte Weiterbildung für KI-gestützte Texterstellung,
                      Bildbearbeitung, Video-Editing, Website-/Shop-Entwicklung, Social Media
                      Marketing sowie Recht &amp; Ethik in der KI-Mediengestaltung.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-line/70 space-y-1 text-[11px] font-mono">
                  <div className="text-ink font-semibold">
                    Abschlussnote 1 (sehr gut · 98 %) · 1.210 Unterrichtsstunden
                  </div>
                  <div className="text-labelgray">
                    Ausgestellt: 29.04.2026 · AZAV- und DIN EN ISO 9001:2015-zertifiziert
                  </div>
                </div>
              </div>

              {/* Zertifikat 2: Google AI Professional Certificate */}
              <div className="bg-chip/90 border border-line hover:border-accent/50 rounded-xl p-5 flex flex-col justify-between transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-accent font-semibold">
                      Google Career Certificates · Coursera
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink mt-0.5">
                      Google AI Professional Certificate
                    </h3>
                    <p className="text-xs text-bodytext mt-1.5 leading-relaxed">
                      8-teiliges Fachprogramm für KI-Grundlagen, Brainstorming, Recherche,
                      Kommunikation, Content-Erstellung, Datenanalyse und KI-Workflows.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-line/70 flex items-center justify-between text-xs font-mono">
                  <span className="text-labelgray">Ausgestellt: Nov 2026</span>
                  <a
                    href="https://coursera.org/verify/professional-cert/LU497LQ1QI52"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xraycyan hover:text-accent transition-colors whitespace-nowrap"
                  >
                    <span>Zertifikat prüfen</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Zertifikat 3: Vanderbilt University */}
              <div className="bg-chip/90 border border-line hover:border-accent/50 rounded-xl p-5 flex flex-col justify-between transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#1C1C1C] border border-[#CFAE70]/50 flex items-center justify-center shrink-0">
                    <span className="font-display font-extrabold text-xl text-[#CFAE70]">V</span>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-accent font-semibold">
                      Vanderbilt University · Dr. Jules White
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink mt-0.5">
                      Prompt Engineering for ChatGPT
                    </h3>
                    <p className="text-xs text-bodytext mt-1.5 leading-relaxed">
                      Akademisch fundierte Spezialisierung auf effektive Prompt-Muster, strukturierte
                      Ausgaben und präzise Steuerung großer Sprachmodelle.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-line/70 flex items-center justify-between text-xs font-mono">
                  <span className="text-labelgray">Ausgestellt: 17.11.2026</span>
                  <a
                    href="https://coursera.org/verify/12KQTALKYOZF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xraycyan hover:text-accent transition-colors whitespace-nowrap"
                  >
                    <span>Zertifikat prüfen</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. ANGEBOT & PREIS-BOX */}
        <section id="angebot" className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-panel border-2 border-accent rounded-2xl p-6 sm:p-10 shadow-2xl relative">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="font-mono text-xs text-accent font-bold">
                  Einführungspreis · Jetzt zum Start sichern
                </div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink">
                  200 KI-Codes: Das Kürzel-Nachschlagewerk für ChatGPT, Claude und Co.
                </h2>
                <p className="text-sm text-bodytext">
                  Sofort einsatzbereit als übersichtliches Nachschlagewerk für deinen Schreibtisch
                  und Bildschirm.
                </p>

                <ul className="space-y-2.5 text-sm text-ink pt-1">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Alle 200 Codes durchnummeriert (001–200):</strong> 110 Text-Codes &amp;
                      90 Visual-Codes in 11 Kategorien
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>23 fertige Kombi-Rezepte:</strong> Für Arbeit, Studium &amp;
                      Bildgenerierung
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Die 5 Kombi-Regeln &amp; Konflikt-Matrix:</strong> Welche Codes
                      harmonieren und was sich beißt
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Beide PDF-Versionen inklusive:</strong> Dark Mode („zum Aufhängen“) +
                      White Mode („zum Ausdrucken“)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-5 bg-chip border border-line rounded-xl p-6 text-center space-y-4">
                <div className="font-mono text-xs text-labelgray font-semibold">
                  EINFÜHRUNGSPREIS · EINMALZAHLUNG
                </div>
                <div className="tabular-nums">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl text-ink">
                    14,95 €
                  </div>
                  <div className="text-xs text-labelgray mt-1.5">
                    regulär demnächst 19,95 € · inkl. gesetzl. MwSt.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalType('checkout')}
                  className="w-full bg-accent hover:bg-accenthover text-navy font-display font-bold text-base py-4 px-5 rounded-lg shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                >
                  Jetzt kaufen &amp; herunterladen
                </button>

                <div className="pt-3 border-t border-line/70 space-y-1.5">
                  <div className="font-mono text-[11px] text-xraycyan">
                    Sofort-Download als PDF nach Kauf
                  </div>
                  <div className="text-[11px] text-labelgray leading-relaxed">
                    Sichere Zahlung über <strong>CopeCart</strong>: PayPal · Kreditkarte · Klarna ·
                    SEPA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FAQ AKKORDEON */}
        <section id="faq" className="max-w-3xl mx-auto px-4 py-12">
          <div className="mb-8 text-center">
            <div className="font-mono text-xs text-accent font-semibold mb-2">
              05. Häufige Fragen
            </div>
            <h2 className="font-display font-bold text-3xl text-ink">Noch Fragen vor dem Start?</h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={item.question} className="bg-panel border border-line rounded-xl overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-display font-bold text-ink text-sm sm:text-base cursor-pointer hover:bg-chiptag/40 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-accent shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-bodytext leading-relaxed border-t border-line/50 pt-3.5">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 12. FOOTER */}
      <footer className="border-t border-line bg-chip/80 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-line/60">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-[5px] bg-accent flex items-center justify-center font-display font-extrabold text-navy text-xs">
                td
              </span>
              <span className="font-display font-bold text-ink text-lg">tedigital</span>
            </div>

            <div className="flex flex-wrap gap-6 font-mono text-xs text-labelgray">
              <button
                type="button"
                onClick={() => setModalType('impressum')}
                className="hover:text-ink transition-colors cursor-pointer whitespace-nowrap"
              >
                Impressum
              </button>
              <button
                type="button"
                onClick={() => setModalType('datenschutz')}
                className="hover:text-ink transition-colors cursor-pointer whitespace-nowrap"
              >
                Datenschutzerklärung
              </button>
              <a
                href="#angebot"
                className="hover:text-ink transition-colors whitespace-nowrap"
              >
                PDF-Paket sichern
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-labelgray">
            <p>© 2026 Torre Ehlers · tedigital. Alle Rechte vorbehalten.</p>
            <p>Die Abbuchung und Bestellabwicklung erfolgt sicher durch CopeCart.</p>
          </div>
        </div>
      </footer>

      <InfoModal
        modalType={modalType}
        submittedEmail={submittedEmail ?? undefined}
        onClose={() => setModalType(null)}
      />
    </div>
  );
}

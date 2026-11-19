import { useEffect, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { TOP_20_CODES } from '../data/workbookData';

export type ModalType = 'impressum' | 'datenschutz' | 'checkout' | 'cheatsheet' | null;

interface InfoModalProps {
  modalType: ModalType;
  submittedEmail?: string;
  onClose: () => void;
}

export function InfoModal({ modalType, submittedEmail, onClose }: InfoModalProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!modalType) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalType, onClose]);

  if (!modalType) return null;

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code.toLowerCase());
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code.toLowerCase();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-panel border border-line rounded-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto ${
          modalType === 'cheatsheet' || modalType === 'datenschutz' ? 'max-w-2xl' : 'max-w-lg'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Dialog schließen"
          className="absolute top-4 right-4 text-labelgray hover:text-ink p-2 rounded-lg hover:bg-chip transition-colors focus-visible:outline-2 focus-visible:outline-accent"
        >
          <X className="w-5 h-5" />
        </button>

        {modalType === 'impressum' && (
          <div className="text-sm text-bodytext space-y-3.5 leading-relaxed">
            <h3 className="font-display font-bold text-xl text-ink">Impressum</h3>
            <p className="font-mono text-xs text-accent">Angaben gemäß § 5 DDG</p>
            <p>
              <strong className="text-ink">Anbieter:</strong>
              <br />
              Torre Ehlers
              <br />
              tedigital
              <br />
              Hamburgerstraße 214
              <br />
              28205 Bremen
            </p>
            <p>
              <strong className="text-ink">Kontakt:</strong>
              <br />
              Telefon: 01575 6618899
              <br />
              E-Mail: torre@tedigital.de
            </p>
            <div className="text-xs text-labelgray pt-3 border-t border-line space-y-1">
              <div className="font-semibold text-ink">Urheberrechtshinweis:</div>
              <p>
                Vervielfältigung, Weitergabe oder Weiterverkauf der digitalen Produkte, auch
                auszugsweise, ist ohne schriftliche Genehmigung nicht gestattet.
              </p>
            </div>
          </div>
        )}

        {modalType === 'datenschutz' && (
          <div className="text-sm text-bodytext space-y-4 leading-relaxed pr-2">
            <h3 className="font-display font-bold text-xl text-ink">
              Datenschutzerklärung
            </h3>

            <section className="space-y-1">
              <h4 className="font-display font-semibold text-ink text-sm">
                1. Verantwortlicher
              </h4>
              <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                <br />
                Torre Ehlers · tedigital
                <br />
                Hamburgerstraße 214, 28205 Bremen
                <br />
                Telefon: 01575 6618899
                <br />
                E-Mail: torre@tedigital.de
              </p>
            </section>

            <section className="space-y-1">
              <h4 className="font-display font-semibold text-ink text-sm">
                2. Hosting &amp; Domain (Vercel &amp; IONOS)
              </h4>
              <p>
                Diese Website wird über Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723,
                USA) gehostet; die Domainverwaltung erfolgt über IONOS SE (Elgendorfer Str. 57,
                56410 Montabaur). Beim Aufruf der Seite werden technisch notwendige Server-Logfiles
                (IP-Adresse, Datum/Uhrzeit, Browsertyp, Referrer) verarbeitet, um Sicherheit und
                Stabilität der Website zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Eine
                Datenübermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy
                Frameworks.
              </p>
            </section>

            <section className="space-y-1">
              <h4 className="font-display font-semibold text-ink text-sm">
                3. Externe Schriftarten &amp; Ressourcen (Google Fonts / CDN)
              </h4>
              <p>
                Zur einheitlichen Darstellung von Schriften und Gestaltungselementen lädt diese
                Seite Webfonts von Google Ireland Limited (Gordon House, Barrow Street, Dublin 4,
                Irland) sowie Stylesheets über Content Delivery Networks. Dabei wird Ihre IP-Adresse
                an die jeweiligen Server übermittelt (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section className="space-y-1">
              <h4 className="font-display font-semibold text-ink text-sm">
                4. Gratis-Spickzettel &amp; Newsletter-Versand (Brevo)
              </h4>
              <p>
                Wenn Sie über unser Formular den kostenlosen Spickzettel („20 Top-Codes“)
                anfordern, verarbeiten wir Ihre E-Mail-Adresse zum Versand des PDF-Spickzettels
                sowie gelegentlicher KI-Tipps von tedigital. Die Anmeldung erfolgt im rechtssicheren
                Double-Opt-in-Verfahren auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
                DSGVO). Für den Versand nutzen wir den Dienstleister Brevo (Sendinblue GmbH,
                Köpenicker Straße 126, 10179 Berlin) auf Basis eines Auftragsverarbeitungsvertrags.
                Sie können Ihre Einwilligung jederzeit über den Abmeldelink in jeder E-Mail
                widerrufen.
              </p>
            </section>

            <section className="space-y-1">
              <h4 className="font-display font-semibold text-ink text-sm">
                5. Kaufabwicklung &amp; Zahlung (CopeCart)
              </h4>
              <p>
                Der Verkauf und die Zahlungsabwicklung unserer digitalen Produkte erfolgen über
                unseren Reseller und Zahlungsdienstleister CopeCart GmbH (Uferstraße 20, 10247
                Berlin). Zur Vertragsabwicklung und Auslieferung der digitalen Inhalte werden Ihre
                Bestell- und Zahlungsdaten von CopeCart verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).
                Ergänzend gelten die Datenschutzbestimmungen von CopeCart (
                <a
                  href="https://www.copecart.com/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xraycyan hover:text-accent underline underline-offset-2"
                >
                  https://www.copecart.com/datenschutz
                </a>
                ).
              </p>
            </section>

            <section className="space-y-1">
              <h4 className="font-display font-semibold text-ink text-sm">
                6. Ihre Rechte als betroffene Person
              </h4>
              <p>
                Sie haben im Rahmen der gesetzlichen Bestimmungen jederzeit das Recht auf Auskunft
                (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO),
                Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20
                DSGVO) sowie Widerspruch (Art. 21 DSGVO). Zudem steht Ihnen ein Beschwerderecht bei
                der zuständigen Datenschutz-Aufsichtsbehörde (Die Landesbeauftragte für Datenschutz
                und Informationsfreiheit der Freien Hansestadt Bremen) zu.
              </p>
            </section>
          </div>
        )}

        {modalType === 'checkout' && (
          <div className="text-sm text-bodytext space-y-3 leading-relaxed">
            <div className="font-mono text-xs text-accent font-semibold">
              CopeCart Checkout-Vorschau
            </div>
            <h3 className="font-display font-bold text-xl text-ink">
              Weiterleitung zu CopeCart
            </h3>
            <p>
              Dieser Button ist aktuell mit dem Bestell-Platzhalter{' '}
              <code className="bg-chip px-1.5 py-0.5 rounded text-xraycyan font-mono text-xs">
                #copecart-checkout-placeholder
              </code>{' '}
              verknüpft.
            </p>
            <p className="text-xs text-labelgray bg-chip p-3.5 rounded-lg border border-line">
              Sobald dein Produkt auf CopeCart freigeschaltet ist, wird dieser Link durch deine
              offizielle Bestellformular-URL ersetzt (inkl. Order-Bump „30 Kombi-Rezepte“ für 7 €
              und Upsell „Bildcodes Pro“ für 17 €).
            </p>
          </div>
        )}

        {modalType === 'cheatsheet' && (
          <div className="space-y-4">
            <div>
              <div className="font-mono text-xs text-xraycyan font-semibold">
                Gratis-Spickzettel · 20 Top-Codes
              </div>
              <h3 className="font-display font-bold text-xl text-ink mt-1">
                Deine 20 sofort einsetzbaren KI-Codes
              </h3>
              {submittedEmail && (
                <p className="text-xs text-bodytext mt-1.5">
                  Vorgemerkt für <strong className="text-ink">{submittedEmail}</strong>. Du kannst
                  alle 20 Codes direkt hier anklicken und in die Zwischenablage kopieren.
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {TOP_20_CODES.map((item) => {
                const isCopied = copiedCode === item.code;
                return (
                  <button
                    key={item.num}
                    type="button"
                    onClick={() => copyCode(item.code)}
                    className="text-left bg-chip hover:bg-chiptag border border-line hover:border-accent/50 rounded-lg p-3 transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs tabular-nums">
                        <span className="text-labelgray">{item.num}</span>
                        <span className="text-accent font-bold">{item.code}</span>
                        <span className="text-labelgray">· {item.category}</span>
                      </div>
                      <span className="text-labelgray group-hover:text-ink">
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-xraycyan" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-bodytext mt-1 leading-snug">{item.effect}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

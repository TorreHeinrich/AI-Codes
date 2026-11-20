import { useState } from 'react';

type PdfThemePreview = 'dark' | 'print';

export function WorkbookBundleMockup() {
  const [pdfPreview, setPdfPreview] = useState<PdfThemePreview>('dark');
  const isPrint = pdfPreview === 'print';

  return (
    <div className="relative w-full max-w-full min-w-0">
      <div
        className="absolute inset-0 rounded-2xl blur-xl opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 30%, rgba(143, 227, 255, 0.18), transparent 55%), radial-gradient(circle at 80% 75%, rgba(232, 137, 12, 0.16), transparent 55%)',
        }}
      />

      <div className="relative w-full bg-slate-50 rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 overflow-hidden">
        <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center py-2">
          {/* LINKS: 3D-Hardcover Buch (5 Spalten) */}
          <div className="col-span-5 relative transform -rotate-1 hover:rotate-0 transition-transform duration-200">
            <div className="bg-[#0B192C] rounded-r-lg rounded-l-[3px] border border-[#1E3A5F] shadow-[12px_14px_28px_rgba(4,12,24,0.42)] overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-[#040C18] via-[#152C4B] to-transparent border-r border-white/10" />

              <div className="pl-4 pr-2.5 pt-3 pb-3.5 space-y-2.5">
                {/* Mini X-Ray Staubsauger auf dem Cover */}
                <div className="bg-[#040C18] border border-[#2E5577]/80 rounded p-1.5 relative">
                  <svg viewBox="0 0 220 120" className="w-full h-auto xray-glow" aria-hidden="true">
                    <line
                      x1="8"
                      y1="104"
                      x2="212"
                      y2="104"
                      stroke="#8FE3FF"
                      strokeOpacity="0.3"
                      strokeWidth="0.7"
                      strokeDasharray="2 3"
                    />
                    <rect
                      x="26"
                      y="48"
                      width="92"
                      height="42"
                      rx="21"
                      fill="#8FE3FF"
                      fillOpacity="0.08"
                      stroke="#8FE3FF"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="34"
                      y="54"
                      width="36"
                      height="30"
                      rx="5"
                      fill="#8FE3FF"
                      fillOpacity="0.14"
                      stroke="#8FE3FF"
                      strokeWidth="0.8"
                    />
                    <circle
                      cx="86"
                      cy="69"
                      r="11"
                      fill="#8FE3FF"
                      fillOpacity="0.12"
                      stroke="#8FE3FF"
                      strokeWidth="0.9"
                    />
                    <rect
                      x="101"
                      y="59"
                      width="14"
                      height="20"
                      rx="2"
                      fill="#8FE3FF"
                      fillOpacity="0.16"
                      stroke="#8FE3FF"
                      strokeWidth="0.8"
                    />
                    <rect
                      x="56"
                      y="38"
                      width="34"
                      height="12"
                      rx="4"
                      fill="none"
                      stroke="#8FE3FF"
                      strokeWidth="1"
                    />
                    <circle cx="42" cy="96" r="6" fill="#040C18" stroke="#8FE3FF" strokeWidth="1" />
                    <circle cx="102" cy="96" r="6" fill="#040C18" stroke="#8FE3FF" strokeWidth="1" />
                    <path
                      d="M 118 69 C 145 69, 148 26, 168 26"
                      fill="none"
                      stroke="#8FE3FF"
                      strokeWidth="4.5"
                      strokeOpacity="0.35"
                    />
                    <path
                      d="M 118 69 C 145 69, 148 26, 168 26"
                      fill="none"
                      stroke="#8FE3FF"
                      strokeWidth="1"
                    />
                    <line x1="170" y1="28" x2="192" y2="94" stroke="#8FE3FF" strokeWidth="2.5" />
                    <polygon
                      points="178,103 208,103 204,95 182,95"
                      fill="#8FE3FF"
                      fillOpacity="0.15"
                      stroke="#8FE3FF"
                      strokeWidth="1"
                    />
                    <line x1="50" y1="20" x2="50" y2="56" stroke="#E8890C" strokeWidth="0.7" />
                    <circle cx="50" cy="56" r="1.5" fill="#E8890C" />
                    <line x1="86" y1="14" x2="86" y2="58" stroke="#E8890C" strokeWidth="0.7" />
                    <circle cx="86" cy="58" r="1.5" fill="#E8890C" />
                    <line x1="145" y1="18" x2="145" y2="44" stroke="#E8890C" strokeWidth="0.7" />
                    <circle cx="145" cy="44" r="1.5" fill="#E8890C" />
                  </svg>
                  <div className="mt-1 inline-block bg-chip border border-line px-1.5 py-0.5 rounded text-[7px] font-mono text-accent font-bold">
                    PROMPT /XRAY
                  </div>
                </div>

                <div className="pt-0.5">
                  <div className="font-display font-extrabold text-lg sm:text-2xl text-xraycyan leading-none">
                    200 KI-Codes
                  </div>
                  <div className="font-sans font-semibold text-[10px] sm:text-xs text-white leading-snug mt-1">
                    : Das Kürzel-Nachschlagewerk für ChatGPT, Claude und Co.
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-accent text-[#040C18] font-display font-extrabold text-[8px] flex items-center justify-center">
                    te
                  </span>
                  <span className="font-display font-bold text-[10px] text-white tracking-tight">
                    digital
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RECHTS: Aufgeschlagenes Spiral-Workbook (7 Spalten) */}
          <div className="col-span-7 relative transform rotate-1 hover:rotate-0 transition-transform duration-200">
            <div
              className={`rounded-lg border shadow-[10px_14px_26px_rgba(4,12,24,0.32)] grid grid-cols-2 overflow-hidden relative transition-colors duration-200 ${
                isPrint
                  ? 'bg-white border-slate-300'
                  : 'bg-[#0A1B31] border-[#1D3659]'
              }`}
            >
              {/* Linke Innenseite: Einführung */}
              <div
                className={`p-2.5 sm:p-3.5 border-r space-y-2 ${
                  isPrint
                    ? 'border-slate-200 bg-slate-50/60'
                    : 'border-black/50 bg-gradient-to-l from-[#06122A]/60 to-transparent'
                }`}
              >
                <div className="font-mono text-[7px] tracking-widest text-accent uppercase font-semibold">
                  00. Einführung
                </div>
                <div
                  className={`font-display font-bold text-[11px] sm:text-xs leading-tight ${
                    isPrint ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Was sind KI-Codes?
                </div>
                <p
                  className={`text-[7.5px] sm:text-[8.5px] leading-relaxed ${
                    isPrint ? 'text-slate-600' : 'text-bodytext'
                  }`}
                >
                  Ein Wort statt eines ganzen Prompts. Kürzel wie{' '}
                  <span className="text-accent font-mono font-semibold">/ELI5</span> oder{' '}
                  <span className="text-accent font-mono font-semibold">/XRAY</span> schreibst du
                  einfach vor deine Anfrage.
                </p>
                <div className="bg-accent text-navy rounded px-2 py-1">
                  <div className="font-mono text-[6px] font-bold uppercase tracking-wider">
                    Beispiel-Code
                  </div>
                  <div className="font-mono text-[8px] font-extrabold">› /tldr /eli5</div>
                </div>
                <div className="space-y-1 pt-0.5">
                  <div className={`h-1 w-full rounded ${isPrint ? 'bg-slate-200' : 'bg-line'}`} />
                  <div className={`h-1 w-5/6 rounded ${isPrint ? 'bg-slate-200' : 'bg-line'}`} />
                  <div className={`h-1 w-4/6 rounded ${isPrint ? 'bg-slate-200' : 'bg-line'}`} />
                </div>
              </div>

              {/* Spiralbindung in der Mitte */}
              <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-2.5 flex flex-col justify-between py-1 z-10 pointer-events-none">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="block h-1 w-full rounded-full bg-gradient-to-r from-gray-400 via-white to-gray-500 shadow"
                  />
                ))}
              </div>

              {/* Rechte Innenseite: ELI-Leiter */}
              <div
                className={`p-2.5 sm:p-3.5 space-y-1.5 ${
                  isPrint ? 'bg-white' : 'bg-gradient-to-r from-[#06122A]/50 to-transparent'
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-1 ${
                    isPrint ? 'border-slate-200' : 'border-line'
                  }`}
                >
                  <span
                    className={`font-display font-bold text-[10px] sm:text-xs ${
                      isPrint ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    ELI-Leiter
                  </span>
                  <span className="font-mono text-[6.5px] text-accent font-semibold">S. 03</span>
                </div>
                <div className="space-y-1 text-[7px] font-mono tabular-nums">
                  {[
                    { n: '001', c: '/ELI5', l: '5 Jahre' },
                    { n: '002', c: '/ELI10', l: '10 Jahre' },
                    { n: '003', c: '/ELI15', l: '15 Jahre' },
                    { n: '004', c: '/ELICOLLEGE', l: 'Uni' },
                    { n: '005', c: '/ELIPHD', l: 'Doktor' },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className={`flex items-center gap-1.5 border rounded px-1.5 py-0.5 ${
                        isPrint
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-panel/90 border-line'
                      }`}
                    >
                      <span className="bg-accent text-navy font-bold px-1 rounded-[2px]">
                        {item.n}
                      </span>
                      <span className="text-accent font-bold">{item.c}</span>
                      <span
                        className={`font-sans ml-auto ${
                          isPrint ? 'text-slate-700' : 'text-ink'
                        }`}
                      >
                        {item.l}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interaktiver PDF-Ansicht Umschalter unter dem Mockup */}
        <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-800">
          <span className="font-semibold text-slate-900">
            200 KI-Codes · PDF-Paket (Dark &amp; Print inklusive)
          </span>
          <div
            className="inline-flex items-center gap-1 p-0.5 bg-slate-200/90 rounded-md"
            role="group"
            aria-label="PDF-Vorschau umschalten"
          >
            <button
              type="button"
              onClick={() => setPdfPreview('dark')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                pdfPreview === 'dark'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Dark PDF
            </button>
            <button
              type="button"
              onClick={() => setPdfPreview('print')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                pdfPreview === 'print'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Print PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

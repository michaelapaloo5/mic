export default function IllustrationBanner() {
  return (
    <div className="illustration-banner-container relative">
      {/* Desktop background columns */}
      <div className="hidden l:contents">
        <div className="bg-[rgb(9,118,214)] w-1/2 h-full z-[-1] absolute left-0" />
        <div className="bg-[rgb(243,249,254)] w-1/2 h-full z-[-1] absolute right-0" />
      </div>
      <div className="illustration-banner tw-grid relative !p-0 m:!my-0 m:!mx-auto l:!py-0 l:!px-[30px] mx-auto max-w-[1350px]">
        {/* Mobile: two slides */}
        <div className="l:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {/* Blue slide */}
            <div className="bg-[rgb(9,118,214)] min-w-[85vw] snap-start p-8 mr-4 first:ml-4 rounded-2xl flex flex-col justify-between min-h-[280px]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-headline-s font-bold text-white leading-tight">
                    Altersvorsorgedepot: Sichere dir ab 2027 jährlich bis zu 540 Euro Förderung.
                  </h3>
                  <a
                    href="/privatkunden/investieren/altersvorsorgedepot?wt_mc=pk.avd.hp_illu"
                    className="mt-4 inline-flex items-center gap-2 text-white font-semibold text-sm border-b border-solid border-b-white pb-0.5"
                  >
                    Für Updates anmelden
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <img src="/images/easy-life.svg" alt="" className="w-20 h-20 ml-6" />
              </div>
            </div>
            {/* Grey slide */}
            <div className="bg-[rgb(243,249,254)] min-w-[85vw] snap-start p-8 mr-4 first:ml-4 last:mr-4 rounded-2xl flex flex-col justify-between min-h-[280px]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-headline-s font-bold text-[#0d0e0ff2] leading-tight">
                    Immobilienbewertung leicht gemacht: direkt & kostenlos
                  </h3>
                  <a
                    href="/privatkunden/immobilien/immobilienbewertung?wt_mc=pk.ibw.hp.illu.g.0226"
                    className="mt-4 inline-flex items-center gap-2 text-[#0d0e0ff2] font-semibold text-sm border-b border-solid border-b-[#0d0e0ff2] pb-0.5"
                  >
                    Zur Online-Immobilienbewertung
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <img src="/images/house.svg" alt="" className="w-20 h-20 ml-6" />
              </div>
            </div>
          </div>
        </div>
        {/* Desktop: side by side */}
        <div className="hidden l:grid l:grid-cols-2">
          {/* Blue column */}
          <div className="bg-[rgb(9,118,214)] flex items-center justify-between py-[73px] px-[30px]">
            <div className="flex-1">
              <h3 className="text-headline-m font-bold text-white leading-tight max-w-md">
                Altersvorsorgedepot: Sichere dir ab 2027 jährlich bis zu 540 Euro Förderung.
              </h3>
              <a
                href="/privatkunden/investieren/altersvorsorgedepot?wt_mc=pk.avd.hp_illu"
                className="mt-4 inline-flex items-center gap-2 text-white font-semibold text-sm border-b border-solid border-b-white pb-0.5"
              >
                Für Updates anmelden
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <img src="/images/easy-life.svg" alt="" className="w-[120px] h-[90px] ml-6 l:ml-0 l:mr-8" />
          </div>
          {/* Grey column */}
          <div className="bg-[rgb(243,249,254)] flex items-center justify-between py-[73px] px-[30px]">
            <div className="flex-1">
              <h3 className="text-headline-m font-bold text-[#0d0e0ff2] leading-tight max-w-md">
                Immobilienbewertung leicht gemacht: direkt & kostenlos
              </h3>
              <a
                href="/privatkunden/immobilien/immobilienbewertung?wt_mc=pk.ibw.hp.illu.g.0226"
                className="mt-4 inline-flex items-center gap-2 text-[#0d0e0ff2] font-semibold text-sm border-b border-solid border-b-[#0d0e0ff2] pb-0.5"
              >
                Zur Online-Immobilienbewertung
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <img src="/images/house.svg" alt="" className="w-[120px] h-[90px] ml-6 l:ml-0 l:mr-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

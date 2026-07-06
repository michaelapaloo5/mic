import Button from "./Button"

export default function Hero() {
  return (
    <section className="has-page-variant bg-[rgb(243,249,254)]">
      <section className="hub-page">
        <div className="page-hero !grid relative w-full l:!flex l:justify-center l:gap-0 l:items-stretch l:h-[85vh]">
          {/* Image column — order-2 on desktop */}
          <div className="l:!order-2 flex-1 relative overflow-hidden l:flex-[2] l:flex l:items-center l:justify-center l:h-auto">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="/images/hero-desktop.jpg"
              />
              <img
                loading="eager"
                src="/images/hero-mobile.jpg"
                alt="Ein Mann mit Smartphone sitzt auf der Couch"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </div>

          {/* Text column — order-1 on desktop */}
          <div className="l:!order-1 pl-[30px] s:pr-[30px] pt-[27px] m:px-14 m:py-14 xl:py-0 xl:!px-0 xxl:px-[165px] justify-center relative l:static l:flex l:items-center l:justify-center flex-1 l:flex-[2]">
            <div className="xxl:m-0 l:flex l:flex-col l:justify-center max-w-[630px]">
              <h1 className="text-[32px] l:text-[48px] font-[600] leading-[1.31] l:leading-[1.25] [&_em]:not-italic [&_em]:text-[#2ad1c9]">
                <em>Kostenloses Girokonto</em> mit Visa Debitkarte
              </h1>
              <div className="mt-4 mb-8 m:mb-12">
                <ul className="list-image-checkmarks-teal pl-4 text-[17px] l:text-[20px] leading-[1.4] l:leading-[1.3]">
                  <li className="pl-2">
                    <p>
                      Kostenloses Konto bei 700 € monatlichem Geldeingang oder
                      für alle unter 28 Jahren
                    </p>
                  </li>
                  <li className="mt-4 pl-2">
                    <p>Moderne App und intuitives Web-Banking</p>
                  </li>
                  <li className="mt-4 pl-2">
                    <p>
                      Schnelle Kontoer&ouml;ffnung in 5 Minuten &ndash; alles
                      online, ohne Papierkram
                    </p>
                  </li>
                </ul>
              </div>
              <div className="action-bar mt-8 flex flex-col m:flex-row flex-wrap items-start m:items-center gap-6 m:gap-2">
                <Button
                  variant="primary"
                  theme="blue"
                  size="m"
                  href="/privatkunden/girokonto?wt_mc=pk.giro_hp_b"
                  className="w-full shrink-0 m:w-auto"
                >
                  Zum Girokonto
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus card (below hero, inside container) */}
        <div className="mx-auto px-6 m:px-[30px] max-w-[1350px] py-8 m:py-14">
          <div className="teaser group block border-0 border-none no-underline m:mb-0">
            <div className="teaser__image-container relative block w-full overflow-hidden">
              <div className="m:flex m:flex-row-reverse m:items-center m:gap-8 bg-white rounded-[12px] overflow-hidden">
                <div className="m:w-1/2 l:w-[45%]">
                  <img
                    loading="lazy"
                    src="/images/visa-credit-card.png"
                    alt="DKB Visa Kreditkarte"
                    className="block w-full h-auto object-cover"
                  />
                </div>
                <div className="p-6 m:p-8 m:w-1/2 l:w-[55%]">
                  <p className="text-[15px] l:text-[17px] leading-[1.4] text-[rgba(15,47,71,0.66)] mb-2 font-[500]">
                    Nur noch kurze Zeit:
                  </p>
                  <h3 className="text-[22px] l:text-[28px] font-[600] leading-[1.27] text-[rgb(13,14,15)] mb-4">
                    15 € Bonus f&uuml;r deine erste Visa Kreditkarte
                  </h3>
                  <ul className="text-[15px] l:text-[17px] leading-[1.4] text-[rgba(15,47,71,0.66)] space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        fill="none"
                        viewBox="0 0 17 16"
                        className="mt-[3px] shrink-0"
                      >
                        <path
                          fill="#2ad1c9"
                          fillRule="evenodd"
                          d="M15.79 2.74a1.8 1.8 0 0 0-.56-2.46 1.75 1.75 0 0 0-2.43.55L6.44 11.06 3.2 7.3a1.81 1.81 0 0 0-2.58-.17 1.87 1.87 0 0 0-.18 2.61l4.74 5.5c.49.57 1.24.77 1.9.57.42-.11.8-.38 1.04-.77l7.66-12.31z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        15 € Bonus nur noch bis 06.07.2026 &ndash; damit geht
                        der Kartenpreis im ersten halben Jahr auf uns
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        fill="none"
                        viewBox="0 0 17 16"
                        className="mt-[3px] shrink-0"
                      >
                        <path
                          fill="#2ad1c9"
                          fillRule="evenodd"
                          d="M15.79 2.74a1.8 1.8 0 0 0-.56-2.46 1.75 1.75 0 0 0-2.43.55L6.44 11.06 3.2 7.3a1.81 1.81 0 0 0-2.58-.17 1.87 1.87 0 0 0-.18 2.61l4.74 5.5c.49.57 1.24.77 1.9.57.42-.11.8-.38 1.04-.77l7.66-12.31z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Weltweit kostenlos bezahlen &ndash; &uuml;berall, wo
                        Visa akzeptiert wird
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        fill="none"
                        viewBox="0 0 17 16"
                        className="mt-[3px] shrink-0"
                      >
                        <path
                          fill="#2ad1c9"
                          fillRule="evenodd"
                          d="M15.79 2.74a1.8 1.8 0 0 0-.56-2.46 1.75 1.75 0 0 0-2.43.55L6.44 11.06 3.2 7.3a1.81 1.81 0 0 0-2.58-.17 1.87 1.87 0 0 0-.18 2.61l4.74 5.5c.49.57 1.24.77 1.9.57.42-.11.8-.38 1.04-.77l7.66-12.31z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Flexibel bleiben dank individuellem Kartenlimit
                      </span>
                    </li>
                  </ul>
                  <a
                    href="https://www.dkb.de/privatkunden/kreditkarten/visakarte?wt_mc=pk.visa_bonus_hp_st.html"
                    className="button-component button--size-m button--variant-primary button--theme-blue"
                  >
                    Zur Aktion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

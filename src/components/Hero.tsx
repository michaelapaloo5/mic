import Button from "./Button"
import Icon from "./Icon"

export default function Hero() {
  return (
    <section className="bg-[rgb(243,249,254)]">
      <div className="max-w-[1440px] mx-auto l:flex l:justify-center l:items-stretch l:h-[85vh]">
        {/* Text column */}
        <div className="flex-[2] px-[30px] pt-[27px] m:px-14 m:py-14 xl:py-0 xxl:px-[165px] flex flex-col justify-center">
          <div className="max-w-[630px]">
            <h1 className="text-headline-m m:text-headline-l l:text-headline-m xl:text-headline-l xxl:text-headline-xl xxl:!leading-[4.75rem] -tracking-[0.84px] [&_em]:not-italic [&_em]:text-[#1fb8b0] font-bold">
              <em>Kostenloses Girokonto</em>{" "}mit Visa Debitkarte
            </h1>
            <div className="mt-4 mb-8 m:mb-12">
              <ul className="[&_li]:list-image-checkmarks-teal [&_li+li]:mt-4 pl-4 text-l xl:text-xl">
                <li>
                  <p>
                    <a href="/#kostenloses-konto" className="text-[#2ad1c9] font-semibold">
                      Kostenloses{" "}
                    </a>
                    Konto bei 700 € monatlichem Geldeingang oder für alle unter 28 Jahren
                  </p>
                </li>
                <li>
                  <p>Moderne App und intuitives Web-Banking</p>
                </li>
                <li>
                  <p>Schnelle Kontoeröffnung in 5 Minuten – alles online, ohne Papierkram</p>
                </li>
              </ul>
            </div>
            <div className="mb-3">
              <Button
                variant="primary"
                theme="blue"
                size="l"
                href="/privatkunden/girokonto?wt_mc=pk.giro_hp_b"
              >
                Zum Girokonto
              </Button>
            </div>
          </div>
        </div>
        {/* Image column */}
        <div className="flex-[2] min-h-[300px] l:min-h-full">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/images/hero-desktop.jpg" />
            <img
              src="/images/hero-mobile.jpg"
              alt="Ein Mann mit Smartphone sitzt auf der Couch"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}

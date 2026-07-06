import Button from "./Button"
import Icon from "./Icon"

export default function Hero() {
  return (
    <section className="bg-dkb-grey">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col-reverse m:flex-row items-stretch">
          {/* Text column */}
          <div className="flex-1 px-6 py-10 m:py-16 xl:py-20 xl:px-16 flex flex-col justify-center">
            <h1 className="text-headline-m m:text-headline-l xl:text-headline-xl font-bold leading-tight -tracking-[0.84px]">
              Kostenloses Girokonto&nbsp;mit{" "}
              <em className="not-italic text-dkb-positive-pressed">Visa Debitkarte</em>
            </h1>
            <ul className="mt-6 space-y-3">
              {[
                "Kostenlose Kontoführung & Visa Debitkarte",
                "Bargeldabhebungen weltweit kostenlos",
                "Geld einzahlen an über 12.000 Stellen",
                "DKB App mit vielen nützlichen Funktionen",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-m m:text-l text-dkb-text">
                  <span className="mt-0.5 shrink-0 text-dkb-teal">
                    <Icon name="checkmark" size={22} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col m:flex-row items-start gap-4">
              <Button variant="primary" theme="blue" size="l" href="/privatkunden/girokonto">
                Zum Girokonto
              </Button>
              <Button variant="tertiary" theme="blue" size="l" href="/privatkunden/konten-und-karten">
                Alle Konten & Karten
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>
          </div>
          {/* Image column */}
          <div className="flex-1 min-h-[300px] m:min-h-full">
            <picture>
              <source
                media="(min-width: 740px)"
                srcSet="/images/hero-desktop.svg"
              />
              <img
                src="/images/hero-mobile.svg"
                alt="Mann auf Couch mit Smartphone"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "1908 / 1273" }}
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  )
}

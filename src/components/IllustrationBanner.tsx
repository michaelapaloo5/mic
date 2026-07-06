import Icon from "./Icon"

export default function IllustrationBanner() {
  const slides = [
    {
      title: "Altersvorsorgedepot",
      description: "Jetzt clever fürs Alter vorsorgen – mit einem Depot, das zu dir passt.",
      href: "/privatkunden/altersvorsorge",
      theme: "blue",
      img: "/images/altersvorsorge.svg",
    },
    {
      title: "Immobilienbewertung",
      description: "Wie viel ist deine Immobilie wert? Jetzt kostenlos bewerten lassen.",
      href: "/privatkunden/immobilienbewertung",
      theme: "grey",
      img: "/images/immobilienbewertung.svg",
    },
  ]

  return (
    <section className="bg-white">
      {/* Desktop: side by side */}
      <div className="hidden m:grid grid-cols-2">
        {slides.map((slide, i) => (
          <a
            key={i}
            href={slide.href}
            className={`group relative flex flex-col justify-end p-10 xl:p-16 min-h-[400px] overflow-hidden ${
              slide.theme === "blue" ? "bg-dkb-blue-dark" : "bg-dkb-grey"
            }`}
          >
            <div className="relative z-10 max-w-sm">
              <h3
                className={`text-headline-s m:text-headline-m font-bold leading-tight ${
                  slide.theme === "blue" ? "text-white" : "text-dkb-text"
                }`}
              >
                {slide.title}
              </h3>
              <p
                className={`mt-3 text-m ${
                  slide.theme === "blue" ? "text-white/80" : "text-dkb-text/80"
                }`}
              >
                {slide.description}
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-2 font-semibold text-sm border-b-2 pb-0.5 ${
                  slide.theme === "blue"
                    ? "text-white border-white"
                    : "text-dkb-blue-dark border-dkb-blue-dark"
                } group-hover:gap-3 transition-all`}
              >
                Mehr erfahren
                <Icon name="arrow-right" size={16} />
              </span>
            </div>
            <img
              src={slide.img}
              alt={slide.title}
              className="absolute right-0 bottom-0 h-4/5 w-auto object-contain opacity-30"
              loading="lazy"
            />
          </a>
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="m:hidden scroll-swiper scrollbar-hide">
        {slides.map((slide, i) => (
          <a
            key={i}
            href={slide.href}
            className={`group inline-flex flex-col justify-end w-[85vw] min-h-[320px] p-8 mr-4 first:ml-4 last:mr-4 rounded-2xl ${
              slide.theme === "blue" ? "bg-dkb-blue-dark" : "bg-dkb-grey"
            }`}
          >
            <h3
              className={`text-headline-s font-bold leading-tight ${
                slide.theme === "blue" ? "text-white" : "text-dkb-text"
              }`}
            >
              {slide.title}
            </h3>
            <p
              className={`mt-2 text-m ${
                slide.theme === "blue" ? "text-white/80" : "text-dkb-text/80"
              }`}
            >
              {slide.description}
            </p>
            <span
              className={`mt-4 inline-flex items-center gap-2 font-semibold text-sm border-b-2 pb-0.5 w-fit ${
                slide.theme === "blue"
                  ? "text-white border-white"
                  : "text-dkb-blue-dark border-dkb-blue-dark"
              }`}
            >
              Mehr erfahren
              <Icon name="arrow-right" size={16} />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

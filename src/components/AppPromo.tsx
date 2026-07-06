import Button from "./Button"

export default function AppPromo() {
  return (
    <section className="relative bg-dkb-navy mt-[-40px]">
      {/* Negative margin overlap offset */}
      <div className="max-w-[1440px] mx-auto px-6 xl:px-16">
        <div className="relative grid grid-cols-1 m:grid-cols-2 gap-8 items-center pt-20 pb-12 m:py-20">
          {/* Phone image */}
          <div className="relative -mt-40 m:-mt-32 flex justify-center m:justify-start">
            <img
              src="/images/app-phone.png"
              alt="DKB App auf Smartphone"
              className="w-64 m:w-80 xl:w-96 h-auto"
              loading="lazy"
            />
          </div>
          {/* Text content */}
          <div className="text-white">
            <h2 className="text-headline-s m:text-headline-m font-bold leading-tight">
              Die DKB App – deine Bank in der Hosentasche
            </h2>
            <p className="mt-4 text-m m:text-l text-white/80">
              Überweisungen tätigen, Kontostand prüfen, Karten verwalten und vieles mehr – alles schnell und sicher in der DKB App.
            </p>
            <div className="mt-8 flex flex-col s:flex-row items-start gap-4">
              <Button variant="primary" theme="light" size="m" href="#">
                DKB-App entdecken
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="#" aria-label="Google Play Store">
                <img
                  src="/images/google-play-badge.svg"
                  alt="Google Play"
                  className="h-10 w-auto"
                />
              </a>
              <a href="#" aria-label="Apple App Store">
                <img
                  src="/images/app-store-badge.svg"
                  alt="App Store"
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

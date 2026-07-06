import Button from "./Button"

export default function AppPromo() {
  return (
    <div className="hero-footer">
      {/* Spacer */}
      <div className="w-full h-[40px]" />

      {/* App badges */}
      <div className="flex flex-col mb-[-120px] m:mt-[50px] m:mb-[-125px] l:mb-[-150px] [&_a]:[all:unset] max-w-[1440px] mx-auto px-6">
        <div className="w-full">
          <a
            href="https://play.google.com/store/apps/details?id=com.dkbcodefactory.banking"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-block"
          >
            <img
              src="/images/google-play-badge.png"
              alt="Google Play Store"
              className="max-w-[100px] m:max-w-[120px] l:max-w-[160px] max-h-[40px] m:max-h-[50px] l:max-h-[70px]"
            />
          </a>
        </div>
        <div className="w-full">
          <a
            href="https://apps.apple.com/de/app/dkb/id1473806360"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-block"
          >
            <img
              src="/images/app-store-badge.png"
              alt="Apple App Store"
              className="max-w-[100px] m:max-w-[120px] l:max-w-[160px] max-h-[40px] m:max-h-[50px] l:max-h-[70px]"
            />
          </a>
        </div>
      </div>

      {/* Bottom dark section */}
      <div className="bg-[rgb(9,118,214)] mt-[200px] m:mt-[150px] l:mt-[200px]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col m:flex-row m:justify-between l:gap-[90px] xl:gap-[230px]">
            {/* Phone image */}
            <div className="self-end m:self-auto m:order-2 m:mb-[48px]">
              <img
                src="/images/app-phone.png"
                alt="Illustration eines Smartphone mit Girokonto Umsätzen in der DKB-App"
                className="max-w-[270px] mt-[-60%] m:max-w-[345px] m:mt-[-50%] l:max-w-[500px] l:mt-[-40%]"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col mt-[30px] mb-[48px] place-content-center m:order-1 m:mr-4 m:max-w-[330px] l:justify-start l:pr-0 l:max-w-[400px] l:mt-14 xl:max-w-[515px]">
              <div className="text-white text-m l:text-l">
                Egal, ob du kurz deinen Kontostand checken oder eine Überweisung tätigen willst: Mit unserer DKB-App erledigst du deine Bankgeschäfte sicher, einfach und bequem von überall.
              </div>
              <div className="flex mt-4 m:mt-6">
                <a
                  href="/privatkunden/girokonto/banking-app"
                  className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 px-6 py-3 text-base bg-white text-[rgb(9,118,214)] hover:bg-gray-50 w-full m:w-auto"
                  aria-label="DKB-App entdecken"
                >
                  DKB-App entdecken
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

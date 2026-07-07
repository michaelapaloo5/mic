"use client"

import { useState } from "react"

const footerGroups = [
  {
    title: "Unternehmen",
    links: [
      { label: "Presse", href: "/presse" },
      { label: "Karriere", href: "/karriere" },
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Investor Relations", href: "/ueber-uns/investor-relations" },
      { label: "Compliance", href: "/ueber-uns/compliance" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Hilfe & Kontakt", href: "/fragen-antworten" },
      { label: "Formulare", href: "/privatkunden/service/formulare" },
      {
        label: "TAN-Verfahren",
        href: "/fragen-antworten/welche-tan-verfahren-bietet-die-dkb-an",
      },
      {
        label: "Karte sperren?",
        href: "/fragen-antworten/wie-kann-ich-meine-karte-bei-verlust-oder-missbrauch-sperren",
      },
    ],
  },
  {
    title: "Produkte",
    links: [
      { label: "Girokonto", href: "/privatkunden/girokonto" },
      { label: "Visa Kreditkarte", href: "/privatkunden/karten/visa-kreditkarte" },
      { label: "Privatkredit", href: "/privatkunden/kredite/privatkredit" },
      { label: "Depot", href: "/privatkunden/investieren/depot" },
      { label: "Baufinanzierung", href: "/privatkunden/baufinanzierung" },
    ],
  },
  {
    title: "Weiteres",
    links: [
      { label: "Freunde werben", href: "https://freundewerben.dkb.de/" },
      { label: "Finanzwissen", href: "/finanzwissen" },
      { label: "DKB-App", href: "/privatkunden/girokonto/banking-app" },
      { label: "Sicherheit", href: "/privatkunden/service/sicherheit-banking" },
    ],
  },
]

export default function Footer() {
  const [openGroup, setOpenGroup] = useState<number | null>(null)

  return (
    <footer className="page-footer shrink-0 flex flex-col">
      <div className="category-footer bg-[rgb(0,46,92)]">
        <div className="category-footer-container tw-grid flex flex-col items-start justify-center p-4 m:!p-8 l:flex-row l:justify-between max-w-[1350px] mx-auto">
          {/* Link groups */}
          <div className="category-footer-links w-full flex flex-col gap-4 m:flex-row m:justify-evenly m:gap-[30px] l:gap-[45px] xl:gap-[72px]">
            {footerGroups.map((group, gi) => (
              <div key={gi} className="category-footer-links__group text-white">
                {/* Mobile toggle */}
                <button
                  type="button"
                  onClick={() => setOpenGroup(openGroup === gi ? null : gi)}
                  className="category-footer__mobile-button bg-[rgb(0,46,92)] m:hidden w-full text-white border-none pl-0 flex items-center justify-between gap-1 cursor-pointer"
                >
                  <span className="category-footer__link-title block text-[17px] font-semibold l:text-[20px]">
                    {group.title}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    className={`category-footer__toggle-icon transition-transform ${
                      openGroup === gi ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M5.293 8.293a1 1 0 0 1 1.414 0L12 13.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414"
                      clipRule="evenodd"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                {/* Desktop title */}
                <div className="category-footer__link-title hidden m:inline-block text-[17px] font-semibold l:text-[20px]">
                  {group.title}
                </div>

                {/* Links */}
                <div
                  className={`${
                    openGroup === gi ? "block" : "hidden"
                  } m:block category-footer__links`}
                >
                  <ul className="category-footer__link text-[15px] l:text-[17px] list-none m-0 p-0 [&_li]:py-1 [&_li]:px-0">
                    {group.links.map((link, li) => (
                      <li key={li}>
                        <a
                          href={link.href}
                          className="text-white/90 hover:text-white no-underline transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className="category-footer-social">
            <ol className="list-none flex flex-row items-center justify-evenly gap-3 sm:gap-5 p-0 mt-8 m:mt-12 l:mt-0">
              <li>
                <a
                  href="https://www.linkedin.com/company/dkb"
                  target="_blank"
                  rel="noreferrer"
                  className="block !pt-0 text-white hover:text-white/80 transition-colors"
                  aria-label="linkedin"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M19.043 19.041h-2.964V14.4c0-1.107-.02-2.532-1.542-2.532-1.543 0-1.78 1.206-1.78 2.451v4.722H9.795V9.497h2.845V10.8h.04a3.12 3.12 0 0 1 2.807-1.542c3.004 0 3.558 1.976 3.558 4.546zM6.45 8.191c-.943 0-1.72-.775-1.72-1.719 0-.943.776-1.72 1.72-1.72.943 0 1.72.777 1.72 1.72s-.777 1.72-1.72 1.72m1.482 10.85H4.965V9.497h2.967zM20.52 2.001H3.476A1.467 1.467 0 0 0 2 3.44v17.116c.01.8.675 1.452 1.476 1.443H20.52a1.47 1.47 0 0 0 1.482-1.443V3.44A1.47 1.47 0 0 0 20.52 2" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/dkb.de/"
                  target="_blank"
                  rel="noreferrer"
                  className="block !pt-0 text-white hover:text-white/80 transition-colors"
                  aria-label="instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M12 3c-2.443 0-2.75.01-3.71.054-.958.044-1.612.196-2.185.419A4.4 4.4 0 0 0 4.511 4.51c-.5.5-.808 1.003-1.039 1.594-.223.573-.375 1.227-.418 2.185C3.011 9.249 3 9.556 3 12s.01 2.75.054 3.71c.044.958.196 1.612.419 2.185a4.4 4.4 0 0 0 1.038 1.594c.5.5 1.002.809 1.593 1.039.573.222 1.227.374 2.185.418.96.043 1.267.054 3.71.054 2.445 0 2.751-.01 3.711-.054.958-.044 1.613-.196 2.185-.418a4.4 4.4 0 0 0 1.594-1.04c.5-.5.808-1.001 1.038-1.593.222-.573.374-1.227.419-2.185.043-.96.054-1.266.054-3.71s-.011-2.75-.054-3.711c-.045-.958-.197-1.612-.419-2.184A4.4 4.4 0 0 0 19.49 4.51c-.5-.5-1.001-.808-1.594-1.037-.574-.223-1.228-.375-2.186-.419-.96-.043-1.266-.054-3.711-.054zm-.806 1.622H12c2.403 0 2.688.009 3.637.052.877.04 1.353.186 1.67.31.42.163.72.358 1.035.673s.51.615.673 1.035c.124.317.27.793.31 1.67.043.95.053 1.234.053 3.636s-.01 2.687-.053 3.636c-.04.877-.186 1.354-.31 1.67-.163.42-.358.72-.673 1.034s-.614.51-1.034.673c-.317.124-.794.27-1.671.31-.95.044-1.234.053-3.637.053s-2.688-.01-3.637-.052c-.877-.041-1.354-.188-1.671-.31a2.8 2.8 0 0 1-1.035-.674 2.8 2.8 0 0 1-.674-1.034c-.123-.317-.27-.793-.31-1.671-.043-.949-.051-1.234-.051-3.637s.008-2.687.051-3.636c.04-.877.187-1.354.31-1.67.163-.42.359-.72.674-1.036.315-.315.615-.51 1.035-.673.317-.124.794-.27 1.671-.31.83-.038 1.152-.05 2.83-.051zm5.611 1.494a1.08 1.08 0 1 0 0 2.16 1.08 1.08 0 0 0 0-2.16m-4.804 1.262a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/c/DkbDe"
                  target="_blank"
                  rel="noreferrer"
                  className="block !pt-0 text-white hover:text-white/80 transition-colors"
                  aria-label="youtube"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.825 5.426c.857.229 1.532.9 1.763 1.751.428 1.555.412 4.796.412 4.796s0 3.224-.412 4.78a2.5 2.5 0 0 1-1.763 1.75c-1.565.41-7.825.41-7.825.41s-6.244 0-7.825-.425a2.5 2.5 0 0 1-1.763-1.752C2 15.197 2 11.956 2 11.956s0-3.224.412-4.779a2.55 2.55 0 0 1 1.763-1.768C5.74 5 12 5 12 5s6.26 0 7.825.426m-9.818 3.552 5.206 2.979-5.206 2.979z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@dkb_de"
                  target="_blank"
                  rel="noreferrer"
                  className="block !pt-0 text-white hover:text-white/80 transition-colors"
                  aria-label="tiktok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 45 50"
                  >
                    <path
                      fillRule="evenodd"
                      d="M32.867 2.181c.626 3.276 2.632 6.086 5.412 7.842l.002.003A12.55 12.55 0 0 0 45 11.96v8.594c-4.6 0-8.863-1.426-12.343-3.846v17.47C32.658 42.901 25.334 50 16.33 50c-3.48 0-6.706-1.063-9.358-2.868l-.005-.004C2.758 44.263 0 39.528 0 34.176c0-8.724 7.325-15.821 16.329-15.821.747 0 1.48.06 2.2.154v8.777a7.6 7.6 0 0 0-2.2-.334c-4.112 0-7.458 3.242-7.458 7.226 0 2.775 1.625 5.185 3.999 6.396 1.034.527 2.21.83 3.458.83 4.017 0 7.294-3.096 7.444-6.954L23.786 0h8.871c0 .745.075 1.473.21 2.181"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </div>

        <hr className="border-t-0 border-b-[0.5px] border-white/20 mx-4 m:mx-6" />
      </div>

      {/* Bottom bar */}
      <div className="page-footer shrink-0 bg-[rgb(0,46,92)] text-white text-[15px] l:text-[17px] relative w-full">
        <div className="page-footer__container grid grid-cols-1 relative px-4 pt-3 pb-4 m:pt-3 m:px-6 l:px-8 l:pt-2 l:pb-3 xl:grid-cols-[1fr_auto] max-w-[1350px] mx-auto">
          <span className="footer-copyright mb-4 l:mb-0 m:order-first">
            &copy; 2026 Deutsche Kreditbank AG
          </span>
          <ul className="footer-navlist list-none mt-5 m:mt-0 mb-0 p-0 m:order-last">
            <li className="text-white inline-block w-full mb-4 m:w-auto m:ml-5 m:mb-0">
              <a
                href="/privatkunden/service/vertrag-widerrufen"
                className="text-white no-underline border-b border-[rgb(42,209,201)] border-solid font-semibold hover:border-[rgba(42,209,201,0.36)] transition-colors"
              >
                Vertrag widerrufen
              </a>
            </li>
            <li className="text-white inline-block w-full mb-4 m:w-auto m:ml-5 m:mb-0">
              <a
                href="/ueber-uns/impressum"
                className="text-white no-underline border-b border-[rgb(42,209,201)] border-solid hover:border-[rgba(42,209,201,0.36)] transition-colors"
              >
                Impressum
              </a>
            </li>
            <li className="text-white inline-block w-full mb-4 m:w-auto m:ml-5 m:mb-0">
              <a
                href="/ueber-uns/datenschutz"
                className="text-white no-underline border-b border-[rgb(42,209,201)] border-solid hover:border-[rgba(42,209,201,0.36)] transition-colors"
              >
                Datenschutz
              </a>
            </li>
            <li className="text-white inline-block w-full mb-4 m:w-auto m:ml-5 m:mb-0">
              <a
                href="/ueber-uns/preise-bedingungen"
                className="text-white no-underline border-b border-[rgb(42,209,201)] border-solid hover:border-[rgba(42,209,201,0.36)] transition-colors"
              >
                Preise &amp; Bedingungen
              </a>
            </li>
            <li className="text-white inline-block w-full mb-4 m:w-auto m:ml-5 m:mb-0">
              <a
                href="#"
                className="text-white no-underline border-b border-[rgb(42,209,201)] border-solid hover:border-[rgba(42,209,201,0.36)] transition-colors"
              >
                Cookie Einstellungen
              </a>
            </li>
            <li className="text-white inline-block w-full mb-4 m:w-auto m:ml-5 m:mb-0">
              BIC: BYLADEM1001
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useEffect } from "react"
import DKBLogo from "./DKBLogo"
import Icon from "./Icon"
import Button from "./Button"

interface NavItem {
  label: string
  href?: string
  children?: { heading?: string; links: { label: string; href: string; badge?: string }[] }[]
}

const desktopNav: NavItem[] = [
  {
    label: "Privat",
    href: "/privatkunden",
    children: [
      {
        heading: "Konten & Karten",
        links: [
          { label: "Girokonto", href: "/privatkunden/girokonto" },
          { label: "Gemeinschaftskonto", href: "/privatkunden/gemeinschaftskonto" },
          { label: "Kinderkonto", href: "/privatkunden/kinderkonto" },
          { label: "Studierendenkonto", href: "/privatkunden/studierendenkonto" },
          { label: "Visa Kreditkarte", href: "/privatkosten/visa-kreditkarte", badge: "Aktion" },
          { label: "Girokarte", href: "/privatkunden/girokarte" },
          { label: "Alle Karten", href: "/privatkunden/karten" },
        ],
      },
      { heading: "Kredite", links: [{ label: "Privatkredit", href: "/privatkunden/privatkredit" }] },
      { heading: "Investieren & Sparen", links: [{ label: "Tagesgeld", href: "/privatkunden/tagesgeld" }, { label: "Depot", href: "/privatkunden/depot" }, { label: "Altersvorsorge", href: "/privatkunden/altersvorsorge" }] },
      { heading: "Finanzierung & Immobilie", links: [{ label: "Baufinanzierung", href: "/privatkunden/baufinanzierung" }, { label: "Immobilienbewertung", href: "/privatkunden/immobilienbewertung" }] },
      { heading: "Service & Hilfe", links: [{ label: "Hilfe & Kontakt", href: "/fragen-antworten" }, { label: "Freunde werben", href: "https://freundewerben.dkb.de/" }] },
    ],
  },
  {
    label: "Geschäftlich",
    href: "/geschaeftskunden",
    children: [
      {
        heading: "Branchen",
        links: [
          { label: "Wohnungswirtschaft", href: "/geschaeftskunden/wohnungswirtschaft" },
          { label: "Erneuerbare Energien", href: "/geschaeftskunden/erneuerbare-energien" },
          { label: "Landwirtschaft & Ernährung", href: "/geschaeftskunden/landwirtschaft-ernaehrung" },
          { label: "Freie Berufe", href: "/geschaeftskunden/freie-berufe" },
          { label: "Sozialwirtschaft", href: "/geschaeftskunden/sozialwirtschaft" },
          { label: "Kommunen", href: "/geschaeftskunden/kommunen" },
        ],
      },
      {
        heading: "",
        links: [
          { label: "Energie & Versorgung", href: "/geschaeftskunden/energie-versorgung" },
          { label: "Tourismus", href: "/geschaeftskunden/tourismus" },
          { label: "Unternehmen", href: "/geschaeftskunden/unternehmen" },
        ],
      },
      {
        heading: "Über uns",
        links: [
          { label: "Zahlen & Fakten", href: "/geschaeftskunden/zahlen-fakten" },
          { label: "Investoren", href: "/geschaeftskunden/investoren" },
          { label: "English Version", href: "/en" },
        ],
      },
    ],
  },
  {
    label: "Nachhaltig",
    href: "/nachhaltigkeit",
    children: [
      {
        heading: "",
        links: [
          { label: "Nachhaltigkeit bei der DKB", href: "/nachhaltigkeit" },
          { label: "Nachhaltige Geldanlagen", href: "/nachhaltigkeit/nachhaltige-geldanlagen" },
        ],
      },
    ],
  },
  {
    label: "Unternehmen",
    href: "/ueber-uns",
    children: [
      {
        heading: "",
        links: [
          { label: "Über uns", href: "/ueber-uns" },
          { label: "Presse", href: "/presse" },
          { label: "Karriere", href: "/karriere" },
          { label: "Investor Relations", href: "/ueber-uns/investor-relations" },
          { label: "Compliance", href: "/ueber-uns/compliance" },
          { label: "English Version", href: "/en" },
        ],
      },
    ],
  },
]

const mobileNav: { label: string; href: string }[] = [
  { label: "Privat", href: "/privatkunden" },
  { label: "Geschäftlich", href: "/geschaeftskunden" },
  { label: "Nachhaltig", href: "/nachhaltigkeit" },
  { label: "Unternehmen", href: "/ueber-uns" },
  { label: "Karriere", href: "/karriere" },
  { label: "Presse", href: "/presse" },
  { label: "English Version", href: "/en" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  return (
    <nav className={`sticky top-0 left-0 w-full z-50 transition-shadow duration-200 ${
      scrolled ? "shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : ""
    }`}>
      <div className="navigation-wrapper bg-white">
        <div className="navigation__top-bar max-w-[1440px] mx-auto px-4 xl:px-10">
          {/* 3 equal columns: hamburger | logo+nav | anmelden */}
          <div className="flex items-center justify-between [&>*]:basis-[33%] h-16 l:h-20">
            {/* LEFT: Hamburger (mobile only) */}
            <div className="flex items-center l:hidden">
              <button
                className="navigation__hamburger flex items-center gap-1 text-dkb-text hover:text-dkb-blue-dark transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              >
                <Icon name={mobileMenuOpen ? "x" : "menu"} size={24} />
                <span className="text-sm font-semibold ml-[2px]">Menü</span>
              </button>
            </div>

            {/* CENTER: Logo + Desktop Nav */}
            <div className="flex items-center max-w-fit l:ml-6">
              <a className="navigation__logo shrink-0" href="/" aria-label="DKB Startseite">
                <DKBLogo className="w-[71px] h-10" />
              </a>
              {/* Desktop nav items */}
              <div className="hidden l:block ml-6">
                <ol className="navigation-first-level__list flex items-center gap-0">
                  {desktopNav.map((item, idx) => (
                    <li key={idx} className="relative">
                      <div
                        className="flex items-center h-full"
                        onMouseEnter={() => setActiveDropdown(idx)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <a
                          href={item.href || "#"}
                          className="flex items-center px-4 h-full text-sm font-semibold text-dkb-text hover:text-dkb-blue-dark transition-colors"
                        >
                          {item.label}
                        </a>
                        {item.children && activeDropdown === idx && (
                          <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg min-w-[600px] p-4 grid grid-cols-2 gap-6 z-50">
                            {item.children.map((group, gi) => (
                              <div key={gi}>
                                {group.heading && (
                                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                                    {group.heading}
                                  </p>
                                )}
                                <ul className="space-y-1">
                                  {group.links.map((link, li) => (
                                    <li key={li}>
                                      <a
                                        href={link.href}
                                        className="block text-sm text-dkb-text hover:text-dkb-blue-dark transition-colors py-1"
                                      >
                                        {link.label}
                                        {link.badge && (
                                          <span className="ml-2 inline-block text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                            {link.badge}
                                          </span>
                                        )}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* RIGHT: Anmelden button */}
            <div className="navigation__cta-area flex items-center gap-2 justify-end">
              <span />
              <Button
                variant="secondary"
                theme="blue"
                size="s"
                href="/login"
                className="xl:inline-flex items-center gap-1"
              >
                <Icon name="lock" size={16} />
                <span className="hidden xl:inline">Anmelden</span>
              </Button>
              <span />
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="l:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
            <nav className="px-4 py-6" aria-label="Mobile Hauptnavigation">
              <ul className="space-y-1">
                {mobileNav.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="block py-3 px-4 text-lg font-semibold text-dkb-text hover:bg-[rgb(243,249,254)] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <hr className="my-6 border-gray-100" />
              <a
                href="/login"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[rgb(9,118,214)] text-white font-semibold rounded-lg hover:brightness-110 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon name="lock" size={18} />
                Anmelden
              </a>
            </nav>
          </div>
        )}
      </div>
    </nav>
  )
}

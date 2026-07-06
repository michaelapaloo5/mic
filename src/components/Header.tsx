"use client"

import { useState, useEffect } from "react"
import DKBLogo from "./DKBLogo"
import Icon from "./Icon"

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
    ],
  },
  {
    label: "Geschäftlich",
    href: "/geschaeftskunden",
  },
  {
    label: "Nachhaltig",
    href: "/nachhaltigkeit",
  },
]

const mobileNav: { label: string; href: string }[] = [
  { label: "Privat", href: "/privatkunden" },
  { label: "Geschäftlich", href: "/geschaeftskunden" },
  { label: "Nachhaltig", href: "/nachhaltigkeit" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Karriere", href: "/karriere" },
  { label: "Presse", href: "/presse" },
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
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-shadow duration-200 ${
        scrolled ? "shadow-[0px_4px_8px_0px_rgba(1,84,166,0.16)]" : ""
      }`}
    >
      {/* Top bar */}
      <div className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 xl:px-10">
          <div className="flex items-center justify-between h-16 l:h-20">
            {/* Logo */}
            <a href="/" aria-label="DKB Startseite" className="shrink-0">
              <DKBLogo className="h-7 w-auto" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden l:flex items-center h-full" aria-label="Hauptnavigation">
              {desktopNav.map((item, idx) => (
                <div
                  key={idx}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href || "#"}
                    className="px-4 xl:px-5 h-full flex items-center text-sm xl:text-base font-semibold text-dkb-text hover:text-dkb-blue-dark transition-colors"
                  >
                    {item.label}
                    {item.children && (
                      <Icon name="chevron-down" size={16} className="ml-1 text-dkb-text opacity-40" />
                    )}
                  </a>
                  {item.children && activeDropdown === idx && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-xl border border-gray-100 min-w-[600px] p-6 grid grid-cols-2 gap-6 z-50">
                      {item.children.map((group, gi) => (
                        <div key={gi}>
                          {group.heading && (
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                              {group.heading}
                            </p>
                          )}
                          <ul className="space-y-2">
                            {group.links.map((link, li) => (
                              <li key={li}>
                                <a
                                  href={link.href}
                                  className="block text-sm text-dkb-text hover:text-dkb-blue-dark transition-colors py-1"
                                >
                                  {link.label}
                                  {link.badge && (
                                    <span className="ml-2 inline-block text-[10px] font-bold uppercase text-dkb-positive bg-green-50 px-2 py-0.5 rounded-full">
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
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="https://banking.dkb.de/login"
                className="hidden l:inline-flex items-center gap-2 px-5 py-2.5 border-2 border-dkb-blue-dark text-dkb-blue-dark font-semibold rounded-lg hover:bg-dkb-blue-dark hover:text-white transition-all duration-200 text-sm"
              >
                <Icon name="lock" size={16} />
                Anmelden
              </a>
              <button
                className="l:hidden p-2 -mr-2 text-dkb-text hover:text-dkb-blue-dark transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              >
                <Icon name={mobileMenuOpen ? "x" : "menu"} size={28} />
              </button>
            </div>
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
                    className="block py-3 px-4 text-lg font-semibold text-dkb-text hover:bg-dkb-grey rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <hr className="my-6 border-gray-100" />
            <a
              href="https://banking.dkb.de/login"
              className="flex items-center justify-center gap-2 w-full py-3 bg-dkb-blue-dark text-white font-semibold rounded-lg hover:brightness-110 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="lock" size={18} />
              Anmelden
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

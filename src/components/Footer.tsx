"use client"

import { useState } from "react"
import Icon from "./Icon"

interface FooterGroup {
  title: string
  links: { label: string; href: string }[]
}

const footerGroups: FooterGroup[] = [
  {
    title: "Unternehmen",
    links: [
      { label: "Presse", href: "/presse" },
      { label: "Karriere", href: "/karriere" },
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Investor Relations", href: "/investor-relations" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Hilfe & Kontakt", href: "/fragen-antworten" },
      { label: "Formulare", href: "/formulare" },
      { label: "TAN-Verfahren", href: "/tan-verfahren" },
      { label: "Karte sperren?", href: "/karte-sperren" },
    ],
  },
  {
    title: "Produkte",
    links: [
      { label: "Girokonto", href: "/privatkunden/girokonto" },
      { label: "Visa Kreditkarte", href: "/privatkosten/visa-kreditkarte" },
      { label: "Privatkredit", href: "/privatkunden/privatkredit" },
      { label: "Depot", href: "/privatkunden/depot" },
      { label: "Baufinanzierung", href: "/privatkunden/baufinanzierung" },
    ],
  },
  {
    title: "Weiteres",
    links: [
      { label: "Freunde werben", href: "/freunde-werben" },
      { label: "Finanzwissen", href: "/finanzwissen" },
      { label: "DKB-App", href: "/dkb-app" },
      { label: "Sicherheit", href: "/sicherheit" },
    ],
  },
]

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: "linkedin" as const },
  { name: "Instagram", href: "#", icon: "instagram" as const },
  { name: "YouTube", href: "#", icon: "youtube" as const },
  { name: "TikTok", href: "#", icon: "tiktok" as const },
]

const legalLinks = [
  { label: "Vertrag widerrufen", href: "/widerruf" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Preise & Bedingungen", href: "/preise-bedingungen" },
  { label: "Cookie Einstellungen", href: "#" },
]

export default function Footer() {
  const [openGroup, setOpenGroup] = useState<number | null>(null)

  const toggleGroup = (idx: number) => {
    setOpenGroup(openGroup === idx ? null : idx)
  }

  return (
    <footer className="bg-dkb-navy text-white">
      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-6 xl:px-16 py-12 m:py-16">
        {/* Link groups */}
        <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-4 gap-0 m:gap-8">
          {footerGroups.map((group, gi) => (
            <div key={gi} className="border-b border-white/10 m:border-0">
              <button
                className="m:hidden flex items-center justify-between w-full py-4 text-left font-semibold"
                onClick={() => toggleGroup(gi)}
                aria-expanded={openGroup === gi}
              >
                {group.title}
                <Icon
                  name={openGroup === gi ? "chevron-up" : "chevron-down"}
                  size={18}
                  className="text-white/50 transition-transform"
                />
              </button>
              <p className="hidden m:block text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                {group.title}
              </p>
              <ul
                className={`overflow-hidden transition-all duration-300 ${
                  openGroup === gi ? "max-h-96 pb-4" : "max-h-0 m:!max-h-96 m:pb-0"
                }`}
              >
                {group.links.map((link, li) => (
                  <li key={li}>
                    <a
                      href={link.href}
                      className="footer-anchor block py-2 text-sm text-white/80 hover:text-white transition-colors border-b border-transparent hover:border-dkb-teal w-fit"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <hr className="my-8 border-white/10" />
        <div className="flex items-center gap-6">
          {socialLinks.map((social, si) => (
            <a
              key={si}
              href={social.href}
              aria-label={social.name}
              className="text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              <Icon name={social.icon} size={24} />
            </a>
          ))}
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-16 py-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <p className="text-xs text-white/50">&copy; 2026 Deutsche Kreditbank AG</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link, li) => (
              <a
                key={li}
                href={link.href}
                className="text-xs text-white/60 hover:text-white transition-colors border-b border-transparent hover:border-dkb-teal"
              >
                {link.label}
              </a>
            ))}
            <span className="text-xs text-white/30">BIC: BYLADEM1001</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

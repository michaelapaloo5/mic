"use client"

import { useState } from "react"
import Icon from "./Icon"

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
      { label: "TAN-Verfahren", href: "/fragen-antworten/welche-tan-verfahren-bietet-die-dkb-an" },
      { label: "Karte sperren?", href: "/fragen-antworten/wie-kann-ich-meine-karte-bei-verlust-oder-missbrauch-sperren" },
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

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/dkb", icon: "linkedin" as const },
  { name: "Instagram", href: "https://www.instagram.com/dkb.de/", icon: "instagram" as const },
  { name: "YouTube", href: "https://www.youtube.com/user/DKBde", icon: "youtube" as const },
  { name: "Xing", href: "https://www.xing.com/pages/dkb", icon: "xing" as const },
]

const legalLinks = [
  { label: "Vertrag widerrufen", href: "/privatkunden/service/vertrag-widerrufen" },
  { label: "Impressum", href: "/ueber-uns/impressum" },
  { label: "Datenschutz", href: "/ueber-uns/datenschutz" },
  { label: "Preise & Bedingungen", href: "/ueber-uns/preise-bedingungen" },
  { label: "Cookie Einstellungen", href: "#" },
]

export default function Footer() {
  const [openGroup, setOpenGroup] = useState<number | null>(null)

  return (
    <footer className="shrink-0 flex flex-col bg-[rgb(9,118,214)] text-white">
      <div className="py-4 m:py-8 px-4 m:px-8 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col items-start justify-center l:flex-row l:justify-between gap-[24px] m:gap-[30px] l:gap-[45px] xl:gap-[72px]">
          {footerGroups.map((group, gi) => (
            <div key={gi} className="w-full l:w-auto">
              {/* Mobile toggle */}
              <button
                className="l:hidden w-full text-white flex items-center justify-between gap-1 cursor-pointer py-2"
                onClick={() => setOpenGroup(openGroup === gi ? null : gi)}
              >
                <span className="text-m font-semibold">{group.title}</span>
                <Icon
                  name={openGroup === gi ? "chevron-up" : "chevron-down"}
                  size={18}
                  className="text-white/70"
                />
              </button>
              {/* Desktop title */}
              <p className="hidden l:block text-m l:text-l font-semibold mb-2">
                {group.title}
              </p>
              {/* Links */}
              <ul className={`l:block ${openGroup === gi ? "block" : "hidden"} space-y-1`}>
                {group.links.map((link, li) => (
                  <li key={li} className="py-1 px-0">
                    <a
                      href={link.href}
                      className="text-s l:text-m text-white/90 hover:text-white transition-colors no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-[20px] mt-12 l:mt-0">
          {socialLinks.map((social, si) => (
            <a
              key={si}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-white/70 hover:text-white transition-colors inline-flex"
            >
              <Icon name={social.icon} size={24} />
            </a>
          ))}
        </div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-[1440px] mx-auto px-4 m:px-8 py-6 flex flex-col m:flex-row items-start m:items-center justify-between gap-4">
          <p className="text-s text-white/70">&copy; 2026 Deutsche Kreditbank AG</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 list-none m-0 p-0">
            {legalLinks.map((link, li) => (
              <li key={li}>
                <a
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition-colors font-semibold border-b border-[rgb(42,209,201)] border-solid"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="text-sm text-white/50">BIC: BYLADEM1001</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

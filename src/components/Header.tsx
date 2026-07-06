"use client"

import { useState, useEffect } from "react"
import DKBLogo from "./DKBLogo"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const navLinks = [
    { href: "/privatkunden", label: "Privat" },
    { href: "/geschaeftskunden", label: "Geschäftlich" },
    { href: "/nachhaltigkeit", label: "Nachhaltig" },
    { href: "/fragen-antworten", label: "Hilfe & Kontakt" },
    { href: "https://freundewerben.dkb.de/empfehlen/1", label: "Freunde werben" },
  ]

  return (
    <nav
      data-v-5987f5df
      className={`fixed top-0 left-0 w-full z-[80] bg-white ${
        scrolled ? "[box-shadow:0px_4px_8px_0px_rgba(1,84,166,0.16)]" : ""
      }`}
    >
      <div className="navigation-wrapper" data-v-5987f5df>
        <div
          className="navigation__top-bar flex items-center justify-between py-[7px] l:py-3 px-4 bg-white"
          data-v-5987f5df
        >
          {/* Left: Hamburgermenü (mobile only) */}
          <div className="navigation__toggle px-0 py-[5px] l:hidden" data-v-5987f5df>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="button-component navigation__hamburger inline-flex items-center gap-1 text-[rgb(0,106,199)] px-[6px] py-[5px] rounded-[6px] font-[500] border-none cursor-pointer"
              tabIndex={0}
              aria-haspopup="true"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M3 4a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2zm-1 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0 7a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1" clipRule="evenodd" />
                </svg>
              )}
              <span className="ml-[2px]">{menuOpen ? "Schließen" : "Menü"}</span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center max-w-fit l:ml-6" data-v-5987f5df>
            <a
              className="navigation__logo flex border-b-0 items-center w-[71px] h-10 hover:bg-[unset] hover:border-0"
              href="https://www.dkb.de"
              target="_self"
              rel="noopener"
              aria-label="DKB Startseite"
              data-v-5987f5df
            >
              <DKBLogo className="w-[71px] h-10 text-[rgb(20,141,234)]" />
            </a>
          </div>

          {/* Desktop Nav */}
          <div
            className="hidden l:flex items-center gap-6 xl:gap-8"
            data-v-5987f5df
          >
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[rgb(0,106,199)] text-[17px] font-[500] border-b-2 border-transparent hover:border-[rgb(0,106,199)] py-1 transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Anmelden + help links */}
          <div className="flex items-center gap-2 l:gap-3 xl:gap-4" data-v-5987f5df>
            <a
              href="/login"
              className="button-component navigation__cta-area__login inline-flex items-center gap-1 l:gap-2 rounded-[6px] font-[500] no-underline !p-1 !pr-2 l:!p-3 text-[13px] l:text-[17px] transition-colors bg-[rgba(0,144,255,0.09)] text-[rgb(0,106,199)] hover:bg-[rgba(0,144,255,0.18)] hover:text-[rgb(19,78,138)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 l:w-5 l:h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 0a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2a1 1 0 1 1-2 0V3a3 3 0 0 1 3-3zM4 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-4 2a4 4 0 0 1 7.465-2H15a1 1 0 1 1 0 2v1a1 1 0 1 1-2 0v-1h-1v2a1 1 0 1 1-2 0v-2H8a4 4 0 0 1-8 0"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden xl:inline-block">Anmelden</span>
            </a>

            <a
              href="/fragen-antworten"
              className="hidden l:inline text-[15px] text-[rgba(15,47,71,0.66)] hover:text-[rgb(19,78,138)] transition-colors no-underline"
            >
              Hilfe & Kontakt
            </a>
            <a
              href="https://freundewerben.dkb.de/empfehlen/1"
              className="hidden l:inline text-[15px] text-[rgba(15,47,71,0.66)] hover:text-[rgb(19,78,138)] transition-colors no-underline"
            >
              Freunde werben
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 z-[90] l:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[100] shadow-xl transform transition-transform duration-200 l:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <DKBLogo className="w-[71px] h-10 text-[rgb(20,141,234)]" />
          <button
            onClick={() => setMenuOpen(false)}
            className="border-none bg-transparent text-gray-500 cursor-pointer p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-3 rounded-lg text-[rgb(0,106,199)] font-[500] text-[17px] hover:bg-[rgba(0,144,255,0.09)] transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
          <hr className="my-3 border-gray-200" />
          <a
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-3 rounded-lg text-[rgb(0,106,199)] font-[500] text-[17px] hover:bg-[rgba(0,144,255,0.09)] transition-colors no-underline"
          >
            Anmelden
          </a>
        </div>
      </div>
    </nav>
  )
}

"use client"

import { useState } from "react"

type Step = "personal" | "address" | "contact" | "employment" | "cards" | "summary"

export default function SignupFormPage() {
  const [step, setStep] = useState<Step>("personal")

  const [form, setForm] = useState({
    salutation: "",
    title: "",
    firstName: "",
    lastName: "",
    birthName: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "Deutschland",
    email: "",
    phone: "",
    employment: "",
    employer: "",
    monthlyIncome: "",
    cardType: "visa-debit",
    agreeTerms: false,
    agreeDataPrivacy: false,
  })

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f9fe] font-sans">
      <header className="bg-white border-b border-[rgba(8,76,128,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
          <div className="w-20" />
          <div className="flex flex-col items-center">
            <span className="text-[28px] font-black text-[#0070c0] leading-[0.8] tracking-[-0.05em]">DKB</span>
            <span className="text-[9px] font-bold text-[#00a0f0] mt-0.5 tracking-wide">Das kann Bank</span>
          </div>
          <a href="/login" className="text-[15px] font-medium text-[#006ac7] hover:underline no-underline">
            Login
          </a>
        </div>
      </header>

      <main className="flex-1 flex justify-center px-6 py-10">
        <div className="w-full max-w-[720px]">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[rgba(15,47,71,0.55)]">
              <span className="text-[#006ac7] font-semibold">Schritt 1</span>
              <span className="text-[rgba(15,47,71,0.3)]">/</span>
              <span>Persönliche Daten</span>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[rgba(8,76,128,0.12)] p-8 md:p-10 shadow-sm">
            <h1 className="text-[32px] font-semibold text-[rgba(13,14,15,0.95)] leading-tight mb-2">
              Girokonto und Karte eröffnen
            </h1>
            <p className="text-[17px] text-[rgba(15,47,71,0.66)] mb-8">
              Wir freuen uns über dein Interesse! Die Beantragung dauert nur ca. 5
              Minuten.
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset className="mb-8">
                <legend className="text-[20px] font-semibold text-[rgba(13,14,15,0.95)] mb-4">
                  Kontoinhaber*in
                </legend>

                <div className="flex gap-6 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="salutation"
                      value="Frau"
                      checked={form.salutation === "Frau"}
                      onChange={(e) => update("salutation", e.target.value)}
                      className="w-4 h-4 accent-[#006ac7]"
                    />
                    <span className="text-[15px] text-[rgba(13,14,15,0.95)]">Frau</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="salutation"
                      value="Herr"
                      checked={form.salutation === "Herr"}
                      onChange={(e) => update("salutation", e.target.value)}
                      className="w-4 h-4 accent-[#006ac7]"
                    />
                    <span className="text-[15px] text-[rgba(13,14,15,0.95)]">Herr</span>
                  </label>
                </div>

                <div className="mb-5">
                  <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                    Titel <span className="text-[rgba(15,47,71,0.45)] font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    className="w-full max-w-[200px] px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                      Vorname(n)
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                      Nachname
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                      Geburtsname <span className="text-[rgba(15,47,71,0.45)] font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.birthName}
                      onChange={(e) => update("birthName", e.target.value)}
                      className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                    />
                  </div>
                </div>
              </fieldset>

              <p className="text-[13px] text-[rgba(15,47,71,0.55)] mb-8 leading-relaxed">
                Informationen zu Datenverarbeitungen bei der DKB AG gemäß Artikel 13,
                14 und 21 Datenschutz-Grundverordnung befinden sich auf{" "}
                <a href="https://dok.dkb.de/pdf/Information_nach_Art13.pdf" className="text-[#006ac7] hover:underline">
                  dkb.de
                </a>
                .
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[rgba(8,76,128,0.12)]">
                <button
                  type="button"
                  disabled
                  className="px-6 py-3 rounded-[6px] text-[15px] font-medium bg-transparent border border-[rgba(8,76,128,0.21)] text-[rgba(15,47,71,0.45)] cursor-not-allowed"
                >
                  Zurück
                </button>
                <button
                  type="button"
                  onClick={() => setStep("address")}
                  className="px-8 py-3 rounded-[6px] text-[15px] font-medium bg-[#006ac7] text-white hover:bg-[#134e8a] transition-colors"
                >
                  Weiter
                </button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-[13px] text-center text-[rgba(15,47,71,0.55)]">
            Fragen zum Antrag?{" "}
            <a href="#" className="text-[#006ac7] hover:underline">Hilfe & Kontakt</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-[rgba(8,76,128,0.12)] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-[rgba(15,47,71,0.55)]">
          <span>&copy; 2026 Deutsche Kreditbank AG</span>
          <a href="#" className="hover:underline">Vertrag widerrufen</a>
          <a href="#" className="hover:underline">Impressum</a>
          <a href="#" className="hover:underline">Datenschutz</a>
          <a href="#" className="hover:underline">Preise & Bedingungen</a>
          <a href="#" className="hover:underline">Cookie Einstellungen</a>
          <span>BIC: BYLADEM1001</span>
        </div>
      </footer>
    </div>
  )
}

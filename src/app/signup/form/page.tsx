"use client"

import { useState } from "react"

type Step = "personal" | "address" | "documents" | "summary"

export default function SignupFormPage() {
  const [step, setStep] = useState<Step>("personal")

  const [form, setForm] = useState({
    salutation: "",
    title: "",
    firstName: "",
    lastName: "",
    birthName: "",
    dateOfBirth: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "Deutschland",
    nationality: "Deutsch",
    email: "",
    phone: "",
    idFront: null as File | null,
    idBack: null as File | null,
    proofOfAddress: null as File | null,
    taxId: "",
    agreeTerms: false,
    agreeDataPrivacy: false,
  })

  function update(field: string, value: string | boolean | File | null) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const stepNames: Record<Step, { label: string; number: number }> = {
    personal: { label: "Persönliche Daten", number: 1 },
    address: { label: "Adresse & Kontakt", number: 2 },
    documents: { label: "Dokumente hochladen", number: 3 },
    summary: { label: "Überprüfen & Absenden", number: 4 },
  }

  const current = stepNames[step]

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
              <span className="text-[#006ac7] font-semibold">Schritt {current.number}</span>
              <span className="text-[rgba(15,47,71,0.3)]">/</span>
              <span>{current.label}</span>
            </div>
            <div className="mt-3 flex gap-1">
              {(["personal", "address", "documents", "summary"] as Step[]).map((s, i) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < current.number ? "bg-[#006ac7]" : i === current.number - 1 ? "bg-[#006ac7]" : "bg-[rgba(8,76,128,0.12)]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[rgba(8,76,128,0.12)] p-8 md:p-10 shadow-sm">
            <h1 className="text-[32px] font-semibold text-[rgba(13,14,15,0.95)] leading-tight mb-2">
              Girokonto und Karte eröffnen
            </h1>
            <p className="text-[17px] text-[rgba(15,47,71,0.66)] mb-8">
              Wir freuen uns über dein Interesse! Die Beantragung dauert nur ca. 5 Minuten.
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              {step === "personal" && (
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
                        Vorname(n) <span className="text-[#c22813]">*</span>
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
                        Nachname <span className="text-[#c22813]">*</span>
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
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        Geburtsdatum <span className="text-[#c22813]">*</span>
                      </label>
                      <input
                        type="date"
                        value={form.dateOfBirth}
                        onChange={(e) => update("dateOfBirth", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              {step === "address" && (
                <fieldset className="mb-8">
                  <legend className="text-[20px] font-semibold text-[rgba(13,14,15,0.95)] mb-4">
                    Adresse & Kontaktdaten
                  </legend>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        Straße <span className="text-[#c22813]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.street}
                        onChange={(e) => update("street", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        Hausnummer <span className="text-[#c22813]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.houseNumber}
                        onChange={(e) => update("houseNumber", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        PLZ <span className="text-[#c22813]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => update("postalCode", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        Ort <span className="text-[#c22813]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        Land
                      </label>
                      <input
                        type="text"
                        value={form.country}
                        disabled
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#e9f2f8] border border-[rgba(8,76,128,0.21)] outline-none cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        Staatsangehörigkeit <span className="text-[#c22813]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.nationality}
                        onChange={(e) => update("nationality", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        E-Mail <span className="text-[#c22813]">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1.5">
                        Telefon <span className="text-[rgba(15,47,71,0.45)] font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              {step === "documents" && (
                <fieldset className="mb-8">
                  <legend className="text-[20px] font-semibold text-[rgba(13,14,15,0.95)] mb-2">
                    Erforderliche Dokumente
                  </legend>
                  <p className="text-[14px] text-[rgba(15,47,71,0.66)] mb-6">
                    Für die Kontoeröffnung benötigen wir folgende Dokumente von dir. 
                    Du kannst sie direkt hier hochladen (JPG, PNG oder PDF, max. 10 MB je Datei).
                  </p>

                  <div className="space-y-5">
                    <div className="p-5 rounded-[8px] border border-[rgba(8,76,128,0.12)] bg-[#f3f9fe]">
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1">
                        Personalausweis oder Reisepass (Vorderseite) <span className="text-[#c22813]">*</span>
                      </label>
                      <p className="text-[12px] text-[rgba(15,47,71,0.55)] mb-3">
                        Bitte lade die Vorderseite deines gültigen Ausweisdokuments hoch.
                      </p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => update("idFront", e.target.files?.[0] ?? null)}
                        required
                        className="w-full text-[14px] text-[rgba(13,14,15,0.95)] file:mr-4 file:py-2 file:px-4 file:rounded-[6px] file:border-0 file:text-[14px] file:font-medium file:bg-[#006ac7] file:text-white hover:file:bg-[#134e8a] file:cursor-pointer file:transition-colors"
                      />
                    </div>

                    <div className="p-5 rounded-[8px] border border-[rgba(8,76,128,0.12)] bg-[#f3f9fe]">
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1">
                        Personalausweis oder Reisepass (Rückseite) <span className="text-[#c22813]">*</span>
                      </label>
                      <p className="text-[12px] text-[rgba(15,47,71,0.55)] mb-3">
                        Bitte lade auch die Rückseite deines Ausweisdokuments hoch.
                      </p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => update("idBack", e.target.files?.[0] ?? null)}
                        required
                        className="w-full text-[14px] text-[rgba(13,14,15,0.95)] file:mr-4 file:py-2 file:px-4 file:rounded-[6px] file:border-0 file:text-[14px] file:font-medium file:bg-[#006ac7] file:text-white hover:file:bg-[#134e8a] file:cursor-pointer file:transition-colors"
                      />
                    </div>

                    <div className="p-5 rounded-[8px] border border-[rgba(8,76,128,0.12)] bg-[#f3f9fe]">
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1">
                        Meldebescheinigung / Adressnachweis <span className="text-[rgba(15,47,71,0.45)] font-normal">(optional)</span>
                      </label>
                      <p className="text-[12px] text-[rgba(15,47,71,0.55)] mb-3">
                        Zur Bestätigung deiner Wohnadresse (z. B. aktuelle Meldebescheinigung oder Rechnung).
                      </p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => update("proofOfAddress", e.target.files?.[0] ?? null)}
                        className="w-full text-[14px] text-[rgba(13,14,15,0.95)] file:mr-4 file:py-2 file:px-4 file:rounded-[6px] file:border-0 file:text-[14px] file:font-medium file:bg-[#006ac7] file:text-white hover:file:bg-[#134e8a] file:cursor-pointer file:transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-medium text-[#0f2f47] mb-1">
                        Steuer-Identifikationsnummer <span className="text-[#c22813]">*</span>
                      </label>
                      <p className="text-[12px] text-[rgba(15,47,71,0.55)] mb-3">
                        Deine persönliche Steuer-ID findest du auf dem Schreiben des Bundeszentralamts für Steuern.
                      </p>
                      <input
                        type="text"
                        value={form.taxId}
                        onChange={(e) => update("taxId", e.target.value)}
                        placeholder="z. B. 12 345 678 901"
                        required
                        className="w-full max-w-[300px] px-4 py-3 rounded-[6px] text-[16px] text-[rgba(13,14,15,0.95)] bg-[#f3f9fe] border border-[rgba(8,76,128,0.21)] outline-none focus:border-[#0976d6] transition-colors"
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              {step === "summary" && (
                <fieldset className="mb-8">
                  <legend className="text-[20px] font-semibold text-[rgba(13,14,15,0.95)] mb-4">
                    Überprüfe deine Angaben
                  </legend>
                  <p className="text-[14px] text-[rgba(15,47,71,0.66)] mb-6">
                    Bitte überprüfe alle Angaben vor dem Absenden. Nach Einreichung des Antrags kannst du
                    keine Änderungen mehr vornehmen.
                  </p>

                  <div className="space-y-4 text-[15px]">
                    <div className="p-4 rounded-[8px] bg-[#f3f9fe]">
                      <h3 className="font-semibold text-[#0f2f47] mb-2">Persönliche Daten</h3>
                      <p>{form.salutation} {form.firstName} {form.lastName}</p>
                      {form.birthName && <p>Geburtsname: {form.birthName}</p>}
                      <p>Geburtsdatum: {form.dateOfBirth}</p>
                    </div>

                    <div className="p-4 rounded-[8px] bg-[#f3f9fe]">
                      <h3 className="font-semibold text-[#0f2f47] mb-2">Adresse</h3>
                      <p>{form.street} {form.houseNumber}</p>
                      <p>{form.postalCode} {form.city}</p>
                      <p>{form.country}</p>
                    </div>

                    <div className="p-4 rounded-[8px] bg-[#f3f9fe]">
                      <h3 className="font-semibold text-[#0f2f47] mb-2">Dokumente</h3>
                      <p>Ausweis Vorderseite: {form.idFront ? form.idFront.name : "—"}</p>
                      <p>Ausweis Rückseite: {form.idBack ? form.idBack.name : "—"}</p>
                      <p>Adressnachweis: {form.proofOfAddress ? form.proofOfAddress.name : "—"}</p>
                      <p>Steuer-ID: {form.taxId}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreeDataPrivacy}
                        onChange={(e) => update("agreeDataPrivacy", e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#006ac7]"
                      />
                      <span className="text-[14px] text-[rgba(15,47,71,0.8)]">
                        Ich habe die Informationen zur Datenverarbeitung gemäß Artikel 13, 14 und 21 
                        DSGVO zur Kenntnis genommen. <span className="text-[#c22813]">*</span>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreeTerms}
                        onChange={(e) => update("agreeTerms", e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#006ac7]"
                      />
                      <span className="text-[14px] text-[rgba(15,47,71,0.8)]">
                        Ich akzeptiere die AGB und Preis- & Leistungsverzeichnis der DKB AG. <span className="text-[#c22813]">*</span>
                      </span>
                    </label>
                  </div>
                </fieldset>
              )}

              {step !== "summary" && (
                <p className="text-[13px] text-[rgba(15,47,71,0.55)] mb-8 leading-relaxed">
                  Informationen zu Datenverarbeitungen bei der DKB AG gemäß Artikel 13,
                  14 und 21 Datenschutz-Grundverordnung befinden sich auf{" "}
                  <a href="https://dok.dkb.de/pdf/Information_nach_Art13.pdf" className="text-[#006ac7] hover:underline">
                    dkb.de
                  </a>
                  .
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[rgba(8,76,128,0.12)]">
                <button
                  type="button"
                  onClick={() => {
                    if (step === "address") setStep("personal")
                    else if (step === "documents") setStep("address")
                    else if (step === "summary") setStep("documents")
                  }}
                  disabled={step === "personal"}
                  className="px-6 py-3 rounded-[6px] text-[15px] font-medium bg-transparent border border-[rgba(8,76,128,0.21)] text-[rgba(15,47,71,0.66)] hover:bg-[#f3f9fe] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  Zurück
                </button>

                {step !== "summary" ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === "personal") setStep("address")
                      else if (step === "address") setStep("documents")
                      else if (step === "documents") setStep("summary")
                    }}
                    className="px-8 py-3 rounded-[6px] text-[15px] font-medium bg-[#006ac7] text-white hover:bg-[#134e8a] transition-colors"
                  >
                    Weiter
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!form.agreeTerms || !form.agreeDataPrivacy}
                    className="px-8 py-3 rounded-[6px] text-[15px] font-medium bg-[#006ac7] text-white hover:bg-[#134e8a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Antrag absenden
                  </button>
                )}
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

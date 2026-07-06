"use client"

import { useState, useEffect } from "react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setVisible(false)
  }

  if (!mounted || !visible) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[9999] hidden lg:block" onClick={reject} />
      <div
        className={`
          fixed z-[99999] bg-white shadow-2xl
          lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
          lg:max-w-[600px] lg:w-[90vw] lg:rounded-2xl lg:p-8
          bottom-0 left-0 right-0 rounded-t-2xl p-5
          transition-transform duration-300 ease-out
          ${visible ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <h2 className="text-base font-semibold mb-2">Wir verwenden Technologien zur Webanalyse</h2>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          Unsere Webseiten verwenden Cookies und ähnliche Technologien für Funktions-, Marketing- oder Analysezwecke, sowie zur Verbesserung des Nutzungserlebnisses. Durch Klicken auf „Alles akzeptieren" willigen Sie in die Verarbeitung ihrer personenbezogenen Daten hinsichtlich sämtlicher Technologien ein. Dies umfasst auch eine Speicherung von und ein Zugriff auf Informationen in Ihrem Endgerät. Ihre Daten könnten bei einzelnen Technologien auch in ein Land außerhalb der EU/des EWR übermittelt werden, in dem ein niedrigeres Datenschutzniveau als in der EU gilt. Sie können Ihre Einstellung jederzeit anpassen, indem Sie hier im Banner oder im Footer auf "Cookie Einstellungen" klicken.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-600 mb-5">
          <a href="/datenschutz" className="hover:underline">Datenschutzerklärung</a>
          <a href="/impressum" className="hover:underline">Impressum</a>
          <button className="hover:underline border-none bg-transparent p-0 text-blue-600 cursor-pointer">Cookie Einstellungen</button>
        </div>
        <div className="flex gap-3">
          <button onClick={reject} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer">
            Ablehnen
          </button>
          <button onClick={accept} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">
            Alles akzeptieren
          </button>
        </div>
      </div>
    </>
  )
}

"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DKBLogo from "@/components/DKBLogo"

const NAVY_BG = "rgb(9,20,28)"
const DKB_BLUE = "rgb(10,89,168)"
const LOGO_BLUE = "rgb(20,141,234)"
const LABEL_COLOR = "rgb(112,152,170)"
const WHITE_TEXT = "rgb(255,255,255)"
const CARD_BG = "rgb(10,89,168)"
const BUTTON_HOVER = "rgb(15,120,200)"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [step, setStep] = useState<"username" | "password">("username")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUsernameSubmit(e: FormEvent) {
    e.preventDefault()
    if (!username.trim()) return
    setStep("password")
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    })

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Anmeldename oder Passwort falsch."
          : error.message,
      )
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  const labelText = step === "username" ? "Anmeldename" : "Passwort"

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: NAVY_BG }}>
      {/* Header */}
      <header className="py-4 px-6">
        <div className="mx-auto max-w-[1350px]">
          <a href="/" className="inline-flex items-center no-underline">
            <DKBLogo className="w-auto h-[22px] md:h-[26px]" style={{ color: LOGO_BLUE }} />
          </a>
          <p className="text-[11px] md:text-[12px] mt-1 ml-0.5" style={{ color: WHITE_TEXT }}>
            Das kann Bank
          </p>
        </div>
      </header>

      {/* Main form area */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 pt-20 md:pt-28">
        {/* Form label */}
        <div className="w-full max-w-[440px] mb-4">
          <label
            htmlFor="login-input"
            className="block text-[15px] md:text-[16px] font-[500]"
            style={{ color: LABEL_COLOR }}
          >
            {labelText}
          </label>
        </div>

        {/* Blue button / card */}
        <form onSubmit={step === "username" ? handleUsernameSubmit : handlePasswordSubmit} className="w-full max-w-[440px]">
          <div className="flex flex-col">
            {/* The input field (very subtle, bottom-border only) */}
            <input
              id="login-input"
              type={step === "username" ? "text" : "password"}
              value={step === "username" ? username : password}
              onChange={(e) => {
                if (step === "username") setUsername(e.target.value)
                else setPassword(e.target.value)
              }}
              required
              autoFocus
              autoComplete={step === "username" ? "username" : "current-password"}
              placeholder=" "
              className="w-full bg-transparent text-[16px] md:text-[17px] outline-none pb-2 mb-6"
              style={{
                color: WHITE_TEXT,
                borderBottom: "1px solid " + LABEL_COLOR,
              }}
            />

            {/* WEITER button */}
            <button
              type="submit"
              disabled={
                step === "username"
                  ? !username.trim()
                  : loading || !password
              }
              className="w-full py-4 rounded-[4px] text-[16px] md:text-[17px] font-[500] border-none cursor-pointer disabled:cursor-not-allowed transition-colors duration-200"
              style={{
                backgroundColor: (step === "username" ? username.trim() : (password && !loading))
                  ? CARD_BG
                  : "rgba(10,89,168,0.3)",
                color: (step === "username" ? username.trim() : (password && !loading))
                  ? WHITE_TEXT
                  : "rgba(255,255,255,0.4)",
              }}
              onMouseOver={(e) => {
                if (step === "username" ? username.trim() : (password && !loading))
                  e.currentTarget.style.backgroundColor = BUTTON_HOVER
              }}
              onMouseOut={(e) => {
                if (step === "username" ? username.trim() : (password && !loading))
                  e.currentTarget.style.backgroundColor = CARD_BG
              }}
            >
              {loading ? "Wird geladen..." : "WEITER"}
            </button>
          </div>

          {/* Error message */}
          {error && step === "password" && (
            <p className="text-[14px] mt-4" style={{ color: "rgb(255,100,80)" }}>
              {error}
            </p>
          )}

          {/* Password step extras */}
          {step === "password" && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setStep("username")}
                className="bg-none border-none text-[14px] cursor-pointer p-0"
                style={{ color: LABEL_COLOR }}
              >
                Zurück
              </button>
              <a
                href="#"
                className="text-[14px] no-underline hover:underline"
                style={{ color: LABEL_COLOR }}
              >
                Passwort vergessen?
              </a>
            </div>
          )}
        </form>
      </main>

      {/* Minimal footer */}
      <footer className="py-6 px-6 mt-auto">
        <div className="mx-auto max-w-[1350px] flex flex-wrap gap-x-4 gap-y-1 text-[12px]" style={{ color: "rgba(112,152,170,0.6)" }}>
          <a href="#" className="hover:underline" style={{ color: "inherit" }}>Impressum</a>
          <a href="#" className="hover:underline" style={{ color: "inherit" }}>Datenschutz</a>
          <a href="#" className="hover:underline" style={{ color: "inherit" }}>AGB</a>
        </div>
      </footer>
    </div>
  )
}

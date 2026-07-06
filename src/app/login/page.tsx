"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DKBLogo from "@/components/DKBLogo"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dkb-blue-dark via-dkb-blue to-[rgb(42,209,201)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 m:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <DKBLogo className="h-8 w-auto text-dkb-blue-dark" />
        </div>

        <h1 className="text-center text-2xl font-bold text-[#0d0e0f] mb-8">
          Anmelden
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#0d0e0f] mb-1.5">
              Benutzername
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="benutzername@dkb.de"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dkb-blue focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#0d0e0f] mb-1.5">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dkb-blue focus:border-transparent transition"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
              {error === "Invalid login credentials" ? "Benutzername oder Passwort falsch." : error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-dkb-blue-dark text-white font-semibold rounded-lg hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Wird geladen..." : "Anmelden"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-dkb-blue-dark font-semibold hover:underline"
          >
            Passwort vergessen?
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Noch kein Kunde?{" "}
            <a href="/privatkunden/girokonto" className="text-dkb-blue-dark font-semibold hover:underline">
              Jetzt Konto eröffnen
            </a>
          </p>
        </div>

        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-xs text-gray-400 hover:text-gray-600 transition"
          >
            Demo-Zugang
          </a>
        </div>
      </div>
    </div>
  )
}

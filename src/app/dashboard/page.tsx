"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login")
      } else {
        setUser(data.user)
      }
      setLoading(false)
    })
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Wird geladen...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-dkb-blue-dark">DKB Banking</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-red-600 transition"
          >
            Abmelden
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-[#0d0e0f] mb-4">
            Willkommen{user?.email ? `, ${user.email}` : ""}
          </h2>
          <p className="text-gray-600">
            Dies ist Ihr persönlicher Bereich. Hier können Sie Ihre Konten verwalten, Überweisungen tätigen und vieles mehr.
          </p>
        </div>
      </main>
    </div>
  )
}

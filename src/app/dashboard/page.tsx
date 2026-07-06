"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { demoGetUser, demoSignOut, demoGetAccountInfo } from "@/lib/demo-auth"

interface Transaction {
  id: number
  date: string
  description: string
  amount: number
  type: "credit" | "debit"
}

const TRANSACTIONS: Transaction[] = [
  { id: 1, date: "03.07.2026", description: "Gehalt Muster GmbH", amount: 3450.0, type: "credit" },
  { id: 2, date: "02.07.2026", description: "Miete Überweisung", amount: 1200.0, type: "debit" },
  { id: 3, date: "01.07.2026", description: "REWE Märkte AG", amount: 87.43, type: "debit" },
  { id: 4, date: "30.06.2026", description: "Netflix Abo", amount: 17.99, type: "debit" },
  { id: 5, date: "28.06.2026", description: "Visa Debit Zahlung", amount: 45.0, type: "debit" },
  { id: 6, date: "25.06.2026", description: "Überweisung von Anna Schmidt", amount: 150.0, type: "credit" },
  { id: 7, date: "22.06.2026", description: "DM-Drogerie Markt", amount: 32.15, type: "debit" },
  { id: 8, date: "20.06.2026", description: "Stadtwerke Strom", amount: 89.50, type: "debit" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; user_metadata: { name: string } } | null>(null)
  const [account, setAccount] = useState<{ iban: string; balance: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data } = demoGetUser()
    if (!data.user) {
      router.push("/login")
      return
    }
    setUser(data.user)
    setAccount(demoGetAccountInfo())
    setLoading(false)
  }, [router])

  function handleLogout() {
    demoSignOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1620]">
        <p className="text-[#8a9ba8]">Wird geladen...</p>
      </div>
    )
  }

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n)

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1620] text-white font-sans">
      {/* Header */}
      <header className="bg-[#14202b] border-b border-[#2a3b4c]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[22px] font-black text-[#0070c0] leading-[0.8] tracking-[-0.05em]">DKB</span>
              <span className="text-[7px] font-bold text-[#00a0f0] tracking-wide">Das kann Bank</span>
            </div>
            <span className="text-[15px] text-[#8a9ba8] ml-2 hidden sm:inline">Mein Banking</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#8a9ba8] hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-[13px] text-[#8a9ba8] hover:text-white transition-colors bg-transparent border border-[#2a3b4c] rounded-md px-3 py-1.5 cursor-pointer"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-8">
        {/* Welcome + Balance */}
        <div className="mb-8">
          <h1 className="text-[24px] font-bold mb-1">
            Willkommen, {user?.user_metadata?.name || user?.email}
          </h1>
          <p className="text-[14px] text-[#8a9ba8]">Hier ist deine aktuelle Kontoübersicht</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="lg:col-span-2 bg-[#14202b] border border-[#2a3b4c] rounded-xl p-6">
            <p className="text-[13px] text-[#8a9ba8] mb-1">Girokonto</p>
            <p className="text-[11px] text-[#5c6b7a] mb-4 font-mono">{account?.iban}</p>
            <p className="text-[36px] font-bold">{account ? formatEuro(account.balance) : "—"}</p>
            <p className="text-[13px] text-[#00a88f] mt-1">Aktivstatus • Kostenlos</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#14202b] border border-[#2a3b4c] rounded-xl p-6">
            <h2 className="text-[15px] font-semibold mb-4">Schnellzugriff</h2>
            <div className="space-y-3">
              <button className="w-full text-left text-[14px] bg-[#1a2836] hover:bg-[#233547] rounded-lg px-4 py-3 transition-colors cursor-pointer border-none text-white">
                <span className="block font-medium">Überweisung</span>
                <span className="text-[12px] text-[#8a9ba8]">Geld senden</span>
              </button>
              <button className="w-full text-left text-[14px] bg-[#1a2836] hover:bg-[#233547] rounded-lg px-4 py-3 transition-colors cursor-pointer border-none text-white">
                <span className="block font-medium">Kontoauszug</span>
                <span className="text-[12px] text-[#8a9ba8]">PDF herunterladen</span>
              </button>
              <button className="w-full text-left text-[14px] bg-[#1a2836] hover:bg-[#233547] rounded-lg px-4 py-3 transition-colors cursor-pointer border-none text-white">
                <span className="block font-medium">Dauerauftrag</span>
                <span className="text-[12px] text-[#8a9ba8]">Einrichten</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#14202b] border border-[#2a3b4c] rounded-xl">
          <div className="px-6 py-4 border-b border-[#2a3b4c] flex items-center justify-between">
            <h2 className="text-[15px] font-semibold">Letzte Umsätze</h2>
            <button className="text-[13px] text-[#00a0f0] hover:underline bg-transparent border-none cursor-pointer">
              Alle anzeigen
            </button>
          </div>
          <div className="divide-y divide-[#2a3b4c]">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#1a2836] transition-colors">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
                      tx.type === "credit"
                        ? "bg-[rgba(0,168,143,0.15)] text-[#00a88f]"
                        : "bg-[rgba(230,80,60,0.15)] text-[#e6503c]"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "−"}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium">{tx.description}</p>
                    <p className="text-[12px] text-[#5c6b7a]">{tx.date}</p>
                  </div>
                </div>
                <p
                  className={`text-[15px] font-semibold ${
                    tx.type === "credit" ? "text-[#00a88f]" : "text-white"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "−"} {formatEuro(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

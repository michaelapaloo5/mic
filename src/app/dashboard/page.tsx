"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { demoGetUser, demoSignOut, demoGetAccountInfo } from "@/lib/demo-auth"
import { Home, CreditCard, Send, ShoppingBag, Clock, Store, Banknote, MapPin, ArrowUpRight, X } from "lucide-react"

type PageView = "finanzstatus" | "karten" | "auftraege" | "produkte"

interface Transaction {
  id: number
  date: string
  description: string
  amount: number
  icon: "clock" | "map-pin" | "store" | "banknote"
  type: "credit" | "debit"
  status?: string
}

const GIRO_TRANSACTIONS: Transaction[] = [
  { id: 1, date: "02.09.25", description: "Vorgemerkt", amount: 141.0, icon: "clock", type: "debit", status: "02.09.25" },
  { id: 2, date: "01.09.25", description: "Baeckerei", amount: 5.13, icon: "map-pin", type: "debit", status: "Vorgemerkt • 01.09.25" },
  { id: 3, date: "01.09.25", description: "Subway", amount: 24.47, icon: "store", type: "debit" },
]

const TAGESGELD_TRANSACTIONS: Transaction[] = [
  { id: 1, date: "01.07.25", description: "DKB AG", amount: 0, icon: "banknote", type: "credit", status: "Eingang" },
  { id: 2, date: "12.06.25", description: "Ausgang", amount: 0, icon: "map-pin", type: "debit" },
  { id: 3, date: "01.04.25", description: "DKB AG", amount: 0, icon: "banknote", type: "credit", status: "Eingang" },
]

function TxIcon({ icon, type }: { icon: Transaction["icon"]; type: Transaction["type"] }) {
  if (icon === "store" && type === "debit")
    return <Store size={20} className="bg-green-500 text-white p-1 rounded" />
  if (icon === "clock")
    return <Clock size={20} className="text-gray-400" />
  if (icon === "map-pin")
    return <MapPin size={20} className="text-gray-400" />
  return <Banknote size={20} className="text-gray-400" />
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; user_metadata: { name: string } } | null>(null)
  const [account, setAccount] = useState<{ iban: string; balance: number } | null>(null)
  const [view, setView] = useState<PageView>("finanzstatus")
  const [giroTab, setGiroTab] = useState("Überweisung")
  const [tagesgeldTab, setTagesgeldTab] = useState("Überweisung")

  useEffect(() => {
    const { data } = demoGetUser()
    if (!data.user) {
      router.push("/login")
      return
    }
    setUser(data.user)
    setAccount(demoGetAccountInfo())
  }, [router])

  function handleLogout() {
    demoSignOut()
    router.push("/login")
  }

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n)

  const sidebarItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: "finanzstatus", label: "Finanzstatus", icon: <Home size={20} /> },
    { id: "karten", label: "Karten", icon: <CreditCard size={20} /> },
    { id: "auftraege", label: "Aufträge", icon: <Send size={20} /> },
    { id: "produkte", label: "Produkte", icon: <ShoppingBag size={20} /> },
  ]

  function renderContent() {
    switch (view) {
      case "karten":
        return <KartenView />
      case "auftraege":
        return <AuftraegeView />
      case "produkte":
        return <ProdukteView />
      default:
        return (
          <>
            {/* Girokonto */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Banknote className="text-gray-400" size={24} />
                  <div>
                    <h2 className="text-xl font-semibold">Girokonto</h2>
                    <p className="text-sm text-gray-500">
                      {account?.iban ? `${account.iban.slice(0, 4)} ●●●●●●●●` : "DE07 ●●●●●●●●"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-2 justify-end">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-300 rounded" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">€</span>
                </div>
              </div>

              <div className="flex gap-4 mb-6 border-b">
                {["Überweisung", "Umsatzliste", "Kontodetails"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setGiroTab(tab)}
                    className={`px-4 py-3 font-medium text-sm ${
                      giroTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {GIRO_TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <TxIcon icon={tx.icon} type={tx.type} />
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <div className="flex gap-2 items-center">
                          <span className="text-xs bg-gray-200 px-2 py-0.5">●●</span>
                          {tx.status && (
                            <span className={`text-xs font-medium ${tx.status.includes("Vorgemerkt") ? "text-yellow-600" : "text-gray-500"}`}>
                              {tx.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">
                      {tx.amount > 0 ? `-${formatEuro(tx.amount)}` : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tagesgeld */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Banknote className="text-gray-400" size={24} />
                  <div>
                    <h2 className="text-xl font-semibold">Tagesgeld</h2>
                    <p className="text-sm text-gray-500">
                      DE87 ●●●●●●●●
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-2 justify-end">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-300 rounded" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">€</span>
                </div>
              </div>

              <div className="flex gap-4 mb-6 border-b">
                {["Überweisung", "Umsatzliste", "Kontodetails"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTagesgeldTab(tab)}
                    className={`px-4 py-3 font-medium text-sm ${
                      tagesgeldTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {TAGESGELD_TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <TxIcon icon={tx.icon} type={tx.type} />
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-xs text-gray-500">{tx.status ? `${tx.date} • ${tx.status}` : tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-1 mb-1 justify-end">
                        {[...Array(tx.type === "credit" ? 4 : 2)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded ${tx.type === "credit" ? "bg-blue-400" : "bg-gray-400"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">€</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors border-none cursor-pointer">
                Personalisieren
              </button>
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-52 bg-white shadow-sm flex flex-col shrink-0">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">DKB</div>
            <div className="text-xs text-gray-600">Das kann Bank</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-[11px] text-gray-500 hover:text-red-500 bg-transparent border-none cursor-pointer"
            title="Abmelden"
          >
            <ArrowUpRight size={16} />
          </button>
        </div>

        <nav className="space-y-1 px-3 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full px-3 py-3 rounded-lg flex items-center gap-3 font-medium text-sm transition-colors text-left border-none cursor-pointer ${
                view === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* Left Content */}
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">{view === "finanzstatus" ? "Finanzstatus" : sidebarItems.find(i => i.id === view)?.label}</h1>
            </div>
            {renderContent()}
          </div>

          {/* Right Sidebar */}
          <div className="w-96 p-8 space-y-6 shrink-0 hidden xl:block">
            <div className="bg-blue-50 rounded-lg p-6 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer">
                <X size={16} />
              </button>
              <h3 className="text-lg font-semibold mb-3">Banking entdecken</h3>
              <p className="text-sm text-gray-600 mb-4">Entdecke Funktionen im Banking</p>
              <p className="text-xs text-gray-600 mb-4">
                Finde dich schneller zurecht! Klicke hier, um deine Tour zu starten.
              </p>
              <div className="flex justify-end">
                <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👆</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Aktuelles</h3>
              <div className="bg-blue-600 text-white rounded-lg p-6">
                <p className="text-sm font-medium mb-2">Freunde werben</p>
                <h4 className="text-lg font-bold mb-3">
                  Dein Konto. Deine Empfehlung. Deine 50 €.
                </h4>
                <p className="text-sm mb-4">
                  Empfiehl unser kostenloses Girokonto und erhalte 50 € direkt auf dein Konto. {'>'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KartenView() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Deine Karten</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6">
          <p className="text-sm opacity-80 mb-4">Visa Debit</p>
          <p className="text-lg font-mono tracking-wider">**** **** **** 4521</p>
          <p className="text-xs opacity-60 mt-4">Gültig bis 09/28</p>
        </div>
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl p-6">
          <p className="text-sm opacity-80 mb-4">Girocard</p>
          <p className="text-lg font-mono tracking-wider">**** **** **** 8732</p>
          <p className="text-xs opacity-60 mt-4">Gültig bis 12/27</p>
        </div>
      </div>
    </div>
  )
}

function AuftraegeView() {
  const orders = [
    { id: 1, type: "Dauerauftrag", description: "Miete", amount: 1200, date: "01.09.25", status: "Aktiv" },
    { id: 2, type: "Dauerauftrag", description: "Strom", amount: 89.5, date: "15.09.25", status: "Aktiv" },
    { id: 3, type: "Dauerauftrag", description: "Versicherung", amount: 45.9, date: "01.10.25", status: "Aktiv" },
  ]
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Daueraufträge</h2>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{o.description}</p>
              <p className="text-sm text-gray-500">{o.type} • {o.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{o.amount.toFixed(2).replace(".", ",")} €</p>
              <span className="text-xs text-green-600">{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProdukteView() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Deine Produkte</h2>
      <div className="space-y-3">
        {[
          { name: "Girokonto", desc: "Kostenlos bei 700 € Geldeingang", status: "Aktiv" },
          { name: "Tagesgeld", desc: "Flexibel verzinstes Konto", status: "Aktiv" },
          { name: "Visa Debitkarte", desc: "Kostenlos weltweit zahlen", status: "Aktiv" },
          { name: "Girocard", desc: "Für Bargeld am Geldautomaten", status: "Aktiv" },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">{p.desc}</p>
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

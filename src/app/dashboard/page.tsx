"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { demoGetUser, demoSignOut, demoGetAccountInfo } from "@/lib/demo-auth"
import { Home, CreditCard, Send, ShoppingBag, ArrowUpRight, HelpCircle, FileText, Menu, X } from "lucide-react"

type PageView = "finanzstatus" | "karten" | "auftraege" | "produkte"

interface Transaction {
  id: number
  date: string
  description: string
  amount: number
  type: "credit" | "debit"
  category: string
}

const GIRO_TRANSACTIONS: Transaction[] = [
  { id: 1, date: "03.07.2026", description: "Gehalt Muster GmbH", amount: 3450.0, type: "credit", category: "Gehalt" },
  { id: 2, date: "02.07.2026", description: "Miete Überweisung", amount: 1200.0, type: "debit", category: "Wohnen" },
  { id: 3, date: "01.07.2026", description: "REWE Märkte AG", amount: 87.43, type: "debit", category: "Lebensmittel" },
  { id: 4, date: "30.06.2026", description: "Netflix Abo", amount: 17.99, type: "debit", category: "Unterhaltung" },
  { id: 5, date: "28.06.2026", description: "Visa Debit Zahlung Amazon", amount: 45.0, type: "debit", category: "Shopping" },
  { id: 6, date: "25.06.2026", description: "Überweisung von Anna Schmidt", amount: 150.0, type: "credit", category: "Rückzahlung" },
  { id: 7, date: "22.06.2026", description: "DM-Drogerie Markt", amount: 32.15, type: "debit", category: "Drogerie" },
  { id: 8, date: "20.06.2026", description: "Stadtwerke Strom", amount: 89.50, type: "debit", category: "Energie" },
]

const TAGESGELD_TRANSACTIONS: Transaction[] = [
  { id: 1, date: "01.07.2026", description: "Zinsgutschrift DKB AG", amount: 12.34, type: "credit", category: "Zinsen" },
  { id: 2, date: "01.06.2026", description: "Zinsgutschrift DKB AG", amount: 11.87, type: "credit", category: "Zinsen" },
  { id: 3, date: "02.05.2026", description: "Überweisung vom Girokonto", amount: 2000.0, type: "credit", category: "Umbuchung" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; user_metadata: { name: string } } | null>(null)
  const [account, setAccount] = useState<{ iban: string; balance: number } | null>(null)
  const [view, setView] = useState<PageView>("finanzstatus")
  const [giroTab, setGiroTab] = useState("Umsatzliste")
  const [tagesgeldTab, setTagesgeldTab] = useState("Umsatzliste")
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  function sidebarContent(closeOnClick = false) {
    const clickHandler = (id: PageView) => {
      setView(id)
      if (closeOnClick) setSidebarOpen(false)
    }
    return (
      <>
        <div className="p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">DKB</div>
            <div className="text-xs text-gray-600">Das kann Bank</div>
          </div>
          {closeOnClick && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="sm:hidden border-none bg-transparent text-gray-500 cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <nav className="space-y-1 px-3 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => clickHandler(item.id)}
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
        <div className="p-3 border-t border-gray-200 space-y-1">
          <a
            href="https://www.dkb.de/fragen-antworten"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-3 py-3 rounded-lg flex items-center gap-3 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline"
          >
            <HelpCircle size={20} />
            Hilfe & Kontakt
          </a>
          <a
            href="https://www.dkb.de/ueber-uns/impressum"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-3 py-3 rounded-lg flex items-center gap-3 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline"
          >
            <FileText size={20} />
            Rechtliches
          </a>
          <div className="pt-2">
            <button
              onClick={handleLogout}
              className="w-full px-3 py-3 rounded-lg flex items-center gap-3 font-medium text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer"
            >
              <ArrowUpRight size={20} />
              Abmelden
            </button>
          </div>
        </div>
      </>
    )
  }

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
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold text-lg">G</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold">Girokonto</h2>
                    <p className="text-sm text-gray-500 font-mono truncate">{account?.iban || "DE12 1001 0101 2345 6789 01"}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-3xl font-bold">{account ? formatEuro(account.balance) : "—"}</p>
                  <p className="text-sm text-green-600">Aktivstatus • Kontoführung kostenlos</p>
                </div>
              </div>

              <div className="flex gap-4 mb-6 border-b overflow-x-auto">
                {["Umsatzliste", "Kontodetails"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setGiroTab(tab)}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-none bg-transparent cursor-pointer ${
                      giroTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {giroTab === "Umsatzliste" ? (
                <div>
                  <div className="hidden sm:flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider pb-2 border-b mb-3">
                    <span className="w-24">Datum</span>
                    <span className="flex-1">Beschreibung</span>
                    <span className="w-20 text-right">Betrag</span>
                  </div>
                  <div className="space-y-1">
                    {GIRO_TRANSACTIONS.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 -mx-2 gap-2">
                        <span className="hidden sm:block w-24 text-sm text-gray-600 shrink-0">{tx.date}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{tx.description}</p>
                          <p className="text-xs text-gray-400 sm:hidden">{tx.date}</p>
                        </div>
                        <span className={`text-sm font-semibold shrink-0 ${tx.type === "credit" ? "text-green-600" : ""}`}>
                          {tx.type === "credit" ? "+" : "-"}{formatEuro(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Kontotyp</p>
                    <p className="font-semibold">DKB Girokonto</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">IBAN</p>
                    <p className="font-semibold font-mono text-sm break-all">{account?.iban || "DE12 1001 0101 2345 6789 01"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">BIC</p>
                    <p className="font-semibold">BYLADEM1001</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Kontostand</p>
                    <p className="font-semibold">{account ? formatEuro(account.balance) : "—"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Dispositionskredit</p>
                    <p className="font-semibold">500,00 €</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Verfügbar</p>
                    <p className="font-semibold">{account ? formatEuro(account.balance + 500) : "—"}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-teal-600 font-bold text-lg">T</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold">Tagesgeld</h2>
                    <p className="text-sm text-gray-500 font-mono truncate">DE87 1001 0101 9876 5432 01</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-3xl font-bold">{formatEuro(8750.0)}</p>
                  <p className="text-sm text-green-600">2,25 % p.a. Zinsen</p>
                </div>
              </div>

              <div className="flex gap-4 mb-6 border-b overflow-x-auto">
                {["Umsatzliste", "Kontodetails"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTagesgeldTab(tab)}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-none bg-transparent cursor-pointer ${
                      tagesgeldTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {tagesgeldTab === "Umsatzliste" ? (
                <div>
                  <div className="hidden sm:flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider pb-2 border-b mb-3">
                    <span className="w-24">Datum</span>
                    <span className="flex-1">Beschreibung</span>
                    <span className="w-20 text-right">Betrag</span>
                  </div>
                  <div className="space-y-1">
                    {TAGESGELD_TRANSACTIONS.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 -mx-2 gap-2">
                        <span className="hidden sm:block w-24 text-sm text-gray-600 shrink-0">{tx.date}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{tx.description}</p>
                          <p className="text-xs text-gray-400 sm:hidden">{tx.date}</p>
                        </div>
                        <span className={`text-sm font-semibold shrink-0 ${tx.type === "credit" ? "text-green-600" : ""}`}>
                          {tx.type === "credit" ? "+" : "-"}{formatEuro(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Kontotyp</p>
                    <p className="font-semibold">DKB Tagesgeld</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">IBAN</p>
                    <p className="font-semibold font-mono text-sm break-all">DE87 1001 0101 9876 5432 01</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Zinssatz</p>
                    <p className="font-semibold">2,25 % p.a.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Zinsbindung</p>
                    <p className="font-semibold">Variable Verzinsung</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 sm:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile hamburger */}
      <div className="fixed top-4 left-4 z-50 sm:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-white rounded-lg shadow-md p-2 border-none cursor-pointer text-gray-700"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Sidebar - desktop */}
      <div className="hidden sm:flex w-52 bg-white shadow-sm flex-col shrink-0">
        {sidebarContent(false)}
      </div>

      {/* Sidebar - mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-200 sm:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent(true)}
      </div>

      {/* Main */}
      <div className="flex-1 overflow-auto pt-16 sm:pt-0">
        <div className="flex">
          <div className="flex-1 p-4 sm:p-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-4xl font-bold">{view === "finanzstatus" ? "Finanzstatus" : sidebarItems.find(i => i.id === view)?.label}</h1>
            </div>
            {renderContent()}
          </div>

          <div className="w-80 p-8 space-y-6 shrink-0 hidden xl:block">
            <div>
              <h3 className="text-lg font-semibold mb-4">Aktuelles</h3>
              <div className="bg-blue-600 text-white rounded-lg p-6">
                <p className="text-sm font-medium mb-2">Freunde werben</p>
                <h4 className="text-lg font-bold mb-3">
                  Dein Konto. Deine Empfehlung. Deine 50 €.
                </h4>
                <p className="text-sm mb-4">
                  Empfiehl unser kostenloses Girokonto und erhalte 50 € direkt auf dein Konto.
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
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Deine Karten</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6">
          <p className="text-sm opacity-80 mb-1">Visa Debit</p>
          <p className="text-xs opacity-60 mb-4">Kostenlos weltweit zahlen</p>
          <p className="text-lg font-mono tracking-wider">**** **** **** 2345</p>
          <div className="flex justify-between items-end mt-6">
            <div>
              <p className="text-xs opacity-60">Gültig bis</p>
              <p className="text-sm font-semibold">09/28</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Karteninhaber</p>
              <p className="text-sm font-semibold">MAX MUSTERMANN</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl p-6">
          <p className="text-sm opacity-80 mb-1">Girocard</p>
          <p className="text-xs opacity-60 mb-4">Für Bargeld am Automaten</p>
          <p className="text-lg font-mono tracking-wider">**** **** **** 1234</p>
          <div className="flex justify-between items-end mt-6">
            <div>
              <p className="text-xs opacity-60">Gültig bis</p>
              <p className="text-sm font-semibold">12/27</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Karteninhaber</p>
              <p className="text-sm font-semibold">MAX MUSTERMANN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuftraegeView() {
  const orders = [
    { id: 1, type: "Dauerauftrag", description: "Miete", amount: 1200.0, iban: "DE12 5001 0517 1234 5678 90", date: "01.09.25", status: "Aktiv", interval: "Monatlich" },
    { id: 2, type: "Dauerauftrag", description: "Stadtwerke Strom", amount: 89.5, iban: "DE33 1001 0010 0987 6543 21", date: "15.09.25", status: "Aktiv", interval: "Monatlich" },
    { id: 3, type: "Dauerauftrag", description: "HUK-Versicherung", amount: 45.9, iban: "DE78 7002 0270 0012 3456 78", date: "01.10.25", status: "Aktiv", interval: "Monatlich" },
  ]
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Daueraufträge</h2>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
            <div className="min-w-0">
              <p className="font-medium truncate">{o.description}</p>
              <p className="text-sm text-gray-500">{o.type} • {o.interval}</p>
              <p className="text-xs text-gray-400 font-mono truncate mt-0.5">{o.iban}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold">{o.amount.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</p>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProdukteView() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Deine Produkte</h2>
      <div className="space-y-3">
        {[
          { name: "Girokonto", desc: "Kostenlos bei 700 € Geldeingang", status: "Aktiv", since: "Seit 03.2024" },
          { name: "Tagesgeld", desc: "Flexibel verzinstes Konto (2,25 % p.a.)", status: "Aktiv", since: "Seit 03.2024" },
          { name: "Visa Debitkarte", desc: "Kostenlos weltweit zahlen", status: "Aktiv", since: "Seit 03.2024" },
          { name: "Girocard", desc: "Für Bargeld am Geldautomaten", status: "Aktiv", since: "Seit 03.2024" },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
            <div className="min-w-0">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500 truncate">{p.desc}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">{p.status}</span>
              <p className="text-xs text-gray-400 mt-1">{p.since}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

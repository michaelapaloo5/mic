"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { demoGetUser, demoSignOut, demoGetAccountInfo } from "@/lib/demo-auth"
import { Home, CreditCard, Send, ShoppingBag, ArrowUpRight, HelpCircle, FileText, Menu, X, User, Mail, MessageSquare, Shield, ArrowRightLeft, Clock, Globe, Repeat } from "lucide-react"

type PageView = "finanzstatus" | "karten" | "auftraege" | "produkte" | "profil" | "postfach" | "feedback" | "sicherheit" | "transfer"

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
  { id: 9, date: "02.07.2026", description: "Vorgemerkt: Großbetrag 235.000,00 €", amount: 235000, type: "credit", category: "Vorgemerkt" },
  { id: 10, date: "15.04.2026", description: "Vorgemerkt: Großbetrag 235.000,00 €", amount: 235000, type: "credit", category: "Vorgemerkt" },
]



export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; user_metadata: { name: string } } | null>(null)
  const [account, setAccount] = useState<{ iban: string; balance: number } | null>(null)
  const [view, setView] = useState<PageView>("finanzstatus")
  const [giroTab, setGiroTab] = useState("Letzte Umsätze")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)

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

  function getTxTypeLabel(tx: Transaction): { label: string; color: string } {
    if (tx.category === "Vorgemerkt") return { label: "Vorgemerkt", color: "text-yellow-600 bg-yellow-50" }
    if (tx.type === "credit") return { label: "Eingang", color: "text-green-600 bg-green-50" }
    return { label: "Auszahlung", color: "text-red-600 bg-red-50" }
  }

  const sidebarItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: "finanzstatus", label: "Finanzstatus", icon: <Home size={20} /> },
    { id: "karten", label: "Karten", icon: <CreditCard size={20} /> },
    { id: "auftraege", label: "Umsätze", icon: <Send size={20} /> },
    { id: "produkte", label: "Produkte", icon: <ShoppingBag size={20} /> },
    { id: "postfach", label: "Postfach", icon: <Mail size={20} /> },
    { id: "profil", label: "Profileinstellungen", icon: <User size={20} /> },
    { id: "sicherheit", label: "Sicherheit", icon: <Shield size={20} /> },
    { id: "feedback", label: "Feedback", icon: <MessageSquare size={20} /> },
    { id: "transfer", label: "Überweisungen", icon: <ArrowRightLeft size={20} /> },
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

  function TransferView() {
  const [subView, setSubView] = useState<string | null>(null)

  const sharedSavedPayees = [
    { id: "1", name: "Vermieterin S. Müller", iban: "DE21 1001 0010 0123 4567 89" },
    { id: "2", name: "TK Versicherung", iban: "DE75 2005 0050 0987 6543 21" },
    { id: "3", name: "Stadtwerke Berlin", iban: "DE12 1009 0000 0012 3456 78" },
    { id: "4", name: "Netflix GmbH", iban: "DE33 3006 0601 1112 2233 44" },
    { id: "5", name: "Telekom Deutschland", iban: "DE44 4007 0070 0444 5555 66" },
  ]

  if (subView === "sepa") return <SEPATransferFlow payees={sharedSavedPayees} onBack={() => setSubView(null)} />
  if (subView === "instant") return <InstantTransferFlow payees={sharedSavedPayees} onBack={() => setSubView(null)} />
  if (subView === "standing") return <StandingOrderForm onBack={() => setSubView(null)} />
  if (subView === "international") return <InternationalTransferForm onBack={() => setSubView(null)} />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { id: "sepa", title: "Standard-Überweisung (SEPA)", desc: "Kostenlose Überweisung innerhalb des SEPA-Raums. Geld kommt am nächsten Werktag an.", icon: <ArrowRightLeft size={24} />, color: "blue" },
        { id: "instant", title: "Echtzeit-Überweisung", desc: "Geld in unter 10 Sekunden auf dem Empfängerkonto – 24/7 verfügbar.", icon: <Clock size={24} />, color: "green" },
        { id: "standing", title: "Dauerauftrag", desc: "Wiederkehrende Zahlungen automatisch ausführen – Miete, Versicherung & mehr.", icon: <Repeat size={24} />, color: "purple" },
        { id: "international", title: "Auslandsüberweisung", desc: "Geld außerhalb des SEPA-Raums senden – in Kooperation mit Wise.", icon: <Globe size={24} />, color: "teal" },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setSubView(item.id)}
          className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition-shadow border-none cursor-pointer"
        >
          <div className={`w-12 h-12 rounded-lg bg-${item.color}-100 flex items-center justify-center text-${item.color}-600 mb-4`}>
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </button>
      ))}
    </div>
  )
}

function RecipientStep({ onBack, onNext, payees, form, setForm }: {
  onBack: () => void
  onNext: () => void
  payees: { id: string; name: string; iban: string }[]
  form: { empfaenger: string; iban: string }
  setForm: (f: any) => void
}) {
  const [sub, setSub] = useState<"new" | "saved" | "qr" | null>(null)

  if (sub === "saved") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg">
        <button onClick={() => setSub(null)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">← Zurück</button>
        <h2 className="text-xl font-semibold mb-4">Gespeicherte Empfänger</h2>
        <div className="space-y-2">
          {payees.map(p => (
            <button
              key={p.id}
              onClick={() => { setForm({ ...form, empfaenger: p.name, iban: p.iban }); onNext() }}
              className="w-full p-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors bg-white cursor-pointer"
            >
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs text-gray-500 font-mono">{p.iban}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (sub === "qr") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg">
        <button onClick={() => setSub(null)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">← Zurück</button>
        <h2 className="text-xl font-semibold mb-1">Foto/QR</h2>
        <p className="text-sm text-gray-500 mb-4">Scanne eine Rechnung mit deiner Kamera.</p>
        <div className="max-w-[200px] mx-auto p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-6">
          <p className="text-xs text-gray-400 text-center">Kamera-Ansicht</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Empfänger</p>
            <input value={form.empfaenger} onChange={e => setForm({ ...form, empfaenger: e.target.value })} placeholder="Name des Empfängers" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN</p>
            <input value={form.iban} onChange={e => setForm({ ...form, iban: e.target.value })} placeholder="DE00 0000 0000 0000 0000 00" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white font-mono" />
          </div>
          <div className="flex justify-end">
            <button onClick={onNext} disabled={!form.empfaenger || !form.iban} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Weiter</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">← Zurück</button>
      <h2 className="text-xl font-semibold mb-4">Empfänger wählen</h2>
      <div className="space-y-3">
        <button onClick={() => setSub("new")} className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors bg-white cursor-pointer">
          <p className="font-medium text-sm">Neue Überweisung</p>
          <p className="text-xs text-gray-500">Empfängername und IBAN eingeben</p>
        </button>
        {sub === null && (
          <>
            <button onClick={() => setSub("saved")} className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors bg-white cursor-pointer">
              <p className="font-medium text-sm">Gespeicherte Empfänger</p>
              <p className="text-xs text-gray-500">Aus deinen Vorlagen oder letzten Überweisungen wählen</p>
            </button>
            <button onClick={() => setSub("qr")} className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors bg-white cursor-pointer">
              <p className="font-medium text-sm">Foto/QR</p>
              <p className="text-xs text-gray-500">Rechnung mit Kamera scannen</p>
            </button>
          </>
        )}
        {sub === "new" && (
          <div className="space-y-4 pt-2">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Empfänger</p>
              <input value={form.empfaenger} onChange={e => setForm({ ...form, empfaenger: e.target.value })} placeholder="Name des Empfängers" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN</p>
              <input value={form.iban} onChange={e => setForm({ ...form, iban: e.target.value })} placeholder="DE00 0000 0000 0000 0000 00" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white font-mono" />
            </div>
            <div className="flex justify-end">
              <button onClick={onNext} disabled={!form.empfaenger || !form.iban} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Weiter</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AmountStep({ onBack, onNext, form, setForm, label }: {
  onBack: () => void
  onNext: () => void
  form: { betrag: string; verwendungszweck: string; empfaenger: string; iban: string }
  setForm: (f: any) => void
  label: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">← Zurück</button>
      <h2 className="text-xl font-semibold mb-1">Zahlungsdetails</h2>
      <p className="text-xs text-gray-500 mb-4">{label}</p>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Empfänger</p>
          <p className="font-medium">{form.empfaenger}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN</p>
          <p className="font-medium font-mono text-sm">{form.iban}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Betrag (€)</p>
          <input type="number" value={form.betrag} onChange={e => setForm({ ...form, betrag: e.target.value })} placeholder="0,00" step="0.01" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Verwendungszweck</p>
          <textarea value={form.verwendungszweck} onChange={e => setForm({ ...form, verwendungszweck: e.target.value })} placeholder="Optional" rows={2} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white resize-none" />
        </div>
        <div className="flex justify-end">
          <button onClick={onNext} disabled={!form.betrag} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Weiter</button>
        </div>
      </div>
    </div>
  )
}

function TANStep({ onBack, onConfirm, form }: {
  onBack: () => void
  onConfirm: () => void
  form: { empfaenger: string; iban: string; betrag: string; verwendungszweck: string }
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">← Zurück</button>
      <h2 className="text-xl font-semibold mb-4">TAN-Bestätigung</h2>
      <p className="text-sm text-gray-500 mb-6">Authorisiere die Überweisung mit deinem TAN-Verfahren.</p>
      <div className="space-y-3 text-sm mb-6">
        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
          <span className="text-gray-500">Empfänger</span>
          <span className="font-medium">{form.empfaenger}</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
          <span className="text-gray-500">IBAN</span>
          <span className="font-medium font-mono text-xs">{form.iban}</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
          <span className="text-gray-500">Betrag</span>
          <span className="font-medium">{parseFloat(form.betrag || "0").toFixed(2).replace(".", ",")} €</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
          <span className="text-gray-500">Verwendungszweck</span>
          <span className="font-medium">{form.verwendungszweck || "—"}</span>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wider">TAN-Verfahren wählen</p>
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input type="radio" name="tan" defaultChecked className="accent-blue-600" />
          <div>
            <p className="font-medium text-sm">TAN2go App</p>
            <p className="text-xs text-gray-500">TAN in der App erhalten</p>
          </div>
        </label>
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input type="radio" name="tan" className="accent-blue-600" />
          <div>
            <p className="font-medium text-sm">chipTAN</p>
            <p className="text-xs text-gray-500">TAN mit Kartenleser generieren</p>
          </div>
        </label>
      </div>
      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer">Ändern</button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">Jetzt senden</button>
      </div>
    </div>
  )
}

function SuccessStep({ betrag, empfaenger, label, onNew }: {
  betrag: string; empfaenger: string; label: string; onNew: () => void
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg text-center py-12">
      <div className="text-4xl mb-4 text-green-500">✓</div>
      <h2 className="text-xl font-semibold mb-2">{label}</h2>
      <p className="text-sm text-gray-500 mb-6">{betrag?.replace(".", ",")} € an {empfaenger} wurden überwiesen.</p>
      <button onClick={onNew} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">
        Neue Überweisung
      </button>
    </div>
  )
}

function SEPATransferFlow({ payees, onBack }: { payees: { id: string; name: string; iban: string }[]; onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ empfaenger: "", iban: "", betrag: "", verwendungszweck: "" })

  if (step === 4) return <SuccessStep betrag={form.betrag} empfaenger={form.empfaenger} label="SEPA-Überweisung ausgeführt" onNew={() => { setStep(1); setForm({ empfaenger: "", iban: "", betrag: "", verwendungszweck: "" }) }} />
  if (step === 3) return <TANStep onBack={() => setStep(2)} onConfirm={() => setStep(4)} form={form} />
  if (step === 2) return <AmountStep onBack={() => setStep(1)} onNext={() => setStep(3)} form={form} setForm={setForm} label="Kostenlos • Ankunft am nächsten Werktag" />
  return <RecipientStep onBack={onBack} onNext={() => setStep(2)} payees={payees} form={form} setForm={(f) => setForm(f)} />
}

function InstantTransferFlow({ payees, onBack }: { payees: { id: string; name: string; iban: string }[]; onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ empfaenger: "", iban: "", betrag: "", verwendungszweck: "" })

  if (step === 4) return <SuccessStep betrag={form.betrag} empfaenger={form.empfaenger} label="Echtzeit-Überweisung ausgeführt" onNew={() => { setStep(1); setForm({ empfaenger: "", iban: "", betrag: "", verwendungszweck: "" }) }} />
  if (step === 3) return <TANStep onBack={() => setStep(2)} onConfirm={() => setStep(4)} form={form} />
  if (step === 2) return <AmountStep onBack={() => setStep(1)} onNext={() => setStep(3)} form={form} setForm={setForm} label="In Sekunden beim Empfänger • 24/7" />
  return <RecipientStep onBack={onBack} onNext={() => setStep(2)} payees={payees} form={form} setForm={(f) => setForm(f)} />
}

function StandingOrderForm({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState({ empfaenger: "", iban: "", betrag: "", interval: "Monatlich", start: "", verwendungszweck: "" })
  const [saved, setSaved] = useState(false)

  if (saved) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg text-center py-12">
        <div className="text-4xl mb-4 text-green-500">✓</div>
        <h2 className="text-xl font-semibold mb-2">Dauerauftrag eingerichtet</h2>
        <p className="text-sm text-gray-500 mb-6">{form.betrag?.replace(".", ",")} € {form.interval.toLowerCase()} an {form.empfaenger}.</p>
        <button onClick={() => { setSaved(false); setForm({ empfaenger: "", iban: "", betrag: "", interval: "Monatlich", start: "", verwendungszweck: "" }) }} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">
          Neuen Dauerauftrag
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">← Zurück</button>
      <h2 className="text-xl font-semibold mb-1">Dauerauftrag einrichten</h2>
      <p className="text-xs text-gray-500 mb-4">Wiederkehrende Zahlungen • Kostenlos • Jederzeit änderbar</p>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Empfänger</p>
          <input value={form.empfaenger} onChange={e => setForm({ ...form, empfaenger: e.target.value })} placeholder="Name des Empfängers" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN</p>
          <input value={form.iban} onChange={e => setForm({ ...form, iban: e.target.value })} placeholder="DE00 0000 0000 0000 0000 00" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white font-mono" />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Betrag (€)</p>
          <input type="number" value={form.betrag} onChange={e => setForm({ ...form, betrag: e.target.value })} placeholder="0,00" step="0.01" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Intervall</p>
          <select value={form.interval} onChange={e => setForm({ ...form, interval: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white">
            <option>Monatlich</option>
            <option>Alle 2 Monate</option>
            <option>Vierteljährlich</option>
            <option>Halbjährlich</option>
            <option>Jährlich</option>
          </select>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Erste Ausführung</p>
          <input type="date" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Verwendungszweck</p>
          <textarea value={form.verwendungszweck} onChange={e => setForm({ ...form, verwendungszweck: e.target.value })} placeholder="Optional" rows={2} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white resize-none" />
        </div>
        <div className="flex justify-end">
          <button onClick={() => setSaved(true)} disabled={!form.empfaenger || !form.iban || !form.betrag || !form.start} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Dauerauftrag einrichten</button>
        </div>
      </div>
    </div>
  )
}

function InternationalTransferForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ empfaenger: "", iban: "", betrag: "", waehrung: "USD", verwendungszweck: "" })

  if (step === 2) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg">
        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">← Zurück</button>
        <h2 className="text-xl font-semibold mb-4">TAN-Bestätigung</h2>
        <p className="text-sm text-gray-500 mb-6">Authorisiere die Überweisung mit deinem TAN-Verfahren.</p>
        <div className="space-y-3 text-sm mb-6">
          <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
            <span className="text-gray-500">Empfänger</span>
            <span className="font-medium">{form.empfaenger}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
            <span className="text-gray-500">IBAN/Konto</span>
            <span className="font-medium font-mono text-xs">{form.iban}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
            <span className="text-gray-500">Betrag</span>
            <span className="font-medium">{parseFloat(form.betrag || "0").toFixed(2).replace(".", ",")} {form.waehrung}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
            <span className="text-gray-500">Verwendungszweck</span>
            <span className="font-medium">{form.verwendungszweck || "—"}</span>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider">TAN-Verfahren wählen</p>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" name="tan" defaultChecked className="accent-blue-600" />
            <div>
              <p className="font-medium text-sm">TAN2go App</p>
              <p className="text-xs text-gray-500">TAN in der App erhalten</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" name="tan" className="accent-blue-600" />
            <div>
              <p className="font-medium text-sm">chipTAN</p>
              <p className="text-xs text-gray-500">TAN mit Kartenleser generieren</p>
            </div>
          </label>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setStep(1)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer">Ändern</button>
          <button onClick={() => setStep(3)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">Jetzt senden</button>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg text-center py-12">
        <div className="text-4xl mb-4 text-green-500">✓</div>
        <h2 className="text-xl font-semibold mb-2">Auslandsüberweisung ausgeführt</h2>
        <p className="text-sm text-gray-500 mb-6">{form.betrag?.replace(".", ",")} {form.waehrung} an {form.empfaenger} wird in 1–5 Werktagen ankommen.</p>
        <button onClick={() => { setStep(1); setForm({ empfaenger: "", iban: "", betrag: "", waehrung: "USD", verwendungszweck: "" }) }} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">
          Neue Überweisung
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-lg">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">← Zurück</button>
      <h2 className="text-xl font-semibold mb-1">Auslandsüberweisung</h2>
      <p className="text-xs text-gray-500 mb-4">In Kooperation mit Wise • Günstige Wechselkurse • 1–5 Werktage</p>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Empfänger</p>
          <input value={form.empfaenger} onChange={e => setForm({ ...form, empfaenger: e.target.value })} placeholder="Name des Empfängers" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN / Kontonummer</p>
          <input value={form.iban} onChange={e => setForm({ ...form, iban: e.target.value })} placeholder="IBAN oder lokale Kontonummer" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white font-mono" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Betrag</p>
            <input type="number" value={form.betrag} onChange={e => setForm({ ...form, betrag: e.target.value })} placeholder="0,00" step="0.01" className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Währung</p>
            <select value={form.waehrung} onChange={e => setForm({ ...form, waehrung: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white">
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="CHF">CHF</option>
              <option value="PLN">PLN</option>
              <option value="TRY">TRY</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Verwendungszweck</p>
          <textarea value={form.verwendungszweck} onChange={e => setForm({ ...form, verwendungszweck: e.target.value })} placeholder="Optional" rows={2} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white resize-none" />
        </div>
        <div className="flex justify-end">
          <button onClick={() => setStep(2)} disabled={!form.empfaenger || !form.iban || !form.betrag} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Weiter</button>
        </div>
      </div>
    </div>
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
      case "profil":
        return <ProfilView user={user} />
      case "postfach":
        return <PostfachView />
      case "feedback":
        return <FeedbackView />
      case "sicherheit":
        return <SicherheitView />
      case "transfer":
        return <TransferView />
      default:
        return (
          <>
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold text-lg">G</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold">Girokonto</h2>
                    <p className="text-sm text-gray-500 font-mono truncate">Konto {account?.iban?.replace(/[^\d]/g, "").slice(-10).replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2 $3") || "23 4567 8901"}</p>
                    <button onClick={() => setView("transfer")} className="mt-2 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors border-none cursor-pointer inline-flex items-center gap-1">
                      <ArrowRightLeft size={12} /> Überweisen
                    </button>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-3xl font-bold">{account ? formatEuro(account.balance) : "—"}</p>
                  <p className="text-sm text-green-600">Aktivstatus • Kontoführung kostenlos</p>
                </div>
              </div>

              <div className="flex gap-4 mb-6 border-b overflow-x-auto">
                {["Letzte Umsätze", "Kontodetails"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setGiroTab(tab); setSelectedTx(null) }}
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

              {giroTab === "Letzte Umsätze" && selectedTx ? (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <button onClick={() => setSelectedTx(null)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">
                    ← Zurück zur Übersicht
                  </button>
                  <h3 className="text-lg font-semibold mb-4">Transaktionsdetails</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-500">Datum</span>
                      <span className="font-medium">{selectedTx.date}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-500">Beschreibung</span>
                      <span className="font-medium text-right max-w-[60%]">{selectedTx.description}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-500">Betrag</span>
                      <span className={`font-semibold ${selectedTx.type === "credit" ? "text-green-600" : ""}`}>
                        {selectedTx.type === "credit" ? "+" : "-"}{formatEuro(selectedTx.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-500">Typ</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTxTypeLabel(selectedTx).color}`}>
                        {getTxTypeLabel(selectedTx).label}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-500">Kategorie</span>
                      <span className="font-medium">{selectedTx.category}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-500">Status</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedTx.category === "Vorgemerkt" ? "text-yellow-600 bg-yellow-50" : "text-green-600 bg-green-50"}`}>
                        {selectedTx.category === "Vorgemerkt" ? "Vorgemerkt" : "Abgeschlossen"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : giroTab === "Letzte Umsätze" ? (
                <div>
                  <div className="hidden sm:flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider pb-2 border-b mb-3">
                    <span className="w-24">Datum</span>
                    <span className="flex-1">Beschreibung</span>
                    <span className="w-24 text-right">Betrag</span>
                    <span className="w-24 text-right">Typ</span>
                  </div>
                  <div className="space-y-1">
                    {GIRO_TRANSACTIONS.map((tx) => {
                      const typeLabel = getTxTypeLabel(tx)
                      return (
                        <button
                          key={tx.id}
                          onClick={() => setSelectedTx(tx)}
                          className="w-full flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 -mx-2 gap-2 text-left border-none bg-transparent cursor-pointer"
                        >
                          <span className="hidden sm:block w-24 text-sm text-gray-600 shrink-0">{tx.date}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{tx.description}</p>
                            <p className="text-xs text-gray-400 sm:hidden">{tx.date}</p>
                          </div>
                          <span className="w-24 text-right">
                            <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-green-600" : ""}`}>
                              {tx.type === "credit" ? "+" : "-"}{formatEuro(tx.amount)}
                            </span>
                          </span>
                          <span className={`w-24 text-right text-xs font-medium px-2 py-0.5 rounded-full ${typeLabel.color}`}>
                            {typeLabel.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Kontotyp</p>
                    <p className="font-semibold">DKB Girokonto</p>
                  </div>
                  <div className="sm:col-span-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">IBAN</p>
                    <p className="font-semibold font-mono text-sm break-all">{account?.iban?.replace(/(.{4})/g, "$1 ").trim() || "DE02 1203 0000 2345 6789 01"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Kontonummer</p>
                    <p className="font-semibold font-mono text-sm">{account?.iban?.replace(/[^\d]/g, "").slice(-10).replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2 $3") || "23 4567 8901"}</p>
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
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wider mb-1">02.07.2026</p>
                  <h4 className="text-sm font-bold mb-1">Hypothekenpfandbrief begeben</h4>
                  <p className="text-xs text-gray-600">DKB platziert erfolgreich Hypothekenpfandbrief am Kapitalmarkt.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wider mb-1">01.05.2026</p>
                  <h4 className="text-sm font-bold mb-1">Tagesgeld-Zinsaktion</h4>
                  <p className="text-xs text-gray-600">2,75 % p.a. aufs Tagesgeld für Neuanlagen bis 31.08.2026.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wider mb-1">05.03.2026</p>
                  <h4 className="text-sm font-bold mb-1">Rekordergebnis 2025</h4>
                  <p className="text-xs text-gray-600">DKB erzielt Vorsteuerergebnis von 1.175,8 Mio. Euro und startet Strategie "DKB 2030".</p>
                </div>
                <div className="bg-blue-600 text-white rounded-lg p-4">
                  <p className="text-xs font-medium mb-1">Aktion</p>
                  <h4 className="text-sm font-bold mb-2">Freunde werben & 50 € sichern</h4>
                  <p className="text-xs opacity-90">Empfiehl unser kostenloses Girokonto und erhalte 50 € direkt auf dein Konto.</p>
                </div>
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
              <p className="text-sm font-semibold">GÜNTHER FALKENBERG</p>
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
              <p className="text-sm font-semibold">GÜNTHER FALKENBERG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuftraegeView() {
  const formatEuro = (n: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n)

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Transaktionshistorie</h2>
      <div className="space-y-1">
        {[...GIRO_TRANSACTIONS].reverse().map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 gap-2">
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{tx.description}</p>
              <p className="text-xs text-gray-400">{tx.date} • {tx.category}</p>
            </div>
            <span className={`text-sm font-semibold shrink-0 ${tx.type === "credit" ? "text-green-600" : ""}`}>
              {tx.type === "credit" ? "+" : "-"}{formatEuro(tx.amount)}
            </span>
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

function ProfilView({ user }: { user: { email: string; user_metadata: { name: string } } | null }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ anrede: "Herr", titel: "", vorname: "Günther", nachname: "Falkenberg", email: "guntherfalkenberg62@gmail.com", telefon: "+4901743511795" })

  if (editing) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Profileinstellungen bearbeiten</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Anrede</p>
              <select value={form.anrede} onChange={e => setForm({ ...form, anrede: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white">
                <option>Herr</option>
                <option>Frau</option>
                <option>Divers</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Titel</p>
              <input value={form.titel} onChange={e => setForm({ ...form, titel: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Vorname</p>
              <input value={form.vorname} onChange={e => setForm({ ...form, vorname: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nachname</p>
              <input value={form.nachname} onChange={e => setForm({ ...form, nachname: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">E-Mail</p>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Telefon</p>
              <input value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setEditing(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer">Abbrechen</button>
            <button onClick={() => setEditing(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">Speichern</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Profileinstellungen</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {form.vorname.charAt(0)}{form.nachname.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-lg">{form.vorname} {form.nachname}</p>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Anrede</p>
            <p className="font-medium">{form.anrede}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Titel</p>
            <p className="font-medium">{form.titel || "—"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Vorname</p>
            <p className="font-medium">{form.vorname}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nachname</p>
            <p className="font-medium">{form.nachname}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">E-Mail</p>
            <p className="font-medium">{form.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Telefon</p>
            <p className="font-medium">{form.telefon}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={() => setEditing(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">
            Einstellungen bearbeiten
          </button>
        </div>
      </div>
    </div>
  )
}

function PostfachView() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const messages = [
    { id: 1, from: "DKB AG", subject: "Ihr Kontoauszug für Juli 2026", date: "03.07.2026", unread: true, body: "Sehr geehrter Herr Falkenberg,\n\nanbei erhalten Sie Ihren Kontoauszug für den Monat Juli 2026.\n\nKontostand per 31.07.2026: -15.087,00 €\n\nSie können den Kontoauszug jederzeit im PDF-Format herunterladen.\n\nMit freundlichen Grüßen\nIhre DKB AG" },
    { id: 2, from: "DKB AG", subject: "Tagesgeld-Zinsaktion: 2,75 % p.a. sichern", date: "01.05.2026", unread: true, body: "Sehr geehrter Herr Falkenberg,\n\nsichern Sie sich jetzt unseren exklusiven Zinsvorteil!\n\nBis zum 31.08.2026 erhalten Sie 2,75 % p.a. auf Neuanlagen auf Ihrem Tagesgeldkonto.\n\nGilt für Einlagen bis 100.000 €.\n\nMit freundlichen Grüßen\nIhre DKB AG" },
    { id: 3, from: "DKB AG", subject: "Jahressteuerbescheinigung 2025", date: "15.03.2026", unread: false, body: "Sehr geehrter Herr Falkenberg,\n\nIhre Jahressteuerbescheinigung für das Steuerjahr 2025 steht ab sofort in Ihrem Postfach bereit.\n\nErhaltene Zinsen: 147,23 €\nAbgeführte Kapitalertragsteuer: 36,81 €\nSolidaritätszuschlag: 2,02 €\n\nMit freundlichen Grüßen\nIhre DKB AG" },
    { id: 4, from: "DKB AG", subject: "Ihre neue Visa Debitkarte ist unterwegs", date: "12.03.2026", unread: false, body: "Sehr geehrter Herr Falkenberg,\n\nIhre neue Visa Debitkarte wurde erfolgreich bestellt und befindet sich auf dem Versandweg.\n\nDie Karte wird innerhalb der nächsten 5–7 Werktage bei Ihnen eintreffen.\n\nIhre alte Karte behält bis zum Aktivierungsdatum der neuen Karte ihre Gültigkeit.\n\nMit freundlichen Grüßen\nIhre DKB AG" },
    { id: 5, from: "DKB AG", subject: "Strategie DKB 2030 – Information für Kunden", date: "05.03.2026", unread: false, body: "Sehr geehrter Herr Falkenberg,\n\nmit einem Vorsteuerergebnis von 1.175,8 Mio. Euro blickt die DKB auf das erfolgreichste Jahr ihrer Geschichte zurück. Wir starten unsere neue Strategie \"DKB 2030\" mit dem Ziel, Deutschlands digitalste Bank zu werden.\n\nBereits 2025 haben wir über 500.000 neue Kunden gewonnen und unser Filialnetz modernisiert.\n\nMit freundlichen Grüßen\nIhre DKB AG" },
    { id: 6, from: "DKB AG", subject: "Großbetrag 235.000,00 € vorgemerkt", date: "02.07.2026", unread: true, body: "Sehr geehrter Herr Falkenberg,\n\nwir möchten Sie darüber informieren, dass ein Großbetrag in Höhe von 235.000,00 € auf Ihrem Girokonto vorgemerkt ist.\n\nDer Betrag wird nach endgültiger Prüfung Ihrem Konto gutgeschrieben.\n\nBei Fragen stehen wir Ihnen jederzeit zur Verfügung.\n\nMit freundlichen Grüßen\nIhre DKB AG" },
    { id: 7, from: "DKB AG", subject: "Großbetrag 235.000,00 € vorgemerkt", date: "15.04.2026", unread: false, body: "Sehr geehrter Herr Falkenberg,\n\nwir möchten Sie darüber informieren, dass ein Großbetrag in Höhe von 235.000,00 € auf Ihrem Girokonto vorgemerkt ist.\n\nDer Betrag wird nach endgültiger Prüfung Ihrem Konto gutgeschrieben.\n\nBei Fragen stehen wir Ihnen jederzeit zur Verfügung.\n\nMit freundlichen Grüßen\nIhre DKB AG" },
  ]

  if (selectedId !== null) {
    const m = messages.find(msg => msg.id === selectedId)!
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">
          ← Zurück zur Übersicht
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <p className="font-semibold text-lg">{m.subject}</p>
            <p className="text-sm text-gray-500">{m.from} • {m.date}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-line text-sm leading-relaxed">
          {m.body}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Postfach</h2>
      <div className="space-y-2">
        {messages.map((m) => (
          <div key={m.id} onClick={() => setSelectedId(m.id)} className={`flex items-center justify-between p-4 rounded-lg gap-4 cursor-pointer hover:bg-gray-50 transition-colors ${m.unread ? "bg-blue-50 border-l-4 border-blue-600" : "bg-gray-50"}`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.unread ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                <Mail size={16} />
              </div>
              <div className="min-w-0">
                <p className={`text-sm ${m.unread ? "font-bold" : "font-medium"} truncate`}>{m.subject}</p>
                <p className="text-xs text-gray-500">{m.from} • {m.date}</p>
              </div>
            </div>
            {m.unread && <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function FeedbackView() {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      {submitted ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🙏</div>
          <p className="text-lg font-semibold mb-2">Vielen Dank für dein Feedback!</p>
          <p className="text-sm text-gray-500">Wir arbeiten stetig daran, unser Banking zu verbessern.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Wie zufrieden bist du mit unserem Banking?</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`w-10 h-10 rounded-full text-lg border-none cursor-pointer transition-colors ${
                  star <= rating ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <>
              <textarea
                placeholder="Teile uns mit, was wir besser machen können..."
                className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white resize-none"
                rows={4}
              />
              <button
                onClick={() => setSubmitted(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer"
              >
                Absenden
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function SicherheitView() {
  const [tanVerfahren, setTanVerfahren] = useState("pushTAN")
  const [showTanSelector, setShowTanSelector] = useState(false)
  const [bioLogin, setBioLogin] = useState(true)
  const [showDevices, setShowDevices] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [pwCurrent, setPwCurrent] = useState("")
  const [pwNew, setPwNew] = useState("")
  const [pwConfirm, setPwConfirm] = useState("")

  const devices = [
    { name: "iPhone 15 Pro", lastAccess: "06.07.2026, 14:32 Uhr", location: "Berlin, Deutschland", active: true },
    { name: "MacBook Air", lastAccess: "05.07.2026, 09:15 Uhr", location: "Berlin, Deutschland", active: true },
  ]

  if (showDevices) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <button onClick={() => setShowDevices(false)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">
          ← Zurück zur Sicherheitsübersicht
        </button>
        <h2 className="text-xl font-semibold mb-4">Geräteverwaltung</h2>
        <div className="space-y-3">
          {devices.map((d) => (
            <div key={d.name} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium">{d.name}</p>
                <p className="text-xs text-gray-500">Letzter Zugriff: {d.lastAccess}</p>
                <p className="text-xs text-gray-500">{d.location}</p>
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full shrink-0">Aktiv</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (showPasswordForm) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <button onClick={() => { setShowPasswordForm(false); setPwCurrent(""); setPwNew(""); setPwConfirm("") }} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">
          ← Zurück zur Sicherheitsübersicht
        </button>
        <h2 className="text-xl font-semibold mb-4">Passwort ändern</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Aktuelles Passwort</p>
            <input type="password" value={pwCurrent} onChange={e => setPwCurrent(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Neues Passwort</p>
            <input type="password" value={pwNew} onChange={e => setPwNew(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Neues Passwort bestätigen</p>
            <input type="password" value={pwConfirm} onChange={e => setPwConfirm(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white" />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => { setShowPasswordForm(false); setPwCurrent(""); setPwNew(""); setPwConfirm("") }} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer">Abbrechen</button>
            <button onClick={() => { setShowPasswordForm(false); setPwCurrent(""); setPwNew(""); setPwConfirm("") }} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">Speichern</button>
          </div>
        </div>
      </div>
    )
  }

  if (showTanSelector) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <button onClick={() => setShowTanSelector(false)} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4 border-none bg-transparent cursor-pointer">
          ← Zurück zur Sicherheitsübersicht
        </button>
        <h2 className="text-xl font-semibold mb-4">TAN-Verfahren ändern</h2>
        <div className="space-y-2">
          {["pushTAN", "chipTAN", "mobileTAN", "SMS-TAN"].map((v) => (
            <div key={v} onClick={() => { setTanVerfahren(v); setShowTanSelector(false) }} className={`p-4 rounded-lg cursor-pointer flex items-center justify-between ${tanVerfahren === v ? "bg-blue-50 border border-blue-200" : "bg-gray-50 hover:bg-gray-100"}`}>
              <p className={`font-medium ${tanVerfahren === v ? "text-blue-600" : ""}`}>{v}</p>
              {tanVerfahren === v && <span className="text-blue-600 text-sm font-medium">Aktiv</span>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Sicherheit</h2>
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <Shield size={20} className="text-green-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-green-800">Sicherheitsstatus: Gut</p>
            <p className="text-sm text-green-700">Alle Sicherheitseinstellungen sind aktiv.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">TAN-Verfahren</p>
              <p className="text-sm text-gray-500">{tanVerfahren}</p>
            </div>
            <button onClick={() => setShowTanSelector(true)} className="text-sm text-blue-600 hover:underline bg-transparent border-none cursor-pointer">Ändern</button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">Geräteverwaltung</p>
              <p className="text-sm text-gray-500">{devices.length} aktive Geräte</p>
            </div>
            <button onClick={() => setShowDevices(true)} className="text-sm text-blue-600 hover:underline bg-transparent border-none cursor-pointer">Anzeigen</button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">Biometrischer Login</p>
              <p className="text-sm text-gray-500">{bioLogin ? "Fingerabdruck aktiv" : "Deaktiviert"}</p>
            </div>
            <button onClick={() => setBioLogin(!bioLogin)} className={`text-sm px-3 py-1 rounded-lg border-none cursor-pointer font-medium ${bioLogin ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}`}>
              {bioLogin ? "Aktiv" : "Aktivieren"}
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">Letzter Login</p>
              <p className="text-sm text-gray-500">06.07.2026, 14:32 Uhr</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
          <div>
            <p className="font-medium">Passwort ändern</p>
            <p className="text-sm text-gray-500">Zuletzt geändert vor 3 Monaten</p>
          </div>
          <button onClick={() => setShowPasswordForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">
            Ändern
          </button>
        </div>
      </div>
    </div>
  )
}

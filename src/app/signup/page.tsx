"use client"

import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f9fe] font-sans">
      {/* Top bar: Logo center, Login right */}
      <header className="bg-white border-b border-[rgba(8,76,128,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
          <div className="w-20" />
          <div className="flex flex-col items-center">
            <span className="text-[28px] font-black text-[#0070c0] leading-[0.8] tracking-[-0.05em]">DKB</span>
            <span className="text-[9px] font-bold text-[#00a0f0] mt-0.5 tracking-wide">Das kann Bank</span>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="text-[15px] font-medium text-[#006ac7] hover:underline bg-transparent border-none cursor-pointer"
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[400px] text-center">
          <h1 className="text-[28px] font-semibold text-[rgba(13,14,15,0.95)] mb-8">
            Bist du neu bei der DKB?
          </h1>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/signup/form")}
              className="w-full py-4 px-6 rounded-[8px] bg-[#006ac7] text-white text-[16px] font-medium hover:bg-[#134e8a] transition-colors border-none cursor-pointer"
            >
              Ja, ich bin neu bei der DKB
            </button>

            <button
              onClick={() => router.push("/login")}
              className="w-full py-4 px-6 rounded-[8px] bg-white text-[#006ac7] text-[16px] font-medium border border-[rgba(8,76,128,0.21)] hover:bg-[#f3f9fe] transition-colors cursor-pointer"
            >
              Nein, ich bin bereits Kunde
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-[rgba(8,76,128,0.12)] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-[rgba(15,47,71,0.55)] justify-center">
          <a href="#" className="hover:underline">Impressum</a>
          <a href="#" className="hover:underline">Datenschutz</a>
          <a href="#" className="hover:underline">Preise & Bedingungen</a>
          <a href="#" className="hover:underline">Cookie Einstellungen</a>
        </div>
      </footer>
    </div>
  )
}

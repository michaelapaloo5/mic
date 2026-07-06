import React from 'react';

export default function DKBLoginSelection() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b131a] text-white font-sans selection:bg-[#0066b3] selection:text-white">
      {/* Header */}
      <header className="relative flex items-center justify-center py-4 border-b border-[#1c2a38] bg-[#0b131a] z-10">
        <div className="flex flex-col items-center select-none">
          <div className="text-[#0066b3] font-black text-[28px] leading-none tracking-tighter">
            DKB
          </div>
          <div className="text-[#0066b3] text-[8.5px] font-bold tracking-[0.08em] mt-0.5">
            Das kann Bank
          </div>
        </div>
        <button 
          aria-label="Toggle theme" 
          className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8e9fb1] hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-[#1c2a38]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        <h1 className="text-white text-[26px] sm:text-[32px] font-bold mb-10 sm:mb-14 text-center tracking-tight">
          Bist du neu bei der DKB?
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-[760px] justify-center">
          
          {/* Card 1: New Customer */}
          <button className="flex-1 flex flex-col items-center p-8 sm:p-10 bg-[#131f2c] rounded-2xl border border-[#233547] hover:bg-[#182736] hover:border-[#344a60] transition-all duration-300 group text-center focus:outline-none focus:ring-2 focus:ring-[#0066b3] focus:ring-offset-2 focus:ring-offset-[#0b131a]">
            <div className="w-36 h-36 mb-6 relative flex items-end justify-center">
              <svg viewBox="0 0 140 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* White Dome Background */}
                <path d="M 20 120 C 20 45, 120 45, 120 120 Z" fill="#ffffff" />
                
                {/* Speech Bubble */}
                <g transform="translate(42, 15)">
                  <rect x="0" y="0" width="56" height="18" rx="4" fill="#ffffff" stroke="#0066b3" strokeWidth="1.5"/>
                  <path d="M 24 18 L 18 26 L 32 18 Z" fill="#ffffff" stroke="#0066b3" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M 25 17 L 31 17" stroke="#ffffff" strokeWidth="3"/> {/* Hide inner stroke */}
                  <text x="28" y="12" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="#0066b3" textAnchor="middle" letterSpacing="0.05em">WELCOME</text>
                </g>

                {/* Left Person (Teal) */}
                <path d="M 25 120 C 25 85, 50 85, 60 120 Z" fill="#4fd1c5" />
                <circle cx="42" cy="82" r="9" fill="#1a202c" />
                {/* Arm raised */}
                <path d="M 35 100 Q 25 80 30 70" stroke="#4fd1c5" strokeWidth="5" strokeLinecap="round" />
                
                {/* Right Person (Pink) */}
                <path d="M 80 120 C 90 85, 115 85, 115 120 Z" fill="#f687b3" />
                <circle cx="98" cy="82" r="9" fill="#1a202c" />

                {/* Center Person (Dark Blue) */}
                <path d="M 45 120 C 55 75, 85 75, 95 120 Z" fill="#1e3a8a" />
                <circle cx="70" cy="72" r="10" fill="#1a202c" />
                
                {/* Laptop */}
                <rect x="55" y="102" width="30" height="18" rx="2" fill="#e2e8f0" />
                <path d="M 50 120 L 90 120 L 85 115 L 55 115 Z" fill="#cbd5e1" />
              </svg>
            </div>
            <h2 className="text-white text-[19px] font-bold mb-3 group-hover:text-[#60a5fa] transition-colors duration-200">
              Ja, ich bin neu
            </h2>
            <p className="text-[#8e9fb1] text-[15px] leading-[1.5] font-medium">
              Ich habe noch kein Konto,<br/>Depot oder anderes Produkt<br/>bei der DKB.
            </p>
          </button>

          {/* Card 2: Existing Customer */}
          <button className="flex-1 flex flex-col items-center p-8 sm:p-10 bg-[#131f2c] rounded-2xl border border-[#233547] hover:bg-[#182736] hover:border-[#344a60] transition-all duration-300 group text-center focus:outline-none focus:ring-2 focus:ring-[#0066b3] focus:ring-offset-2 focus:ring-offset-[#0b131a]">
            <div className="w-36 h-36 mb-6 relative flex items-end justify-center">
              <svg viewBox="0 0 140 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* White Dome Background */}
                <path d="M 20 120 C 20 45, 120 45, 120 120 Z" fill="#ffffff" />
                
                {/* Person (Blue) */}
                <path d="M 55 120 C 55 70, 95 70, 95 120 Z" fill="#3182ce" />
                <circle cx="75" cy="65" r="11" fill="#1a202c" />
                {/* Hair detail */}
                <path d="M 64 65 Q 75 50 86 65 Q 88 75 80 80 Q 75 75 64 65 Z" fill="#1a202c" />
                
                {/* Arm */}
                <path d="M 75 90 Q 60 100 65 110" stroke="#3182ce" strokeWidth="6" strokeLinecap="round" />

                {/* Laptop */}
                <g transform="translate(45, 95) rotate(-10)">
                  <rect x="0" y="0" width="28" height="18" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2"/>
                  <line x1="4" y1="14" x2="24" y2="14" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
                </g>
              </svg>
            </div>
            <h2 className="text-white text-[19px] font-bold mb-3 group-hover:text-[#60a5fa] transition-colors duration-200">
              Ich bin bereits bei der DKB
            </h2>
            <p className="text-[#8e9fb1] text-[15px] leading-[1.5] font-medium">
              Ich habe schon ein Konto,<br/>Depot oder anderes Produkt<br/>bei der DKB.
            </p>
          </button>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f1822] py-5 px-6 flex flex-col lg:flex-row justify-between items-center text-[12px] text-[#7a8b9c] border-t border-[#1c2a38] gap-4">
        <div className="whitespace-nowrap">
          © 2026 Deutsche Kreditbank AG
        </div>
        <nav className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-3 font-medium">
          <a href="#" className="hover:text-white transition-colors duration-200">Impressum</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Datenschutz</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Preise & Bedingungen</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Cookie Einstellungen</a>
          <span className="text-[#5c6b7a]">BIC: BYLADEM1001</span>
        </nav>
      </footer>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Home, CreditCard, Send, ShoppingBag, Clock, Store, Banknote, MapPin } from 'lucide-react';

export default function Page() {
  const [activeTab, setActiveTab] = useState<{ [key: string]: string }>({
    girokonto: 'Überweisung',
    tagesgeld: 'Überweisung'
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-52 bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">DKB</div>
            <div className="text-xs text-gray-600">Das kann Bank</div>
          </div>
        </div>

        <nav className="space-y-1 px-3">
          <div className="px-3 py-3 rounded-lg bg-blue-50 text-blue-600 flex items-center gap-3 font-medium">
            <Home size={20} />
            Finanzstatus
          </div>
          <div className="px-3 py-3 rounded-lg text-gray-700 flex items-center gap-3 font-medium hover:bg-gray-50">
            <CreditCard size={20} />
            Karten
          </div>
          <div className="px-3 py-3 rounded-lg text-gray-700 flex items-center gap-3 font-medium hover:bg-gray-50">
            <Send size={20} />
            Aufträge
          </div>
          <div className="px-3 py-3 rounded-lg text-gray-700 flex items-center gap-3 font-medium hover:bg-gray-50">
            <ShoppingBag size={20} />
            Produkte
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* Left Content */}
          <div className="flex-1 p-8">
            <h1 className="text-4xl font-bold mb-8">Finanzstatus</h1>

            {/* Girokonto Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Banknote className="text-gray-400" size={24} />
                  <div>
                    <h2 className="text-xl font-semibold">Girokonto</h2>
                    <p className="text-sm text-gray-500">DE07 <span className="bg-gray-200 px-1">●●●●●●●●</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">€</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b">
                {['Überweisung', 'Umsatzliste', 'Kontodetails'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab({...activeTab, girokonto: tab})}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab.girokonto === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Transactions */}
              <div className="space-y-4">
                {/* Transaction 1 */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">Vorgemerkt</p>
                      <div className="flex gap-2">
                        <span className="text-xs bg-gray-200 px-2 py-1">●●</span>
                        <span className="text-xs bg-gray-200 px-2 py-1">●●</span>
                        <span className="text-xs bg-gray-200 px-2 py-1">●●</span>
                        <span className="text-xs text-yellow-600 font-medium">02.09.25</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold">-141,00 €</span>
                </div>

                {/* Transaction 2 */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">Baeckerei</p>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs bg-gray-200 px-2 py-1">●●</span>
                        <span className="text-xs text-yellow-600 font-medium">Vorgemerkt • 01.09.25</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold">-5,13 €</span>
                </div>

                {/* Transaction 3 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Store size={20} className="bg-green-500 text-white p-1 rounded" />
                    <div>
                      <p className="font-medium">Subway</p>
                      <p className="text-xs text-gray-500">01.09.25 • Ausgang</p>
                    </div>
                  </div>
                  <span className="font-semibold">-24,47 €</span>
                </div>
              </div>
            </div>

            {/* Tagesgeld Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Banknote className="text-gray-400" size={24} />
                  <div>
                    <h2 className="text-xl font-semibold">Tagesgeld</h2>
                    <p className="text-sm text-gray-500">DE87 <span className="bg-gray-200 px-1">●●●●●●●●</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">€</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b">
                {['Überweisung', 'Umsatzliste', 'Kontodetails'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab({...activeTab, tagesgeld: tab})}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab.tagesgeld === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Transactions */}
              <div className="space-y-4">
                {/* Transaction 1 */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <Banknote size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">DKB AG</p>
                      <p className="text-xs text-gray-500">01.07.25 • Eingang</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-blue-200 rounded"></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">€</span>
                  </div>
                </div>

                {/* Transaction 2 */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-500">12.06.25 • Ausgang</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-gray-300 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-gray-400 rounded"></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">€</span>
                  </div>
                </div>

                {/* Transaction 3 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Banknote size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">DKB AG</p>
                      <p className="text-xs text-gray-500">01.04.25 • Eingang</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-blue-400 rounded"></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">€</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personalisieren Button */}
            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200">
                Personalisieren
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-96 p-8 space-y-6">
            {/* Banking entdecken */}
            <div className="bg-blue-50 rounded-lg p-6 relative">
              <button className="absolute top-3 right-3 text-gray-400">✕</button>
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

            {/* Aktuelles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Aktuelles</h3>
              
              {/* Promotion Card */}
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
  );
}

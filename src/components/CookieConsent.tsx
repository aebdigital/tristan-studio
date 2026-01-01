"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

interface CookieConsentContextType {
  openSettings: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
};

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false); // Banner state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Settings modal state
  const [hasConsented, setHasConsented] = useState(false);

  // Cookie preferences
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true and disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent");
    if (storedConsent) {
      setHasConsented(true);
      setPreferences(JSON.parse(storedConsent));
    } else {
      // Show banner if no consent stored
      setIsOpen(true);
    }
  }, []);

  const savePreferences = (newPreferences: typeof preferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setHasConsented(true);
    setIsOpen(false);
    setIsSettingsOpen(false);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const saveSettings = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  return (
    <CookieConsentContext.Provider value={{ openSettings }}>
      {children}

      {/* Bottom Banner */}
      {!hasConsented && isOpen && !isSettingsOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-6 z-50 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg border-t border-gray-800">
          <div className="text-sm md:text-base max-w-4xl">
            <p className="mb-2 font-semibold">Nastavenia súkromia</p>
            <p>
              Používame súbory cookies, aby sme vám zabezpečili čo najlepší
              zážitok z našej webovej stránky.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={openSettings}
              className="px-4 py-2 text-sm border border-white hover:bg-white hover:text-black transition-colors rounded"
            >
              Nastavenia
            </button>
            <button
              onClick={rejectAll}
              className="px-4 py-2 text-sm border border-white hover:bg-white hover:text-black transition-colors rounded"
            >
              Odmietnuť
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded"
            >
              Prijať všetko
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 text-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Nastavenia cookies</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-sm text-gray-400">
                Tu si môžete nastaviť preferencie pre jednotlivé typy súborov
                cookies.
              </p>

              {/* Necessary */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nevyhnutné (Vždy povolené)</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Zabezpečujú základnú funkčnosť stránky.
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-default translate-x-6"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-green-500 cursor-default"></label>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Štatistické</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Pomáhajú nám pochopiť návštevnosť.
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference("analytics")}
                    className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ${
                      preferences.analytics ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                  <label
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${
                      preferences.analytics ? "bg-green-500" : "bg-gray-600"
                    }`}
                    onClick={() => togglePreference("analytics")}
                  ></label>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketingové</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Pre personalizované reklamy.
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference("marketing")}
                    className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ${
                      preferences.marketing ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                  <label
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${
                      preferences.marketing ? "bg-green-500" : "bg-gray-600"
                    }`}
                    onClick={() => togglePreference("marketing")}
                  ></label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-800 bg-black flex justify-end gap-3">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Zrušiť
              </button>
              <button
                onClick={saveSettings}
                className="px-6 py-2 text-sm bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded"
              >
                Uložiť nastavenia
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}

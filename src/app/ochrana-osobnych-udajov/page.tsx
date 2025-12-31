export const metadata = {
  title: "Ochrana osobných údajov | TRISTAN studio",
  description: "Zásady ochrany osobných údajov TRISTAN studio, s.r.o.",
};

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 pb-20 px-6 md:px-10 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light mb-12 uppercase tracking-wider">
          Ochrana osobných údajov
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-medium mt-8 mb-4">
            1. Prevádzkovateľ osobných údajov
          </h2>
          <p>
            Prevádzkovateľom osobných údajov je spoločnosť TRISTAN studio,
            s.r.o., so sídlom Tkáčska 6, 080 01 Prešov, Slovenská republika.
          </p>

          <h2 className="text-2xl font-medium mt-8 mb-4">
            2. Účel spracovania osobných údajov
          </h2>
          <p>
            Vaše osobné údaje spracúvame za účelom poskytovania našich služieb,
            komunikácie s vami a plnenia zákonných povinností.
          </p>

          <h2 className="text-2xl font-medium mt-8 mb-4">
            3. Rozsah spracúvaných údajov
          </h2>
          <p>
            Spracúvame nasledovné kategórie osobných údajov: meno a priezvisko,
            e-mailová adresa, telefónne číslo, adresa.
          </p>

          <h2 className="text-2xl font-medium mt-8 mb-4">4. Vaše práva</h2>
          <p>
            Máte právo na prístup k údajom, právo na opravu, vymazanie,
            obmedzenie spracovania, prenosnosť údajov a právo namietať proti
            spracovaniu.
          </p>

          <h2 className="text-2xl font-medium mt-8 mb-4">5. Kontakt</h2>
          <p>
            V prípade otázok týkajúcich sa ochrany osobných údajov nás
            kontaktujte na adrese marianferjo@tristanstudio.sk alebo telefonicky
            na +421 905 537 289.
          </p>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Ochrana osobných údajov | TRISTAN studio",
  description: "Zásady ochrany osobných údajov TRISTAN studio, s.r.o.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      {/* Mini Hero */}
      <section className="relative h-[30vh] min-h-[250px] w-full overflow-hidden flex items-end pb-8 justify-center md:items-center md:pb-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/vmo3746.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light uppercase tracking-wider text-center px-4">
          Ochrana osobných údajov
        </h1>
      </section>

      <div className="py-20 px-6 md:px-10 max-w-3xl mx-auto">
        <div className="prose prose-lg max-w-none space-y-6 text-gray-800">
          <p className="font-medium">
            TRISTAN studio, s.r.o.<br />
            Tkáčska 6, 080 01 Prešov, Slovensko<br />
            IČO: 43779476, DIČ: 2022467117<br />
            E-mail: marianferjo@tristanstudio.sk<br />
            Tel.: 0905 537 289
          </p>

          <p>
            Tieto Zásady ochrany osobných údajov (ďalej len „Zásady“) popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
          </p>

          <hr className="border-gray-300 my-8" />

          <h2 className="text-2xl font-medium mt-8 mb-4">
            I. Súbory cookies
          </h2>
          <p>
            Na našej webovej stránke používame cookies výlučne na nasledujúce účely:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).
            </li>
            <li>
              <strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).
            </li>
          </ul>
          <p className="mt-4">
            <strong>Správa súhlasov:</strong><br />
            Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.
          </p>

          <hr className="border-gray-300 my-8" />

          <h2 className="text-2xl font-medium mt-8 mb-4">
            II. Práva dotknutej osoby
          </h2>
          <p>
            Podľa nariadenia GDPR máte nasledujúce práva:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Prístup k osobným údajom, ktoré spracúvame</li>
            <li>Oprava nepresných alebo neúplných údajov</li>
            <li>Vymazanie („právo zabudnutia“), ak na spracovanie už nie je právny základ</li>
            <li>Obmedzenie spracovania</li>
            <li>Prenosnosť údajov</li>
            <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
            <li>Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.dataprotection.gov.sk</a>)</li>
          </ul>

          <p className="mt-8">
            V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na <a href="mailto:marianferjo@tristanstudio.sk" className="text-blue-600 hover:underline">marianferjo@tristanstudio.sk</a> alebo telefónnom čísle 0905 537 289.
          </p>

          <hr className="border-gray-300 my-8" />

          <p className="text-sm text-gray-500">
            Tieto Zásady nadobúdajú účinnosť dňom 16. 6. 2025.
          </p>
        </div>
      </div>
    </main>
  );
}

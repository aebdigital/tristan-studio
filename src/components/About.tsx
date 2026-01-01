import Image from "next/image";
import aboutImage from "../app/about.jpg";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-10 bg-[#f9f9f9] relative z-30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-12 uppercase tracking-wider">
          O nás
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="text-lg font-light leading-relaxed text-justify space-y-6">
            <p>
              Architektonická práca v ateliéri zahŕňa tvorbu a návrh budov a interiérov s využitím poznatkov v oblasti umenia, nových technológií a ekonomiky výstavby. Vo všetkých oblastiach sa orientujeme na vytvorenie architektúry pre klientov tak, aby nami navrhované diela, neboli akceptovateľné len odborníkmi a profesionálmi, ale boli prijateľné pre ľudí, ktorí chcú príjemne bývať, pracovať, oddychovať, športovať a tráviť voľný čas.
            </p>

            <p>
              Nesnažíme sa preto o riešenia pre odborné súťaže a ocenenia, ale v spolupráci s našimi klientmi sa usilujeme o vytvorenie príjemného komfortu pre tých, ktorí ich budú užívať. Pri koncepcii projektu spolupracujeme s odborníkmi v jednotlivých profesiách, ako si to vyžaduje navrhovaný objekt. Inšpiráciu čerpáme z odborných skúseností, prírody, ale predovšetkým vnímaním životného štýlu klienta a akceptáciou jeho požiadaviek na navrhovanú stavbu.
            </p>

            <p>
              Budovy sa snažíme navrhovať s minimálnym zaťažením životného prostredia a to nielen pri výstavbe, ale aj počas ich prevádzky. Návrhy a riešenia, ktoré produkujeme v našom ateliéri, sú výsledkom snahy po funkčnej, vkusnej, praktickej a príjemnej architektúre, tvoriacej symbiózu s prostredím, pre ktoré je určená.
            </p>

            <p>
              V ateliéri poskytujeme komplexnú predprojektovú a projektovú činnosť, vrátane poradenstva a inžinierskej činnosti pri výbere pozemku, zabezpečení dokumentácie pre stavebný zámer, projekt stavby a vykonávací projekt. Zabezpečujeme architektonické štúdie, urbanisticko-architektonické štúdie, projektové dokumentácie pre územné rozhodnutie, stavebné povolenie a realizáciu stavby, štúdie a projekty interiérov a územno-plánovacie dokumentácie obcí a miest. Návrhy vykonávame vo všetkých oblastiach výstavby od rodinných domov bytových domov, občianskych a priemyselných stavieb, ich novostavieb, ale aj rekonštrukcií a tiež s tým súvisiaci návrh interiérov pre jednotlivé objekty.
            </p>
          </div>

          <div className="relative h-full min-h-[400px] md:min-h-full w-full rounded-lg overflow-hidden">
            <Image
              src={aboutImage}
              alt="Interiér TRISTAN studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

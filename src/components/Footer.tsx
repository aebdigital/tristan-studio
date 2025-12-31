import Link from "next/link";
import { services } from "@/data/projects";

export default function Footer() {
  return (
    <footer id="footer" className="bg-black text-white py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase">Navigácia</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Domov
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Portfólio
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  O nás
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase">Služby</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase">Kontakt</h3>
            <address className="not-italic space-y-3 text-gray-400">
              <p>TRISTAN studio, s.r.o.</p>
              <p>Tkáčska 6</p>
              <p>080 01 Prešov</p>
              <p>Slovensko</p>
              <p className="mt-4">
                <a
                  href="tel:+421905537289"
                  className="hover:text-white transition-colors"
                >
                  +421 905 537 289
                </a>
              </p>
              <p>
                <a
                  href="mailto:marianferjo@tristanstudio.sk"
                  className="hover:text-white transition-colors"
                >
                  marianferjo@tristanstudio.sk
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TRISTAN studio, s.r.o. Všetky
            práva vyhradené.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/ochrana-osobnych-udajov"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Ochrana osobných údajov
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

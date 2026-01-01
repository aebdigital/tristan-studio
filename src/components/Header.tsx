"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSmoothScroll } from "@/components/SmoothScroll"; // Import the hook

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { scrollToSection } = useSmoothScroll(); // Use the hook

  const handleScrollToSection = (id: string) => {
    setIsMenuOpen(false); // Close mobile menu
    if (pathname !== "/") {
      router.push("/");
      // Delay scroll slightly to ensure page has rendered
      setTimeout(() => scrollToSection(id), 300);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header
      className="absolute top-0 left-0 right-0 z-50 px-6 py-4 md:px-10 md:py-6 transition-all duration-300"
    >
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="/logo-removebg-preview.png"
            alt="TRISTAN studio logo"
            width={212}
            height={76}
            className="w-[150px] md:w-[212px] h-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-white text-base uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Domov
          </Link>
          <button
            onClick={() => handleScrollToSection("#portfolio")}
            className="text-white text-base uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Portfólio
          </button>
          <button
            onClick={() => handleScrollToSection("#about")}
            className="text-white text-base uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            O nás
          </button>
          <button
            onClick={() => handleScrollToSection("#footer")}
            className="text-white text-base uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Kontakt
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <Link
            href="/"
            className="text-white text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            Domov
          </Link>
          <button
            onClick={() => handleScrollToSection("#portfolio")}
            className="text-white text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Portfólio
          </button>
          <button
            onClick={() => handleScrollToSection("#about")}
            className="text-white text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            O nás
          </button>
          <button
            onClick={() => handleScrollToSection("#footer")}
            className="text-white text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Kontakt
          </button>
        </div>
      </nav>
    </header>
  );
}

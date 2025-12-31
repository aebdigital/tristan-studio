"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-10 md:py-6 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : ""
      }`}
    >
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="https://www.tristanstudio.sk/wp-content/uploads/2025/06/output-onlinepngtools.png"
            alt="TRISTAN studio"
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
            onClick={scrollToFooter}
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
            onClick={scrollToFooter}
            className="text-white text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Kontakt
          </button>
        </div>
      </nav>
    </header>
  );
}

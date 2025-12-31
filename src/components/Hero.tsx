"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://www.tristanstudio.sk/wp-content/uploads/2025/05/vmo3746.jpg')",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-wider mb-4">
          TRISTAN
        </h1>
        <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-wider mb-8">
          studio
        </h2>
        <p className="text-white text-lg md:text-xl font-light mb-12 max-w-2xl">
          Architektúra, ktorá spája funkciu, estetiku a životný štýl
        </p>
        <Link
          href="#portfolio"
          className="border-2 border-white text-white px-8 py-3 uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Portfólio
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

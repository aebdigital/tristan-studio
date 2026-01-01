"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]); // 10% parallax, opposite direction
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.2, 0.8]);
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0.4]); // Text darkens/fades slightly

  return (
    <section className="sticky top-0 h-screen w-full overflow-hidden z-0">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/sidlo-firmy/vmo3746.jpg')",
          y,
        }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          opacity: overlayOpacity,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Content */}
      <motion.div className="relative z-10 h-full flex flex-col items-start justify-center text-left px-6 md:px-20 max-w-5xl"
        style={{ opacity: textOpacity }}
      >
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-wider mb-8 leading-tight">
          <span className="font-bold">MODERNÉ</span><br />
          <span className="font-bold">ARCHITEKTONICKÉ</span><br />
          ŠTÚDIO
        </h1>
        <p className="text-white text-lg md:text-2xl font-light mb-12 max-w-3xl">
          Tvoríme architektúru, ktorá spája funkciu, estetiku a životný štýl klienta.
        </p>
        <Link
          href="#portfolio"
          className="border-2 border-white text-white px-8 py-3 uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all duration-300 inline-block"
        >
          Portfólio
        </Link>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

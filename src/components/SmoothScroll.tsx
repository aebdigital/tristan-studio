"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation"; // Import usePathname

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  scrollToSection: (target: string | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(
  undefined
);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used within a SmoothScrollProvider");
  }
  return context;
};

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const updateRef = useRef<((time: number) => void) | null>(null);
  const pathname = usePathname(); // Get current pathname

  const scrollToSection = (target: string | HTMLElement, offset: number = 0) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    updateRef.current = update;

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  // New useEffect to scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]); // Depend on pathname changes

  return (
    <SmoothScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

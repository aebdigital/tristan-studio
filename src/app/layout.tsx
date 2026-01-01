import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { CookieConsentProvider } from "@/components/CookieConsent";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tristanstudio.sk"),
  title: {
    default: "TRISTAN studio | Architektonické štúdio",
    template: "%s | TRISTAN studio",
  },
  description: "TRISTAN studio, s.r.o. - Architektonické štúdio v Prešove. Funkcia, estetika a životný štýl. Projekty rodinných domov, bytových domov a interiérov.",
  keywords: ["architektúra", "projektovanie", "Prešov", "architekt Prešov", "rodinné domy", "bytové domy", "interiér", "urbanizmus", "TRISTAN studio", "projekty na mieru"],
  authors: [{ name: "TRISTAN studio" }],
  creator: "TRISTAN studio",
  publisher: "TRISTAN studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TRISTAN studio | Architektonické štúdio",
    description: "TRISTAN studio, s.r.o. - Architektonické štúdio v Prešove. Funkcia, estetika a životný štýl.",
    url: "https://www.tristanstudio.sk",
    siteName: "TRISTAN studio",
    locale: "sk_SK",
    type: "website",
    images: [
      {
        url: "/galeria.png", // Assuming this is a representative image
        width: 1200,
        height: 630,
        alt: "TRISTAN studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRISTAN studio | Architektonické štúdio",
    description: "TRISTAN studio, s.r.o. - Architektonické štúdio v Prešove. Funkcia, estetika a životný štýl.",
    images: ["/galeria.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png", // Ideally different sizes, but using what's available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitectureFirm",
    name: "TRISTAN studio",
    url: "https://www.tristanstudio.sk",
    logo: "https://www.tristanstudio.sk/favicon.png",
    image: "https://www.tristanstudio.sk/galeria.png",
    description: "TRISTAN studio, s.r.o. - Architektonické štúdio v Prešove. Funkcia, estetika a životný štýl.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Prešov",
      addressCountry: "SK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.9984, // Approximate Prešov coords, strictly optional if unknown
      longitude: 21.2407,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "SK",
      availableLanguage: "Slovak",
    },
    sameAs: [
      "https://www.facebook.com/tristanstudio", // Example, if known
      "https://www.instagram.com/tristanstudio", // Example, if known
    ],
  };

  return (
    <html lang="sk">
      <body className={`${montserrat.variable} antialiased font-sans flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CookieConsentProvider>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

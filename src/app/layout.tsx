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
  title: "TRISTAN studio | Architektonické štúdio",
  description: "TRISTAN studio, s.r.o. - Architektonické štúdio v Prešove. Funkcia, estetika a životný štýl.",
  openGraph: {
    locale: "sk_SK",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={`${montserrat.variable} antialiased font-sans flex flex-col min-h-screen`}>
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

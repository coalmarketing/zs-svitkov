import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";
import Footer from "@/components/layout/footer";

const siteUrl = "https://zssvitkov.cz";
const siteName = "ZŠ Svítkov | Základní škola Pardubice";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  alternates: { canonical: "/" },
  title: "ZŠ Svítkov | Základní škola Pardubice – kvalitní vzdělávání pro děti",
  description:
    "ZŠ Svítkov v Pardubicích poskytuje kvalitní základní vzdělávání, podporuje rozvoj dětí a nabízí pestré školní kroužky i volnočasové aktivity.",
  keywords: [
    "základní škola Pardubice",
    "ZŠ Svítkov Pardubice",
    "vzdělávání žáků Pardubice",
    "základní škola a aktivity",
    "školní kroužky a volnočasové aktivity",
    "rozvoj dětí Pardubice",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title:
      "ZŠ Svítkov | Základní škola Pardubice – kvalitní vzdělávání pro děti",
    description:
      "ZŠ Svítkov v Pardubicích poskytuje kvalitní základní vzdělávání, podporuje rozvoj dětí a nabízí pestré školní kroužky i volnočasové aktivity.",
    url: siteUrl,
    siteName: siteName,
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/img/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "ZŠ Svítkov – základní škola Pardubice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ZŠ Svítkov | Základní škola Pardubice – kvalitní vzdělávání pro děti",
    description:
      "ZŠ Svítkov v Pardubicích poskytuje kvalitní základní vzdělávání, podporuje rozvoj dětí a nabízí pestré školní kroužky i volnočasové aktivity.",
    images: ["/img/og-default.jpg"],
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${spaceGrotesk.variable} max-w-screen w-screen overflow-x-hidden scroll-smooth space-grotesk`}
      >
        {/* <DisplayGrid12 /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import LoadingOverlay from "@/components/LoadingOverlay";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "GODG1FT - Jewelry & Grillz",
  description:
    "Discover our curated collection of handcrafted luxury jewelry. Bracelets, necklaces, rings, and earrings crafted for the discerning few.",
  keywords: [
    "luxury jewelry",
    "fine jewelry",
    "bracelets",
    "necklaces",
    "rings",
    "earrings",
    "custom jewelry",
  ],
  openGraph: {
    title: "GODG1FT - Jewelry & Grillz",
    description: "Handcrafted luxury jewelry for the discerning few.",
    type: "website",
    url: "https://godg1ftjewels.com",
    images: [
      {
        url: "https://godg1ftjewels.com/hero.png",
        width: 1200,
        height: 630,
        alt: "GODG1FT - Jewelry & Grillz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GODG1FT - Jewelry & Grillz",
    description: "Handcrafted luxury jewelry for the discerning few.",
    images: ["https://godg1ftjewels.com/hero.png"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <LoadingOverlay />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}

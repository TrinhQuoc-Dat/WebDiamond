import type { Metadata } from "next";
import "./globals.css";
import LoadingOverlay from "@/components/LoadingOverlay";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "GODG1FT — Luxury Jewelry",
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
    title: "GODG1FT — Luxury Jewelry",
    description: "Handcrafted luxury jewelry for the discerning few.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
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

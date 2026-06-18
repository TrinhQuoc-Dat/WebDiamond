import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebDiamond — Luxury Jewelry",
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
    title: "WebDiamond — Luxury Jewelry",
    description: "Handcrafted luxury jewelry for the discerning few.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black py-16 px-6 md:px-12 lg:px-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* ── Left Column: Logo & Socials ── */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            {/* Text logo */}
            <div className="flex flex-col leading-none gap-[4px]">
              <span
                className="text-black font-black uppercase leading-none block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "32px",
                  letterSpacing: "0.2em",
                }}
              >
                GODG1FT
              </span>
              <span
                className="text-black uppercase opacity-90"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.45em",
                  alignSelf: "flex-end",
                }}
              >
                JEWELRY
              </span>
            </div>

            {/* Black Spider/Octopus Emblem (SVG) */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black fill-current"
            >
              {/* Central body */}
              <circle cx="50" cy="40" r="12" />
              <circle cx="50" cy="58" r="8" />
              {/* Legs left */}
              <path d="M40 35 C30 30, 20 40, 22 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M38 42 C24 40, 16 55, 18 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M39 50 C26 53, 20 70, 24 82" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M42 58 C32 66, 28 82, 34 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Legs right */}
              <path d="M60 35 C70 30, 80 40, 78 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M62 42 C76 40, 84 55, 82 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M61 50 C74 53, 80 70, 76 82" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M58 58 C68 66, 72 82, 66 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              aria-label="YouTube"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Middle Column: QR Code ── */}
        <div className="md:col-span-4 flex justify-center md:justify-start">
          <div className="flex flex-col items-center p-4 border border-black/10 rounded-xl bg-white shadow-sm max-w-[200px]">
            {/* Elegant Vector QR code */}
            <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer border & corners */}
              <rect x="2" y="2" width="96" height="96" rx="8" stroke="black" strokeWidth="2" />
              
              {/* Positioning Anchor Top-Left */}
              <rect x="10" y="10" width="22" height="22" stroke="black" strokeWidth="4" rx="2" />
              <rect x="16" y="16" width="10" height="10" fill="black" />
              
              {/* Positioning Anchor Top-Right */}
              <rect x="68" y="10" width="22" height="22" stroke="black" strokeWidth="4" rx="2" />
              <rect x="74" y="16" width="10" height="10" fill="black" />
              
              {/* Positioning Anchor Bottom-Left */}
              <rect x="10" y="68" width="22" height="22" stroke="black" strokeWidth="4" rx="2" />
              <rect x="16" y="74" width="10" height="10" fill="black" />

              {/* QR Dots / Grid (Stylized matrix patterns) */}
              <rect x="38" y="10" width="6" height="6" fill="black" />
              <rect x="50" y="14" width="6" height="6" fill="black" />
              <rect x="58" y="10" width="6" height="6" fill="black" />
              
              <rect x="38" y="22" width="12" height="6" fill="black" />
              <rect x="56" y="26" width="6" height="6" fill="black" />
              
              <rect x="10" y="38" width="6" height="12" fill="black" />
              <rect x="22" y="44" width="12" height="6" fill="black" />
              <rect x="38" y="38" width="6" height="6" fill="black" />
              <rect x="50" y="44" width="12" height="6" fill="black" />
              
              <rect x="68" y="38" width="12" height="6" fill="black" />
              <rect x="86" y="44" width="6" height="12" fill="black" />
              
              <rect x="38" y="52" width="6" height="12" fill="black" />
              <rect x="50" y="56" width="12" height="6" fill="black" />
              <rect x="68" y="52" width="6" height="6" fill="black" />
              <rect x="80" y="58" width="6" height="6" fill="black" />

              <rect x="38" y="68" width="12" height="6" fill="black" />
              <rect x="56" y="74" width="6" height="12" fill="black" />
              <rect x="68" y="68" width="6" height="6" fill="black" />
              <rect x="80" y="74" width="12" height="6" fill="black" />

              <rect x="38" y="84" width="6" height="6" fill="black" />
              <rect x="50" y="80" width="6" height="10" fill="black" />
              <rect x="68" y="84" width="12" height="6" fill="black" />
              <rect x="86" y="84" width="6" height="6" fill="black" />

              {/* Center Instagram Icon Mask */}
              <circle cx="50" cy="50" r="11" fill="white" />
              <circle cx="50" cy="50" r="8" fill="black" />
              <circle cx="50" cy="50" r="5" fill="white" />
              <circle cx="50" cy="50" r="3" fill="black" />
              <circle cx="54.5" cy="45.5" r="1" fill="white" />
            </svg>
            <span className="text-[9px] tracking-[0.25em] uppercase text-black/50 font-bold mt-2 text-center leading-none">
              INSTAGRAM
            </span>
          </div>
        </div>

        {/* ── Right Column: Links ── */}
        <div className="md:col-span-4 grid grid-cols-3 gap-6 w-full">
          {/* Topic 1 */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] tracking-[0.25em] font-black uppercase text-black" style={{ fontFamily: "var(--font-sans)" }}>
              Topic
            </span>
            <ul className="flex flex-col gap-2">
              {["Page", "Page", "Page"].map((page, idx) => (
                <li key={idx}>
                  <Link href="#" className="text-xs text-black/60 hover:text-black transition-colors duration-200 uppercase font-semibold tracking-wider">
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topic 2 */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] tracking-[0.25em] font-black uppercase text-black" style={{ fontFamily: "var(--font-sans)" }}>
              Topic
            </span>
            <ul className="flex flex-col gap-2">
              {["Page", "Page", "Page"].map((page, idx) => (
                <li key={idx}>
                  <Link href="#" className="text-xs text-black/60 hover:text-black transition-colors duration-200 uppercase font-semibold tracking-wider">
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topic 3 */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] tracking-[0.25em] font-black uppercase text-black" style={{ fontFamily: "var(--font-sans)" }}>
              Topic
            </span>
            <ul className="flex flex-col gap-2">
              {["Page", "Page", "Page"].map((page, idx) => (
                <li key={idx}>
                  <Link href="#" className="text-xs text-black/60 hover:text-black transition-colors duration-200 uppercase font-semibold tracking-wider">
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}

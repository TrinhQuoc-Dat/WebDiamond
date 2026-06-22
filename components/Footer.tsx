"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200">
      <div className="w-full flex flex-col items-center" style={{ paddingLeft: "5%", paddingRight: "5%", marginTop: "20px", paddingBottom: "20px" }}>
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 flex flex-col md:flex-row lg:flex-row items-center lg:items-start justify-between py-12 gap-12">

          {/* ── Left Group: Logo/Socials + QR Code ── */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 lg:gap-12">

            {/* ── Logo & Socials ── */}
            <div className="flex flex-col items-center sm:items-start justify-between gap-6 sm:h-[180px]">

              <div className="flex items-center gap-4 justify-center md:justify-start">
                <Link
                  href="/"
                  className="flex flex-col items-end leading-none gap-[6px] hover:opacity-80 transition-opacity"
                >
                  <span
                    className="text-black font-normal uppercase leading-none block"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "28px",
                      letterSpacing: "0.5em",
                      marginRight: "-0.3em",
                    }}
                  >
                    GODG1FT
                  </span>

                  <span
                    className="text-black/60 uppercase font-normal"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "10px",
                      letterSpacing: "0.7em",
                      marginRight: "-0.4em",
                      transform: "translateX(-4px)",
                    }}
                  >
                    JEWELRY
                  </span>
                </Link>

                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <img
                    src="/logo.svg"
                    alt="GodGift Logo"
                    style={{
                      height: "45px",
                      width: "auto",
                      display: "block",
                      filter: "invert(1)",
                    }}
                  />
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-5 justify-center sm:justify-start">

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/40 hover:text-black transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/40 hover:text-black transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/40 hover:text-black transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ── QR Code ── */}
            <div className="flex items-center justify-center" style={{ alignItems: "center", justifyContent: "center" }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src="/instagram.svg"
                  alt="Instagram QR"
                  className="
                    w-[130px]
                    h-[130px]
                    sm:w-[160px]
                    sm:h-[160px]
                    lg:w-[180px]
                    lg:h-[180px]
                    object-contain
                  "
                />
              </a>
            </div>

          </div>

          {/* ── Right Menu ── */}
          <div
              className="w-full  lg:w-auto
                grid
                grid-cols-3
                gap-6
                lg:flex
                lg:gap-16
                text-center
                lg:text-left
              "
            >
            <div className="flex flex-col gap-4">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.2em]">
                Topic
              </h4>

              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.2em]">
                Topic
              </h4>

              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.2em]">
                Topic
              </h4>

              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
                <li><Link href="#" className="text-sm text-black/60 hover:text-black">Page</Link></li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
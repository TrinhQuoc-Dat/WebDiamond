"use client";

import "primeicons/primeicons.css";
import TransitionLink from "./TransitionLink";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200">
      <div
        className="w-full flex flex-col items-center"
        style={{ paddingLeft: "5%", paddingRight: "5%", marginTop: "20px", paddingBottom: "20px" }}
      >
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center md:items-stretch justify-between py-12 gap-12">

          {/* ── LEFT: Logo & Socials ── */}
          <div className="flex flex-col items-center md:items-start justify-between gap-6 self-stretch">

            {/* Logo */}
            <div className="flex items-center gap-4">
              <TransitionLink
                href="/"
                className="flex flex-col items-end leading-none gap-[2px] hover:opacity-80 transition-opacity"
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
                  }}
                >
                  JEWELRY
                </span>
              </TransitionLink>

              <TransitionLink href="/" className="hover:opacity-80 transition-opacity">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
              </TransitionLink>
            </div>

            {/* Social Icons — PrimeIcons */}
            <div className="flex items-center gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-black/40 hover:text-black transition-colors duration-300"
                aria-label="Facebook"
              >
                <i className="pi pi-facebook" style={{ fontSize: "28px" }} />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-black/40 hover:text-black transition-colors duration-300"
                aria-label="YouTube"
              >
                <i className="pi pi-youtube" style={{ fontSize: "28px" }} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-black/40 hover:text-black transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="pi pi-instagram" style={{ fontSize: "28px" }} />
              </a>
            </div>
          </div>

          {/* ── RIGHT: QR Code Instagram ── */}
          <div className="flex flex-col items-center gap-3">
            <p
              className="text-[10px] uppercase tracking-[0.25em] text-black/40 font-normal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Follow us
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-[1.03] transition-transform duration-300 block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/instagram.svg"
                alt="Instagram QR Code — GODG1FT"
                className="w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] lg:w-[180px] lg:h-[180px] object-contain"
              />
            </a>
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-black/40"
              style={{ fontFamily: "var(--font-display)" }}
            >
              @godg1ft
            </p>
          </div>

        </div>

        {/* Bottom bar — Warranty link */}
        <div className="w-full border-t border-gray-200 py-6 flex justify-center">
          <TransitionLink
            href="/warrenty"
            className="text-black/30 hover:text-black transition-colors duration-300 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="GodGift" style={{ height: "16px", width: "auto", filter: "invert(1)", opacity: 0.4 }} />
            WARRANTY & CARE
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
}
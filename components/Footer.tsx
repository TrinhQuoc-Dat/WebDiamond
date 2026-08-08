"use client";

import "primeicons/primeicons.css";
import TransitionLink from "./TransitionLink";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200">
      <div
        className="w-full flex flex-col items-center"
        style={{ paddingLeft: "5%", paddingRight: "5%", marginTop: "8px", paddingBottom: "20px" }}
      >
        {/* ═══════════ MOBILE FOOTER ═══════════ */}
        <div className="w-full md:hidden" style={{ maxWidth: "600px" }}>
          <div className="flex items-stretch justify-between">
            {/* ── LEFT: Logo + address + payment ── */}
            <div className="flex flex-col" style={{ paddingRight: "16px", gap: "75px" }}>
              {/* Text Logo */}
              <TransitionLink href="/" className="hover:opacity-80 transition-opacity">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo_footer.png"
                  alt="GODG1FT Jewelry"
                  style={{ height: "35px", width: "auto" }}
                />
              </TransitionLink>

              {/* Address + payment icons */}
              <div>
                <a
                  href="https://maps.app.goo.gl/jNgH7UVCnZKR32UT8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/80 hover:text-black transition-colors duration-300 block"
                  style={{ fontSize: "9px", lineHeight: 1.4, paddingBottom: "8px" }}
                >
                  192, Tran Quang Khai, Tan Dinh, D1, HCM
                </a>
                <div className="flex items-center" style={{ gap: "10px" }}>
                  <a href="https://www.paypal.com/vn/home" target="_blank" rel="noreferrer" aria-label="PayPal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/2-2-paypal-logo-transparent-png 1.svg" alt="PayPal" style={{ height: "16px", width: "auto" }} />
                  </a>
                  <a href="https://www.visa.com.vn/" target="_blank" rel="noreferrer" aria-label="Visa">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images (5) 1.svg" alt="Visa" style={{ height: "16px", width: "auto" }} />
                  </a>
                  <a href="https://www.apple.com/apple-pay/" target="_blank" rel="noreferrer" aria-label="Apple Pay">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/Apple_Pay_Acceptance_Mark.svg 1.svg" alt="Apple Pay" style={{ height: "16px", width: "auto" }} />
                  </a>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Round logo + Instagram QR (to bằng nhau) ── */}
            <div className="flex flex-col items-end" style={{ flexShrink: 0, gap: "0px", marginTop: "-8px" }}>
              <a
                href="/warrenty"
                rel="noreferrer"
                className="hover:scale-[1.03] transition-transform duration-300 block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/warranty-footer.png"
                  alt="Logo — GODG1FT"
                  style={{ width: "90px", height: "90px", objectFit: "contain" }}
                />
              </a>
              <a
                href="https://www.instagram.com/godg1ft.jrl/"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-[1.03] transition-transform duration-300 block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/instagram.svg"
                  alt="Instagram QR Code"
                  style={{ width: "70px", height: "70px", objectFit: "contain" }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════ DESKTOP FOOTER ═══════════ */}
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 hidden md:flex flex-row items-stretch justify-between py-12 gap-12">

          {/* ── LEFT: Logo & Socials ── */}
          <div className="flex flex-col items-start justify-between gap-6 self-stretch">

            {/* Logo */}
            <TransitionLink href="/" className="hover:opacity-80 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_footer.png"
                alt="GODG1FT Jewelry"
                className="h-[50px] lg:h-[55px] w-auto block"
              />
            </TransitionLink>

            {/* Address & payment */}
            <div>
              <div>
                <a href="https://maps.app.goo.gl/jNgH7UVCnZKR32UT8" target="_blank" rel="noreferrer" className="text-black/80 hover:text-black transition-colors duration-300">
                  <p>192, Tran quang khai, tan dinh, D1, hcm</p>
                </a>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.paypal.com/vn/home"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/40 hover:text-black transition-colors duration-300"
                  aria-label="PayPal"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/2-2-paypal-logo-transparent-png 1.svg" alt="PayPal" />
                </a>

                <a
                  href="https://www.visa.com.vn/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/40 hover:text-black transition-colors duration-300"
                  aria-label="Visa"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images (5) 1.svg" alt="Visa" />
                </a>

                <a
                  href="https://www.apple.com/apple-pay/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/40 hover:text-black transition-colors duration-300"
                  aria-label="Apple Pay"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Apple_Pay_Acceptance_Mark.svg 1.svg" alt="Apple Pay" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-12 self-stretch">
            <div className="flex flex-col items-center gap-3">

              <a
                href="/warrenty"
                rel="noreferrer"
                className="hover:scale-[1.03] transition-transform duration-300 block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/warranty-footer.png"
                  alt="Logo — GODG1FT"
                  className="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] object-contain"
                />
              </a>
            </div>

            {/* ── RIGHT: QR Code Instagram ── */}
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://www.instagram.com/godg1ft.jrl/"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-[1.03] transition-transform duration-300 block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/instagram.svg"
                  alt="Instagram QR Code — GODG1FT"
                  className="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] object-contain"
                />
              </a>

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

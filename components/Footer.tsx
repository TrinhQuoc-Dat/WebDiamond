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
            <TransitionLink href="/" className="hover:opacity-80 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_footer.png"
                alt="GODG1FT Jewelry"
                className="h-[45px] sm:h-[50px] lg:h-[55px] w-auto block"
              />
            </TransitionLink>

            {/* Social Icons — PrimeIcons */}
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
                  aria-label="Facebook"
                >
                  <img src="/2-2-paypal-logo-transparent-png 1.svg" />
                </a>

                <a
                  href="https://www.visa.com.vn/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/40 hover:text-black transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <img src="/images (5) 1.svg" />
                </a>

                <a
                  href="https://www.apple.com/apple-pay/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/40 hover:text-black transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <img src="/Apple_Pay_Acceptance_Mark.svg 1.svg" />
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
                <img
                  src="/warranty-footer.png"
                  alt="Logo — GODG1FT"
                  className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px] object-contain"
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
                  className="w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] lg:w-[180px] lg:h-[180px] object-contain"
                />
              </a>

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
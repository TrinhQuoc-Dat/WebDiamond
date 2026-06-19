"use client";

export default function ProductBenefits() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-white/10 pt-16 mb-16">
      {/* Item 1: Global Shipping */}
      <div className="flex flex-col gap-4">
        <div className="text-white/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </div>
        <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-md">
          We ship our jewelry globally. Your order will be processed within 2–3 business days. Delivery typically takes 7–15 business days.
        </p>
      </div>

      {/* Item 2: Reflection & Bespoke */}
      <div className="flex flex-col gap-4">
        <div className="text-white/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-md">
          GODGIFT turn jewelry into a reflection of you. Whether it’s an engraved date, a custom initial, or a bespoke design, we specialize in bringing your vision to life.
        </p>
      </div>

      {/* Item 3: Secure Checkout */}
      <div className="flex flex-col gap-4">
        <div className="text-white/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-md">
          All online payments are processed through secure, encrypted gateways. We do not store your credit card information on our servers.
        </p>
      </div>

      {/* Item 4: Dispatch Commitment */}
      <div className="flex flex-col gap-4">
        <div className="text-white/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-md">
          GODGIFT respect your time as much as we value our craft. We are committed to ensuring your order is meticulously prepared and dispatched according to our promised schedule.
        </p>
      </div>
    </div>
  );
}

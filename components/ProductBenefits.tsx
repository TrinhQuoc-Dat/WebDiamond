"use client";

export default function ProductBenefits() {
  return (
    <div className="w-full flex flex-col items-center pt-8 md:pt-16 mb-32 md:mb-48" style={{ marginTop: "50px" }}>
      {/* Title Section */}
      <div className="flex flex-col items-center text-center mb-16 gap-2">
        <h2 className="text-[28px] md:text-[36px] font-black tracking-[0.15em] uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
          HOW IT WORKS
        </h2>
        <p className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-display)", paddingBottom: "15px", margin: "10px 0px" }}>
          THE PROCESS IN CREATING YOUR CUSTOM JEWELERY PIECE
        </p>
      </div>

      {/* 2x2 Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 w-full">
        {/* Step 1 */}
        <div className="flex flex-row gap-6 items-start">
          <div className="text-white/60 shrink-0">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
              <line x1="8" y1="9" x2="10" y2="9" />
            </svg>
          </div>
          <p className="text-[12px] md:text-[14px] text-white/40 leading-relaxed font-light tracking-wide">
            Fill out the form below to share your ideas and requirements for your custom jewelry piece. We will then look into determining the best solution and providing a quote.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-row gap-6 items-start">
          <div className="text-white/60 shrink-0">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <p className="text-[12px] md:text-[14px] text-white/40 leading-relaxed font-light tracking-wide">
            We will provide you with a personalized quote for your custom piece. If you are ready to proceed, we require a 50% deposit to begin work on your custom jewelry.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-row gap-6 items-start">
          <div className="text-white/60 shrink-0">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <path d="M11 8v4" />
              <path d="M9 10h4" />
            </svg>
          </div>
          <p className="text-[12px] md:text-[14px] text-white/40 leading-relaxed font-light tracking-wide">
            We will create design concepts for your custom piece, and once you are satisfied, we will begin craftsmanship on your custom jewelry piece.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-row gap-6 items-start">
          <div className="text-white/60 shrink-0">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M9 15l2 2 4-4" />
            </svg>
          </div>
          <p className="text-[12px] md:text-[14px] text-white/40 leading-relaxed font-light tracking-wide">
            Once final payment is received, your completed final piece will be ready for collection or delivery.
          </p>
        </div>
      </div>
    </div>
  );
}

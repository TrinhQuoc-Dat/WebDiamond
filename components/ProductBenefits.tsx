"use client";

export default function ProductBenefits() {
  return (
    <div className="w-full flex flex-col items-center pt-8 md:pt-16 mb-10 md:mb-48" style={{ marginTop: "50px" }}>
      {/* Title Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-[28px] md:text-[36px] font-bold tracking-[0.15em] uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
          HOW IT WORKS
        </h2>
        <p className="text-[10px] md:text-[16px] text-white uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-display)", marginBottom: "10%" }}>
          THE PROCESS IN CREATING YOUR CUSTOM JEWELERY PIECE
        </p>
      </div>

      {/* ═══ MOBILE: Zigzag layout ═══ */}
      <div className="flex flex-col gap-10 w-full md:hidden">
        {/* Step 1: Icon LEFT, Text RIGHT */}
        <div className="flex flex-row gap-4 items-start">
          <div className="shrink-0">
            <img src="/image_benefit/image 3.svg" alt="Step 1" style={{ width: "60px", height: "60px" }} />
          </div>
          <p className="text-[12px] text-white/50 leading-relaxed font-light tracking-wide" style={{ fontFamily: "var(--font-montserrat)" }}>
            Fill out the form below to share your ideas and requirements for your custom jewelry piece. We will then look into determining the best solution and providing a quote.
          </p>
        </div>

        {/* Step 2: Text LEFT, Icon RIGHT */}
        <div className="flex flex-row gap-4 items-start justify-end">
          <p className="text-[12px] text-white/50 leading-relaxed font-light tracking-wide text-right" style={{ fontFamily: "var(--font-montserrat)" }}>
            We will create design concepts for your custom piece, and once you are satisfied, we will begin craftsmanship on your custom jewelry piece.
          </p>
          <div className="shrink-0">
            <img src="/image_benefit/image 4.svg" alt="Step 2" style={{ width: "60px", height: "60px" }} />
          </div>
        </div>

        {/* Step 3: Icon LEFT, Text RIGHT */}
        <div className="flex flex-row gap-4 items-start">
          <div className="shrink-0">
            <img src="/image_benefit/image 5.svg" alt="Step 3" style={{ width: "60px", height: "60px" }} />
          </div>
          <p className="text-[12px] text-white/50 leading-relaxed font-light tracking-wide" style={{ fontFamily: "var(--font-montserrat)" }}>
            We will provide you with a personalized quote for your custom piece. If you are ready to proceed, we require a 50% deposit to begin work on your custom jewelry.
          </p>
        </div>

        {/* Step 4: Text LEFT, Icon RIGHT */}
        <div className="flex flex-row gap-4 items-start justify-end">
          <p className="text-[12px] text-white/50 leading-relaxed font-light tracking-wide text-right" style={{ fontFamily: "var(--font-montserrat)" }}>
            Once final payment is received, your completed final piece will be ready for collection or delivery.
          </p>
          <div className="shrink-0">
            <img src="/image_benefit/image 6.svg" alt="Step 4" style={{ width: "60px", height: "60px" }} />
          </div>
        </div>
      </div>

      {/* ═══ DESKTOP: 2x2 Grid ═══ */}
      <div className="hidden md:grid grid-cols-2 gap-x-16 gap-y-12 w-full">
        {/* Step 1 */}
        <div className="flex flex-row gap-6 items-start">
          <div className="text-white/60 shrink-0">
            <img src="/image_benefit/image 3.svg" alt="Fill out the form below to share your ideas and requirements for your custom jewelry piece. We will then look into determining the best solution and providing a quote." />
          </div>
          <p className="text-[18px] text-white/80 leading-relaxed font-light tracking-wide" style={{ fontFamily: "var(--font-montserrat)" }}>
            Fill out the form below to share your ideas and requirements for your custom jewelry piece. We will then look into determining the best solution and providing a quote.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-row gap-6 items-start">
          <div className="text-white/60 shrink-0">
            <img src="/image_benefit/image 5.svg" alt="We will provide you with a personalized quote for your custom piece. If you are ready to proceed, we require a 50% deposit to begin work on your custom jewelry." />
          </div>
          <p className="text-[18px] text-white/80 leading-relaxed font-light tracking-wide" style={{ fontFamily: "var(--font-montserrat)" }}>
            We will provide you with a personalized quote for your custom piece. If you are ready to proceed, we require a 50% deposit to begin work on your custom jewelry.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-row gap-6 items-start">
          <div className="text-white/60 shrink-0">
            <img src="/image_benefit/image 4.svg" alt="We will create design concepts for your custom piece, and once you are satisfied, we will begin craftsmanship on your custom jewelry piece." />
          </div>
          <p className="text-[18px] text-white/80 leading-relaxed font-light tracking-wide" style={{ fontFamily: "var(--font-montserrat)" }}>
            We will create design concepts for your custom piece, and once you are satisfied, we will begin craftsmanship on your custom jewelry piece.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-row gap-6 items-start">
          <div className="text-white/60 shrink-0">
            <img src="/image_benefit/image 6.svg" alt="Once final payment is received, your completed final piece will be ready for collection or delivery." />
          </div>
          <p className="text-[18px] text-white/80 leading-relaxed font-light tracking-wide" style={{ fontFamily: "var(--font-montserrat)" }}>
            Once final payment is received, your completed final piece will be ready for collection or delivery.
          </p>
        </div>
      </div>
    </div>
  );
}

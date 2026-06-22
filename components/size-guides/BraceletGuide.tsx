"use client";

import Image from "next/image";

export default function BraceletGuide() {
  return (
    
    <section className="bg-black text-white">
      <div className="max-w-[1440px] px-6 lg:px-10"
        style={{ margin: "0 auto", paddingTop: "20px", paddingBottom: "50px" }}>

        {/* TITLE */}
        <h2 className="text-center text-4xl md:text-6xl font-bold tracking-[0.15em] uppercase mb-20" 
          style={{ fontFamily: "var(--font-sans)", marginTop: "50px", textAlign: "center" }}>
           How To Find Your Bracelet Size
        </h2>

        {/* METHOD 1 */}
        <div className="mb-24">
          <div className="flex justify-center mb-10">
            <Image
                src="/image_guide/bracelet-method-01.png"
                alt="Bracelet Method 1"
                width={1000}
                height={700}
                style={{
                    width: "70%",
                    height: "auto",
                }}
            />
          </div>

          <div className="text-center">
            <h3 className="font-bold uppercase tracking-wider text-2xl mb-3">
              Method 1
            </h3>

            <p className="uppercase text-lg md:text-2xl tracking-wide text-white/90">
              Wrap A Measuring Tape Around Your Wrist
            </p>
          </div>
        </div>

        {/* METHOD 2 */}
        <div>
          <div className="grid md:grid-cols-2 gap-12 items-start mb-10">
            <Image
              src="/image_guide/bracelet-method-02-left.png"
              alt="Method 2 Step 1"
              width={500}
              height={500}
              className="w-full h-auto"
            />

            <Image
              src="/image_guide/bracelet-method-02-right.png"
              alt="Method 2 Step 2"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>

          <div style={{ padding: "0 20px" }}>
            <h3 className="font-bold uppercase tracking-wider text-2xl mb-3">
              Method 2
            </h3>

            <p className="uppercase text-lg md:text-2xl tracking-wide text-white/90 leading-relaxed">
              Use A String Or A Strip Of Paper To Wrap
              <br />
              Around Your Wrist, Then Measure It With A Ruler
            </p>
          </div>
        </div>

        {/* TIPS */}
        {/* <div className="mt-20 border-t border-white/15 pt-10">
          <h4 className="text-xl uppercase tracking-[0.15em] mb-6 font-bold">
            Bracelet Fit Guide
          </h4>

          <div className="space-y-4 text-white/80 text-sm md:text-base uppercase tracking-[0.08em]">
            <p>
              • Add 0.5cm For A Snug Fit
            </p>

            <p>
              • Add 1cm For A Comfortable Fit
            </p>

            <p>
              • Add 1.5cm - 2cm For A Loose Fit
            </p>
          </div>
        </div> */}

        {/* FOOTER */}
        <div className="text-center mt-20 pb-10 text-white/50 text-sm uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-sans)" , marginTop: "30px", textAlign: "center" }}>
          Bracelet Size Measurement Guide
        </div>
      </div>
    </section>
  );
}
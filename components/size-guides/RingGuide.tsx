"use client";

import Image from "next/image";

export default function RingGuide() {
  return (
    <section className="bg-black text-white ">
      <div className="max-w-[1440px] px-6 lg:px-10"
        style={{ margin: "0 auto", paddingTop: "60px", paddingBottom: "50px" }}>
        {/* TITLE */}
        <h2 className="text-center text-4xl md:text-6xl font-bold tracking-[0.15em] uppercase mb-20" 
          style={{ fontFamily: "var(--font-sans)", marginTop: "50px", textAlign: "center" }}>
          How To Find Your Ring Size
        </h2>

        {/* METHOD 1 */}
        <div className="grid lg:grid-cols-2 items-center mb-24" style={{ margin: "5% 5% 0 5%"}}>
          <div>
            <h3 className="font-bold uppercase tracking-wider text-2xl mb-2">
              Method 1
            </h3>

            <p className="uppercase text-lg md:text-2xl leading-relaxed tracking-wide text-white/90">
              Measure The Inside Diameter Of The Ring
              <br />
              (Do Not Include The Ring Band)
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/image_guide/ring-size-method.png"
              alt="Ring Diameter"
              width={500}
              height={260}
              className="w-full max-w-[500px]"
            />
          </div>
        </div>

        {/* METHOD 2 */}
        <div className="mb-16" style={{ margin: "0 5%"}}>
          <h3 className="font-bold uppercase tracking-wider text-2xl mb-2">
            Method 2
          </h3>

          <p className="uppercase text-lg md:text-2xl tracking-wide">
            Measure With A Strip Of Paper
          </p>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-2 gap-x-24 gap-y-20">
          {/* STEP 1 */}
          <div>
            <div style={{ margin: "5%"}}>
              <h4 className="font-bold uppercase text-2xl tracking-wider">
                Step 1
              </h4>

              <p className="uppercase text-xl tracking-wide text-white/90">
                Take A Long, Thin Strip Of Paper.
              </p>
            </div>

            <Image
              src="/image_guide/ring-step-01.png"
              alt="Step 1"
              width={500}
              height={400}
              className="w-full"
            />
          </div>

          {/* STEP 2 */}
          <div>
            <div style={{ margin: "5%"}}>
              <h4 className="font-bold uppercase text-2xl tracking-wider">
                Step 2
              </h4>

              <p className="uppercase text-xl tracking-wide text-white/90">
                Wrap It Snugly Around Your Finger.
              </p>
            </div>

            <Image
              src="/image_guide/ring-step-02.png"
              alt="Step 2"
              width={500}
              height={400}
              className="w-full"
            />
          </div>

          {/* STEP 3 */}
          <div>
            <div style={{ margin: "5%"}}>
              <h4 className="font-bold uppercase text-2xl tracking-wider">
                Step 3
              </h4>

              <p className="uppercase text-xl tracking-wide text-white/90">
                Mark The Point Where
                <br />
                The Ends Overlap.
              </p>
            </div>

            <Image
              src="/image_guide/ring-step-03.png"
              alt="Step 3"
              width={500}
              height={400}
              className="w-full"
            />
          </div>

          {/* STEP 4 */}
          <div>
            <div style={{ margin: "5%"}}>
              <h4 className="font-bold uppercase text-2xl tracking-wider">
                Step 4
              </h4>

              <p className="uppercase text-xl tracking-wide text-white/90">
                Measure The Length Of The Paper Strip.
                <br />
                Divide The Measurement By 3.14.
              </p>
            </div>

            <Image
              src="/image_guide/ring-step-04.png"
              alt="Step 4"
              width={500}
              height={400}
              className="w-full"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-16 text-white/60 text-sm tracking-[0.3em] uppercase">
          Ring Size Measurement Guide
        </div>
      </div>
    </section>
  );
}
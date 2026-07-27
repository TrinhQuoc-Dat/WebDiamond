"use client";

import Image from "next/image";

export default function RingGuide() {
  return (
    <section className="bg-black text-white ">
      <div className="max-w-[1440px] px-6 lg:px-10"
        style={{ margin: "0 auto", paddingTop: "60px", paddingBottom: "50px" }}>
        {/* TITLE */}
        <h2 className="text-center text-2xl md:text-2xl  font-bold uppercase mb-20"
          style={{ fontFamily: "var(--font-display)", marginTop: "20px", textAlign: "center" }}>
          How To Find Your Ring Size
        </h2>

        {/* METHOD 1 */}
        <div
          className="grid lg:grid-cols-3 items-center mb-24"
          style={{ margin: "5% 5% 0 5%" }}
        >
          {/* Text */}
          <div className="lg:col-span-2">
            <h3 className="font-bold uppercase tracking-wider text-xl mb-2">
              Method 1
            </h3>

            <p className="uppercase text-lg leading-relaxed tracking-wide text-white/90">
              Measure The Inside Diameter Of The Ring
              <br />
              (Do Not Include The Ring Band)
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/image_guide/ring-size-method.png"
              alt="Ring Diameter"
              width={500}
              height={260}
              className="w-full max-w-[220px] h-auto"
            />
          </div>
        </div>

        {/* METHOD 2 */}
        <div className="mb-26" style={{ margin: "5% 5%" }}>
          <h3 className="font-bold uppercase tracking-wider text-xl mb-2 text-center">
            Method 2
          </h3>

          <p className="uppercase text-lg md:text-xl tracking-wide text-center">
            Measure With A Strip Of Paper
          </p>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-2 gap-x-1" style={{ margin: "5% 1% 5% 5%" }}>
          {/* STEP 1 */}
          <div>
            <div style={{ margin: "5%" }}>
              <h4 className="font-bold uppercase text-1xl tracking-wider">
                Step 1
              </h4>

              <p className="uppercase text-1xl tracking-wide text-white/90">
                Take A Long, Thin Strip Of Paper.
              </p>
            </div>

            <Image
              src="/image_guide/ring-step-01.png"
              alt="Step 1"
              width={500}
              height={400}
              className="w-90"
            />
          </div>

          {/* STEP 2 */}
          <div>
            <div style={{ margin: "5%" }}>
              <h4 className="font-bold uppercase text-1xl tracking-wider">
                Step 2
              </h4>

              <p className="uppercase text-1xl tracking-wide text-white/90">
                Wrap It Snugly Around Your Finger.
              </p>
            </div>

            <Image
              src="/image_guide/ring-step-02.png"
              alt="Step 2"
              width={500}
              height={400}
              className="w-90"
            />
          </div>
        </div>
        <div
          className="grid md:grid-cols-5 gap-x-10"
          style={{ margin: "5% 1% 5% 5%" }}
        >
          {/* STEP 3 */}
          <div className="md:col-span-2">
            <div className="m-[5%]">
              <h4 className="font-bold uppercase text-1xl tracking-wider">
                Step 3
              </h4>

              <p className="uppercase text-1xl tracking-wide text-white/90">
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
              className="w-full max-w-[500px] h-auto"
            />
          </div>

          {/* STEP 4 */}
          <div className="md:col-span-3">
            <div className="m-[5%]">
              <h4 className="font-bold uppercase text-1xl tracking-wider">
                Step 4
              </h4>

              <p className="uppercase text-1xl tracking-wide text-white/90">
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
              className="w-full max-w-[400px] h-auto"
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
export default function EarringGuide() {
  return (
    <section className="bg-black text-white ">
          <div className="max-w-[1440px] px-6 lg:px-10"
            style={{ margin: "0 auto", paddingTop: "60px", paddingBottom: "50px" }}>
            {/* TITLE */}
            <h2 className="text-center text-2xl md:text-2xl  font-bold uppercase mb-20"
              style={{ fontFamily: "var(--font-display)", marginTop: "20px", textAlign: "center" }}>
              How To Find Your EARRING Size
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
            </div>
          </div>
        </section>
  );
}
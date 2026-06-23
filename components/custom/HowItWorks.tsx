"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="36" height="36" rx="3" />
        <line x1="14" y1="16" x2="34" y2="16" />
        <line x1="14" y1="24" x2="30" y2="24" />
        <line x1="14" y1="32" x2="26" y2="32" />
        <path d="M30 28l4 4 8-8" strokeWidth="1.5" />
      </svg>
    ),
    text: "Fill out the form below to share your ideas and requirements for your custom jewelry piece. We will then look into determining the best solution and providing a quote.",
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 16L24 6L8 16v16l16 10 16-10V16z" />
        <path d="M8 16l16 10 16-10" />
        <line x1="24" y1="26" x2="24" y2="42" />
        <circle cx="35" cy="10" r="5" fill="none" strokeWidth="1.2" />
        <path d="M33 10h4M35 8v4" />
      </svg>
    ),
    text: "We will provide you with a personalized quote for your custom piece. If you are ready to proceed, we require a 50% deposit to begin work on your custom jewelry.",
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="12" />
        <line x1="29" y1="29" x2="40" y2="40" strokeWidth="1.5" />
        <path d="M16 20a4 4 0 0 1 8 0" />
        <circle cx="20" cy="16" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    text: "We will create design concepts for your custom piece, and once you are satisfied, we will begin craftsmanship on your custom jewelry piece.",
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="12" width="32" height="24" rx="2" />
        <line x1="8" y1="20" x2="40" y2="20" />
        <path d="M20 30h8" />
        <path d="M24 4l-4 4 4 4" strokeWidth="1.5" />
        <path d="M24 4l4 4-4 4" strokeWidth="1.5" />
      </svg>
    ),
    text: "Once final payment is received, your completed final piece will be ready for collection or delivery.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HowItWorks() {
  return (
    <section className="w-full bg-black text-white" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>

        {/* Heading */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 96px)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              textAlign: "center",
            }}
          >
            HOW IT WORKS
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "16px",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              fontSize: "clamp(11px, 1.2vw, 13px)",
              textAlign: "center",
            }}
          >
            THE PROCESS IN CREATING YOUR CUSTOM JEWELRY PIECE
          </p>
        </motion.div>

        {/* Steps Grid — centered 2x2 */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(32px, 4vw, 64px)",
            justifyItems: "center",
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              style={{ display: "flex", alignItems: "flex-start", gap: "20px", maxWidth: "480px" }}
            >
              {/* Icon */}
              <div style={{ flexShrink: 0, color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
                {step.icon}
              </div>

              {/* Text */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "clamp(13px, 1.2vw, 14px)",
                  lineHeight: 1.8,
                }}
              >
                {step.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

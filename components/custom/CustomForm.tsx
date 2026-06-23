"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const budgetOptions = [
  "Under $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000+",
];

export default function CustomForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    idea: "",
    budget: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up to backend / email service
    alert("Thank you! We will get back to you soon.");
  };

  const inputStyle = {
    fontFamily: "var(--font-display)",
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    fontSize: "15px",
    padding: "12px 4px",
    outline: "none",
  } as const;

  const inputFocusStyle = {
    borderBottom: "1px solid rgba(255,255,255,0.6)",
  };

  return (
    <section className="w-full bg-black text-white" style={{ padding: "96px clamp(24px, 4vw, 96px)" }}>
      <motion.div
        style={{ maxWidth: "800px", margin: "0 auto" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          SHARE YOUR IDEA
        </h2>
        <p
          style={{
            fontFamily: "var(--font-display)",
            textAlign: "center",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontSize: "clamp(11px, 1.2vw, 13px)",
            marginBottom: "clamp(48px, 6vw, 64px)",
          }}
        >
          TELL US ABOUT YOUR DREAM PIECE
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Name & Email row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.6)"}
              onBlur={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.2)"}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.6)"}
              onBlur={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.2)"}
            />
          </div>

          {/* Phone & Budget row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.6)"}
              onBlur={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.2)"}
            />
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="" disabled style={{ background: "black", color: "rgba(255,255,255,0.3)" }}>
                Estimated Budget
              </option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt} style={{ background: "black", color: "white" }}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Idea textarea */}
          <textarea
            name="idea"
            placeholder="Describe your idea in detail…"
            value={formData.idea}
            onChange={handleChange}
            required
            rows={4}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.6)"}
            onBlur={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.2)"}
          />

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "16px" }}>
            <motion.button
              type="submit"
              style={{
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                fontSize: "13px",
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "16px 48px",
                color: "white",
                background: "transparent",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.03, background: "white", color: "black" }}
              whileTap={{ scale: 0.97 }}
            >
              Submit Request
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

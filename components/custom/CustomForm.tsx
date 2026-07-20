"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { apiFetch } from "@/utils/api";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiFetch("/custom-requests", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        idea: "",
        budget: "",
      });
      // Optionally reset success state after some time if they want to submit again
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err: any) {
      alert(err.message || "Gửi yêu cầu thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <section className="w-full bg-black text-white" style={{ padding: "96px clamp(24px, 4vw, 96px)" }}>
      <motion.div
        style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}
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
            fontWeight: 700,
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

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 mb-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-display uppercase tracking-widest text-white mb-4">
                Thank You
              </h3>
              <p className="text-gray-400 max-w-md tracking-wider leading-relaxed">
                We have received your custom design request and will get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="custom-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "40px" }}
            >
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
              />

              {/* Submit */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "16px" }}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "16px 48px",
                    color: isSubmitting ? "rgba(255,255,255,0.5)" : "white",
                    background: "transparent",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}
                  whileHover={!isSubmitting ? { scale: 1.03, background: "white", color: "black" } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

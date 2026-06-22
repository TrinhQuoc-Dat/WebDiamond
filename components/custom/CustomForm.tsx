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

  const inputBaseClass =
    "w-full bg-transparent border-b border-white/20 text-white text-[15px] py-3 px-1 outline-none placeholder:text-white/30 focus:border-white/60 transition-colors duration-300";

  return (
    <section className="w-full bg-black text-white py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <motion.div
        className="max-w-[800px] mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <h2
          className="text-[28px] md:text-[44px] font-black uppercase tracking-[0.15em] text-center mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          SHARE YOUR IDEA
        </h2>
        <p
          className="text-center text-white/50 uppercase tracking-[0.3em] text-[11px] md:text-[13px] mb-16"
          style={{ fontFamily: "var(--font-display)" }}
        >
          TELL US ABOUT YOUR DREAM PIECE
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Name & Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputBaseClass}
              style={{ fontFamily: "var(--font-display)" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputBaseClass}
              style={{ fontFamily: "var(--font-display)" }}
            />
          </div>

          {/* Phone & Budget row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={inputBaseClass}
              style={{ fontFamily: "var(--font-display)" }}
            />
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`${inputBaseClass} appearance-none cursor-pointer`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <option value="" disabled className="bg-black text-white/30">
                Estimated Budget
              </option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-black text-white">
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
            className={`${inputBaseClass} resize-none`}
            style={{ fontFamily: "var(--font-display)" }}
          />

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <motion.button
              type="submit"
              className="uppercase tracking-[0.25em] text-[13px] font-bold border border-white/30 px-12 py-4 text-white hover:bg-white hover:text-black transition-all duration-300"
              style={{ fontFamily: "var(--font-display)" }}
              whileHover={{ scale: 1.03 }}
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

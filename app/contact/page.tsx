"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollIndicator from "@/components/ScrollIndicator";
import { apiFetch } from "@/utils/api";
import { motion } from "framer-motion";
import SideMenu from "@/components/SideMenu";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch("/contacts", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      alert(err.message || "Gửi tin nhắn liên hệ thất bại. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
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
    <>
      <CustomCursor />
      <Header />
      <SideMenu />

      <main
        className="w-full bg-black text-white min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
        style={{
          paddingTop: "120px",
          backgroundImage: "url('/product-detail-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundAttachment: "fixed",
          paddingBottom: "100px",
        }}
      >
        <div className="w-full max-w-[800px] px-6 py-12 md:py-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Heading */}
            <h1
              className="text-[clamp(28px,4vw,48px)] font-black uppercase tracking-[0.2em] text-center mb-4"
              style={{ fontFamily: "var(--font-display)", marginRight: "-0.2em" }}
            >
              CONTACT US
            </h1>
            <p
              className="text-[clamp(11px,1.2vw,13px)] text-center text-gray-500 uppercase tracking-[0.3em] mb-12 md:mb-16"
              style={{ fontFamily: "var(--font-display)" }}
            >
              GET IN TOUCH WITH WEBDIAMOND
            </p>

            {success ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full p-8 border border-white/20 bg-white/[0.02] rounded-xl text-center flex flex-col items-center gap-4"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#D4AF37" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <h3 className="font-bold text-lg uppercase tracking-[0.1em] text-white">Gửi thành công!</h3>
                <p className="text-sm text-gray-400">Cảm ơn tin nhắn của bạn. Chúng tôi sẽ phản hồi lại trong thời gian sớm nhất.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
                >
                  Gửi tin nhắn khác
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.6)"}
                    onBlur={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.2)"}
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Write your message here…"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle,
                      minHeight: "120px",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.6)"}
                    onBlur={(e) => e.target.style.borderBottom = "1px solid rgba(255,255,255,0.2)"}
                  />
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      px-12 py-4
                      border border-white/20
                      text-white/80
                      font-bold
                      text-[13px]
                      tracking-[0.3em]
                      uppercase
                      rounded-none
                      hover:bg-white hover:text-black hover:border-white
                      transition-all duration-300
                      disabled:opacity-50
                      cursor-pointer
                    "
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {submitting ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <ScrollIndicator />
      <Footer />
    </>
  );
}

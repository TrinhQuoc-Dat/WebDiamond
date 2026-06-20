"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login } = useAdminData();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      
      if (success) {
        router.replace("/admin/dashboard");
      } else {
        setError("ACCESS DENIED: INVALID CREDENTIALS");
      }
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen bg-[#070708] flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden select-none"
      style={{ cursor: "default" }}
    >
      
      {/* CSS hack ghi đè lỗi Autofill trình duyệt đè màu nền và màu chữ */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #070708 inset !important;
            -webkit-text-fill-color: #ffffff !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* Background radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)"
        }}
      />

      {/* Main Wrapper - Giảm độ rộng và khoảng cách dọc xuống mức vừa phải hài hòa */}
      <div 
        className="w-full flex flex-col items-center text-center z-10"
        style={{ maxWidth: "520px", gap: "36px" }}
      >
        
        {/* Header Section - Căn lề giữa vừa phải */}
        <div className="w-full flex flex-col items-center" style={{ gap: "16px" }}>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.5rem,7vw,4rem)] font-black uppercase tracking-[0.12em] text-white leading-none"
            style={{ fontFamily: "var(--font-display)", textAlign: "center" }}
          >
            ADMIN PORTAL
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs sm:text-xs font-light text-white tracking-[0.3em] uppercase"
            style={{ textAlign: "center" }}
          >
            BE AUTHORIZED TO ENTER
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-500 uppercase px-4 block leading-relaxed animate-fade-in"
            style={{ 
              textAlign: "center", 
              margin: "0 auto", 
              maxWidth: "480px", 
              fontSize: "9px", 
              letterSpacing: "0.12em",
              lineHeight: "1.8"
            }}
          >
            THIS INTERFACE IS RESTRICTED TO AUTHORIZED ADMINISTRATORS. UNAUTHORIZED ACCESS ATTEMPTS ARE LOGGED AND MONITORED. SEE OUR{" "}
            <a href="#" className="underline decoration-gray-600 hover:text-white transition-colors">
              PRIVACY POLICY
            </a>{" "}
            FOR DETAILS.
          </motion.p>
        </div>

        {/* Login Form - Căn giữa vừa vặn */}
        <motion.form 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onSubmit={handleSubmit} 
          className="w-full flex flex-col items-center"
          style={{ maxWidth: "450px", margin: "0 auto", gap: "32px" }}
        >
          {error && (
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="w-full font-mono text-red-500 uppercase border border-red-500/20 bg-red-500/5 rounded-xl text-center"
              style={{ 
                textAlign: "center",
                padding: "16px",
                fontSize: "12px",
                letterSpacing: "0.22em"
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Cụm các trường nhập liệu - giảm khoảng cách dọc xuống 24px (vừa phải) */}
          <div className="w-full flex flex-col" style={{ gap: "24px" }}>
            
            {/* Ô nhập Email - Căn giữa, giảm đệm py xuống 14px vừa vặn */}
            <div 
              className="w-full relative border-b border-white/20 focus-within:border-white transition-colors duration-500"
              style={{ paddingBottom: "4px" }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
                className="w-full bg-transparent text-white outline-none font-mono uppercase focus:placeholder-transparent transition-all"
                style={{ 
                  textAlign: "center", 
                  padding: "14px 0", 
                  fontSize: "12.5px", 
                  letterSpacing: "0.18em"
                }}
              />
            </div>

            {/* Ô nhập Password - Căn giữa, giảm đệm py xuống 14px vừa vặn */}
            <div 
              className="w-full relative border-b border-white/20 focus-within:border-white transition-colors duration-500"
              style={{ paddingBottom: "4px" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER YOUR PASSWORD"
                className="w-full bg-transparent text-white outline-none font-mono uppercase focus:placeholder-transparent transition-all"
                style={{ 
                  textAlign: "center", 
                  padding: "14px 0", 
                  fontSize: "12.5px", 
                  letterSpacing: "0.18em",
                  paddingRight: "30px" // tránh bị đè chữ lên icon con mắt
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                style={{ cursor: "pointer" }}
                title={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
              >
                {showPassword ? (
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            
          </div>

          {/* Nút đăng nhập - giảm padding py xuống 14px vừa vặn */}
          <div className="w-full pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01, backgroundColor: "#ffffff", color: "#000000", borderColor: "#ffffff" }}
              whileTap={{ scale: 0.99 }}
              className="w-full border border-white/30 text-white font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-500 bg-transparent cursor-pointer rounded-none hover:shadow-2xl hover:shadow-white/5 disabled:opacity-40"
              style={{ 
                padding: "14px 0"
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  AUTHENTICATING...
                </span>
              ) : (
                "REQUEST ACCESS →"
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

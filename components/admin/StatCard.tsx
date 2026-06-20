"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(212, 175, 55, 0.3)" }}
      className="bg-[#121214] border border-[#1C1C1E] rounded-xl transition-all duration-300 relative overflow-hidden group shadow-lg"
      style={{ padding: '24px' }}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/[0.01] to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] block mb-4">
            {title}
          </span>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight my-4">
            {value}
          </h3>
        </div>
        <div className="p-4 bg-white/[0.02] border border-[#1C1C1E] text-gray-400 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/20 rounded-xl transition-all duration-300 flex-shrink-0">
          <div className="w-6 h-6">{icon}</div>
        </div>
      </div>

      <div 
        className="flex items-start justify-between mt-6 pt-5 border-t border-[#1C1C1E]/50 text-xs gap-2"
        style={{ minHeight: '32px' }}
      >
        <span className="text-gray-400 font-normal leading-relaxed text-xs flex-1 min-w-0" style={{ paddingRight: '8px' }}>
          {description}
        </span>
        {trend && (
          <span
            className={`font-semibold flex items-center gap-0.5 flex-shrink-0 whitespace-nowrap ${
              trend.isPositive ? "text-emerald-500" : "text-rose-500"
            }`}
            style={{ marginTop: '2px' }}
          >
            {trend.isPositive ? (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            ) : (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0H8.25m11.25 0v11.25" />
              </svg>
            )}
            {trend.value}
          </span>
        )}
      </div>
    </motion.div>
  );
}

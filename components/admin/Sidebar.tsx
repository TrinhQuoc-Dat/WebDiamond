"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAdminData } from "@/context/AdminDataContext";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, icon, active }) => {
  return (
    <Link href={href} className="relative block group">
      <div
        className={`flex items-center gap-4 px-5 py-4.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          active
            ? "text-[#D4AF37] bg-white/[0.03]"
            : "text-gray-400 group-hover:text-gray-200 group-hover:bg-white/[0.01]"
        }`}
      >
        <span className={`w-5 h-5 transition-transform duration-300 ${
          active ? "scale-110 text-[#D4AF37]" : "group-hover:scale-105 group-hover:text-gray-200"
        }`}>
          {icon}
        </span>
        <span className="tracking-widest uppercase text-xs font-semibold">{label}</span>

        {active && (
          <motion.div
            layoutId="sidebar-active-indicator"
            className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#D4AF37] rounded-r"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAdminData();

  const menuItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>
      ),
    },
    {
      href: "/admin/banners",
      label: "Quản lý Banner",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 1.95h18M3.75 4.5h16.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5z" />
        </svg>
      ),
    },
    {
      href: "/admin/contacts",
      label: "Quản lý Liên hệ",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      href: "/admin/products",
      label: "Quản lý Sản phẩm",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 bg-[#09090A] border-r border-[#1C1C1E] flex flex-col h-full flex-shrink-0 z-30">
      {/* Brand Logo & Name */}
      <div 
        className="h-20 flex items-center border-b border-[#1C1C1E] justify-between"
        style={{ paddingLeft: '24px', paddingRight: '24px' }}
      >
        <Link href="/admin/dashboard" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-[0.2em] text-white uppercase group-hover:text-[#D4AF37] transition-colors duration-300">
            WEBDiamond
          </span>
          <span className="text-[10px] text-[#D4AF37] border border-[#D4AF37]/50 rounded px-1.5 py-0.5 tracking-wider uppercase font-semibold">
            Admin
          </span>
        </Link>
      </div>

      {/* Sidebar Items */}
      <nav 
        className="flex-1 space-y-4 overflow-y-auto"
        style={{ padding: '32px 20px' }}
      >
        <div 
          className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500"
          style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '20px' }}
        >
          Hệ thống
        </div>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname === item.href || (item.href !== "/admin/dashboard" && pathname?.startsWith(item.href))}
          />
        ))}
      </nav>

      {/* Back to Client Site & Logout */}
      <div 
        className="border-t border-[#1C1C1E] flex flex-col"
        style={{ padding: '20px', gap: '12px' }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/[0.02] transition-colors duration-300 uppercase tracking-widest font-semibold"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <span className="tracking-widest">Xem Website</span>
        </Link>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/[0.03] transition-colors duration-300 cursor-pointer uppercase tracking-widest font-semibold"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
          </svg>
          <span className="tracking-widest">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}

"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import Link from "next/link";

export default function Header() {
  const { contacts, resetAllData } = useAdminData();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Lọc các liên hệ mới chưa xử lý
  const newContacts = contacts.filter((c) => c.status === "Mới");

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu quản trị về mặc định? Các dữ liệu tự tạo sẽ bị xóa.")) {
      resetAllData();
      alert("Đã khôi phục dữ liệu mặc định!");
      window.location.reload();
    }
  };

  return (
    <header 
      className="h-20 bg-[#09090A] border-b border-[#1C1C1E] flex items-center justify-between flex-shrink-0 z-20 sticky top-0"
      style={{ paddingLeft: '32px', paddingRight: '32px' }}
    >
      {/* Search Bar - Mock */}
      <div 
        className="hidden md:flex items-center gap-2 bg-white/[0.02] border border-[#1C1C1E] rounded-lg w-80 focus-within:border-[#D4AF37]/50 focus-within:bg-white/[0.04] transition-all duration-300"
        style={{ padding: '6px 14px' }}
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-transparent text-sm text-gray-200 outline-none w-full placeholder-gray-500"
        />
      </div>

      <div className="flex md:hidden">
        <span className="text-sm font-bold tracking-widest text-[#D4AF37] uppercase">Admin panel</span>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4 relative">
        {/* Reset Data Button */}
        <button
          onClick={handleReset}
          title="Đặt lại dữ liệu mô phỏng về mặc định"
          className="flex items-center gap-1.5 px-3 py-1.5 border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg text-xs font-medium transition-all duration-300"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Đặt lại dữ liệu
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-gray-400 hover:text-white bg-white/[0.02] border border-[#1C1C1E] rounded-lg transition-all duration-300 relative"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            {newContacts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {newContacts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div 
              className="absolute right-0 mt-3 w-[340px] bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-2xl z-50"
              style={{ padding: '8px 0' }}
            >
              <div 
                className="border-b border-[#1C1C1E] flex items-center justify-between"
                style={{ padding: '12px 18px' }}
              >
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Thông báo liên hệ</span>
                <span className="text-[10px] text-gray-500">{newContacts.length} mới</span>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {newContacts.length === 0 ? (
                  <div className="px-4 py-6 text-center text-xs text-gray-500">
                    Không có liên hệ mới nào chưa xử lý.
                  </div>
                ) : (
                  newContacts.map((c) => (
                    <Link
                      key={c.id}
                      href="/admin/contacts"
                      onClick={() => setShowNotifications(false)}
                      className="block hover:bg-white/[0.02] border-b border-[#1C1C1E]/50 transition-colors"
                      style={{ padding: '14px 18px' }}
                    >
                      <div className="flex justify-between items-start" style={{ marginBottom: '6px' }}>
                        <span className="text-xs font-medium text-[#D4AF37]">{c.name}</span>
                        <span className="text-[9px] text-gray-500">
                          {new Date(c.createdAt).toLocaleDateString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{c.message}</p>
                    </Link>
                  ))
                )}
              </div>
              <div className="border-t border-[#1C1C1E] text-center" style={{ padding: '12px 18px' }}>
                <Link
                  href="/admin/contacts"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-[#D4AF37] hover:underline font-medium"
                >
                  Xem tất cả liên hệ
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar / Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-[#D4AF37]/30 flex items-center justify-center text-sm font-semibold text-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-gray-200">Administrator</div>
              <div className="text-[9px] text-gray-500">admin@webdiamond.com</div>
            </div>
          </button>

          {showProfileMenu && (
            <div 
              className="absolute right-0 mt-3 w-48 bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-2xl z-50 text-sm"
              style={{ padding: '6px 0' }}
            >
              <div className="border-b border-[#1C1C1E] lg:hidden" style={{ padding: '10px 16px' }}>
                <div className="text-xs font-semibold text-gray-200">Administrator</div>
                <div className="text-[9px] text-gray-500">admin@webdiamond.com</div>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/[0.02] transition-colors"
                style={{ padding: '10px 16px' }}
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                Trang chủ cửa hàng
              </Link>
              <button
                onClick={handleReset}
                className="w-full text-left flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/[0.02] transition-colors border-t border-[#1C1C1E]"
                style={{ padding: '10px 16px' }}
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Khôi phục dữ liệu
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

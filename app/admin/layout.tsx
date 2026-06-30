"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { AdminDataProvider, useAdminData } from "@/context/AdminDataContext";
import { usePathname, useRouter } from "next/navigation";

// PrimeReact
import "primereact/resources/themes/lara-dark-amber/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";

// Tách biệt nội dung bên trong Provider để có thể sử dụng hook useAdminData()
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useAdminData();
  const pathname = usePathname();
  const router = useRouter();

  // Kiểm soát quyền truy cập trang Admin (Route Guard)
  useEffect(() => {
    if (!isLoggedIn && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else if (isLoggedIn && pathname === "/admin/login") {
      router.replace("/admin/dashboard");
    }
  }, [isLoggedIn, pathname, router]);

  // Nếu chưa đăng nhập và không ở trang login, chặn render nội dung chính để bảo mật
  if (!isLoggedIn && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center font-mono text-xs uppercase tracking-widest animate-pulse text-gray-500">
        Đang xác thực thông tin...
      </div>
    );
  }

  // Nếu ở trang đăng nhập, chỉ hiển thị form đăng nhập (không hiển thị Sidebar/Header)
  if (pathname === "/admin/login") {
    return (
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#070708] text-gray-200 tracking-wide leading-relaxed">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#070708] text-gray-200 overflow-hidden font-sans tracking-wide leading-relaxed admin-layout">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Sidebar Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Slide menu */}
          <div className="relative w-64 h-full flex flex-col z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar Header with Mobile Menu Trigger */}
        <div className="flex items-center w-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-4 text-gray-400 hover:text-white md:hidden border-b border-[#1C1C1E] bg-[#09090A]"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </button>
          <div className="flex-1">
            <Header />
          </div>
        </div>

        {/* Page Content Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      <AdminDataProvider>
        <style jsx global>{`
          /* PrimeReact overrides for dark admin theme */
          .p-dropdown-panel {
            background: #0D0D0F !important;
            border: 1px solid #2A2A30 !important;
            border-radius: 12px !important;
          }
          .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
            color: rgba(255,255,255,0.8) !important;
            padding: 10px 16px !important;
            font-size: 13px !important;
          }
          .p-dropdown-panel .p-dropdown-items .p-dropdown-item:hover,
          .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
            background: rgba(212,175,55,0.15) !important;
            color: #D4AF37 !important;
          }
          .p-inputtext:focus, .p-dropdown:focus, .p-dropdown.p-focus {
            border-color: rgba(212,175,55,0.6) !important;
            box-shadow: 0 0 0 2px rgba(212,175,55,0.15) !important;
          }
          .p-dropdown .p-dropdown-trigger {
            color: #666 !important;
          }
          .p-colorpicker-preview {
            width: 44px !important;
            height: 44px !important;
            border-radius: 12px !important;
            border: 1px solid #2A2A30 !important;
          }
          .p-button.p-button-text:hover {
            background: rgba(212,175,55,0.1) !important;
          }
          .p-dropdown {
            display: flex !important;
            align-items: center !important;
          }
          .p-dropdown .p-dropdown-label {
            display: flex !important;
            align-items: center !important;
            padding: 0 12px !important;
            line-height: 1 !important;
            font-size: 13px !important;
          }
          .p-dropdown .p-dropdown-trigger {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          /* Force cursor pointer on all clickable / interactive elements */
          .admin-layout a,
          .admin-layout button,
          .admin-layout select,
          .admin-layout option,
          .admin-layout input[type="button"],
          .admin-layout input[type="submit"],
          .admin-layout input[type="checkbox"],
          .admin-layout input[type="radio"],
          .admin-layout [role="button"],
          .admin-layout .cursor-pointer,
          .admin-layout table tbody tr {
            cursor: pointer !important;
          }
          
          /* Force line heights on admin text elements to prevent cramped content */
          .admin-layout p,
          .admin-layout span,
          .admin-layout td,
          .admin-layout th,
          .admin-layout li,
          .admin-layout a,
          .admin-layout button,
          .admin-layout label,
          .admin-layout p * {
            line-height: 1.85 !important;
          }

          /* Force heading line height */
          .admin-layout h1,
          .admin-layout h2,
          .admin-layout h3,
          .admin-layout h4,
          .admin-layout h5,
          .admin-layout h6 {
            line-height: 1.45 !important;
          }

          /* StatCard details vertical gaps - fixes layout stickiness */
          .admin-layout .admin-layout h3 {
            margin-top: 1.25rem !important;
            margin-bottom: 1.25rem !important;
          }

          /* Force input, select, and textarea padding to bypass CSS reset */
          .admin-layout input[type="text"]:not(.bg-transparent),
          .admin-layout input[type="number"]:not(.bg-transparent),
          .admin-layout input[type="password"]:not(.bg-transparent),
          .admin-layout input[type="email"]:not(.bg-transparent),
          .admin-layout select,
          .admin-layout textarea {
            padding-top: 0.625rem !important;
            padding-bottom: 0.625rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          /* Custom Admin DataTable Styling */
          .custom-admin-table .p-datatable {
            background: transparent !important;
          }
          .custom-admin-table .p-datatable .p-datatable-thead > tr > th {
            background: rgba(255, 255, 255, 0.01) !important;
            color: #D4AF37 !important;
            border-bottom: 1px solid #1C1C1E !important;
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            font-size: 0.75rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.2em !important;
            padding: 1.5rem 2rem !important;
          }
          .custom-admin-table .p-datatable .p-datatable-tbody > tr {
            background: transparent !important;
            color: rgba(255, 255, 255, 0.9) !important;
            border-bottom: 1px solid rgba(28, 28, 30, 0.5) !important;
            transition: background-color 0.2s !important;
          }
          .custom-admin-table .p-datatable .p-datatable-tbody > tr:hover {
            background: rgba(255, 255, 255, 0.02) !important;
          }
          .custom-admin-table .p-datatable .p-datatable-tbody > tr > td {
            border: none !important;
            padding: 1.5rem 2rem !important;
          }
          
          /* Dropdown uppercase option text styling */
          .uppercase-dropdown .p-dropdown-item {
            text-transform: uppercase !important;
            font-size: 11px !important;
            font-weight: 600 !important;
            letter-spacing: 0.05em !important;
          }
          
          /* Force table row height and padding */
          .admin-layout table th,
          .admin-layout table td {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
            padding-left: 2rem !important;
            padding-right: 2rem !important;
          }

          /* General main content spacing */
          .admin-layout main {
            padding: 2rem !important;
          }
          @media (min-width: 768px) {
            .admin-layout main {
              padding: 3.5rem 3rem !important;
            }
          }

          /* Gaps inside recent activities and status widgets */
          .admin-layout .space-y-1 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 0.25rem !important;
          }
          .admin-layout .space-y-2 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 0.5rem !important;
          }
          .admin-layout .space-y-3 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 0.75rem !important;
          }
          .admin-layout .space-y-4 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1.5rem !important;
          }
          .admin-layout .space-y-5 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1.25rem !important;
          }
          .admin-layout .space-y-6 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 2rem !important;
          }
          .admin-layout .space-y-8 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 2rem !important;
          }
          .admin-layout .space-y-10 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 2.5rem !important;
          }
          .admin-layout .space-y-12 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 3rem !important;
          }
          .admin-layout .space-y-14 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 3.5rem !important;
          }
        `}</style>
        
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminDataProvider>
    </PrimeReactProvider>
  );
}

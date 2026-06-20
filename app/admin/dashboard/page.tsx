"use client";

import React from "react";
import { useAdminData } from "@/context/AdminDataContext";
import StatCard from "@/components/admin/StatCard";
import SVGCharts from "@/components/admin/SVGCharts";

export default function DashboardPage() {
  const { products, contacts, banners } = useAdminData();

  // Tính toán dữ liệu thống kê động dựa trên State hiện tại
  const totalProducts = products.length;
  const totalBanners = banners.length;
  const pendingContacts = contacts.filter((c) => c.status === "Mới").length;
  
  const totalContacts = contacts.length;
  const resolvedContacts = contacts.filter((c) => c.status === "Đã xử lý").length;
  const resolutionRate = totalContacts ? Math.round((resolvedContacts / totalContacts) * 100) : 0;

  // Lấy danh sách 3 liên hệ mới nhất
  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-12 md:space-y-14 animate-fade-in">
      {/* Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1C1C1E] pb-8 pt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-white uppercase">
            Hệ thống Tổng quan
          </h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Chào mừng bạn quay lại. Dưới đây là hiệu suất vận hành của WebDiamond hôm nay.
          </p>
        </div>
        <div className="text-xs font-mono text-[#D4AF37] bg-white/[0.01] border border-[#1C1C1E] px-4 py-2 rounded-xl flex items-center gap-2 self-start md:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          HỆ THỐNG ONLINE: 2026-06-20
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng sản phẩm"
          value={totalProducts}
          description="Sản phẩm đang được quản lý"
          trend={{ value: "+4.2%", isPositive: true }}
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          }
        />
        <StatCard
          title="Liên hệ mới"
          value={pendingContacts}
          description="Khách hàng đang đợi phản hồi"
          trend={pendingContacts > 0 ? { value: `${pendingContacts} cần xử lý`, isPositive: false } : undefined}
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
        />
        <StatCard
          title="Tỷ lệ giải quyết"
          value={`${resolutionRate}%`}
          description="Tỷ lệ giải quyết liên hệ thành công"
          trend={{ value: "+12%", isPositive: true }}
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          }
        />
        <StatCard
          title="Banner trang chủ"
          value={totalBanners}
          description="Hình ảnh xoay vòng đang bật"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 1.95h18M3.75 4.5h16.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5z" />
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <SVGCharts />

      {/* Two Columns: Recent Submissions & System Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Contact Request */}
        <div className="lg:col-span-2 bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-lg flex flex-col justify-between" style={{ padding: '32px' }}>
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]" style={{ marginBottom: '24px' }}>
              Yêu cầu liên hệ gần đây
            </h4>
            <div className="space-y-6">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start gap-5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-[#1C1C1E]/50 transition-all leading-relaxed"
                  style={{ padding: '20px' }}
                >
                  <div className="w-9 h-9 rounded-full bg-white/[0.03] flex items-center justify-center text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/20 flex-shrink-0">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0" style={{ paddingRight: '16px' }}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-white truncate">{contact.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono flex-shrink-0">
                        {new Date(contact.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 truncate font-mono mb-2">{contact.email}</div>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-1">{contact.message}</p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        contact.status === "Mới"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : contact.status === "Đang xử lý"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Operations Info */}
        <div className="bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-lg" style={{ padding: '32px' }}>
          <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]" style={{ marginBottom: '24px' }}>
            Hiệu quả vận hành hệ thống
          </h4>
          <div className="space-y-6">
            {/* Metric 1 */}
            <div 
              className="flex items-center justify-between rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-[#1C1C1E]/50 transition-all gap-4"
              style={{ padding: '18px' }}
            >
              <div className="leading-relaxed min-w-0" style={{ paddingRight: '16px' }}>
                <span className="text-sm font-semibold text-white block mb-0.5 truncate">Tốc độ phản hồi</span>
                <span className="text-[11px] text-gray-500 block leading-normal">Trung bình phản hồi liên hệ khách</span>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs font-bold text-[#52BE80] bg-[#52BE80]/10 border border-[#52BE80]/20 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  2.5 giờ
                </span>
              </div>
            </div>

            {/* Metric 2 */}
            <div 
              className="flex items-center justify-between rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-[#1C1C1E]/50 transition-all gap-4"
              style={{ padding: '18px' }}
            >
              <div className="leading-relaxed min-w-0" style={{ paddingRight: '16px' }}>
                <span className="text-sm font-semibold text-white block mb-0.5 truncate">Thời gian hoạt động</span>
                <span className="text-[11px] text-gray-500 block leading-normal">Uptime hệ thống trực tuyến</span>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs font-bold text-[#5DADE2] bg-[#5DADE2]/10 border border-[#5DADE2]/20 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  99.98%
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div 
              className="flex items-center justify-between rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-[#1C1C1E]/50 transition-all gap-4"
              style={{ padding: '18px' }}
            >
              <div className="leading-relaxed min-w-0" style={{ paddingRight: '16px' }}>
                <span className="text-sm font-semibold text-white block mb-0.5 truncate">Độ lưu trữ tối ưu</span>
                <span className="text-[11px] text-gray-500 block leading-normal">Đồng bộ LocalStorage nội bộ</span>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs font-bold text-[#F5B041] bg-[#F5B041]/10 border border-[#F5B041]/20 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  Tối ưu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

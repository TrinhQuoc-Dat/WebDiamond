"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAdminData } from "@/context/AdminDataContext";
import { apiFetch } from "@/utils/api";

interface ChartDataPoint {
  label: string;
  value: number;
}

export default function SVGCharts() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [timeFilter, setTimeFilter] = useState<"7days" | "30days" | "month">("7days");
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const { contacts } = useAdminData();

  useEffect(() => {
    async function loadChartData() {
      try {
        const range = timeFilter === "7days" ? "day" : (timeFilter === "30days" ? "month" : "year");
        const res = await apiFetch<Array<{ label: string; count: number }>>(`/admin/dashboard/contacts-chart?range=${range}`);
        const mapped = res.map((item) => ({
          label: item.label,
          value: item.count,
        }));
        setChartData(mapped);
      } catch (err) {
        console.error("Lỗi khi tải biểu đồ:", err);
      }
    }
    loadChartData();
  }, [timeFilter]);

  // Mock dữ liệu dự phòng nếu backend trả về rỗng
  const getChartData = (): ChartDataPoint[] => {
    switch (timeFilter) {
      case "30days":
        return [
          { label: "Tuần 1", value: 18 },
          { label: "Tuần 2", value: 29 },
          { label: "Tuần 3", value: 15 },
          { label: "Tuần 4", value: 34 },
          { label: "Hiện tại", value: 22 },
        ];
      case "month":
        return [
          { label: "Tuần 1", value: 12 },
          { label: "Tuần 2", value: 25 },
          { label: "Tuần 3", value: 18 },
          { label: "Tuần 4", value: 20 },
        ];
      case "7days":
      default:
        return [
          { label: "Thứ 2", value: 3 },
          { label: "Thứ 3", value: 6 },
          { label: "Thứ 4", value: 4 },
          { label: "Thứ 5", value: 9 },
          { label: "Thứ 6", value: 5 },
          { label: "Thứ 7", value: 12 },
          { label: "Chủ nhật", value: 8 },
        ];
    }
  };

  const contactData = chartData.length > 0 ? chartData : getChartData();

  // Tính toán tọa độ cho Area Chart
  const width = 550;
  const height = 180;
  const padding = 30;

  const maxVal = Math.max(...contactData.map((d) => d.value), 10);
  const points = contactData.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (contactData.length - 1);
    const y = height - padding - (d.value * (height - padding * 2)) / maxVal;
    return { x, y, value: d.value, label: d.label };
  });

  // Tạo đường dẫn Bezier mượt mà (Smooth Curve)
  let linePath = "";
  let areaPath = "";

  if (points.length > 0) {
    linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cpX1 = curr.x + (next.x - curr.x) / 2;
      const cpY1 = curr.y;
      const cpX2 = curr.x + (next.x - curr.x) / 2;
      const cpY2 = next.y;
      linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }

    // Đóng vùng dưới đồ thị để đổ màu gradient
    areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  }

  // Thống kê vòng tròn hiệu quả (Donut Chart)
  // Tính toán động tỷ lệ trạng thái liên hệ từ dữ liệu thực tế
  const totalContacts = contacts.length;
  const resolvedCount = contacts.filter((c) => c.status === "Đã xử lý").length;
  const inProgressCount = contacts.filter((c) => c.status === "Đang xử lý").length;

  const resolvedPct = totalContacts ? Math.round((resolvedCount / totalContacts) * 100) : 0;
  const inProgressPct = totalContacts ? Math.round((inProgressCount / totalContacts) * 100) : 0;
  const newPct = totalContacts ? Math.max(0, 100 - resolvedPct - inProgressPct) : 0;

  // Tính dashoffset cho SVG circle (R=50, Chu vi = 2 * PI * R ≈ 314.16)
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // 314.159
  
  const resolvedOffset = circumference - (resolvedPct / 100) * circumference;
  const inProgressOffset = circumference - ((resolvedPct + inProgressPct) / 100) * circumference;
  const newOffset = circumference - ((resolvedPct + inProgressPct + newPct) / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 1. Area Chart: Lượt liên hệ trong tuần */}
      <div 
        className="lg:col-span-2 bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-lg flex flex-col justify-between"
        style={{ padding: '32px' }}
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
              Theo dõi lượt liên hệ trong tuần
            </h4>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="text-[10px] text-gray-400 font-bold border border-[#1C1C1E] bg-[#121214] rounded-lg outline-none cursor-pointer focus:border-[#2DD4BF]/50"
              style={{ padding: '6px 12px' }}
            >
              <option value="7days">7 ngày qua</option>
              <option value="30days">30 ngày qua</option>
              <option value="month">Tháng này</option>
            </select>
          </div>
        </div>

        {/* Biểu đồ SVG */}
        <div className="relative w-full h-[180px] mt-2">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Trục hoành và trục tung mờ */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#1C1C1E" strokeWidth={1} />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#1C1C1E" strokeWidth={1} />

            {/* Các đường gióng ngang */}
            {[0, 0.5, 1].map((ratio, idx) => {
              const y = padding + ratio * (height - padding * 2);
              const val = Math.round(maxVal - ratio * maxVal);
              return (
                <g key={idx} className="opacity-40">
                  <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#1C1C1E" strokeDasharray="3 3" />
                  <text x={padding - 8} y={y + 4} fill="#666" fontSize={10} textAnchor="end">
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Vùng đổ màu Gradient */}
            <motion.path
              d={areaPath}
              fill="url(#chart-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Đường nét chính */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#2DD4BF"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Các điểm nút (Nodes) */}
            {points.map((p, idx) => (
              <g key={idx}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint === idx ? 6 : 4}
                  fill={hoveredPoint === idx ? "#FFF" : "#2DD4BF"}
                  stroke="#121214"
                  strokeWidth={2}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Chữ nhãn dưới cột */}
                <text x={p.x} y={height - 10} fill="#555" fontSize={10} textAnchor="middle">
                  {p.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Tooltip động khi di chuột qua Node */}
          {hoveredPoint !== null && (
            <div
              className="absolute bg-[#1C1C1E] border border-[#2DD4BF]/30 text-white rounded px-2.5 py-1.5 text-xs shadow-2xl pointer-events-none flex flex-col items-center gap-0.5"
              style={{
                left: `${(points[hoveredPoint].x / width) * 100}%`,
                top: `${(points[hoveredPoint].y / height) * 100 - 32}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <span className="text-[10px] text-gray-500 font-medium">{points[hoveredPoint].label}</span>
              <span className="font-bold text-[#2DD4BF]">{points[hoveredPoint].value} liên hệ</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Donut Chart: Hiệu quả vận hành (Operation Efficiency) */}
      <div 
        className="bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-lg flex flex-col justify-between"
        style={{ padding: '32px' }}
      >
        <div>
          <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-6">
            Hiệu quả xử lý liên hệ
          </h4>
        </div>

        {/* Biểu đồ tròn Donut */}
        <div className="flex items-center justify-center relative py-4">
          <svg width={140} height={140} viewBox="0 0 120 120" className="transform -rotate-90">
            {/* Vòng nền mờ */}
            <circle cx={60} cy={60} r={radius} fill="transparent" stroke="#1C1C1E" strokeWidth={10} />

            {/* Phân đoạn: Đã xử lý xong (Rich Pastel Blue) */}
            <circle
              cx={60}
              cy={60}
              r={radius}
              fill="transparent"
              stroke="#5DADE2"
              strokeWidth={10}
              strokeDasharray={circumference}
              strokeDashoffset={resolvedOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />

            {/* Phân đoạn: Đang xử lý (Rich Pastel Yellow) */}
            <circle
              cx={60}
              cy={60}
              r={radius}
              fill="transparent"
              stroke="#F5B041"
              strokeWidth={10}
              strokeDasharray={circumference}
              strokeDashoffset={inProgressOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />

            {/* Phân đoạn: Yêu cầu mới (Rich Pastel Green) */}
            <circle
              cx={60}
              cy={60}
              r={radius}
              fill="transparent"
              stroke="#52BE80"
              strokeWidth={10}
              strokeDasharray={circumference}
              strokeDashoffset={newOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Text hiển thị chính giữa */}
          <div className="absolute text-center">
            <span className="text-2xl font-bold text-white tracking-tighter">75%</span>
            <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Tỷ lệ xử lý</span>
          </div>
        </div>

        {/* Chú thích các trạng thái */}
        <div className="space-y-3.5 mt-6 pt-5 border-t border-[#1C1C1E]/50">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5DADE2]" />
              <span className="text-gray-400">Đã xử lý xong</span>
            </div>
            <span className="font-semibold text-white">{resolvedPct}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5B041]" />
              <span className="text-gray-400">Đang xử lý</span>
            </div>
            <span className="font-semibold text-white">{inProgressPct}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#52BE80]" />
              <span className="text-gray-400">Yêu cầu mới</span>
            </div>
            <span className="font-semibold text-white">{newPct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] text-xs font-mono text-gray-500 uppercase tracking-widest animate-pulse">
      Đang kết nối hệ thống quản trị...
    </div>
  );
}

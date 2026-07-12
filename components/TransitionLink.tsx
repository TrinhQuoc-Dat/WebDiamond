"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { triggerPageTransition } from "./LoadingOverlay";

interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Drop-in replacement cho Next.js <Link>.
 * Khi đang ở trang chủ "/" và navigate ra trang khác → trigger hiệu ứng chuyển trang.
 * Các trường hợp khác → navigate bình thường.
 */
export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Bỏ qua external links hoặc khi giữ modifier keys → hành vi mặc định
    if (
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel") ||
      href.startsWith("#") ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey
    ) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);

    // Nếu đang ở trang chủ và navigate đi trang khác → hiệu ứng transition
    if (pathname === "/" && href !== "/") {
      triggerPageTransition(href);
      // Delay navigate để overlay kịp hiện
      setTimeout(() => {
        router.push(href);
      }, 500);
    } else {
      router.push(href);
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

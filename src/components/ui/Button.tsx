"use client";

import { AnchorHTMLAttributes, MouseEvent, ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconArrow } from "@/components/ui/icons";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export function Button({ href, children, variant = "outline", className = "", ...rest }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const base =
    "group relative inline-flex items-center gap-3 rounded-full border px-6 py-3 text-body-sm font-medium uppercase tracking-tight transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "border-accent bg-accent text-accent-ink hover:bg-transparent hover:text-accent"
      : "border-border-strong bg-transparent text-text-primary hover:bg-text-primary hover:text-bg-primary";

  const isExternal = href.startsWith("http");

  return (
    <motion.span
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className="inline-block"
    >
      <a
        ref={ref}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${base} ${styles} ${className}`}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        <span>{children}</span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            variant === "solid"
              ? "border-accent-ink group-hover:border-accent"
              : "border-current"
          }`}
        >
          <IconArrow className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </a>
    </motion.span>
  );
}

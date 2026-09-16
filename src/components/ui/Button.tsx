import { AnchorHTMLAttributes, ReactNode } from "react";
import { IconArrow } from "@/components/ui/icons";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export function Button({ href, children, variant = "outline", className = "", ...rest }: ButtonProps) {
  const base =
    "group relative inline-flex items-center gap-3 rounded-full border px-6 py-3 text-body-sm font-semibold uppercase tracking-tight transition-colors duration-200 ease-out";
  const styles =
    variant === "solid"
      ? "border-accent bg-accent text-accent-ink hover:bg-transparent hover:text-accent"
      : "border-border-strong bg-transparent text-text-primary hover:bg-text-primary hover:text-bg-primary";

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span className="break-words">{children}</span>
      <span
        className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ease-out ${
          variant === "solid" ? "border-accent-ink group-hover:border-accent" : "border-current"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-full border opacity-0 group-hover:opacity-100 group-hover:[animation:button-ping_0.6s_cubic-bezier(0.4,0,0.2,1)] ${
            variant === "solid" ? "border-accent" : "border-current"
          }`}
        />
        <IconArrow
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

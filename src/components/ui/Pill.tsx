import { ReactNode } from "react";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-border-subtle bg-bg-secondary px-5 py-2.5 text-body-sm text-text-primary transition-colors duration-300 hover:border-accent hover:text-accent">
      {children}
    </span>
  );
}

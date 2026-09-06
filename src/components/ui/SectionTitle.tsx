import { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  children,
  className = "",
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <span className="mb-4 block text-body-sm uppercase tracking-tight text-text-secondary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-h2 uppercase text-text-primary">
        {children}
      </h2>
    </div>
  );
}

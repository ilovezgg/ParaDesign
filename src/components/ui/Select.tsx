"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconCheck, IconChevronDown } from "@/components/ui/icons";

type SelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
};

export function Select({ options, value, onChange, placeholder, ariaLabel }: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-2xl border border-border-subtle bg-bg-secondary py-4 pl-4 pr-10 text-left text-body text-text-primary transition-colors duration-200 focus:border-accent focus:outline-none"
      >
        <span className={value ? "text-text-primary" : "text-text-muted"}>{value || placeholder}</span>
        <IconChevronDown
          className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            aria-label={ariaLabel}
            className="absolute left-0 right-0 top-full z-20 mt-2 origin-top overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary p-1 shadow-lg"
          >
            {options.map((option) => {
              const selected = option === value;
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-body-sm text-text-primary transition-colors duration-150 hover:bg-bg-tertiary"
                  >
                    {option}
                    {selected ? <IconCheck className="h-4 w-4 text-accent" aria-hidden="true" /> : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

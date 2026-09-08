"use client";

import { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { openConsultationModal } from "@/lib/consultationModal";

type ConsultationCtaButtonProps = {
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export function ConsultationCtaButton({ children, variant, className }: ConsultationCtaButtonProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openConsultationModal();
  };

  return (
    <Button href="#contacts" variant={variant} className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}

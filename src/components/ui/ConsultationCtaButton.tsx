"use client";

import { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { ConsultationTopic, openConsultationModal } from "@/lib/consultationModal";

type ConsultationCtaButtonProps = {
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  topic?: ConsultationTopic;
};

export function ConsultationCtaButton({ children, variant, className, topic }: ConsultationCtaButtonProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openConsultationModal(topic);
  };

  return (
    <Button href="#contacts" variant={variant} className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}

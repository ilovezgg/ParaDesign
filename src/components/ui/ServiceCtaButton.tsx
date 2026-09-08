"use client";

import { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { openServiceModal } from "@/lib/serviceModal";

type ServiceCtaButtonProps = {
  index: number;
  children: ReactNode;
  className?: string;
};

export function ServiceCtaButton({ index, children, className }: ServiceCtaButtonProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openServiceModal(index);
  };

  return (
    <Button href="#contacts" className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { nav, siteConfig } from "@/content";
import { Container } from "@/components/ui/Container";
import { IconVk, IconTelegram, IconMenu, IconClose } from "@/components/ui/icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-border-subtle bg-bg-primary/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <Container
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-3" : "py-6"
          }`}
        >
          <a href="#top" className="font-display text-lg uppercase tracking-tight">
            {siteConfig.name}
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-body-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={siteConfig.vkHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <IconVk className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <IconTelegram className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-primary md:hidden"
          >
            {menuOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </Container>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 top-[65px] z-40 flex flex-col justify-between bg-bg-primary p-6 md:hidden">
          <nav className="flex flex-col gap-6 pt-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl uppercase text-text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 pb-6">
            <a
              href={siteConfig.vkHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-text-secondary"
            >
              <IconVk className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-text-secondary"
            >
              <IconTelegram className="h-4 w-4" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

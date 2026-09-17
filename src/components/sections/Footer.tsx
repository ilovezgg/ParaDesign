import Image from "next/image";
import { footer, siteConfig } from "@/content";
import { Container } from "@/components/ui/Container";
import { IconVk, IconTelegram, IconMail, IconPhone } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Image src="/img/logo.webp" alt={siteConfig.name} width={32} height={32} className="mb-3" />
            <p className="font-display text-lg uppercase text-text-primary">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-body-sm text-text-secondary">{footer.tagline}</p>
          </div>

          <div className="flex flex-col gap-2 text-body-sm text-text-secondary">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 transition-colors hover:text-text-primary"
            >
              <IconMail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2 transition-colors hover:text-text-primary"
            >
              <IconPhone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </div>

          <div className="flex items-center gap-4">
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
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-subtle pt-6 text-body-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <span>{footer.copyright}</span>
          <a href={footer.privacyHref} className="transition-colors hover:text-text-secondary">
            {footer.privacyLabel}
          </a>
        </div>
      </Container>
    </footer>
  );
}

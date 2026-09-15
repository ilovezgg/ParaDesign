"use client";

import { FormEvent, useState } from "react";
import { finalCta, hero, siteConfig, consent } from "@/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Select } from "@/components/ui/Select";
import { IconDoc, IconTelegram, IconWhatsapp, IconPhone, IconVk, IconMail } from "@/components/ui/icons";
import { submitContactForm } from "@/lib/formAction";

const iconMap = {
  doc: IconDoc,
  telegram: IconTelegram,
  whatsapp: IconWhatsapp,
  phone: IconPhone,
  vk: IconVk,
};

type Status = "idle" | "loading" | "success" | "error";

export function FinalCta() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [messenger, setMessenger] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const comment = String(form.get("comment") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Введите имя";
    if (!/^[+\d][\d\s()-]{6,}$/.test(phone)) nextErrors.phone = "Введите корректный телефон";
    if (!agreed) nextErrors.agreed = consent.error;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const result = await submitContactForm({ name, phone, messenger, comment });
      setStatus(result.ok ? "success" : "error");
      if (result.ok) {
        e.currentTarget.reset();
        setAgreed(false);
        setMessenger("");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacts" className="py-section-y">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="min-w-0">
          <Reveal>
            <h2 className="font-display text-display uppercase leading-none text-text-primary">
              {finalCta.title}
            </h2>
            <p className="mt-4 text-body text-text-secondary">{finalCta.subtitle}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
            {finalCta.contactButtons.map((btn) => {
              const Icon = iconMap[btn.icon];
              return (
                <a
                  key={btn.label}
                  href={btn.href}
                  {...(btn.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-body-sm font-semibold uppercase tracking-tight text-text-primary transition-colors duration-300 hover:bg-text-primary hover:text-bg-primary"
                >
                  <Icon className="h-4 w-4" />
                  {btn.label}
                </a>
              );
            })}
          </Reveal>

          <Reveal delay={0.2} id="contact-form" className="mt-16 max-w-xl scroll-mt-24">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <input
                name="name"
                type="text"
                placeholder="Ваше имя"
                aria-label="Ваше имя"
                aria-invalid={Boolean(errors.name)}
                className="w-full rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
              {errors.name ? <p className="mt-1 text-body-sm text-red-400">{errors.name}</p> : null}
            </div>

            <div>
              <input
                name="phone"
                type="tel"
                placeholder="Телефон"
                aria-label="Телефон"
                aria-invalid={Boolean(errors.phone)}
                className="w-full rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
              {errors.phone ? <p className="mt-1 text-body-sm text-red-400">{errors.phone}</p> : null}
            </div>

            <Select
              options={finalCta.form.messengers}
              value={messenger}
              onChange={setMessenger}
              placeholder="Удобный способ связи"
              ariaLabel="Удобный способ связи"
            />

            <textarea
              name="comment"
              placeholder="Комментарий к проекту"
              aria-label="Комментарий к проекту"
              rows={4}
              className="w-full resize-none rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
            />

            <div>
              <label className="flex items-start gap-3 text-body-sm text-text-muted">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  aria-invalid={Boolean(errors.agreed)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                />
                <span>
                  {consent.label}{" "}
                  <a
                    href={consent.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="underline hover:text-text-primary"
                  >
                    {consent.linkLabel}
                  </a>
                </span>
              </label>
              {errors.agreed ? <p className="mt-1 text-body-sm text-red-400">{errors.agreed}</p> : null}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-accent bg-accent px-6 py-3 text-body-sm font-semibold uppercase tracking-tight text-accent-ink transition-colors duration-300 hover:bg-transparent hover:text-accent disabled:opacity-60"
            >
              {status === "loading" ? "Отправка..." : "Отправить заявку"}
            </button>

            {status === "success" ? (
              <p role="status" className="text-body-sm text-accent">
                Спасибо! Мы свяжемся с вами в ближайшее время.
              </p>
            ) : null}
            {status === "error" ? (
              <p role="alert" className="text-body-sm text-red-400">
                Что-то пошло не так. Попробуйте ещё раз или напишите нам напрямую.
              </p>
            ) : null}
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="min-w-0 rounded-3xl border border-border-subtle bg-bg-secondary p-8">
          <span className="text-body-sm uppercase tracking-tight text-text-secondary">Почему нам</span>
          <ul className="mt-5 flex flex-col gap-4">
            {hero.metrics.map((m) => (
              <li key={m.label} className="flex flex-col gap-1 border-b border-border-subtle pb-4 last:border-0 last:pb-0">
                <span className="font-display text-lg uppercase text-accent">{m.value}</span>
                <span className="text-body-sm text-text-muted">{m.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-border-subtle pt-8">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-3 text-body-sm text-text-primary transition-colors duration-300 hover:text-accent"
            >
              <IconPhone className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-body-sm text-text-primary transition-colors duration-300 hover:text-accent"
            >
              <IconMail className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>

          <p className="mt-8 border-t border-border-subtle pt-8 text-body-sm text-text-secondary">
            Отвечаем в течение 30 минут в рабочее время — обсудим задачу голосом или в мессенджере, без давления на покупку.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

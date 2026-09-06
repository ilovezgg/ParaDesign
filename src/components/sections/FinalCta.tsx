"use client";

import { FormEvent, useState } from "react";
import { finalCta } from "@/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconDoc, IconTelegram, IconWhatsapp, IconPhone, IconVk } from "@/components/ui/icons";
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const messenger = String(form.get("messenger") || "");
    const comment = String(form.get("comment") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Введите имя";
    if (!/^[+\d][\d\s()-]{6,}$/.test(phone)) nextErrors.phone = "Введите корректный телефон";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const result = await submitContactForm({ name, phone, messenger, comment });
      setStatus(result.ok ? "success" : "error");
      if (result.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacts" className="py-section-y">
      <Container>
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
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-body-sm text-text-primary transition-colors duration-300 hover:bg-text-primary hover:text-bg-primary"
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

            <select
              name="messenger"
              aria-label="Удобный способ связи"
              defaultValue=""
              className="w-full rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-body text-text-primary focus:border-accent focus:outline-none"
            >
              <option value="" disabled>
                Удобный способ связи
              </option>
              {finalCta.form.messengers.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <textarea
              name="comment"
              placeholder="Комментарий к проекту"
              aria-label="Комментарий к проекту"
              rows={4}
              className="w-full resize-none rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-accent bg-accent px-6 py-3 text-body-sm font-medium uppercase tracking-tight text-accent-ink transition-colors duration-300 hover:bg-transparent hover:text-accent disabled:opacity-60"
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
      </Container>
    </section>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconClose } from "@/components/ui/icons";
import { SERVICE_MODAL_EVENT } from "@/lib/serviceModal";
import { submitContactForm } from "@/lib/formAction";
import { formatPhone } from "@/lib/formatPhone";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { services, consent } from "@/content";

type Status = "idle" | "loading" | "success" | "error";

export function ServiceModal() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const index = (e as CustomEvent<number>).detail;
      setActiveIndex(index);
      setStatus("idle");
      setErrors({});
      setFile(null);
      setAgreed(false);
    };
    window.addEventListener(SERVICE_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(SERVICE_MODAL_EVENT, onOpen);
  }, []);

  const open = activeIndex !== null;
  const service = activeIndex !== null ? services.items[activeIndex] : null;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dialogRef = useFocusTrap<HTMLDivElement>(open);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const comment = String(form.get("comment") || "").trim();
    const figmaLink = String(form.get("figmaLink") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Введите имя";
    if (phone.replace(/\D/g, "").length < 11) nextErrors.phone = "Введите корректный телефон";
    if (!agreed) nextErrors.agreed = consent.error;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const result = await submitContactForm({
        name,
        phone,
        messenger: "",
        comment: service ? `[${service.title}] ${comment}` : comment,
        figmaLink: figmaLink || undefined,
        file,
      });
      setStatus(result.ok ? "success" : "error");
      if (result.ok) {
        e.currentTarget.reset();
        setPhone("");
        setFile(null);
        setAgreed(false);
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && service ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setActiveIndex(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            tabIndex={-1}
            className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-3xl border border-border-subtle bg-bg-secondary focus:outline-none md:grid-cols-2"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Закрыть"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <IconClose className="h-4 w-4" />
            </button>

            <div className="order-2 p-8 md:order-1">
              <h3 id="service-modal-title" className="font-display text-h3 uppercase leading-tight text-text-primary">
                {service.title}
              </h3>
              <p className="mt-2 text-body-sm text-text-secondary">
                Оставьте контакты — обсудим детали и посчитаем стоимость
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Ваше имя"
                    aria-label="Ваше имя"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full rounded-2xl border border-border-subtle bg-bg-primary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                  />
                  {errors.name ? <p className="mt-1 text-body-sm text-red-400">{errors.name}</p> : null}
                </div>

                <div>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="+7 (___) ___-__-__"
                    aria-label="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    onFocus={() => !phone && setPhone("+7")}
                    aria-invalid={Boolean(errors.phone)}
                    className="w-full rounded-2xl border border-border-subtle bg-bg-primary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                  />
                  {errors.phone ? <p className="mt-1 text-body-sm text-red-400">{errors.phone}</p> : null}
                </div>

                <textarea
                  name="comment"
                  placeholder="Пара слов о компании или желаемом сайте"
                  aria-label="Пара слов о компании или желаемом сайте"
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-border-subtle bg-bg-primary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                />

                {service.attachment ? (
                  <div className="flex flex-col gap-3">
                    <label className="flex w-full cursor-pointer flex-col gap-1 rounded-2xl border border-dashed border-border-subtle bg-bg-primary px-5 py-4 text-body-sm text-text-muted transition-colors duration-200 hover:border-accent">
                      <span>{file ? file.name : "Прикрепить файл (Figma-экспорт, ТЗ, архив)"}</span>
                      <input
                        name="file"
                        type="file"
                        accept=".fig,.pdf,.zip,.rar,.7z,.png,.jpg,.jpeg,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                    <input
                      name="figmaLink"
                      type="url"
                      placeholder="Или вставьте ссылку на Figma"
                      aria-label="Ссылка на Figma"
                      className="w-full rounded-2xl border border-border-subtle bg-bg-primary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                    />
                  </div>
                ) : null}

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
                  className="mt-2 inline-flex w-fit items-center gap-3 rounded-full border border-accent bg-accent px-6 py-3 text-body-sm font-semibold uppercase tracking-tight text-accent-ink transition-colors duration-300 hover:bg-transparent hover:text-accent disabled:opacity-60"
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
            </div>

            <div className="order-1 flex flex-col justify-center gap-4 border-b border-border-subtle bg-bg-tertiary p-8 md:order-2 md:border-b-0 md:border-l">
              <span className="font-display text-2xl uppercase text-accent">{service.price}</span>
              <p className="text-body text-text-secondary">{service.modalDescription}</p>
              <div className="flex items-center gap-2 text-body-sm text-text-muted">
                <span>Срок:</span>
                <span className="text-text-primary">{service.duration}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

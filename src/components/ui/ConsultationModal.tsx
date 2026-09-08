"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconClose } from "@/components/ui/icons";
import { CONSULTATION_MODAL_EVENT } from "@/lib/consultationModal";
import { submitContactForm } from "@/lib/formAction";
import { formatPhone } from "@/lib/formatPhone";

type Status = "idle" | "loading" | "success" | "error";

export function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setStatus("idle");
      setErrors({});
    };
    window.addEventListener(CONSULTATION_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(CONSULTATION_MODAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const comment = String(form.get("comment") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Введите имя";
    if (phone.replace(/\D/g, "").length < 11) nextErrors.phone = "Введите корректный телефон";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const result = await submitContactForm({ name, phone, messenger: "", comment });
      setStatus(result.ok ? "success" : "error");
      if (result.ok) {
        e.currentTarget.reset();
        setPhone("");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
            className="relative w-full max-w-md rounded-3xl border border-border-subtle bg-bg-secondary p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <IconClose className="h-4 w-4" />
            </button>

            <h3 id="consultation-modal-title" className="font-display text-h3 uppercase leading-tight text-text-primary">
              Бесплатная консультация
            </h3>
            <p className="mt-2 text-body-sm text-text-secondary">
              Оставьте контакты — расскажем, как получить сайт с заявками
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
                placeholder="Пожелание по сайту или пара слов о компании"
                aria-label="Пожелание по сайту или пара слов о компании"
                rows={3}
                className="w-full resize-none rounded-2xl border border-border-subtle bg-bg-primary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
              />

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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

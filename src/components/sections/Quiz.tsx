"use client";

import { FormEvent, useState } from "react";
import { quiz } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow, IconCheck } from "@/components/ui/icons";
import { submitContactForm } from "@/lib/formAction";

type Status = "idle" | "loading" | "success" | "error";

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = quiz.questions.length;
  const isResultStep = step === totalSteps;

  const handleSelect = (option: string) => {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setStatus("idle");
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Введите имя";
    if (!/^[+\d][\d\s()-]{6,}$/.test(phone)) nextErrors.phone = "Введите корректный телефон";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const comment = quiz.questions
      .map((q, i) => `${q.question} — ${answers[i] ?? ""}`)
      .join("; ");

    setStatus("loading");
    try {
      const result = await submitContactForm({ name, phone, messenger: "", comment: `[Квиз] ${comment}` });
      setStatus(result.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="quiz" className="py-section-y">
      <Container>
        <Reveal>
          <SectionTitle eyebrow={quiz.eyebrow}>{quiz.title}</SectionTitle>
          <p className="mt-4 max-w-md text-body text-text-secondary">{quiz.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 max-w-xl">
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i < step || isResultStep ? "bg-accent" : "bg-border-subtle"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 min-w-0 rounded-3xl border border-border-subtle bg-bg-secondary p-6 md:p-10">
            {!isResultStep ? (
              <div>
                <span className="text-body-sm text-text-muted">
                  Вопрос {step + 1} из {totalSteps}
                </span>
                <h3 className="mt-3 break-words font-display text-[clamp(1.25rem,1.6vw+1rem,1.75rem)] uppercase leading-[1.15] text-text-primary">
                  {quiz.questions[step].question}
                </h3>
                <div className="mt-6 flex flex-col gap-3">
                  {quiz.questions[step].options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-body-sm text-text-primary transition-colors duration-300 ${
                        answers[step] === option
                          ? "border-accent bg-accent/10"
                          : "border-border-subtle hover:border-accent/60"
                      }`}
                    >
                      <span className="break-words">{option}</span>
                      <IconArrow className="h-4 w-4 shrink-0 text-text-muted transition-colors duration-300 group-hover:text-accent" aria-hidden="true" />
                    </button>
                  ))}
                </div>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="mt-6 text-body-sm text-text-muted underline underline-offset-4 hover:text-text-primary"
                  >
                    Назад
                  </button>
                ) : null}
              </div>
            ) : status === "success" ? (
              <div className="flex flex-col items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
                  <IconCheck className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="text-body text-text-primary">
                  Спасибо! Мы разобрали ваши ответы и свяжемся с вами в ближайшее время.
                </p>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="text-body-sm text-text-muted underline underline-offset-4 hover:text-text-primary"
                >
                  Пройти ещё раз
                </button>
              </div>
            ) : (
              <div>
                <h3 className="break-words font-display text-[clamp(1.25rem,1.6vw+1rem,1.75rem)] uppercase leading-[1.15] text-text-primary">
                  {quiz.resultTitle}
                </h3>
                <p className="mt-3 max-w-sm break-words text-body-sm text-text-secondary">{quiz.resultSubtitle}</p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                  <div>
                    <input
                      name="name"
                      type="text"
                      placeholder="Ваше имя"
                      aria-label="Ваше имя"
                      aria-invalid={Boolean(errors.name)}
                      className="w-full rounded-2xl border border-border-subtle bg-bg-tertiary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
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
                      className="w-full rounded-2xl border border-border-subtle bg-bg-tertiary px-5 py-4 text-body text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                    />
                    {errors.phone ? <p className="mt-1 text-body-sm text-red-400">{errors.phone}</p> : null}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-fit items-center gap-3 rounded-full border border-accent bg-accent px-6 py-3 text-body-sm font-semibold uppercase tracking-tight text-accent-ink transition-colors duration-300 hover:bg-transparent hover:text-accent disabled:opacity-60"
                  >
                    {status === "loading" ? "Отправка..." : quiz.submitCta}
                  </button>
                  {status === "error" ? (
                    <p role="alert" className="text-body-sm text-red-400">
                      Что-то пошло не так. Попробуйте ещё раз или напишите нам напрямую.
                    </p>
                  ) : null}
                </form>

                <button
                  type="button"
                  onClick={handleBack}
                  className="mt-4 text-body-sm text-text-muted underline underline-offset-4 hover:text-text-primary"
                >
                  Назад к вопросам
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

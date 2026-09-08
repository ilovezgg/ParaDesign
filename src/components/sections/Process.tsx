import { process } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="process" className="py-section-y">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Как мы работаем">{process.title}</SectionTitle>
        </Reveal>

        {/* Mobile: vertical list with connecting line (old design, kept for phones only) */}
        <div className="mt-16 flex flex-col gap-8 md:hidden">
          {process.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.04} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`block h-3 w-3 shrink-0 rounded-full border bg-bg-primary ${
                    step.accent
                      ? "border-accent shadow-[0_0_8px_2px_rgba(198,255,79,0.5)]"
                      : "border-text-secondary"
                  }`}
                />
                {i < process.steps.length - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-border-subtle" />
                ) : null}
              </div>
              <div className="pb-2">
                <span className="text-body-sm text-text-muted">{step.n}</span>
                <p
                  className={`mt-1 w-full font-display text-lg uppercase leading-tight break-words ${
                    step.accent ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tablet + desktop: card grid */}
        <div className="mt-16 hidden gap-4 md:mt-20 md:grid md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 0.05}
              className={`group flex min-w-0 flex-col justify-between gap-8 rounded-2xl border p-6 transition-colors duration-300 ${
                step.accent
                  ? "border-accent bg-accent"
                  : "border-border-subtle bg-bg-secondary hover:border-accent/60"
              }`}
            >
              <span
                className={`font-display text-4xl uppercase leading-none md:text-5xl ${
                  step.accent ? "text-accent-ink" : "text-accent"
                }`}
              >
                {step.n}
              </span>
              <p
                className={`w-full text-[14px] uppercase leading-[1.35] break-words ${
                  step.accent ? "text-accent-ink" : "text-text-primary"
                }`}
              >
                {step.title}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

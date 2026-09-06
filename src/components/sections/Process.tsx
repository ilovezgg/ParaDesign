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

        <div className="mt-16 md:mt-20">
          {/* Tablet (2 cols) + Desktop (4 cols, 2 rows) */}
          <div className="hidden grid-cols-2 gap-x-8 gap-y-10 md:grid lg:grid-cols-4">
            {process.steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.04} className="flex flex-col items-start">
                <span
                  className={`block h-3 w-3 shrink-0 rounded-full border bg-bg-primary ${
                    step.accent
                      ? "border-accent shadow-[0_0_8px_2px_rgba(198,255,79,0.5)]"
                      : "border-text-secondary"
                  }`}
                />
                <span className="mt-4 text-[11px] text-text-muted">{step.n}</span>
                <p
                  className={`mt-2 w-full text-[14px] uppercase leading-[1.35] break-words ${
                    step.accent ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {step.title}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Mobile: vertical list with connecting line */}
          <div className="flex flex-col gap-8 md:hidden">
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
        </div>
      </Container>
    </section>
  );
}

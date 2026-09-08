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

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
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

import { advantages } from "@/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconCheck } from "@/components/ui/icons";

export function Advantages() {
  return (
    <section id="advantages" className="py-section-y">
      <Container>
        <Reveal className="grid grid-cols-1 gap-6 border-b border-border-subtle pb-14 md:grid-cols-3 md:pb-16">
          {advantages.bullets.map((bullet) => (
            <p
              key={bullet}
              className="flex items-start gap-3 font-display text-lg uppercase leading-tight text-text-primary"
            >
              <IconCheck className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              {bullet}
            </p>
          ))}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-6">
          {advantages.cards.map((card, i) => (
            <Reveal key={card.n} delay={i * 0.08}>
              <span className="font-display text-4xl uppercase text-text-muted">{card.n}</span>
              <h3 className="mt-4 font-display text-h3 uppercase leading-tight text-text-primary">
                {card.title}
              </h3>
              <p className="mt-3 text-body-sm text-text-secondary">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

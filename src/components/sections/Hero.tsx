import Image from "next/image";
import { hero } from "@/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="top" className="relative pt-16 pb-24 md:pt-24 md:pb-32">
      <Container>
        <Reveal>
          <h1 className="font-display text-[clamp(2.5rem,4.5vw+1rem,5.7rem)] uppercase leading-[1.15] tracking-[-0.02em] text-text-primary">
            {hero.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line.map((seg, j) =>
                  seg.chip ? (
                    <Image
                      key={j}
                      src={seg.chip}
                      alt=""
                      width={160}
                      height={100}
                      className="mx-[0.3em] inline-block h-[0.62em] w-[1.6em] rounded-full object-cover align-middle"
                    />
                  ) : (
                    <span key={j}>{seg.text}</span>
                  )
                )}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-col items-start gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-body text-text-secondary">{hero.subtitle}</p>
          <Button href={hero.ctaHref} variant="solid">
            {hero.cta}
          </Button>
        </Reveal>

        <Reveal delay={0.2} className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-border-subtle pt-8 md:mt-20">
          {hero.metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2">
              <span className="font-display text-lg uppercase text-text-primary">{m.value}</span>
              <span className="text-body-sm text-text-muted">{m.label}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

import { promoBanner } from "@/content";
import { Container } from "@/components/ui/Container";
import { ConsultationCtaButton } from "@/components/ui/ConsultationCtaButton";
import { Reveal } from "@/components/ui/Reveal";

export function PromoBanner() {
  return (
    <section className="py-4">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-border-subtle bg-bg-secondary px-8 py-10 md:flex-row md:items-center md:px-12 md:py-14">
          <div className="flex items-center gap-6">
            <span className="flex items-baseline font-display text-5xl uppercase text-accent md:text-7xl">
              {promoBanner.percent.split("").map((char, i) =>
                /\d/.test(char) ? (
                  <span key={i} className="inline-block origin-bottom scale-y-125">
                    {char}
                  </span>
                ) : (
                  <span key={i}>{char}</span>
                )
              )}
            </span>
            <div className="max-w-xs">
              <p className="font-display text-lg uppercase leading-tight text-text-primary md:text-xl">
                {promoBanner.title}
              </p>
              <p className="mt-2 text-body-sm text-text-secondary">{promoBanner.text}</p>
            </div>
          </div>
          <ConsultationCtaButton>{promoBanner.cta}</ConsultationCtaButton>
        </Reveal>
      </Container>
    </section>
  );
}

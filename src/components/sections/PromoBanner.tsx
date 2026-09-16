import { promoBanner } from "@/content";
import { Container } from "@/components/ui/Container";
import { ConsultationCtaButton } from "@/components/ui/ConsultationCtaButton";
import { Reveal } from "@/components/ui/Reveal";

export function PromoBanner() {
  return (
    <section className="py-4">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 rounded-3xl border border-border-subtle bg-bg-secondary px-6 py-10 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:px-12 md:py-14 md:text-left">
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-6">
            <span className="flex items-baseline font-display text-6xl uppercase leading-none text-accent md:text-7xl">
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
          <ConsultationCtaButton className="w-full md:w-auto">{promoBanner.cta}</ConsultationCtaButton>
        </Reveal>
      </Container>
    </section>
  );
}

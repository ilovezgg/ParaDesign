import { auditOffer, extraServices } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationCtaButton } from "@/components/ui/ConsultationCtaButton";

export function ExtraServices() {
  return (
    <section id="extra" className="py-section-y">
      <Container>
        <Reveal>
          <SectionTitle eyebrow={extraServices.eyebrow}>{extraServices.title}</SectionTitle>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {extraServices.items.map((item, i) => (
            <Reveal
              key={item.n}
              delay={(i % 3) * 0.08}
              className="flex min-w-0 flex-col rounded-2xl border border-border-subtle bg-bg-secondary p-6"
            >
              <span className="font-display text-4xl uppercase text-text-muted">{item.n}</span>
              <h3 className="mt-4 break-words font-display text-body uppercase text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 break-words text-body-sm text-text-secondary">{item.text}</p>
            </Reveal>
          ))}

          <Reveal
            delay={(extraServices.items.length % 3) * 0.08}
            className="flex min-w-0 flex-col rounded-2xl border border-accent p-6"
          >
            <h3 className="break-words font-display text-body uppercase text-accent">
              {auditOffer.title}
            </h3>
            <p className="mt-2 break-words text-body-sm text-text-secondary">{auditOffer.text}</p>
            <ConsultationCtaButton variant="solid" topic="audit" className="mt-6 w-full justify-between md:mt-auto">
              {auditOffer.cardCta}
            </ConsultationCtaButton>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

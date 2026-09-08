import Image from "next/image";
import { services } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Services() {
  return (
    <section id="services" className="py-section-y">
      <Container>
        <Reveal>
          <SectionTitle>{services.title}</SectionTitle>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, i) => (
            <Reveal
              key={service.title}
              delay={(i % 3) * 0.08}
              className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3 className="font-display text-body uppercase text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-body-sm text-text-secondary">{service.description}</p>
                </div>
                <div className="flex items-center gap-4 text-body-sm text-text-muted">
                  <span>{service.price}</span>
                  <span aria-hidden="true">•</span>
                  <span>{service.duration}</span>
                </div>
                <Button href="#contacts" className="mt-auto w-full justify-between">
                  {service.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

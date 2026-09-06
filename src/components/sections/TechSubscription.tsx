import { techSubscription } from "@/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";

function PhoneMockup() {
  return (
    <div className="relative mx-auto h-[420px] w-[220px] rounded-[36px] border border-border-strong bg-bg-secondary p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] md:h-[480px] md:w-[250px]">
      <div className="h-full w-full overflow-hidden rounded-[26px] bg-bg-primary">
        <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-bg-tertiary" />
        <div className="absolute left-1/2 top-16 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-border-subtle bg-bg-tertiary p-4 shadow-[0_0_24px_rgba(198,255,79,0.08)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-[10px] uppercase tracking-wide text-text-muted">
              {techSubscription.notification.time}
            </span>
          </div>
          <p className="mt-2 text-body-sm font-medium text-text-primary">
            {techSubscription.notification.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TechSubscription() {
  return (
    <section className="py-section-y">
      <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <PhoneMockup />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="font-display text-2xl uppercase text-accent md:text-3xl">
            {techSubscription.price}
          </span>
          <h2 className="mt-4 font-display text-h2 uppercase leading-none text-text-primary">
            {techSubscription.title}
          </h2>
          <p className="mt-5 max-w-md text-body text-text-secondary">{techSubscription.text}</p>
          <ul className="mt-8 flex flex-col gap-4">
            {techSubscription.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-body-sm text-text-secondary">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <Button href={techSubscription.ctaHref} variant="solid" className="mt-10">
            {techSubscription.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

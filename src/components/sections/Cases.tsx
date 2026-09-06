import Image from "next/image";
import { cases } from "@/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Cases() {
  return (
    <section id="cases" className="py-section-y">
      <Container className="flex flex-col gap-20 md:gap-28">
        {cases.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={item.title}
              className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                reversed ? "md:flex-row-reverse" : ""
              }`}
            >
              <Reveal className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-body-sm text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-h3 uppercase leading-tight text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 text-body text-text-secondary">{item.text}</p>
                {item.link ? (
                  <a
                    href={item.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block border-b border-border-strong text-body-sm text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {item.link}
                  </a>
                ) : null}
              </Reveal>

              <Reveal delay={0.1} className="flex-1">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border-subtle bg-bg-secondary">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </Reveal>
            </div>
          );
        })}
      </Container>
    </section>
  );
}

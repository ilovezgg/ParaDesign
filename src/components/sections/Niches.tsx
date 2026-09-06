import { niches } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Pill } from "@/components/ui/Pill";

export function Niches() {
  return (
    <section className="py-section-y" aria-labelledby="niches-title">
      <Container>
        <Reveal>
          <SectionTitle className="max-w-3xl">
            <span id="niches-title">{niches.title}</span>
          </SectionTitle>
        </Reveal>
      </Container>

      <div className="mt-12 flex flex-col gap-4">
        {niches.rows.map((row, i) => (
          <Marquee key={i} direction={i % 2 === 0 ? "left" : "right"} speed={38 + i * 6}>
            {row.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

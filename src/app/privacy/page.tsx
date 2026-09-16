import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { siteConfig, privacyPolicy } from "@/content";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="py-section-y">
        <Container className="max-w-2xl">
          <p className="text-body-sm text-text-secondary">Обновлено {privacyPolicy.updatedAt}</p>
          <h1 className="mt-2 break-words font-display text-h2 uppercase text-text-primary">
            Политика конфиденциальности
          </h1>
          <p className="mt-6 text-body text-text-secondary">{privacyPolicy.intro}</p>

          <div className="mt-12 flex flex-col gap-10">
            {privacyPolicy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-h3 uppercase leading-tight text-text-primary">
                  {section.title}
                </h2>
                <div className="mt-3 flex flex-col gap-3 text-body text-text-secondary">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="font-display text-h3 uppercase leading-tight text-text-primary">
                Контакты
              </h2>
              <p className="mt-3 text-body text-text-secondary">
                По любым вопросам обработки данных пишите на{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-text-primary underline">
                  {siteConfig.email}
                </a>{" "}
                или звоните по номеру{" "}
                <a href={siteConfig.phoneHref} className="text-text-primary underline">
                  {siteConfig.phone}
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

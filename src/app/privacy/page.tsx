import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
  return (
    <main className="py-section-y">
      <Container className="max-w-2xl">
        <h1 className="font-display text-h2 uppercase text-text-primary">
          Политика конфиденциальности
        </h1>
        <div className="mt-8 flex flex-col gap-4 text-body text-text-secondary">
          <p>
            {siteConfig.legalName} обрабатывает персональные данные, переданные через форму
            обратной связи на сайте, исключительно для связи с вами по вопросу вашего проекта.
          </p>
          <p>
            Данные не передаются третьим лицам, кроме сервисов, необходимых для обработки заявки
            (например, мессенджеров, указанных вами как способ связи).
          </p>
          <p>
            По вопросам обработки данных пишите на{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-text-primary underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </main>
  );
}

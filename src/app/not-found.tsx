import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center py-section-y">
        <Container className="flex flex-col items-center gap-6 text-center">
          <p className="font-display text-display uppercase leading-none text-accent">404</p>
          <h1 className="max-w-xl break-words font-display text-h2 uppercase leading-tight text-text-primary">
            Страница не найдена
          </h1>
          <p className="max-w-md text-body text-text-secondary">
            Такой страницы нет или она была перемещена. Возможно, ссылка устарела — вернитесь на
            главную и найдите нужный раздел там.
          </p>
          <Button href="/" variant="solid">
            На главную
          </Button>
        </Container>
      </main>
      <Footer />
    </>
  );
}

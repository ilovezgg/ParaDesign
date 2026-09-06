import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { Niches } from "@/components/sections/Niches";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { Advantages } from "@/components/sections/Advantages";
import { TechSubscription } from "@/components/sections/TechSubscription";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromoBanner />
        <Niches />
        <Process />
        <Services />
        <Cases />
        <Advantages />
        <TechSubscription />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

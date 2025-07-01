import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import Founders from "@/app/about/founders/page";
import FAQ from "@/app/faq/page";
import Contact from "@/app/contact/page";


export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Achievements />
      <Founders />
      <FAQ />
      <Contact />

    </main>
  );
}

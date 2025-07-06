import { Hero } from "@/components/Hero";

import { Achievements } from "@/components/Achievements";
import Founders from "@/app/about/founders/page";
import FAQ from "@/app/faq/page";
import Contact from "@/app/contact/page";
import Aboutus from "@/app/about/page";


export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Aboutus />
      
      <Achievements />
      <Founders />
      <FAQ />
      <Contact />

    </main>
  );
}

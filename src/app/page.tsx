import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Achievements />
    </main>
  );
}

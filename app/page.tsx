import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/marquee";
import { Manifesto } from "@/components/manifesto/manifesto";
import { Process } from "@/components/process/process";
import { CocktailGenerator } from "@/components/cocktail/cocktail";
import { Press } from "@/components/press";
import { FindUs } from "@/components/findus/findus";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      {/* Content flows above the fixed hero so the R3F canvas shows through transparent sections */}
      <div className="relative z-[10] mt-[100vh]">
        <Marquee />
        <Manifesto />
        <Process />
        <CocktailGenerator />
        <Press />
        <FindUs />
        <Footer />
      </div>
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Communities from "@/components/sections/Communities";
import Events from "@/components/sections/Events";
import Sponsors from "@/components/sections/Sponsors";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Communities />
        <Events />
        <Sponsors />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

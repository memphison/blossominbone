import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Music from "@/components/Music/Music";
import Tour from "@/components/Tour/Tour";
import RoadStories from "@/components/RoadStories/RoadStories";
import Merch from "@/components/Merch/Merch";
import Media from "@/components/Media/Media";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Music />
        <Tour />
        <RoadStories />
        <Merch />
        <Media />
      </main>
      <Footer />
    </>
  );
}

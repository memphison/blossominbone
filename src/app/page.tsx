import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Music from "@/components/Music/Music";
import Tour from "@/components/Tour/Tour";
import RoadStories from "@/components/RoadStories/RoadStories";
import Merch from "@/components/Merch/Merch";
import Media from "@/components/Media/Media";
import Footer from "@/components/Footer/Footer";

// The Tour section queries the database directly; without this the page
// would be fully static and a new tour date added via /admin wouldn't
// show up until the next deploy. Revalidating periodically keeps the
// rest of the page's static/CDN-cached performance while still picking
// up admin changes within a minute or so.
export const revalidate = 60;

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

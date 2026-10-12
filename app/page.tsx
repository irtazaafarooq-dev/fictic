import Intro from '@/components/Intro';
import Viewfinder from '@/components/Viewfinder';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Showreel from '@/components/Showreel';
import Suite from '@/components/Suite';
import Reveals from '@/components/Reveals';
import { Toolkit, Learn, Promo, Footer } from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Intro />
      <Viewfinder />
      <Reveals />
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        <Showreel />
        <Suite />
        <Toolkit />
        <Learn />
        <Promo />
      </main>
      <Footer />
    </>
  );
}

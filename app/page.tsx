import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

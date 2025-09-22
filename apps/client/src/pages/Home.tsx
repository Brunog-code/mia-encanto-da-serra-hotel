import {
  Hero,
  About,
  Rooms,
  ScrollButton,
  Promotion,
  Structure,
  Gallery,
  Testimonials,
  Faq,
  Contact,
} from "@/components";
import { Element } from "react-scroll";

export const Home = () => {
  return (
    <div>
      <Element name="Inicio">
        <Hero />
      </Element>
      <Element name="Sobre">
        <About />
      </Element>
      <Element name="Quartos">
        <Rooms />
      </Element>
      <Element name="Pacotes e ofertas">
        <Promotion />
      </Element>
      <Element name="Estrutura">
        <Structure />
      </Element>
      <Element name="Galeria">
        <Gallery />
      </Element>
      <Element name="Depoimentos">
        <Testimonials />
      </Element>
      <Element name="Faq">
        <Faq />
      </Element>
      <Element name="Contato">
        <Contact />
      </Element>
      <ScrollButton />
    </div>
  );
};

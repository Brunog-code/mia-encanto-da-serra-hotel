import {
  Hero,
  About,
  Rooms,
  ScrollButton,
  Promotion,
  Structure
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
      <Promotion />
      <Element name="Estrutura">
        <Structure />
      </Element>
      <ScrollButton />
    </div>
  );
};

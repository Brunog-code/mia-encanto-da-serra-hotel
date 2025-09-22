import { SwiperAbout } from "@/components";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export const About = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -window.innerWidth }, // largura da tela como ponto de partida
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 150 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full min-h-screen h-auto flex flex-col items-center pt-10 px-10 bg-white-gost-500 ">
      <div className="space-y-5 flex flex-col">
        <h1
          ref={titleRef}
          className="text-3xl md:text-4xl text-bistre-600 font-semibold text-center mt-12"
        >
          Sobre o hotel
        </h1>

        <div className="flex-1">
          <p
            ref={textRef}
            className="text-lg md:text-xl leading-relaxed  mt-6 text-justify"
          >
            Desde sua inauguração em 2015, o Mia Encanto da Serra Hotel se
            dedica a proporcionar experiências únicas e inesquecíveis em Campos
            do Jordão. Com 35 quartos cuidadosamente planejados, unimos luxo,
            conforto e aconchego, oferecendo aos hóspedes um refúgio acolhedor
            em meio à beleza natural da região. Cada estadia é pensada para ser
            memorável, em um ambiente que valoriza cada detalhe, celebrando
            charme, sofisticação e o prazer de se sentir em casa, mesmo estando
            longe dela.
          </p>
        </div>
      </div>

      <div className="self-center w-fit mt-6 ">
        <SwiperAbout />
      </div>
    </section>
  );
};

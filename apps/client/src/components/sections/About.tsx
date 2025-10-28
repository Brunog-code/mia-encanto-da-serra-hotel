import { SwiperAbout } from "@/components";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { api } from "@/lib/axios";

export const About = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  const [imgs, setImgs] = useState<string[] | undefined>(undefined);

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

  useEffect(() => {
    interface MediaImage {
      id: string;
      category: string;
      url: string;
      title: string;
      createdAt: string;
    }

    const featchAllImgs = async () => {
      const titles = [
        "hotel-gramado.webp",
        "hotel-vista-lateral.webp",
        "hotel-imagem-aerea.webp",
        "activities-pscina-hotel-aquecida-2.webp",
        "activities-massagem.webp",
      ];

      try {
        const response = await api.get<MediaImage[]>("/images", {
          params: { title: titles },
        });

        if (response.data) {
          const imgsAbout = response.data.map((item) => item.url);
          setImgs(imgsAbout);
        }
      } catch (error) {
        console.error(error);
      }
    };

    featchAllImgs();
  }, []);

  return (
    <section className="flex flex-col items-center bg-white-gost-500 px-10 pt-10 w-full min-h-screen">
      <div className="flex flex-col space-y-5">
        <h1
          ref={titleRef}
          className="mt-12 font-semibold text-bistre-600 text-3xl md:text-4xl text-center"
        >
          Sobre o hotel
        </h1>

        <div className="flex-1">
          <p
            ref={textRef}
            className="mt-6 text-lg md:text-xl text-justify leading-relaxed"
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

      <div className="self-center mt-6 w-fit">
        <SwiperAbout imgs={imgs ?? []} />
      </div>
    </section>
  );
};

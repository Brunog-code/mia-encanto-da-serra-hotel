import { useEffect, useState } from "react";
import { StructureCard } from "../common/StructureCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Structure = () => {
  const [isMobile, setIsmobile] = useState(false);

  const estructureData = [
    {
      img: "/images/activities/pscina-hotel-aquecida.webp",
      imgAlt: "Piscina",
      title: "Piscina",
      items: [
        "3 piscinas",
        "2 aquecidas",
        "1 infantil",
        "Área com espreguiçadeiras",
      ],
    },
    {
      img: "/images/restaurant/restaurante-cafe-da-manha-4.webp",
      imgAlt: "Restaurante",
      title: "Restaurante",
      items: [
        "Buffet variado",
        "Pratos regionais",
        "Opções vegetarianas",
        "Ambiente climatizado",
        "Amplo cardápio de vinhos",
        "Coquetéis especiais",
        "Área Kids",
      ],
    },
    {
      img: "/images/activities/trilha.webp",
      imgAlt: "Trilha",
      title: "Atividades",
      items: [
        "Trilhas guiadas",
        "Passeios ecológicos",
        "Spa com massagem relaxante",
        "Atividades para crianças",
        "Aventura e lazer",
      ],
    },
  ];

  useEffect(() => {
    const checkScreen = () => setIsmobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".animate0", {
        opacity: 0,
        rotation: -360,
        x: -window.innerWidth,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".animate0",
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".animate1", {
        opacity: 0,
        rotation: 360,
        y: -350,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".animate0",
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".animate2", {
        opacity: 0,
        rotation: 360,
        x: window.innerWidth,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".animate0",
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full min-h-screen h-auto flex flex-col items-center pt-20 px-10 bg-white-gost-500 ">
      <div>
        <h1 className="text-3xl md:text-4xl text-bistre-600 font-semibold text-center">
          Estrutura e atividades
        </h1>
      </div>
      {/* container cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 mt-10 ${
          isMobile ? "gap-y-10" : "gap-x-15"
        }`}
      >
        {estructureData.map((item, index) => (
          <StructureCard
            className={`animate${index}`}
            key={index}
            img={item.img}
            imgAlt={item.imgAlt}
            title={item.title}
            items={item.items}
          />
        ))}
      </div>
    </section>
  );
};

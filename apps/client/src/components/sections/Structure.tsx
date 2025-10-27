import { useEffect, useRef, useState } from "react";
import { StructureCard } from "../common/StructureCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "@/lib/axios";

export const Structure = () => {
  const [isMobile, setIsmobile] = useState(false);

  const [estructureData, setEstructureData] = useState([
    {
      img: "",
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
      img: "",
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
      img: "",
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
  ]);

  const [imagesLoaded, setImagesLoaded] = useState(false); // novo estado
  const sectionRef = useRef<HTMLDivElement>(null); // referência à seção

  //verifica se é mobile
  useEffect(() => {
    const checkScreen = () => setIsmobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  interface MediaImage {
    id: string;
    category: string;
    url: string;
    title: string;
    createdAt: string;
  }

  const titles = [
    "activities-pscina-hotel-aquecida.webp",
    "restaurante-cafe-da-manha-4.webp",
    "activities-trilha.webp",
  ];

  const imgMap: Record<string, string> = {
    Piscina: "activities-pscina-hotel-aquecida.webp",
    Restaurante: "restaurante-cafe-da-manha-4.webp",
    Atividades: "activities-trilha.webp",
  };

  //pega imagens no backend
  useEffect(() => {
    const featchEstructureImg = async () => {
      try {
        const response = await api.get<MediaImage[]>("/images", {
          params: {
            title: titles,
          },
        });

        const updateEstructureData = estructureData.map((item) => {
          const findImg = response.data.find(
            (img) => img.title === imgMap[item.title]
          );
          return { ...item, img: findImg?.url || item.img };
        });

        setEstructureData(updateEstructureData);
        setImagesLoaded(true);
      } catch (error) {
        console.error(error);
        setImagesLoaded(true);
      }
    };

    featchEstructureImg();
  }, []);

  //animacao
  useEffect(() => {
    if (!imagesLoaded) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".animate0", {
        opacity: 0,
        rotation: -360,
        x: -window.innerWidth,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".animate0",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".animate1", {
        opacity: 0,
        rotation: 360,
        y: -350,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".animate1",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".animate2", {
        opacity: 0,
        rotation: 360,
        x: window.innerWidth,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".animate2",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    // Força refresh do ScrollTrigger após animações
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center bg-white-gost-500 px-10 pt-20 pb-15 w-full h-auto"
    >
      <div>
        <h1 className="font-semibold text-bistre-600 text-3xl md:text-4xl text-center">
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
            img={item.img || null}
            imgAlt={item.imgAlt}
            title={item.title}
            items={item.items}
          />
        ))}
      </div>
    </section>
  );
};

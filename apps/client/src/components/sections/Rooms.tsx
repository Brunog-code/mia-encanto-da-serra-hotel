import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { RoomCard } from "@/components";
import { api } from "@/lib/axios";

export const Rooms = () => {
  const sectionRoomRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  interface MediaImage {
    id: string;
    category: string;
    url: string;
    title: string;
    createdAt: string;
  }
  interface IRooms {
    id: string;
    category: string;
    description: string;
    price: number;
    capacity: number;
    amenities: string[];
    mediaImages: MediaImage[];
  }

  const [rooms, setRooms] = useState<IRooms[] | undefined>(undefined);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRoomRef.current,
        { "clip-path": "circle(5% at 50% 50%)" },
        {
          "clip-path": "circle(100% at 50% 50%)",
          scrollTrigger: {
            trigger: sectionRoomRef.current,
            start: `${isMobile ? "top-=800" : "top-=500"} top`,
            end: "bottom-=500 top", //termina antes do fim do elemento
            scrub: true,
            pin: false,
          },
        }
      );
    }, sectionRoomRef);
    return () => ctx.revert(); //limpa o GSAP quando o componente desmonta
  }, [isMobile]);

  //monitora resize para ajustar start do scrollTrigger
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen(); // roda logo de cara
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const featchRoomsImg = async () => {
      try {
        const response = await api.get<IRooms[]>("/rooms");

        const roomsFormated = response.data.map((room) => ({
          ...room,
          price: Number(room.price),
        }));

        if (response.data) {
          setRooms(roomsFormated);
        }
      } catch (error) {
        console.log(error);
      }
    };
    featchRoomsImg();
  }, []);

  return (
    <section
      ref={sectionRoomRef}
      className="relative flex flex-col items-center bg-bistre-300 px-10 pt-10 w-full h-auto min-h-screen"
    >
      <Element className="flex flex-col space-y-5">
        <h1 className="mt-15 mb-10 font-semibold text-white-gost-500 text-4xl text-center">
          Quartos
        </h1>
      </Element>

      <div className="mx-auto mb-8 w-full max-w-3xl text-white-gost-500 text-justify">
        <p className="text-lg">
          Nosso hotel oferece duas opções de acomodação para tornar sua estadia
          inesquecível: o <strong>Quarto Luxo</strong>, ideal para quem busca
          conforto total e vistas deslumbrantes, e o{" "}
          <strong>Quarto Standard</strong>, perfeito para viajantes que desejam
          praticidade e bem-estar. Ambas as opções incluem Wi-Fi gratuito e café
          da manhã.
        </p>
      </div>

      <div className="flex md:flex-row flex-col justify-evenly items-center w-full">
        {rooms?.map((item) => (
          <RoomCard
            key={item.id}
            id={item.id}
            imgs={item.mediaImages.map((img) => img.url)}
            title={item.category}
            description={item.description}
            capacity={item.capacity}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

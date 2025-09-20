import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { RoomCard } from "@/components";

export const Rooms = () => {
  const sectionRoomRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const roomsHotel = {
    quartoLuxo: {
      title: "Quarto Luxo",
      description:
        "Quarto espaçoso com decoração elegante, cama king-size, varanda com vista para as montanhas, Wi-Fi gratuito e café da manhã incluso.",
      capacity: 6,
      imgs: [
        "/images/room/quarto-luxo.webp",
        "/images/room/quarto-luxo-2.webp",
        "/images/room/quarto-luxo-3.webp",
        "/images/room/quarto-luxo-4.webp",
        "/images/room/quarto-luxo-5.webp",
        "/images/room/quarto-luxo-banheiro.webp",
        "/images/room/quarto-luxo-banheiro-2.webp",
        "/images/room/quarto-luxo-banheiro-3.webp",
      ],
      price: 2500, // preço em reais
    },
    quartoStandard: {
      title: "Quarto Standard",
      description:
        "Quarto confortável com cama queen-size, decoração moderna, Wi-Fi gratuito e café da manhã incluso. Ideal para viajantes a negócios ou lazer.",
      capacity: 6,
      imgs: [
        "/images/room/quarto-stardand.webp",
        "/images/room/quarto-stardand-2.webp",
        "/images/room/quarto-stardand-3.webp",
        "/images/room/quarto-stardand-4.webp",
        "/images/room/quarto-stardand-5.webp",
        "/images/room/quarto-standard-banheiro-1.webp",
        "/images/room/quarto-standard-banheiro-2.webp",
      ],
      price: 1350, // preço em reais
    },
  };

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
            start: `${isMobile ? "top-=700" : "top-=300"} top`,
            end: "bottom-=500 top", //termina antes do fim do elemento
            scrub: true,
            pin: false,
          },
        }
      );
    }, sectionRoomRef);
    return () => ctx.revert(); // limpa o GSAP quando o componente desmonta
  }, [isMobile]);

  //monitora resize para ajustar start do scrollTrigger
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen(); // roda logo de cara
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section
      ref={sectionRoomRef}
      className="w-full min-h-screen h-auto flex flex-col items-center pt-10 px-10 bg-bistre-300 "
    >
      <Element className="space-y-5 flex flex-col">
        <h1 className="text-4xl text-white-gost-500 font-semibold text-center mt-15 mb-10">
          Quartos
        </h1>
      </Element>

      <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
        <div>
          <RoomCard
            imgs={roomsHotel.quartoLuxo.imgs}
            title={roomsHotel.quartoLuxo.title}
            description={roomsHotel.quartoLuxo.description}
            capacity={roomsHotel.quartoLuxo.capacity}
            price={roomsHotel.quartoLuxo.price}
          />
        </div>
        <div>
          <RoomCard
            imgs={roomsHotel.quartoStandard.imgs}
            title={roomsHotel.quartoStandard.title}
            description={roomsHotel.quartoStandard.description}
            capacity={roomsHotel.quartoStandard.capacity}
            price={roomsHotel.quartoStandard.price}
          />
        </div>
      </div>
    </section>
  );
};

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { RoomCard } from "@/components";

export const Rooms = () => {
  const sectionRoomRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  //buscar no banco e passar para o roomcard
  const roomsHotel = {
    quartoLuxo: {
      title: "Quarto Luxo",
      description:
        "Quarto espaçoso com decoração elegante, cama king-size, varanda com vista para as montanhas, Wi-Fi gratuito e café da manhã incluso.",
      capacity: 6,
      imgs: [
        "/images/room/room-luxo.webp",
        "/images/room/room-luxo-2.webp",
        "/images/room/room-luxo-3.webp",
        "/images/room/room-luxo-4.webp",
        "/images/room/room-luxo-5.webp",
        "/images/room/room-luxo-banheiro.webp",
        "/images/room/room-luxo-banheiro-2.webp",
        "/images/room/room-luxo-banheiro-3.webp",
      ],
      price: 2500, // preço em reais
    },
    quartoStandard: {
      title: "Quarto Standard",
      description:
        "Quarto confortável com cama queen-size, decoração moderna, Wi-Fi gratuito e café da manhã incluso. Ideal para viajantes a negócios ou lazer.",
      capacity: 6,
      imgs: [
        "/images/room/room-standard.webp",
        "/images/room/room-standard-2.webp",
        "/images/room/room-standard-3.webp",
        "/images/room/room-standard-4.webp",
        "/images/room/room-standard-5.webp",
        "/images/room/room-standard-banheiro-1.webp",
        "/images/room/room-standard-banheiro-2.webp",
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

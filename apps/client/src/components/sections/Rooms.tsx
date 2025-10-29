import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { RoomCard } from "@/components";
import { api } from "@/lib/axios";
import { useReservation } from "@/contexts/ReservationContext";

export const Rooms = () => {
  const sectionRoomRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  //context
  const { reservationData, checkRoomsAvailability } = useReservation();

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
    roomAvailable?: number | undefined;
  }

  const [rooms, setRooms] = useState<IRooms[]>([]);

  //quando o componente monta, seta o flag para permitir a checagem de disponibilidade
  const [loadCheckAvailability, setLoadCheckAvailability] = useState(false);
  useEffect(() => {
    setLoadCheckAvailability(true);
  }, []);

  //monitora resize para ajustar start do scrollTrigger
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen(); //roda logo de cara
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  //gsap animacao
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
            start: window.innerWidth < 768 ? "top 210%" : "top 80%",
            end: window.innerWidth < 768 ? "bottom 50%" : "bottom 60%",
            scrub: 0.5,
            pin: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        }
      );
    }, sectionRoomRef);

    //Garante recalculo
    ScrollTrigger.refresh();

    return () => ctx.revert(); //limpa o GSAP quando o componente desmonta
  }, []);

  //pega as informacoes e imgs do room
  useEffect(() => {
    const featchRoomsData = async () => {
      try {
        const response = await api.get<IRooms[]>("/rooms");
        const roomsFormated = response.data.map((room) => ({
          ...room,
          price: Number(room.price),
        }));

        setRooms(roomsFormated);
      } catch (error) {
        console.log(error);
      }
    };
    featchRoomsData();
  }, []);

  //monitora as datas da reserva para ver se tem quarto disponivel
  useEffect(() => {
    if (!reservationData?.checkin || !reservationData?.checkout) return;

    const fetchAvailability = async () => {
      const availabilityData = await checkRoomsAvailability();
      if (!availabilityData) return;

      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          const match = availabilityData.find((a) => a.typeId === room.id);
          return {
            ...room,
            roomAvailable: match?._count.id ?? 0, //0 se não houver disponibilidade
          };
        })
      );
    };
    fetchAvailability();
  }, [reservationData, loadCheckAvailability]);

  return (
    <section
      ref={sectionRoomRef}
      style={{ clipPath: "circle(5% at 50% 50%)" }}
      className="relative flex flex-col items-center bg-bistre-300 px-10 pt-10 w-full h-auto will-change-[clip-path]"
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

      <div className="flex flex-wrap justify-center gap-6 px-4 w-full">
        {rooms?.map((item) => (
          <RoomCard
            roomAvailable={item.roomAvailable}
            key={item.id}
            id={item.id}
            imgs={item.mediaImages.map((img) => img.url)}
            title={item.category}
            description={item.description}
            capacity={item.capacity}
            price={item.price}
            reservationData={reservationData}
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full">
        <p className="text-white-gost-500 text-lg">
          Clique em ver detalhes para mais Informações.
        </p>
      </div>
    </section>
  );
};

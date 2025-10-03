// import { useParams } from "react-router-dom";
import { Button, SwiperRoomDetails, Input } from "@/components";
import { gsap } from "gsap";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BedIcon from "@mui/icons-material/Bed";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/lib/axios";

export const RoomDetails = () => {
  interface IRoom {
    id: string;
    category: string;
    description: string;
    price: number;
    capacity: number;
    amenities: string[];
    mediaImages: {
      id: string;
      category: string;
      url: string;
      title: string;
      createdAt: string;
      updatedAt: string;
      roomTypeId: string;
    }[];
  }
  const { id } = useParams<{ id: string }>();

  const [room, setRoom] = useState<IRoom | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-g", {
        x: window.innerWidth,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".animate-imgs", {
        x: -window.innerWidth,
        opacity: 0,
        duration: 0.7,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const featchRoomsImg = async () => {
      try {
        const response = await api.get(`/rooms/${id}`);

        if (response.data) {
          setRoom(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    featchRoomsImg();
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="bg-golden-500 shadow-md mt-5 p-1 rounded-md font-semibold text-white-gost-500 text-3xl text-center">
          {room?.category === 'LUXURY' ? 'QUARTO LUXO' : 'QUARTO STANDARD'}
        </h1>

        <div className="flex md:flex-row flex-col justify-center items-center gap-6 w-full">
          <div className="flex flex-1 justify-center items-center animate-imgs">
            <SwiperRoomDetails
              imgs={room?.mediaImages.map((image) => image.url) || []}
            />
          </div>

          <div className="flex flex-col flex-1 justify-center items-center gap-4 bg-gradient-to-r from-[#f1c070] to-[#e5a84e] shadow-md p-2 rounded-md text-bistre-500 animate-g">
            <span className="font-semibold text-white-gost-500 text-xl">
              Informações
            </span>
            <p>{room?.description}</p>

            <ul className="self-start space-y-1 mt-2 ml-6 list-disc">
              {room?.amenities.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="text-bistre-400" />
                  {item}
                </li>
              ))}
            </ul>

            {/* seção de ocupação */}
            <div className="flex flex-col self-start gap-2 bg-golden-500 shadow-md mt-4 ml-6 p-2 rounded-md">
              <div className="flex items-center gap-3">
                <BedIcon className="text-bistre-400" />
                <span className="font-medium">
                  Capacidade: até {room?.capacity} hóspedes
                </span>
              </div>
              <p className="ml-8 text-sm">
                O que muda é a quantidade de camas. Escolha as datas, e o número
                de hóspedes abaixo.
              </p>
              <div className="flex flex-col w-full">
                <Input type="date" placeholder="Check-in" />
                <Input type="date" placeholder="Check-out" />
                <select className="bg-white-gost-500 px-4 py-3 border border-golden-600 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-bistre-600 text-golden-600">
                  <option value="">Selecione hóspedes</option>
                  <option value="1">1 Hóspede</option>
                  <option value="2">2 Hóspedes</option>
                  <option value="3">3 Hóspedes</option>
                  <option value="4">4 Hóspedes</option>
                  <option value="5">5 Hóspedes</option>
                  <option value="6">6 Hóspedes</option>
                </select>
              </div>
            </div>

            <Button bg="bg-bistre-400" hoverBg="bg-bistre-500">
              Reservar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

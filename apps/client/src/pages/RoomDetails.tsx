// import { useParams } from "react-router-dom";
import { Button, SwiperRoomDetails, Input } from "@/components";
import { gsap } from "gsap";

import BathtubIcon from "@mui/icons-material/Bathtub";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import LandscapeIcon from "@mui/icons-material/Landscape";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WeekendIcon from "@mui/icons-material/Weekend";
import SpaIcon from "@mui/icons-material/Spa";
import TvIcon from "@mui/icons-material/Tv";
import BedIcon from "@mui/icons-material/Bed";
import { useEffect } from "react";

export const RoomDetails = () => {
  // const { id } = useParams<{ id: string }>();

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

  return (
    <section>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="bg-golden-500 shadow-md mt-5 p-1 rounded-md font-semibold text-white-gost-500 text-3xl text-center">
          Quarto Luxo
        </h1>

        <div className="flex md:flex-row flex-col justify-center items-center gap-6 w-full">
          <div className="flex flex-1 justify-center items-center animate-imgs">
            <SwiperRoomDetails />
          </div>

          <div className="flex flex-col flex-1 justify-center items-center gap-4 bg-gradient-to-r from-[#f1c070] to-[#e5a84e] shadow-md p-2 rounded-md text-bistre-500 animate-g">
            <span className="font-semibold text-white-gost-500 text-xl">
              Informações
            </span>
            <p>
              Quarto confortável com cama queen-size, decoração moderna, Wi-Fi
              gratuito e café da manhã incluso. Ideal para viajantes a negócios
              ou lazer.
            </p>

            <ul className="self-start space-y-1 mt-2 ml-6 list-disc">
              <li className="flex items-center gap-2">
                <BathtubIcon /> Banheira de hidromassagem
              </li>
              <li className="flex items-center gap-2">
                <FireplaceIcon /> Lareira privativa
              </li>
              <li className="flex items-center gap-2">
                <LandscapeIcon /> Vista para a montanha
              </li>
              <li className="flex items-center gap-2">
                <LocalBarIcon /> Minibar com bebidas selecionadas
              </li>
              <li className="flex items-center gap-2">
                <MusicNoteIcon /> Sistema de som Bluetooth
              </li>
              <li className="flex items-center gap-2">
                <WeekendIcon /> Área de estar com sofá confortável
              </li>
              <li className="flex items-center gap-2">
                <SpaIcon /> Produtos de banho de luxo
              </li>
              <li className="flex items-center gap-2">
                <TvIcon /> Smart TV 55"
              </li>
              <li className="flex items-center gap-2">
                <BedIcon /> Roupa de cama premium
              </li>
            </ul>

            {/* seção de ocupação */}
            <div className="flex flex-col self-start gap-2 bg-golden-500 shadow-md mt-4 ml-6 p-2 rounded-md">
              <div className="flex items-center gap-3">
                <BedIcon className="" />
                <span className="font-medium">Capacidade: até 6 hóspedes</span>
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

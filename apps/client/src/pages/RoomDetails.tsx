// import { useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

import BathtubIcon from "@mui/icons-material/Bathtub";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import LandscapeIcon from "@mui/icons-material/Landscape";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WeekendIcon from "@mui/icons-material/Weekend";
import SpaIcon from "@mui/icons-material/Spa";
import TvIcon from "@mui/icons-material/Tv";
import BedIcon from "@mui/icons-material/Bed";

export const RoomDetails = () => {
  // const { id } = useParams<{ id: string }>();

  // fazer outra req para pegar as infos do quarto

  return (
    <section className="bg-bistre-300 pb-6 w-full h-auto min-h-screen text-white-gost-500">
      <header className="top-0 z-50 relative flex justify-center bg-white-gost-500 hover:opacity-100 shadow-md p-4 w-full">
        <div className="top-6 left-4 absolute">
          <Link
            to="/"
            className="flex justify-center items-center bg-golden-500 hover:bg-golden-600 p-1 rounded-md font-semibold text-white-gost-500 transition-all duration-300"
          >
            <HomeIcon fontSize="large" />
            <span className="ml-1">Voltar</span>
          </Link>
        </div>
        <div>
          <img src="/images/logo-hotel.png" width={130} alt="Logo-hotel" />
        </div>
      </header>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="bg-golden-500 shadow-md mt-5 mb-10 p-1 rounded-md font-semibold text-white-gost-500 text-3xl text-center">
          Quarto Luxo
        </h1>

        <div className="flex md:flex-row flex-col justify-center items-center gap-6 w-full">
          <div className="flex flex-1 justify-center items-center">
            <span className="font-semibold text-xl">Fotos</span>
          </div>

          <div className="flex flex-col flex-1 justify-center items-center gap-4 bg-gradient-to-r from-[#f1c070] to-[#e5a84e] shadow-md p-2 rounded-md text-bistre-500">
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
                <FireplaceIcon className="" /> Lareira privativa
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
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { ImgGallery } from "../lib/ImgGallery";

import { hotelImages } from "@/data/hotelImages";

export const Gallery = () => {
  const [filter, setFilter] = useState("Todas");

  const filterOptions = [
    "Todas",
    "Hotel",
    "Quartos",
    "Atividades",
    "Restaurante",
  ];

  const allImages = [
    ...hotelImages.room,
    ...hotelImages.activities,
    ...hotelImages.restaurant,
    ...hotelImages.hotel,
  ];

  const filteredImages =
    filter === "Todas"
      ? allImages
      : filter === "Hotel"
      ? hotelImages.hotel
      : filter === "Quartos"
      ? hotelImages.room
      : filter === "Atividades"
      ? hotelImages.activities
      : filter === "Restaurante"
      ? hotelImages.restaurant
      : allImages;

  return (
    <section className="relative w-full min-h-screen h-auto flex flex-col items-center pt-20 bg-bistre-300 pb-20 space-y-10">
      <div>
        <h1 className="text-3xl md:text-4xl text-white-gost-500 font-semibold text-center">
          Galeria de fotos
        </h1>
      </div>

      <div className="w-full">
        <div className="flex gap-6 shadow-md justify-center bg-golden-400 rounded-md w-full md:w-1/2 mx-auto">
          {filterOptions.map((item, index) => (
            <button
              key={index}
              onClick={() => setFilter(item)}
              className={`${
                filter === item ? "text-white-gost-400" : ""
              } font-semibold cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-bistre-400 hover:text-white p-2`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="w-full flex justify-center">
          <ImgGallery filteredImages={filteredImages} />
        </div>
      </div>

      {/* Curva em S */}
      <svg
        className="absolute bottom-0 w-full h-32"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#f5f5f5" // mesma cor do background da div
          d="M0,160 C360,320 1080,0 1440,160 L1440,320 L0,320 Z"
        ></path>
      </svg>
    </section>
  );
};

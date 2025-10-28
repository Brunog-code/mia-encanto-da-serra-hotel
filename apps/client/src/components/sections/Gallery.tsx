import { useEffect, useMemo, useState } from "react";
import { ImgGallery } from "../lib/ImgGallery";
import { api } from "@/lib/axios";

export const Gallery = () => {
  interface MediaImage {
    id: string;
    category: string;
    url: string;
    title: string;
    createdAt: string;
  }

  interface ImgGallery {
    category: string;
    title: string;
    url: string;
  }

  const [filter, setFilter] = useState("Todas");
  const [allImgs, setAllImgs] = useState<ImgGallery[] | null>(null);

  useEffect(() => {
    const featchAllImg = async () => {
      try {
        const response = await api.get<MediaImage[]>("/images");

        const allImages: ImgGallery[] = response.data.map((item) => ({
          category: item.category,
          title: item.title,
          url: item.url,
        }));

        setAllImgs(allImages);
      } catch (error) {
        console.error(error);
      }
    };
    featchAllImg();
  }, []);

  const filterOptions = [
    "Todas",
    "Hotel",
    "Quartos",
    "Atividades",
    "Restaurante",
  ];

  //Mapeamento para converter nomes em categorias do banco
  const categoryMap: Record<string, string> = {
    Todas: "Todas",
    Hotel: "HOTEL",
    Quartos: "ROOM",
    Atividades: "ACTIVITY",
    Restaurante: "RESTAURANT",
  };

  const filteredImages = useMemo(() => {
    if (!allImgs) return [];

    return filter === "Todas"
      ? allImgs
      : allImgs.filter((img) => img.category === filter);
  }, [filter, allImgs]);

  return (
    <section className="relative flex flex-col items-center space-y-10 bg-bistre-300 pt-20 pb-20 w-full h-auto">
      <div>
        <h1 className="font-semibold text-white-gost-500 text-3xl md:text-4xl text-center">
          Galeria de fotos
        </h1>
      </div>

      {/* 🔹 Filtro */}
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-6 bg-golden-400 shadow-md mx-auto p-2 rounded-md w-fit md:w-1/2">
          {filterOptions.map((item, index) => {
            const isActive = filter === categoryMap[item]; //compara com o nome mapeado

            return (
              <button
                key={index}
                onClick={() => setFilter(categoryMap[item])}
                className={`font-semibold cursor-pointer px-4 py-2 rounded-md transition-all duration-300 
                  hover:scale-105 
                  ${
                    isActive
                      ? "bg-white text-bistre-400"
                      : "text-white-gost-400 hover:bg-bistre-400 hover:text-white"
                  }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center mt-10 w-full">
          <ImgGallery filteredImages={filteredImages} />
        </div>
      </div>

      {/* Curva em S */}
      <svg
        className="bottom-0 absolute w-full h-32"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#f5f5f5"
          d="M0,160 C360,320 1080,0 1440,160 L1440,320 L0,320 Z"
        ></path>
      </svg>
    </section>
  );
};

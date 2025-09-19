import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

export const SwiperAbout = () => {
  const images = [
    "/images/hotel/hotel-gramado.webp",
    "/images/hotel/hotel-vista-lateral.webp",
    "/images/hotel/hotel-imagem-aerea.webp",
    "/images/activities/pscina-hotel-aquecida-2.webp",
    "/images/room/quarto-luxo-banheiro-3.webp",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <style>
        {`
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background-color: #ccc; /* cor normal */
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background-color: #2a1d14; /* cor da bolinha ativa */
            width: 14px;
            height: 14px;
          }
          .swiper-pagination {
            bottom: -4px !important; /* quanto maior o valor negativo, mais desce */
          }
        `}
      </style>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        initialSlide={2}
        centeredSlides={true}
        slidesPerView={3} //mostra 3 slides por vez
        spaceBetween={40} //espaço entre os slides
        coverflowEffect={{
          rotate: 0,
          stretch: 70,
          depth: 350,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            className="w-48 h-48" // tamanho reduzido dos cards
          >
            <img src={src} alt={`Slide ${index}`} className="w-fit" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

interface ISwiperAboutProps {
  imgs: string[];
}

export const SwiperAbout = ({ imgs }: ISwiperAboutProps) => {


  return (
    <div className="mx-auto py-10 w-full max-w-5xl">
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
        {imgs.map((src, index) => (
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

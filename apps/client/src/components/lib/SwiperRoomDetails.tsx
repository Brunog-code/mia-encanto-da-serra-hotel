import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

interface ISwiperRoomDetailsProps {
  imgs: string[];
}

export const SwiperRoomDetails = ({ imgs }: ISwiperRoomDetailsProps) => {
  return (
    <div className="relative mx-auto py-10 w-full max-w-5xl">
      <style>
        {`
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background-color: #ccc;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background-color: #2a1d14;
            width: 14px;
            height: 14px;
          }
            
          .swiper-pagination {
            bottom: -4px !important;
          }

          .swiper-button-prev, .swiper-button-next {
            color: #fff; 
            background: rgba(0, 0, 0, 0.5); 
            border-radius: 50%; 
            width: 50px; /* Tamanho das setas */
            height: 50px;
          }

          .swiper-button-prev:hover, .swiper-button-next:hover {
            background: rgba(0, 0, 0, 0.7); 
          }

          .swiper-button-prev svg,
          .swiper-button-next svg {
            width: 20px;  
            height: 20px; 
            transition: all 0.3s ease; /* animação suave */
          }
        `}
      </style>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation
        speed={600}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full"
      >
        {imgs.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="shadow-lg rounded-lg w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Stack,
  Box,
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components";

interface ICardRoom {
  imgs: string[];
  title: string;
  description: string;
  capacity: number;
  price: number; // adiciona o preço
  onQuickReserve?: () => void;
  onViewDetails?: () => void;
}

export const CardRoom = ({
  imgs,
  title,
  description,
  capacity,
  price,
  onQuickReserve,
  onViewDetails,
}: ICardRoom) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, borderRadius: 3, boxShadow: 3 }}>
      {/* Imagem do quarto */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {imgs.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item}
              alt={`Imagem${index + 1}`}
              className="h-[60%] sm:h-full md:h-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Conteúdo do quarto */}
      <CardContent>
        <Typography className="!font-bold !text-2xl !mb-4" >
          {title}
        </Typography>
        <Typography className="!text-bistre-500 !mb-4">
          {description}
        </Typography>

        {/* Capacidade + Preço */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <HotelIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              Até {capacity} {capacity === 1 ? "hóspede" : "hóspedes"}
            </Typography>
          </Stack>

          <Typography className="text-golden-600 !font-bold !text-2xl">
            R$ {price.toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>

      {/* Botões */}
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          px={1}
          pb={1}
        >
          <Button>Reserva Rápida</Button>

          <Button
            px="px-2"
            py="px-1"
            bg="bg-bistre-400"
            hoverBg="bg-bistre-500"
          >
            Ver detalhes
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

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
import { useNavigate } from "react-router-dom";
import { type reservationFormData } from "@/shared/src";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ICardRoom {
  id: string;
  imgs: string[];
  title: string;
  description: string;
  capacity: number;
  price: number; // adiciona o preço
  roomAvailable: number | undefined;
  reservationData?: reservationFormData | null;
}

export const RoomCard = ({
  id,
  imgs,
  title,
  description,
  capacity,
  price,
  roomAvailable,
  reservationData,
}: ICardRoom) => {
  //context
  const { user } = useAuth();

  const navigate = useNavigate();

  const onViewDetails = () => {
    navigate(`/quarto/${id}`); //passar o id que virá do rooms.tsx
  };

  const handleQuickBooking = (id: string) => {
    if (
      !reservationData?.checkin ||
      !reservationData?.checkout ||
      !reservationData?.guests
    ) {
      toast.error(
        "Por favor, selecione a data de check-in e check-out antes de reservar."
      );
      return;
    }

    //verificar se está logado
    if (!user) {
      navigate(`/login?redirect=/confirmar-reserva/${id}`);
    } else {
      navigate(`/confirmar-reserva/${id}`);
    }
  };

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
      <CardContent className="relative">
        {roomAvailable == 0 && (
          <div className="top-4 right-5 z-50 absolute font-bold text-red-500 text-2xl -rotate-12 red-400">
            <span>INDISPONÍVEL</span>
          </div>
        )}
        <Typography className="!mb-4 !font-bold !text-2xl">
          {title === "LUXURY" ? "LUXO" : "STANDARD"}
        </Typography>
        <Typography className="!mb-4 !text-bistre-500">
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

          <Typography className="!font-bold text-golden-600 !text-xl">
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
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: {
              xs: 1,
            },
          }} // ======================
        >
          <Button
            disabled={roomAvailable == 0}
            onClick={() => handleQuickBooking(id)}
          >
            Reserva Rápida
          </Button>

          <Button
            px="px-2"
            py="py-2"
            bg="bg-bistre-400"
            hoverBg="bg-bistre-500"
            onClick={onViewDetails}
          >
            Ver detalhes
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

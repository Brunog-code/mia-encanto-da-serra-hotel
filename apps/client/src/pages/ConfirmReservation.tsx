import { Button } from "@/components";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useReservation } from "@/contexts/ReservationContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import dayjs from "dayjs";
import { formatDateBR } from "@/utils/formatDateBR";

export const ConfirmReservation = () => {
  const { id } = useParams();

  //contexts
  const { user } = useAuth();
  const { reservationData } = useReservation();

  //states
  const [roomData, setRoomData] = useState<IRoomData | null>(null);
  const [userPhone, setUserPhone] = useState(null);

  interface MediaImage {
    id: string;
    category: string;
    url: string;
    title: string;
    createdAt: string;
  }
  interface IRoomData {
    id: string;
    category: string;
    description: string;
    price: number;
    capacity: number;
    amenities: string[];
    mediaImages: MediaImage[];
  }

  //buscar informacoes do quarto
  useEffect(() => {
    const featchRoomData = async () => {
      //buscar dados do quarto
      try {
        const response = await api.get(`/rooms/${id}`);

        const roomsData = response.data;
        setRoomData(roomsData);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Não foi possivel buscar dados do quarto");
        }
      }
    };

    featchRoomData();
  }, []);

  //buscar phone do user logado
  useEffect(() => {
    if (!user?.id) return;

    const featchUserData = async () => {
      try {
        const response = await api.get(`/users/${user?.id}`);

        setUserPhone(response.data.phone);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Não foi possivel buscar dados do usuario");
        }
      }
    };

    featchUserData();
  }, [user]);

  //calculo diarias
  const diffInDays = useMemo(() => {
    if (!reservationData?.checkin || !reservationData?.checkout) return 0;

    const startDate = dayjs(reservationData?.checkin);
    const endDate = dayjs(reservationData?.checkout);
    const diff = endDate.diff(startDate, "day");

    return diff > 0 ? diff : 1;
  }, [reservationData?.checkin, reservationData?.checkout]);

  interface ITotalmount {
    total: number;
    additionalCost: number;
  }

  //valor total
  const totalAmount: ITotalmount = useMemo(() => {
    if (!roomData || !diffInDays)
      return {
        total: 0,
        additionalCost: 0,
      };

    const additionalCost = diffInDays * roomData.price * 0.1 + 100;
    const total = diffInDays * roomData.price + additionalCost;

    return {
      additionalCost,
      total,
    };
  }, [roomData, diffInDays]);

  //cria a reserva no db e prossegue para pagamento
  const handleCreateReservationAndPay = async () => {
    const dataReservation = {
      checkIn: reservationData?.checkin,
      checkOut: reservationData?.checkout,
      guestCount: reservationData?.guests,
      totalAmount: totalAmount.total,
      customerId: user?.id,
      roomTypeId: roomData?.id,
    };

    try {
      const response = await api.post("/reservation", dataReservation);

      console.log(response.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Não foi possivel criar a reserva");
      }
    }
  };

  return (
    <section className="flex flex-col space-y-6 p-4 w-full min-h-screen">
      {/* título */}
      <div>
        <h1 className="bg-golden-500 shadow-md mt-5 p-3 rounded-md font-semibold text-white-gost-500 text-3xl text-center">
          Confirmar reserva
        </h1>
      </div>

      {/* container da confirmação */}
      <div className="flex flex-col gap-y-6 bg-gradient-to-r from-[#f1c070] to-[#e5a84e] shadow-md p-4 rounded-md h-auto text-bistre-400">
        <h3 className="font-semibold text-lg text-center">
          Confira abaixo os detalhes da sua reserva
        </h3>

        {/* card */}
        <div className="flex md:flex-row flex-col gap-y-4 bg-white-gost-500 shadow-md mx-auto rounded-md w-full sm:w-[80%] md:w-[90%]">
          {/* imagem do quarto */}
          <div className="flex justify-center items-center md:w-1/2">
            <img
              src={roomData?.mediaImages[2].url}
              alt="Quarto Luxo"
              className="shadow-md rounded-md w-full h-auto sm:h-[300px] md:h-[400px] object-cover"
            />
          </div>

          {/* informações do quarto */}
          <div className="flex flex-col space-y-4 p-4 md:w-1/2">
            {/* descrição */}
            <span className="bg-bistre-400 p-2 rounded-md font-semibold text-white-gost-500 text-2xl text-center">
              {roomData?.category == "STANDARD"
                ? "Quarto Standard"
                : "Quarto Luxo"}
            </span>
            <p>{roomData?.description}</p>

            {/* Dados do hóspede */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">
                Dados do hóspede principal
              </h4>
              <p>Nome: {user?.name}</p>
              <p>Email: {user?.email}</p>
              <p>Celular: {userPhone}</p>
            </div>

            {/* Dados da reserva */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">Dados da reserva</h4>
              <p>Check-in: {formatDateBR(reservationData?.checkin)}</p>
              <p>Check-out: {formatDateBR(reservationData?.checkout)}</p>
              <p>Hóspedes: {reservationData?.guests}</p>
            </div>

            {/* Resumo financeiro */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">Resumo financeiro</h4>
              <p>
                Valor da diária:{" "}
                {roomData?.price &&
                  new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(roomData.price))}
              </p>
              <p>Quantidade de diárias: {diffInDays}</p>
              <p>
                Taxas adicionais:{" "}
                {totalAmount.additionalCost.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                (serviço + impostos)
              </p>
              <p className="font-bold text-bistre-500 text-lg">
                Valor total:
                {totalAmount.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            {/* Políticas importantes */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">Políticas importantes</h4>
              <ul className="text-bistre-400 text-sm list-disc list-inside">
                <li>
                  Cancelamento: reembolso integral até 48h antes do check-in
                </li>
                <li>Check-in a partir das 14h / Check-out até às 18h</li>
                <li>Inclusões: café da manhã, Wi-Fi, estacionamento</li>
                <li>Exclusões: refeições não inclusas</li>
              </ul>
            </div>

            {/* Preferências adicionais */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">Preferências adicionais</h4>
              <p>
                Para solicitar preferências especiais, entre em contato conosco
                através dos canais de atendimento.
              </p>
            </div>

            {/* Garantia de reserva */}
            <div className="pt-2 border-gray-300 border-t text-gray-600 text-sm italic">
              Sua reserva só será confirmada após a conclusão do pagamento.
            </div>
          </div>
        </div>

        {/* botão de pagamento */}
        <div className="flex justify-end">
          <Button
            bg="bg-bistre-500"
            hoverBg="bg-bistre-600"
            onClick={handleCreateReservationAndPay}
          >
            Continuar para pagamento
          </Button>
        </div>
      </div>
    </section>
  );
};

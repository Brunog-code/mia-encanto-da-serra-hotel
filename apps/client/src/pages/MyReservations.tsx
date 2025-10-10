import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { formatDateBR } from "@/utils/formatDateBR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

interface IReservationData {
  id: string;
  reservationNumber: number;
  checkIn: string;
  checkOut: string;
  customerId: string;
  guestCount: number;
  roomId: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  updateAt: string;
  room: {
    capacity: number;
    createdAt: string;
    id: string;
    number: string;
    status: string;
    typeId: string;
    updateAt: string;
    type: {
      category: string;
      mediaImages: [];
    };
  };
}

export const MyReservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<IReservationData[] | []>([]);

  useEffect(() => {
    //passar o id para o backend
    const fetchReservationsUser = async () => {
      try {
        const response = await api.get(`/reservation/${user?.id}`);

        if (response.data) setReservations(response.data);

        console.log(response.data);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Não foi possivel buscar as reservas");
        }
      }
    };

    fetchReservationsUser();
  }, []);

  return (
    <section className="flex flex-col space-y-6 p-4 w-full min-h-screen">
      <div>
        <h1 className="bg-golden-500 shadow-md mt-5 p-3 rounded-md font-semibold text-white-gost-500 text-3xl text-center">
          Minhas reservas
        </h1>
      </div>

      {/* container */}
      <div className="flex flex-col md:items-center space-y-4 bg-gradient-to-r from-[#f1c070] to-[#e5a84e] shadow-md p-4 rounded-md text-bistre-400">
        {/* containert month and card */}
        {reservations?.map((reservation) => (
          <div className="flex flex-col items-center" key={reservation.id}>
            {/* month */}
            <div className="bg-golden-500 p-1 rounded-md w-1/2">
              <h2 className="font-semibold text-white-gost-500 text-xl">
                {dayjs(reservation.checkIn).format("MMMM [de] YYYY")}
              </h2>
            </div>
            {/* Card */}
            <div className="flex md:flex-row flex-col bg-white-gost-500 shadow-md rounded-md md:w-1/2 overflow-hidden">
              {/* Foto à esquerda */}
              <div className="relative w-full md:w-1/4 h-48 md:h-auto">
                <div className="top-2 left-1 absolute bg-bistre-300 p-1 rounded-md text-white">
                  <span>Reserva: {reservation.reservationNumber}</span>
                </div>
                <img
                  src="/images/hotel/hotel-bg-hero.jpg"
                  alt="Quarto Luxo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Infos à direita */}
              <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
                <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-4">
                  <div>
                    <h3 className="font-bold text-bistre-500 text-lg">
                      {reservation.room?.type?.category == "LUXURY"
                        ? "QUARTO LUXO"
                        : "QUARTO STANDARD"}
                    </h3>
                    <p className="text-bistre-400">
                      Check-in: {formatDateBR(reservation.checkIn)}
                    </p>
                    <p className="text-bistre-400">
                      Check-out: {formatDateBR(reservation.checkOut)}
                    </p>
                    <div className="flex flex-col items-start mt-6">
                      <span className="bg-bistre-400 px-2 py-1 rounded-md font-semibold text-white-gost-500">
                        Status: {reservation.status}
                      </span>
                      <span className="mt-2 font-bold text-golden-600 text-xl">
                        {reservation.totalAmount &&
                          new Intl.NumberFormat("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(reservation.totalAmount))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

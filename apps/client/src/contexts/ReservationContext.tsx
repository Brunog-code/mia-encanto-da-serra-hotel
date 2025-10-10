import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type reservationFormData } from "@/shared/src";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface IAvailability {
  typeId: string;
  _count: { id: number };
}

interface IReservationContext {
  reservationData: reservationFormData | null;
  roomTypeId?: string;
  roomPrice?: number;
  totalAmount?: number;
  setReservation: (data: reservationFormData) => void;
  clearReservation: () => void;
  checkRoomsAvailability: () => Promise<IAvailability[] | undefined>;
}

//cria o contexto
const ReservationContext = createContext<IReservationContext | undefined>(
  undefined
);

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [reservationData, setReservationData] =
    useState<reservationFormData | null>(null);

  useEffect(() => {
    //sessionStorage dados pré-reserva (para persisti as datas e hospedes)
    const sessionDataSaved = sessionStorage.getItem("reservation");
    if (sessionDataSaved) setReservation(JSON.parse(sessionDataSaved));
  }, []);

  //seta a reserva
  const setReservation = (data: reservationFormData) => {
    setReservationData(data);
    sessionStorage.setItem("reservation", JSON.stringify(data));
  };

  //verifica disponibilidade dos quartos
  const checkRoomsAvailability = async (): Promise<
    IAvailability[] | undefined
  > => {
    if (
      !reservationData?.checkin ||
      !reservationData?.checkout ||
      !reservationData?.guests
    )
      return;

    try {
      const response = await api.get(`/rooms/availability`, {
        params: {
          checkIn: reservationData?.checkin,
          checkOut: reservationData?.checkout,
          guests: reservationData?.guests,
        },
      });

      return response.data as IAvailability[];
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao buscar quartos disponiveis");
      }
    }
  };

  //limpa a reserva
  const clearReservation = () => setReservationData(null);

  return (
    <ReservationContext.Provider
      value={{
        reservationData,
        setReservation,
        clearReservation,
        checkRoomsAvailability,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

//hook personalizado
export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context)
    throw new Error(
      "useReservation deve ser usado dentro de ReservationProvider"
    );

  return context;
};

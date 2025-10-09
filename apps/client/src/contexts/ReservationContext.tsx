import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type reservationFormData } from "@/shared/src";

interface IReservationContext {
  reservationData: reservationFormData | null;
  roomTypeId?: string;
  roomPrice?: number;
  totalAmount?: number;
  setReservation: (data: reservationFormData) => void;
  clearReservation: () => void;
}

//cria o contexto
const ReservationContext = createContext<IReservationContext | undefined>(
  undefined
);

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [reservationData, setReservationData] =
    useState<reservationFormData | null>(null);

  useEffect(() => {
    //sessionStorage dados pré-reserva
    const sessionDataSaved = sessionStorage.getItem("reservation");
    if (sessionDataSaved) setReservation(JSON.parse(sessionDataSaved));
  }, []);

  //seta a reserva
  const setReservation = (data: reservationFormData) => {
    setReservationData(data);
    sessionStorage.setItem("reservation", JSON.stringify(data));
  };

  //limpa a reserva
  const clearReservation = () => setReservationData(null);

  return (
    <ReservationContext.Provider
      value={{ reservationData, setReservation, clearReservation }}
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

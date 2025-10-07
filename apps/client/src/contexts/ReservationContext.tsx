import { createContext, useContext, useState, type ReactNode } from "react";
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

  const setReservation = (data: reservationFormData) =>
    setReservationData(data);

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

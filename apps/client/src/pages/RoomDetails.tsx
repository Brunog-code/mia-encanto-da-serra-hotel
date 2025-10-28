// import { useParams } from "react-router-dom";
import { Button, SwiperRoomDetails, Input } from "@/components";
import { gsap } from "gsap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BedIcon from "@mui/icons-material/Bed";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema, type reservationFormData } from "@/shared/src";
import { useReservation } from "@/contexts/ReservationContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const RoomDetails = () => {
  interface IRoom {
    id: string;
    category: string;
    description: string;
    price: number;
    capacity: number;
    amenities: string[];
    mediaImages: {
      id: string;
      category: string;
      url: string;
      title: string;
      createdAt: string;
      updatedAt: string;
      roomTypeId: string;
    }[];
  }
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<IRoom | null>(null);
  const [roomAvailable, setRoomAvailable] = useState<number | null>(null);

  //context
  const { user } = useAuth();
  const { reservationData, setReservation, checkRoomsAvailability } =
    useReservation();

  const navigate = useNavigate();

  //Inicializando o useForm com Zod
  //reservation
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<reservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: reservationData || { checkin: "", checkout: "", guests: "" },
  });

  //animacao
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-g", {
        x: window.innerWidth,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".animate-imgs", {
        x: -window.innerWidth,
        opacity: 0,
        duration: 0.7,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  //pega info do quarto
  useEffect(() => {
    const featchRoomsData = async () => {
      try {
        const response = await api.get(`/rooms/${id}`);

        if (response.data) {
          setRoom(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    featchRoomsData();
  }, []);

  //verifica disponibilidade do quarto quando mudar a reserva
  //Observa as datas de check-in e check-out
  const checkin = watch("checkin");
  const checkout = watch("checkout");
  const guests = watch("guests");

  //useEffect monitora o formulário e força a atualização do contexto
  useEffect(() => {
    const currentCheckin = getValues("checkin");
    const currentCheckout = getValues("checkout");
    const currentGuests = getValues("guests");

    if (!room || !currentCheckin || !currentCheckout || !currentGuests) {
      // Se estiver incompleto, resetamos a disponibilidade e paramos.
      setRoomAvailable(null);
      return;
    }

    //Valida APENAS as regras de datas(check-out > check-in, etc.)
    const dataToValidate = {
      checkin: currentCheckin,
      checkout: currentCheckout,
      guests: currentGuests,
    };

    //Usa o schema completo, mas se falhar, define como 'null' (habilitado)
    const validationResult = reservationSchema.safeParse(dataToValidate);
    if (!validationResult.success) {
      //Se as datas forem inválidas (ex: passado, check-out < check-in)
      setRoomAvailable(null);
      return;
    }

    //Se a validação Zod for BEM-SUCEDIDA, prossegue com a chamada à API
    const fetchAvailability = async () => {
      try {
        // 1. ATUALIZA O CONTEXTO com os dados atuais do FORM
        setReservation({
          checkin: currentCheckin,
          checkout: currentCheckout,
          guests: currentGuests,
        });

        // 2. CHAMA A VERIFICAÇÃO (que agora usará os dados atualizados do contexto)
        const availableRooms = await checkRoomsAvailability();

        if (!availableRooms) {
          setRoomAvailable(0);
          return;
        }

        const matchedRoom = availableRooms.find((r) => r.typeId === room.id);
        setRoomAvailable(matchedRoom ? matchedRoom._count.id : 0);
      } catch (error) {
        console.error("Erro ao verificar disponibilidade:", error);
        setRoomAvailable(0);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchAvailability(); //debouce da chamada
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    checkin,
    checkout,
    room,
    guests,
    checkRoomsAvailability,
    setReservation,
    getValues,
  ]);

  const onSubmitReservation = (data: reservationFormData) => {
    //atualiza o contexto
    setReservation(data);
    if (!data?.checkin || !data?.checkout || !data?.guests) {
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
    <section>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="bg-golden-500 shadow-md mt-5 p-1 rounded-md font-semibold text-white-gost-500 text-3xl text-center">
          {room?.category === "LUXURY" ? "QUARTO LUXO" : "QUARTO STANDARD"}
        </h1>

        <div className="flex md:flex-row flex-col justify-center items-center gap-6 w-full">
          <div className="flex flex-1 justify-center items-center animate-imgs">
            <SwiperRoomDetails
              imgs={room?.mediaImages.map((image) => image.url) || []}
            />
          </div>

          <div className="flex flex-col flex-1 justify-center items-center gap-4 bg-gradient-to-r from-[#f1c070] to-[#e5a84e] shadow-md p-2 rounded-md text-bistre-500 animate-g">
            <span className="font-semibold text-white-gost-500 text-xl">
              Informações
            </span>
            {roomAvailable == 0 &&
              !!reservationData?.checkin &&
              !!reservationData?.checkout && (
                <div className="top-55 right-10 z-50 absolute font-bold text-red-500 text-2xl -rotate-12 red-400">
                  <span>INDISPONÍVEL</span>
                </div>
              )}
            <p>{room?.description}</p>

            <ul className="self-start space-y-1 mt-2 ml-6 list-disc">
              {room?.amenities.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="text-bistre-400" />
                  {item}
                </li>
              ))}
            </ul>

            {/* seção de ocupação */}
            <div className="flex flex-col self-start gap-2 bg-golden-500 shadow-md mt-4 ml-6 p-2 rounded-md">
              <div className="flex items-center gap-3">
                <BedIcon className="text-bistre-400" />
                <span className="font-medium">
                  Capacidade: até {room?.capacity} hóspedes
                </span>
              </div>
              <p className="ml-8 text-sm">
                O que muda é a quantidade de camas. Escolha as datas, e o número
                de hóspedes abaixo.
              </p>
              <form
                className="flex flex-col w-full"
                onSubmit={handleSubmit(onSubmitReservation)}
              >
                <Input
                  type="date"
                  placeholder="Check-in"
                  required
                  {...register("checkin")}
                />
                {errors.checkin && (
                  <span className="text-white text-sm">
                    {errors.checkin.message}
                  </span>
                )}
                <Input
                  type="date"
                  placeholder="Check-out"
                  required
                  {...register("checkout")}
                />
                {errors.checkout && (
                  <span className="text-white text-sm">
                    {errors.checkout.message}
                  </span>
                )}
                <select
                  className="bg-white-gost-500 mb-2 px-4 py-3 border border-golden-600 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-bistre-600 text-golden-600"
                  {...register("guests")}
                >
                  <option value="">Selecione hóspedes</option>
                  <option value="1">1 Hóspede</option>
                  <option value="2">2 Hóspedes</option>
                  <option value="3">3 Hóspedes</option>
                  <option value="4">4 Hóspedes</option>
                  <option value="5">5 Hóspedes</option>
                  <option value="6">6 Hóspedes</option>
                </select>
                {errors.guests && (
                  <span className="text-white text-sm b">
                    {errors.guests.message}
                  </span>
                )}
                <Button
                  type="submit"
                  bg="bg-bistre-400"
                  hoverBg="bg-bistre-500"
                  disabled={
                    roomAvailable == 0 &&
                    !!reservationData?.checkin &&
                    !!reservationData?.checkout
                  }
                >
                  Reservar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

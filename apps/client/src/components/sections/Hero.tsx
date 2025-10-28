import { Button, Input } from "@/components";
import SplitType from "split-type";
import { useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { reservationSchema, type reservationFormData } from "@/shared/src";
import { scroller } from "react-scroll";
import { toast } from "sonner";
import { useReservation } from "@/contexts/ReservationContext";

export const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  //context
  const { setReservation } = useReservation();

  //animacao
  useEffect(() => {
    if (!h1Ref.current) return;

    //Divide em caracteres, mas mantém cada palavra intacta
    const split = new SplitType(h1Ref.current, {
      types: "chars,words",
      wordClass: "word",
      charClass: "char",
    });

    //Aplica estilo para não quebrar palavras
    split.words?.forEach((word) => {
      word.style.display = "inline-block";
      word.style.whiteSpace = "nowrap";
    });

    //Aplica estilo para letras
    split.chars?.forEach((char) => {
      char.style.display = "inline-block";
      char.style.position = "relative";
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        split.chars,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          delay: 0.3,
          stagger: 0.05,
          duration: 0.3,
          ease: "back.out(1.7)",
        }
      );

      gsap.from(".animate-slogan", {
        opacity: 0,
        duration: 1,
        delay:0.7,
        x: -window.innerWidth,
        ease: "power1.out",
      });
    });

    return () => {
      split.revert();
      ctx.revert();
    };
  }, []);

  //sessionStorage dados pré-reserva
  const sessionDataSaved = sessionStorage.getItem("reservation");
  const defaultValues = sessionDataSaved
    ? JSON.parse(sessionDataSaved)
    : { checkin: "", checkout: "", guests: "" };

  //Inicializando o useForm com Zod
  //reservation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<reservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues,
  });

  const onSubmitReservation = (data: reservationFormData) => {
    //inserir as datas e hospedes no context
    setReservation(data);

    //Scroll para a seção "Quartos" após submissão
    scroller.scrollTo("Quartos", {
      smooth: true,
      duration: 500,
      offset: -80,
    });

    toast.warning("Selecione um quarto para continuar a reserva");
  };

  return (
    <section className="relative flex w-full h-screen overflow-hidden">

      {/* imagem */}
      <div className="w-full h-full">
        <img
          src="/images/hotel/hotel-bg-hero.jpg"
          alt="Piscina Hotel"
          className="w-full h-full object-cover"
        />
      </div>

      {/* texto e formulario */}
      <div className="absolute inset-0 flex justify-center items-center px-8">

        <div className="md:px-10 w-full md:text-left text-center">
          
          <div>
            <h1
              ref={h1Ref}
              className="font-bold text-white-gost-500 text-4xl md:text-6xl leading-tight"
            >
              Bem-vindo ao refúgio perfeito em Campos do Jordão
            </h1>
            <p className="bg-bistre-400 shadow-md mt-4 p-1 ps-2 rounded-md w-fit text-white-gost-500 text-lg md:text-2xl animate-slogan">
              Sua experiência de conforto e charme começa aqui
            </p>
          </div>

          <form
            className="flex md:flex-row flex-col justify-center md:justify-start gap-2 bg-white-gost-500 mt-8 p-2 rounded-md w-fit"
            onSubmit={handleSubmit(onSubmitReservation)}
          >
            <div className="flex flex-col">
              <Input
                type="date"
                placeholder="Check-in"
                required
                {...register("checkin")}
              />
              {errors.checkin && (
                <span className="text-red-400 text-sm">
                  {errors.checkin.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                type="date"
                placeholder="Check-out"
                required
                {...register("checkout")}
              />
              {errors.checkout && (
                <span className="text-red-400 text-sm">
                  {errors.checkout.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <select
                className="bg-white-gost-500 px-4 py-3 border border-golden-600 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-bistre-600 text-golden-600"
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
                <span className="text-red-400 text-sm">
                  {errors.guests.message}
                </span>
              )}
            </div>
            <Button type="submit">Reservar</Button>
          </form>

        </div>

      </div>

    </section>
  );
};

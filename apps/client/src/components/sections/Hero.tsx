import { Button, Input } from "@/components";
import SplitType from "split-type";
import { useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";

export const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!h1Ref.current) return;

    // Divide em caracteres, mas mantém cada palavra intacta
    const split = new SplitType(h1Ref.current, {
      types: "chars,words",
      wordClass: "word",
      charClass: "char",
    });

    // Aplica estilo para não quebrar palavras
    split.words?.forEach((word) => {
      word.style.display = "inline-block";
      word.style.whiteSpace = "nowrap";
    });

    // Aplica estilo para letras
    split.chars?.forEach((char) => {
      char.style.display = "inline-block";
      char.style.position = "relative"; // <-- importante
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
    });

    return () => {
      split.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative flex w-screen h-screen overflow-hidden">
      <div className="w-full h-full">
        <img
          src="/images/hotel/bg-hero.jpg"
          alt="Piscina Hotel"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center px-8">
        <div className="max-w-4xl md:text-left text-center">
          <div>
            <h1
              ref={h1Ref}
              className="font-bold text-white-gost-500 text-4xl md:text-6xl leading-tight"
            >
              Bem-vindo ao refúgio perfeito em Campos do Jordão
            </h1>
            <p className="bg-bistre-400 shadow-md mt-4 p-1 ps-2 rounded-md w-fit text-white-gost-500 text-lg md:text-2xl">
              Sua experiência de conforto e charme começa aqui
            </p>
          </div>
          <div className="flex md:flex-row flex-col justify-center md:justify-start gap-2 bg-white-gost-500 mt-8 p-2 rounded-md w-fit">
            <Input type="date" placeholder="Check-in" />
            <Input type="date" placeholder="Check-out" />
            <select className="bg-white-gost-500 px-4 py-3 border border-golden-600 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-bistre-600 text-golden-600">
              <option value="">Selecione hóspedes</option>
              <option value="1">1 Hóspede</option>
              <option value="2">2 Hóspedes</option>
              <option value="3">3 Hóspedes</option>
              <option value="4">4 Hóspedes</option>
              <option value="5">5 Hóspedes</option>
              <option value="6">6 Hóspedes</option>
            </select>
            <Button>Reserve agora</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

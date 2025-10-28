import { PromoCard } from "@/components";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export const Promotion = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".left-card").forEach((el) => {
        //transforma em array
        gsap.from(el as HTMLElement, {
          opacity: 0,
          x: window.innerWidth,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el as HTMLElement,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray(".right-card").forEach((el) => {
        gsap.from(el as HTMLElement, {
          opacity: 0,
          x: -window.innerWidth,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el as HTMLElement,
            start: window.innerWidth < 768 ? "top 90%" : "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section className="flex flex-col items-center bg-gradient-to-b from-[#b08c72] to-[#f5f5f5] px-10 pt-10 pb-15 w-full h-auto min-h-screen">
      <div>
        <h1 className="mt-15 mb-10 font-semibold text-white-gost-500 text-4xl text-center">
          Pacotes e ofertas
        </h1>
        <div className="gap-2 grid grid-cols-1 md:grid-cols-2">
          <PromoCard
            className="right-card"
            title="Reserve 5 diarias e ganhe a ceia todos os dias"
            subtitle="Válido para reservas até 31/11/2025"
            badgeText="Oferta"
          />
          <PromoCard
            className="left-card"
            title="Noites de Romance com Decoração especial"
            subtitle="Desfrute de benefícios exclusivos"
            badgeText="Pacote Lua de Mel"
          />
          <PromoCard
            className="right-card"
            title="Férias de Natal: 5 Noites com programação Especial"
            subtitle="Válido para reservas até 01/12/2025"
            badgeText="Pacote Natal 2025"
          />
          <PromoCard
            className="left-card"
            title="Experiência Premium com Vinho Importado"
            subtitle="Garrafa de vinho cortesia durante sua estadia"
            badgeText="Oferta Premium"
          />
        </div>
      </div>
    </section>
  );
};

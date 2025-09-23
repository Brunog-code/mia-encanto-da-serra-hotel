import { TestimonialsCard } from "../common/TestimonialsCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export const Testimonials = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".animate").forEach((el, index) => {
        gsap.from(el, {
          opacity: 0,
          x: -200,
          delay: 0.2 * index,
          duration: 1,
          scrollTrigger: {
            trigger: el, // cada card dispara sozinho
            start: "top 80%",
            toggleActions: "play none play reverse", // anima ao entrar e reinicia ao subir
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      nameUser: "Ana Martins",
      avatar: "https://i.pravatar.cc/150?img=32",
      comment:
        "Adorei minha estadia! O quarto luxo é super confortável, a vista das montanhas é simplesmente deslumbrante e a piscina aquecida fez toda a diferença no friozinho de Campos do Jordão.",
      rating: 5,
      date: "05/01/2025",
    },
    {
      nameUser: "Ricardo Oliveira",
      avatar: "https://i.pravatar.cc/150?img=12",
      comment:
        "O hotel tem um ambiente aconchegante, perfeito para descansar. O cardápio do restaurante é muito variado e a carta de vinhos me surpreendeu pela qualidade!",
      rating: 5,
      date: "20/02/2025",
    },
    {
      nameUser: "Fernanda Souza",
      avatar: "https://i.pravatar.cc/150?img=45",
      comment:
        "Fiquei no quarto standard e mesmo assim me senti muito bem acolhida. Tudo muito limpo, organizado e com um atendimento impecável. Voltarei com certeza!",
      rating: 5,
      date: "15/03/2025",
    },
    {
      nameUser: "Carol Mendes",
      avatar: "https://i.pravatar.cc/150?img=28",
      comment:
        "A piscina aquecida foi o ponto alto da viagem, perfeita para relaxar após passeios pela cidade. O café da manhã também é maravilhoso, cheio de opções frescas.",
      rating: 5,
      date: "10/05/2025",
    },
    {
      nameUser: "Juliano Ribeiro",
      avatar: "https://i.pravatar.cc/150?img=68",
      comment:
        "Um refúgio encantador nas montanhas! Atendimento excelente, quarto luxuoso e uma experiência gastronômica incrível. Recomendo especialmente para casais.",
      rating: 5,
      date: "28/07/2025",
    },
  ];

  return (
    <section className="relative w-full min-h-screen h-auto flex flex-col items-center px-10 bg-white-gost-500 pb-20 pt-20 ">
      <div>
        <h1 className="text-3xl md:text-4xl text-bistre-600 font-semibold text-center">
          Depoimentos de hóspedes
        </h1>
      </div>

      <div className="grid md:grid-cols-3 pt-10">
        {testimonials.map((item, index) => (
          <TestimonialsCard
            className={"animate"}
            key={index}
            nameUser={item.nameUser}
            avatar={item.avatar}
            comment={item.comment}
            rating={item.rating}
            date={item.date}
          />
        ))}
      </div>

      {/* Curva em S */}
      <svg
        className="absolute bottom-0 w-full h-32"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#b08c72" // mesma cor do background da div
          d="M0,160 C360,320 1080,0 1440,160 L1440,320 L0,320 Z"
        ></path>
      </svg>
    </section>
  );
};

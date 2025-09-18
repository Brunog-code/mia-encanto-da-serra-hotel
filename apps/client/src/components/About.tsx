import { SwiperAbout } from "./SwiperAbout";

export const About = () => {
  return (
    <section className="w-full min-h-screen h-auto flex flex-col items-center pt-10 px-10 bg-bistre-300 ">
      <div className="space-y-5 flex flex-col">
        <h1 className="text-4xl text-bistre-600 font-bold text-center">
          Sobre o hotel
        </h1>

        <div className="flex-1">
          <p className="text-lg leading-relaxed md:text-xl mt-6 text-white-gost-500 text-justify">
            Desde sua inauguração em 2015, o Mia Encanto da Serra Hotel se
            dedica a proporcionar experiências únicas e inesquecíveis em Campos
            do Jordão. Com 35 quartos cuidadosamente planejados, unimos luxo,
            conforto e aconchego, oferecendo aos hóspedes um refúgio acolhedor
            em meio à beleza natural da região. Cada estadia é pensada para ser
            memorável, em um ambiente que valoriza cada detalhe, celebrando
            charme, sofisticação e o prazer de se sentir em casa, mesmo estando
            longe dela.
          </p>
        </div>
      </div>

      <div className="self-center w-fit mt-6">
        <SwiperAbout />
      </div>
    </section>
  );
};

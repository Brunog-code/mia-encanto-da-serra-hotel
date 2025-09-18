import { Button } from "@/components";
import { Input } from "@/components";

export const Hero = () => {
  return (
    <section className="w-screen h-screen overflow-hidden flex relative">
      <div className="w-full h-full">
        <img
          src="/images/hotel/bg-hero.jpg"
          alt="Piscina Hotel"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="text-center md:text-left max-w-4xl">
          <div>
            <h1 className="text-white-gost-500 text-5xl md:text-6xl font-bold leading-tight">
              Bem-vindo ao refúgio perfeito em Campos do Jordão
            </h1>
            <p className="bg-bistre-400 shadow-md rounded-md p-1 text-white-gost-500 mt-4 text-lg md:text-2xl w-fit ps-2 ">
              Sua experiência de conforto e charme começa aqui
            </p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-2 justify-center md:justify-start bg-white-gost-500 p-2 w-fit rounded-md">
            <Input type="date" placeholder="Check-in" />
            <Input type="date" placeholder="Check-out" />
            <select className="px-4 py-3 rounded-md text-golden-600 bg-white-gost-500 border border-golden-600 focus:outline-none focus:ring-2 focus:ring-bistre-600 focus:border-transparent">
              <option value="">Selecione hóspedes</option>
              <option value="1">1 Hóspede</option>
              <option value="2">2 Hóspedes</option>
              <option value="3">3 Hóspedes</option>
              <option value="4">4+ Hóspedes</option>
            </select>
            <Button>Reserve agora</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

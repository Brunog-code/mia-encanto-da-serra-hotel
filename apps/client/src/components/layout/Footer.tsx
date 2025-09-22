import { Link } from "react-scroll";
import { Button, Input } from "@/components";

export const Footer = () => {
  return (
    <section className="bg-gray-900 w-full text-white h-[50vh] flex flex-col">
      <div className="h-8 bg-red-500 p-8 flex items-center justify-between bg-gradient-to-r from-[#5a4030] to-[#3d2b1f]">
        <div>decidir</div>
        <div className="flex gap-5 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="#f5f5f5"
            viewBox="0 0 24 24"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.25 2.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="#f5f5f5"
            viewBox="0 0 24 24"
          >
            <path d="M22 12a10 10 0 10-11.5 9.87v-6.99H8v-2.88h2.5V9.5c0-2.46 1.46-3.82 3.7-3.82 1.07 0 2.18.19 2.18.19v2.4h-1.23c-1.21 0-1.59.75-1.59 1.52v1.84h2.7l-.43 2.88h-2.27v6.99A10 10 0 0022 12z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 bg-gradient-to-b from-[#2a1d14] to-[#3d2b1f]  justify-between">
        <div className="flex flex-col space-y-12 md:flex-row  justify-around">
          <div>
            <h2 className="text-white-gost-600 mb-2 text-lg">Links úteis</h2>
            <ul className="flex flex-col">
              {[
                "Sobre",
                "Quartos",
                "Pacotes e ofertas",
                "Estrutura",
                "Galeria",
                "Depoimentos",
                "Faq",
                "Contato",
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  spy={true}
                  className="p-1 rounded-md hover:bg-golden-600 hover:text-white cursor-pointer transition-all duration-300"
                >
                  {item}
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-white-gost-600 mb-2 text-lg">Newsletter</h2>
            <span>Receba nossas novidades:</span>
            <div className="flex flex-col max-w-[60%] md:max-w-full">
              <Input type="email" placeholder="Digite seu email" />
              <Button>Inscrever</Button>
            </div>
          </div>

          <div>
            <h2 className="text-white-gost-600 mb-2 text-lg">
              Métodos de pagamento
            </h2>
            <span>Cartões de crédito/débito:</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>Visa</li>
              <li>Mastercard</li>
              <li>Elo</li>
              <li>Hipercard</li>
              <li>American Express</li>
            </ul>
            <span>Outros meios:</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>PIX</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <div className="flex-1">&copy; Todos os direitos reservados</div>
        </div>
      </div>
    </section>
  );
};

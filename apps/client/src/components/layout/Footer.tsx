import { Link } from "react-scroll";
import { Button, Input } from "@/components";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type newsletterFormData, newsletterSchema } from "@/shared/src";

export const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmitNewslleter = (data: newsletterFormData) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col bg-gray-900 w-full h-auto text-white">
      <div className="flex justify-between items-center bg-red-500 bg-gradient-to-r from-[#5a4030] to-[#3d2b1f] p-8 h-8">
        <div>Mia encanto da serra Hotel</div>
        <div className="flex gap-5">
          <a href="https://web.whatsapp.com/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer"
              viewBox="0 0 24 24"
              fill="#25D366"
            >
              <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12c0 2.117.553 4.122 1.602 5.884L0 24l6.283-1.637A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.205-1.25-6.212-3.48-8.52zM12 22.08a10.04 10.04 0 01-5.35-1.529l-.38-.23-3.73.97.993-3.632-.247-.387A9.963 9.963 0 012.04 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm5.204-7.787c-.272-.136-1.607-.794-1.854-.884-.247-.092-.427-.136-.607.136-.181.272-.697.884-.854 1.064-.157.181-.315.204-.587.068-.272-.136-1.146-.421-2.18-1.346-.807-.718-1.352-1.604-1.513-1.876-.158-.272-.017-.419.119-.555.123-.123.272-.315.407-.473.136-.157.181-.272.272-.454.091-.181.045-.34-.023-.476-.068-.136-.607-1.462-.832-2.004-.219-.524-.443-.454-.607-.462l-.519-.009c-.181 0-.476.068-.725.34-.272.272-1.04 1.016-1.04 2.477 0 1.46 1.065 2.875 1.213 3.074.136.181 2.097 3.197 5.077 4.482.709.306 1.261.489 1.69.625.71.225 1.356.193 1.868.117.571-.082 1.607-.656 1.833-1.29.226-.635.226-1.178.158-1.29-.068-.113-.247-.181-.519-.317z" />
            </svg>
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 hover:scale-120 transition-transform duration-300 cursor-pointer"
            fill="#f5f5f5"
            viewBox="0 0 24 24"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.25 2.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 hover:scale-120 transition-transform duration-300 cursor-pointer"
            fill="#f5f5f5"
            viewBox="0 0 24 24"
          >
            <path d="M22 12a10 10 0 10-11.5 9.87v-6.99H8v-2.88h2.5V9.5c0-2.46 1.46-3.82 3.7-3.82 1.07 0 2.18.19 2.18.19v2.4h-1.23c-1.21 0-1.59.75-1.59 1.52v1.84h2.7l-.43 2.88h-2.27v6.99A10 10 0 0022 12z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between bg-gradient-to-b from-[#2a1d14] to-[#3d2b1f] p-6">
        <div className="flex md:flex-row flex-col justify-around space-y-12">
          <div>
            <h2 className="mb-2 text-white-gost-600 text-lg">Links úteis</h2>
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
                  className="hover:bg-golden-600 p-1 rounded-md hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {item}
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="mb-2 text-white-gost-600 text-lg">Newsletter</h2>
            <span>Receba nossas novidades:</span>
            <form
              className="flex flex-col max-w-[60%] md:max-w-full"
              onSubmit={handleSubmit(onSubmitNewslleter)}
            >
              <Input
                {...register("email")}
                type="email"
                placeholder="Digite seu email"
                px="px-2"
                py="py-1"
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
              <Button px="px-4" py="py-2" type="submit">
                Inscrever
              </Button>
            </form>
          </div>

          <div>
            <h2 className="mb-2 text-white-gost-600 text-lg">
              Métodos de pagamento
            </h2>
            <span>Cartões de crédito/débito:</span>
            <ul className="space-y-1 pl-6 list-disc">
              <li>Visa</li>
              <li>Mastercard</li>
              <li>Elo</li>
              <li>Hipercard</li>
              <li>American Express</li>
            </ul>
            <span>Outros meios:</span>
            <ul className="space-y-1 pl-6 list-disc">
              <li>PIX</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="flex-1">&copy; Todos os direitos reservados</div>
        </div>
      </div>
    </section>
  );
};

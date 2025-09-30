import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@/components";
import { Input } from "@/components";

import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useEffect } from "react";

export const ResetPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-g", {
        opacity: 0,
        x: -window.innerWidth,
        duration: 0.7,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex flex-col justify-center items-center gap-6 pb-20 h-screen overflow-x-hidden">
      {/* Topo com botão voltar + logo */}
      <div className="relative flex justify-center items-center w-[90%]">
        <div>
          <img src="/images/logo-hotel.png" width={130} alt="Logo-Hotel" />
        </div>
      </div>

      {/* Container principal */}
      <div className="z-50 relative flex flex-col rounded-t-lg w-[98%] h-[80%]">
        {/* Cabeçalho */}
        <div className="relative flex flex-col items-center gap-2 bg-gradient-to-t from-[#e5a84e] to-[#c78d38] shadow-md rounded-t-lg h-[50%] text-white-gost-400 animate-g">
          <p className="z-10 relative p-2 font-bold text-3xl">
            Redefinir Senha
          </p>
          <div className="flex items-center gap-2 mx-4 text-center">
            <span>
              Crie uma nova senha para acessar sua conta. Digite e confirme sua
              senha nos campos abaixo.
            </span>
          </div>
        </div>

        {/* Formulário */}
        <div className="top-1/2 left-1/2 absolute flex flex-col justify-center items-center space-y-6 bg-white-gost-400 shadow-lg mt-4 p-4 rounded-t-md w-[80%] md:w-[50%] h-[90%] -translate-x-1/2 -translate-y-1/4 animate-g transform">
          <div>
            <span className="font-bold text-bistre-400 text-2xl">
              Defina sua nova senha
            </span>
          </div>

          <form className="flex flex-col gap-3 w-[80%]">
            <Input type="password" placeholder="Digite sua nova senha" />
            <Input type="password" placeholder="Confirme sua nova senha" />

            <Button>Salvar nova senha</Button>
          </form>
        </div>
      </div>

      {/* Efeito decorativo */}
      <img
        className="-right-20 -bottom-20 absolute"
        src="/images/effect-bg-golden.png"
        alt=""
        width={170}
      />
    </section>
  );
};

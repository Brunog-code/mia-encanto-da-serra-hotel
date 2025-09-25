import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@/components";
import { Input } from "@/components";
import { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import gsap from "gsap";

export const LoginRegister = () => {
  const [isRegister, setisRegister] = useState(false);

  const toggleRegister = () => {
    setisRegister(!isRegister);

    const ctx = gsap.context(() => {
      gsap.killTweensOf(".animate-g");
      gsap.fromTo(
        ".animate-g",
        {
          opacity: 0,
          x: -window.innerWidth,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power4.out",
        }
      );
    });

    return () => ctx.revert();
  };

  return (
    <section className="relative flex flex-col justify-center items-center gap-6 pb-20 h-screen overflow-hidden">
      <div className="relative flex justify-center items-center w-[90%]">
        <div className="top-3 left-1 absolute shadow-md">
          <Link
            to="/"
            className={clsx(
              "flex justify-center items-center p-1 rounded-md font-semibold text-white-gost-500 transition-all duration-300",
              isRegister
                ? "bg-bistre-400 hover:bg-bistre-500"
                : "bg-golden-500 hover:bg-golden-600"
            )}
          >
            <HomeIcon fontSize="large" />
            <span className="ml-1">Voltar</span>
          </Link>
        </div>
        <div>
          <img src="/images/logo-hotel.png" width={130} alt="Logo-Hotel"></img>
        </div>
      </div>

      {/* container login and register */}
      <div className="z-50 relative flex flex-col rounded-t-lg w-[98%] h-[80%]">
        <div
          className={clsx(
            "relative flex flex-col items-center gap-2 shadow-md rounded-t-lg h-[50%] text-white-gost-400",
            isRegister
              ? "bg-gradient-to-r from-[#5a4030] to-[#3d2b1f]"
              : "bg-gradient-to-t from-[#e5a84e] to-[#c78d38]"
          )}
        >
          <p className="z-10 relative p-2 font-bold text-3xl">
            {isRegister ? "Faça seu cadastro" : "Bem vindo de volta"}
          </p>
          <div className="flex items-center gap-2">
            <span className="">
              {isRegister ? "Já tem cadastro?" : "Primeiro acesso?"}
            </span>
            <span
              className={clsx(
                "p-2 rounded-md transition-all duration-300 cursor-pointer select-none",
                isRegister
                  ? "bg-golden-500 hover:bg-golden-600"
                  : "bg-bistre-400 hover:bg-bistre-500"
              )}
              onClick={toggleRegister}
            >
              {isRegister ? "Login" : "Registrar"}
            </span>
          </div>
        </div>

        <div className="top-1/2 left-1/2 absolute flex flex-col justify-center items-center space-y-6 bg-white-gost-400 shadow-lg p-2 rounded-t-md w-[80%] md:w-[50%] h-[90%] -translate-x-1/2 -translate-y-1/4 animate-g transform">
          <div>
            <span className="font-bold text-bistre-400 text-2xl">
              {isRegister ? "Cadastre-se" : "Login"}
            </span>
          </div>
          {isRegister ? (
            "registrar"
          ) : (
            <form className="flex flex-col gap-2 w-[80%]">
              <Input type="email" placeholder="Digite seu email" />
              <Input type="password" placeholder="Digite sua senha" />
              <p className="self-end text-bistre-300 cursor-pointer">
                Esqueci minha senha
              </p>
              <Button>Entrar</Button>
            </form>
          )}
        </div>
      </div>
      {isRegister ? (
        <img
          className="-right-10 -bottom-20 absolute"
          src="/images/effect-bg-bistre.png"
          alt=""
          width={170}
        />
      ) : (
        <img
          className="-right-10 -bottom-20 absolute"
          src="/images/effect-bg-golden.png"
          alt=""
          width={170}
        />
      )}
    </section>
  );
};

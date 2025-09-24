import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@/components";
import { Input } from "@/components";
import { useState } from "react";

export const LoginRegister = () => {
  const [isRegister, setisRegister] = useState(false);



  return (
    <section className="h-screen flex flex-col gap-6 justify-center items-center pb-20 relative  overflow-hidden">
      <div className="flex w-[90%] justify-center items-center relative ">
        <div className="absolute left-2 top-3 shadow-md">
          <Button px="px-1" py="py-1">
            <HomeIcon fontSize="large" />
            <span className="ml-1">Voltar</span>
          </Button>
        </div>
        <div>
          <img src="/images/logo-hotel.png" width={130} alt="Logo-Hotel"></img>
        </div>
      </div>

      {/* container login and register */}
      <div className="  w-[98%] h-[80%] rounded-t-lg flex flex-col relative z-50 ">
        <div className="h-[50%] bg-gradient-to-t from-[#e5a84e] to-[#c78d38] text-white-gost-400 shadow-md  rounded-t-lg relative flex flex-col items-center gap-2">
          <p className="relative z-10 p-2 text-3xl font-bold">
            Bem vindo de volta
          </p>
          <div className="flex gap-2 items-center">
            <span className="">Primeiro acesso?</span>
            <span className="cursor-pointer rounded-md p-1 bg-bistre-400 hover:bg-bistre-500 transition-all duration-300" onClick={() =>}>
              Registrar
            </span>
          </div>
        </div>

        <div className="p-2 absolute top-1/2 left-1/2 w-[80%] shadow-lg h-[90%] rounded-t-md bg-white-gost-400 transform -translate-x-1/2 -translate-y-1/4 flex flex-col justify-center items-center space-y-6">
          <div>
            <span className="text-2xl text-bistre-400 font-bold">Login</span>
          </div>
          <form className="flex flex-col gap-2 w-[80%]">
            <Input type="email" placeholder="Digite seu email" />
            <Input type="password" placeholder="Digite sua senha" />
            <p className="text-bistre-300 self-end cursor-pointer">
              Esqueci minha senha
            </p>
            <Button>Entrar</Button>
          </form>
        </div>
      </div>
      <img
        className="absolute -bottom-20 -right-10"
        src="/images/effect-bg.png"
        alt=""
        width={170}
      />
    </section>
  );
};

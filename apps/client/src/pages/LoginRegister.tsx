import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@/components";
import { Input } from "@/components";
import { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  loginSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/shared/src";

import { api } from "@/lib/axios";

import { toast } from "sonner";

export const LoginRegister = () => {
  const [isRegister, setisRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Inicializando o useForm com Zod
  //register
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const {
    register: RegisterRegister,
    handleSubmit: RegisterHandleSubmit,
    formState: { errors: registerErrors },
  } = registerForm;

  //login
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const {
    register: LoginRegister,
    handleSubmit: LoginHandleSubmit,
    formState: { errors: loginErrors },
  } = loginForm;

  const toggleRegister = () => {
    setisRegister(!isRegister);
    loginForm.reset();
    registerForm.reset();

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

  const onSubmitLogin = (data: LoginFormData) => {
    try{
      const response = api.post('/auth', data)
    }catch(error: any){

    }
  };

  const onSubmitRegister = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const response = await api.post("/users", data);

      //se cadastro foi bem-sucedido
      toast.success(response.data.message);

      //reseta formulario de cadastro
      setisRegister(false);
      registerForm.reset();
      loginForm.reset();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao cadastrar usuário");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col justify-center items-center gap-6 pb-40 h-screen overflow-x-hidden">
      <div className="relative flex justify-center items-center w-[90%]">
        <div className="top-3 left-1 absolute shadow-md">
          <span
            onClick={() => navigate(-1)}
            className={clsx(
              "flex justify-center items-center p-1 rounded-md font-semibold text-white-gost-500 transition-all duration-300 cursor-pointer",
              isRegister
                ? "bg-bistre-400 hover:bg-bistre-500"
                : "bg-golden-500 hover:bg-golden-600"
            )}
          >
            <ArrowBackIcon fontSize="large" />
            <span className="ml-1">Voltar</span>
          </span>
        </div>
        <div>
          <img src="/images/logo-hotel.png" width={130} alt="Logo-Hotel"></img>
        </div>
      </div>

      {/* container login and register */}
      <div className="z-50 relative flex flex-col rounded-t-lg w-[98%] h-[100%]">
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

        <div className="top-1/2 left-1/2 absolute flex flex-col justify-center items-center space-y-6 bg-white-gost-400 shadow-lg p-2 py-10 rounded-t-md w-[80%] md:w-[50%] h-auto -translate-x-1/2 -translate-y-1/7 animate-g transform">
          <div>
            <span className="font-bold text-bistre-400 text-2xl">
              {isRegister ? "Cadastre-se" : "Login"}
            </span>
          </div>
          {isRegister ? (
            <form
              className="flex flex-col gap-2 w-[80%]"
              onSubmit={RegisterHandleSubmit(onSubmitRegister)}
            >
              <Input
                {...RegisterRegister("name")}
                border="border-bistre-600"
                type="text"
                placeholder="Digite seu nome"
              />
              {registerErrors.name && (
                <p className="text-red-400">{registerErrors.name.message}</p>
              )}
              <Input
                {...RegisterRegister("email")}
                border="border-bistre-600"
                type="email"
                placeholder="Digite seu email"
              />
              {registerErrors.email && (
                <p className="text-red-400">{registerErrors.email.message}</p>
              )}
              <Input
                {...RegisterRegister("phone")}
                border="border-bistre-600"
                type="text"
                placeholder="Digite sua telefone"
              />
              {registerErrors.phone && (
                <p className="text-red-400">{registerErrors.phone.message}</p>
              )}
              <Input
                {...RegisterRegister("password")}
                border="border-bistre-600"
                type="password"
                placeholder="Digite sua senha"
              />
              {registerErrors.password && (
                <p className="text-red-400">
                  {registerErrors.password.message}
                </p>
              )}
              <Input
                {...RegisterRegister("confirmPassword")}
                border="border-bistre-600"
                type="password"
                placeholder="Confirme sua senha"
              />
              {registerErrors.confirmPassword && (
                <p className="text-red-400">
                  {registerErrors.confirmPassword.message}
                </p>
              )}

              <Button
                bg="bg-bistre-400"
                hoverBg="bg-bistre-500"
                type="submit"
                disabled={loading}
              >
                {loading ? "Cadastrando...." : "Cadastrar"}
              </Button>
            </form>
          ) : (
            <form
              className="flex flex-col gap-2 w-[80%]"
              onSubmit={LoginHandleSubmit(onSubmitLogin)}
            >
              <Input
                {...LoginRegister("email")}
                type="email"
                placeholder="Digite seu email"
              />
              {loginErrors.email && (
                <p className="text-red-400">{loginErrors.email.message}</p>
              )}
              <Input
                {...LoginRegister("password")}
                type="password"
                placeholder="Digite sua senha"
              />
              {loginErrors.password && (
                <p className="text-red-400">{loginErrors.password.message}</p>
              )}
              <p
                className="self-end text-bistre-300 cursor-pointer"
                onClick={() => navigate("/esqueci-senha")}
              >
                Esqueci minha senha
              </p>
              <Button type="submit">Entrar</Button>
            </form>
          )}
        </div>
      </div>
      {isRegister ? (
        <img
          className="-right-20 -bottom-20 absolute"
          src="/images/effect-bg-bistre.png"
          alt=""
          width={170}
        />
      ) : (
        <img
          className="-right-20 -bottom-20 absolute"
          src="/images/effect-bg-golden.png"
          alt=""
          width={170}
        />
      )}
    </section>
  );
};

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@/components";
import { Input } from "@/components";

import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type forgotPasswordFormData,
} from "@/shared/src";
import { toast } from "sonner";
import { api } from "@/lib/axios";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
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

  //Inicializando o useForm com Zod

  //forgotPass
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmitForgotPass = async (data: forgotPasswordFormData) => {
    setLoading(true)
    try {
      const response = await api.post("/auth/forgot-password", data);
      
      toast.success(response.data.message);
      setLoading(false)

      //redireciona
      navigate("/");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao cadastrar usuário");
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <section className="relative flex flex-col justify-center items-center gap-6 pb-20 h-screen overflow-x-hidden">
      <div className="relative flex justify-center items-center w-[90%]">
        <div className="top-3 left-1 absolute shadow-md">
          <span
            onClick={() => navigate(-1)}
            className="flex justify-center items-center bg-golden-500 hover:bg-golden-600 p-1 rounded-md font-semibold text-white-gost-500 transition-all duration-300 cursor-pointer"
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
      <div className="z-50 relative flex flex-col rounded-t-lg w-[98%] h-[80%]">
        <div className="relative flex flex-col items-center gap-2 bg-gradient-to-t from-[#e5a84e] to-[#c78d38] shadow-md rounded-t-lg h-[50%] text-white-gost-400 animate-g">
          <p className="z-10 relative p-2 font-bold text-3xl">
            Recuperar senha
          </p>
          <div className="flex items-center gap-2 mx-2">
            <span>
              Digite o e-mail cadastrado em sua conta. Enviaremos um link para
              redefinir sua senha.
            </span>
          </div>
        </div>

        <div className="top-1/2 left-1/2 absolute flex flex-col justify-center items-center space-y-6 bg-white-gost-400 shadow-lg mt-4 p-2 rounded-t-md w-[80%] md:w-[50%] h-[90%] -translate-x-1/2 -translate-y-1/4 animate-g transform">
          <div>
            <span className="font-bold text-bistre-400 text-2xl">
              Esqueci minha senha
            </span>
          </div>

          <form
            className="flex flex-col gap-2 w-[80%]"
            onSubmit={handleSubmit(onSubmitForgotPass)}
          >
            <Input
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}

            <Button type="submit">Enviar link de redefinição</Button>
          </form>
        </div>
      </div>

      <img
        className="-right-20 -bottom-20 absolute"
        src="/images/effect-bg-golden.png"
        alt=""
        width={170}
      />
    </section>
  );
};

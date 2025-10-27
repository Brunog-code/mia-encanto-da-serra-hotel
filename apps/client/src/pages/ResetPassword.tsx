import { Button } from "@/components";
import { Input } from "@/components";

import gsap from "gsap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { resetPasswordSchema, type resetPasswordFormData } from "@/shared/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/axios";

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { token } = useParams();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmitResetPass = async (data: resetPasswordFormData) => {
    setLoading(true);
    try {
      const response = await api.post(`/auth/reset-password/${token}`, data);

      toast.success(response.data.message);

      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Erro ao redefinir a senha");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col justify-start items-center gap-6 pb-2 min-h-screen overflow-x-hidden">

      {/* Topo com botão voltar + logo */}
      <div className="relative flex justify-center items-center w-[90%]">
        <div>
          <img src="/images/logo-hotel.png" width={130} alt="Logo-Hotel" />
        </div>
      </div>

      {/* Container principal */}
      <div className="z-10 flex flex-col justify-center items-center rounded-t-lg w-[98%] max-w-7xl min-h-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center gap-2 bg-gradient-to-t from-[#e5a84e] to-[#c78d38] shadow-md pb-25 rounded-t-lg w-[100%] h-[100%] text-white-gost-400">
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
        <div className="flex flex-col justify-center items-center space-y-6 bg-white-gost-400 shadow-lg -mt-20 p-2 py-10 rounded-t-md w-[90%] md:w-[50%] h-auto animate-g transform">
          <div>
            <span className="font-bold text-bistre-400 text-2xl">
              Defina sua nova senha
            </span>
          </div>

          <form
            className="flex flex-col gap-3 w-[80%]"
            onSubmit={handleSubmit(onSubmitResetPass)}
          >
            <Input
              type="password"
              placeholder="Digite sua nova senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
            <Input
              type="password"
              placeholder="Confirme sua nova senha"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-400">{errors.confirmPassword.message}</p>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Salvar nova senha"}
            </Button>
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

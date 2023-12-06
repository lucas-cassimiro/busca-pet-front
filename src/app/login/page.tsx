"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../assets/logo.png";

import { MdLogin } from "react-icons/md";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório.")
    .email("Informe um endereço de e-mail válido."),
  password_hash: z.string().nonempty("A senha é obrigatória."),
});

type loginFormData = z.infer<typeof loginFormSchema>;

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    reset,
  } = useForm<loginFormData>({
    defaultValues: {
      email: "",
      password_hash: "",
    },
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <div className="bg-[#e2e2e2] w-full h-screen flex justify-center items-center">
      <section className="text-center bg-white w-[390px] h-[550px] border-2 rounded-md flex flex-col items-center border-yellow-500">
        <Image
          src={Logo}
          alt="logo-busca-pet"
          className="w-[35%] h-[22%] mb-[50px] text-center"
        />
        <form>
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              className="bg-[#2e2e2e] w-[350px] mb-[28px] p-[8px] border-none text-[15px] text-white"
              {...register("email")}
            />
            <label className="absolute left-[10px] bottom-[25px] cursor-text mb-[40px] text-sm">
              E-mail
            </label>
          </div>
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="bg-[#2e2e2e] w-[350px] mb-[28px] p-[8px] border-none text-[15px] text-white"
              {...register("password_hash")}
            />
            <label className="absolute left-[10px] bottom-[25px] cursor-text mb-[40px] text-sm">
              Senha
            </label>
          </div>
            {errors.password_hash && (
              <span className="text-xs text-red-500">
                {errors.password_hash.message}
              </span>
            )}
        </form>
        <a href="#" className="ml-[225px] text-sm text-[#0000FF] mb-5">
          Esqueci a senha
        </a>

        <div className="flex items-center gap-2 mb-10">
          <MdLogin />
          <button className="text-sm">ENTRAR</button>
        </div>
        <div className="flex items-center gap-2 mb-5">
          <input type="checkbox" />
          <span>Mantenha-me conectado</span>
        </div>
        <div className="flex gap-2">
          <span>Não possui uma conta?</span>
          <Link href="/register">Criar conta</Link>
        </div>
      </section>
    </div>
  );
}

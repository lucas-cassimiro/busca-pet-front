"use client";

import Image from "next/image";

import Logo from "../../assets/logo.png";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

const createUserFormSchema = z
  .object({
    email: z
      .string()
      .nonempty("O e-mail é obrigatório.")
      .email("Informe um endereço de e-mail válido."),
    password_hash: z.string().nonempty("A senha é obrigatória."),
    confirmPassword: z.string().nonempty("Informe a senha novamente."),
    cellphone: z.string(),
    full_name: z.string().nonempty("Campo obrigatório."),
  })
  .refine(
    ({ password_hash, confirmPassword }) => password_hash === confirmPassword,
    {
      message: "As senhas informadas não correspondem. Tente novamente.",
      path: ["confirmPassword"],
    }
  );

type createUserFormData = z.infer<typeof createUserFormSchema>;

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    reset,
  } = useForm<createUserFormData>({
    defaultValues: {
      email: "",
      password_hash: "",
      confirmPassword: "",
      cellphone: "",
      full_name: "",
    },
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(createUserFormSchema),
  });

  const createUser: SubmitHandler<createUserFormData> = async (
    data: createUserFormData
  ) => {
    try {
      const { confirmPassword, ...postData } = data;

      const url = "http://localhost:3333/users/";

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!request.ok) {
        const errorResponse = await request.json();

        setError("email", { type: "manual", message: errorResponse.message });
      }

      const response = await request.json();

      console.log(response);

      reset();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <>
      <header className="bg-[#ffffff71] py-2 px-[5%]">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="w-[70px] rounded-[50px]" />
        </Link>
      </header>

      <section className="bg-[#e2e2e2]">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="bg-white rounded-md p-8 w-[400px]">
            <h2 className="text-[27px]">Crie sua conta</h2>
            <form onSubmit={handleSubmit(createUser)}>
              <div className="mb-5">
                <label className="text-sm font-bold mb-[10px]">
                  Nome e sobrenome
                </label>
                <input
                  className="bg-none p-[10px] w-[99%] rounded-lg color-black border-[1px] border-[#b9b9b9]"
                  placeholder="Digite seu nome e sobrenome"
                  {...register("full_name")}
                />

                {errors.full_name && (
                  <span className="text-sm text-red-500">
                    {errors.full_name.message}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label className="text-sm font-bold mb-[10px]">
                  Celular (opcional)
                </label>
                <input
                  type="text"
                  id="nome"
                  placeholder="DDD + Celular"
                  className="bg-none p-[10px] w-[99%] rounded-lg color-black border-[1px] border-[#b9b9b9]"
                  {...register("cellphone")}
                />
                {errors.cellphone && (
                  <span className="text-sm text-red-500">
                    {errors.cellphone.message}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label className="text-sm font-bold mb-[10px]">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                  className="bg-none p-[10px] w-[99%] rounded-lg color-black border-[1px] border-[#b9b9b9]"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label className="text-sm font-bold mb-[10px]">Senha</label>
                <input
                  type="password"
                  id="senha1"
                  placeholder="Digite sua senha"
                  className="bg-none p-[10px] w-[99%] rounded-lg color-black border-[1px] border-[#b9b9b9]"
                  {...register("password_hash")}
                />
                {errors.password_hash && (
                  <span className="text-sm text-red-500">
                    {errors.password_hash.message}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label className="text-sm font-bold mb-[10px]">
                  Confirmar a Senha
                </label>
                <input
                  type="password"
                  id="senha2"
                  placeholder="Confirme sua senha"
                  className="bg-none p-[10px] w-[99%] rounded-lg color-black border-[1px] border-[#b9b9b9]"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="bg-black py-[5%] px-[120px] border-none rounded-[10px] cursor-pointer text-base text-white"
              >
                Criar conta
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

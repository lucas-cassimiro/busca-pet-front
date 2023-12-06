import Image from "next/image";

import Logo from "../assets/logo.png";
import GatoeCachorro from "../assets/gato-e-cachorro.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="py-[1px] px-[4%] bg-[#FFC436] fixed top-0 left-0 right-0 flex items-center justify-between">
        <Image src={Logo} alt="Logo" className="rounded-full w-[90px]" />

        <div className="flex gap-5">
          <Link
            href="/register"
            className="flex-col p-[10px] inline-flex cursor-pointer text-xl text-[#0C356A] bg-white justify rounded-xl hover:bg-[#0C356A] hover:text-white"
          >
            Cadastre-se
          </Link>

          <Link
            href="/login"
            className="p-3 inline-flex cursor-pointer text-[20px] bg-[#0C356A] rounded-xl text-white hover:bg-[#2a6fc9]"
          >
            Entrar
          </Link>
        </div>
      </header>

      <div>
        <section className="flex justify-around flex-row items-center">
          <div>
            <h1 className="text-black text-[100px] font-bold">BuscaPet</h1>
            <span className="text-black my-[5px] mx-0 text-[25px] py-[5px] px-[8%]">
              Seja bem-vindo ao nosso sistema de busca de animais perdidos
            </span>
          </div>
          <Image src={GatoeCachorro} alt="Gato e cachorro" />
        </section>
      </div>
    </>
  );
}

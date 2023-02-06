import { useEffect, useState } from "react";
import HomeIllustration from "@/assets/illustrations/home-art.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`flex h-full w-full flex-col lg:flex-row-reverse`}>
      <section
        className={`relative lg:absolute top-0 right-0-0 lg:w-2/3 p-5 lg:p-32 h-full z-10`}
        role={"content"}
      >
        <div className="flex gap-5 md:gap-10 items-center flex-col justify-center h-full text-secondary-base w-full m-auto">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-center">
            {"Bienvenido a UvU APP"}
          </h1>
          <span>
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-center leading-normal lg:leading-relaxed">
              {"UvU APP es una aplicación que te permite chatear con una IA de forma anonima, " +
                "donde a través del entrenamiento que le hemos dado con apoyo de algunos profesionales " +
                "podrás recibir un acompañamiento y apoyo."}
            </p>
          </span>
          <Link href="/chat">
            <button className="bg-primary-600 text-primary-base rounded-lg px-8 py-2 text-center text-lg md:text-5xl font-bold">
              {"CHAT"}
            </button>
          </Link>
        </div>
      </section>
      <section
        className={`relative lg:absolute bottom-0 left-0 p-5 w-full z-0`}
        role={"illustrations"}
      >
        <div className="hidden absolute lg:block lg:fixed bg-primary-200 w-full h-1/2 top-1/2 left-0 -z-10"></div>
        <Image
          src={HomeIllustration}
          alt="Home Illustration"
          width={500}
          height={500}
          className="w-full lg:m-10 lg:w-2/5"
        />
      </section>
    </div>
  );
}

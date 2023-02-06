import { useEffect, useState } from "react";
import HomeIllustration from "@/assets/illustrations/home-art.svg";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    isUser: false,
    message: "Hola, ¿Cómo estás?",
    time: new Date(),
  },
  {
    isUser: true,
    message: "Me siento muy mal",
    time: new Date(),
  },
  {
    isUser: false,
    message: "Entiendo, ¿Qué te pasa?",
    time: new Date(),
  },
  {
    isUser: true,
    message: "Me volvi puto",
    time: new Date(),
  },
];

export default function Chat() {
  const [toggle, setToggle] = useState<Boolean>(false);

  return (
    <div className="p-10 h-full flex m-auto items-center justify-center">
      <div
        className={`flex flex-col w-full md:w-1/2 lg:w-1/4 bg-white shadow-xl rounded-l-lg overflow-y-auto h-full p-1 gap-1 relative ${
          toggle ? "rounded-r-lg" : "hidden"
        }`}
      >
        {toggle && (
          <div className="p-5 block md:hidden border-b border-black/20">
            <button onClick={() => setToggle((prev) => !prev)}>
              Volver al chat
            </button>
          </div>
        )}
        {[...Array(4)].map((_, i) => (
          <button
            key={`data_acompañantes_${i}`}
            className={`flex flex-col h-fit p-4 hover:bg-black/10 border border-black/20 rounded-lg`}
          >
            <div className={`flex w-full mt-2 space-x-3 max-w-xs`}>
              <Image
                src={`https://api.dicebear.com/5.x/bottts/svg?seed=${i + 1}`}
                alt={"Acompañante"}
                width={50}
                height={50}
                className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 p-1`}
              />
              <div>
                <div className={`bg-gray-300 p-3 rounded-r-lg rounded-bl-lg`}>
                  <p className={`text-sm`}>{`Acompañante ${i}`}.</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div
        className={`flex flex-col w-full bg-white shadow-xl rounded-r-lg overflow-hidden h-full relative ${
          toggle ? "hidden md:block" : "rounded-l-lg"
        }`}
      >
        <div className="px-5 py-3 border-b border-black/20">
          <button className="" onClick={() => setToggle((prev) => !prev)}>
            Tuerquita
          </button>
        </div>
        <div className={`flex flex-col h-full p-4 overflow-auto justify-end`}>
          {data.map((item, i) => (
            <div
              key={`data_chat_${i}`}
              className={`flex w-full mt-2 space-x-3 max-w-xs ${
                item.isUser ? " ml-auto justify-end" : ""
              }`}
            >
              <div
                className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
              ></div>
              <div>
                <div
                  className={`${
                    item.isUser ? "bg-blue-600 text-white" : "bg-gray-300"
                  } p-3 rounded-r-lg rounded-bl-lg`}
                >
                  <p className={`text-sm`}>{item.message}</p>
                </div>
                <span className={`text-xs text-gray-500 leading-none`}>
                  {"Enviado a las: "}
                  {item.time.toLocaleTimeString("en-Es", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={`bg-gray-300 p-4`}>
          <input
            className={`flex items-center h-10 w-full rounded px-3 text-sm`}
            type="text"
            placeholder="Escribe tu mmensaje"
          />
        </div>
      </div>
    </div>
  );
}

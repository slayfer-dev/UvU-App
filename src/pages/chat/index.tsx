import { useEffect, useState } from "react";
import HomeIllustration from "@/assets/illustrations/home-art.svg";
import Image from "next/image";
import Link from "next/link";

export default function Chat() {
  const [toggle, setToggle] = useState<Boolean>(false);
  return (
    <div className="p-10 h-full flex">
      <div
        className={`flex flex-col w-full md:w-1/2 lg:w-1/4 bg-white shadow-xl rounded-l-lg overflow-y-auto h-full relative ${
          toggle ? "rounded-r-lg" : "hidden"
        }`}
      >
        {toggle && (
          <div className="p-5 block md:hidden">
            <button onClick={() => setToggle((prev) => !prev)}>
              Volver al chat
            </button>
          </div>
        )}
        {[...Array(4)].map((_, i) => (
          <button
            key={i}
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
        <div className="px-5 py-3">
          <button className="" onClick={() => setToggle((prev) => !prev)}>
            Tuerquita
          </button>
        </div>
        <div className={`flex flex-col h-full p-4 overflow-auto`}>
          <div className={`flex w-full mt-2 space-x-3 max-w-xs`}>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
            <div>
              <div className={`bg-gray-300 p-3 rounded-r-lg rounded-bl-lg`}>
                <p className={`text-sm`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
          </div>
          <div
            className={`flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end`}
          >
            <div>
              <div
                className={`bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg`}
              >
                <p className={`text-sm`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
          </div>
          <div
            className={`flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end`}
          >
            <div>
              <div
                className={`bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg`}
              >
                <p className={`text-sm`}>Lorem ipsum dolor sit amet.</p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
          </div>
          <div className={`flex w-full mt-2 space-x-3 max-w-xs`}>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
            <div>
              <div className={`bg-gray-300 p-3 rounded-r-lg rounded-bl-lg`}>
                <p className={`text-sm`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
          </div>
          <div
            className={`flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end`}
          >
            <div>
              <div
                className={`bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg`}
              >
                <p className={`text-sm`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
          </div>
          <div
            className={`flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end`}
          >
            <div>
              <div
                className={`bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg`}
              >
                <p className={`text-sm`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
          </div>
          <div
            className={`flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end`}
          >
            <div>
              <div
                className={`bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg`}
              >
                <p className={`text-sm`}>Lorem ipsum dolor sit amet.</p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
          </div>
          <div className={`flex w-full mt-2 space-x-3 max-w-xs`}>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
            <div>
              <div className={`bg-gray-300 p-3 rounded-r-lg rounded-bl-lg`}>
                <p className={`text-sm`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
          </div>
          <div
            className={`flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end`}
          >
            <div>
              <div
                className={`bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg`}
              >
                <p className={`text-sm`}>Lorem ipsum dolor sit.</p>
              </div>
              <span className={`text-xs text-gray-500 leading-none`}>
                2 min ago
              </span>
            </div>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
            ></div>
          </div>
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

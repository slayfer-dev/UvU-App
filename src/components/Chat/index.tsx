import React, {
  FormEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import Image, { StaticImageData } from "next/image";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { AcompañanteContext } from "@/context";
import { ACOMPAÑANTES } from "@/constants";

interface IDataMessages {
  isUser: boolean;
  message: string;
  time: Date;
  icon: string | StaticImageData;
}

const STARTER_MESSAGES = (
  acompañante: string,
  icon: string | StaticImageData
) => ({
  isUser: false,
  message: `Hola, soy ${acompañante} y estoy aqui para apoyarte en lo que necesites.`,
  time: new Date(),
  icon,
});

const CHANGE_MESSAGE = (
  acompañante: string,
  icon: string | StaticImageData
) => ({
  isUser: false,
  message: `Hola, soy ${acompañante}, veo que has decidido cambiar para hacerme tu nuevo acompañante.`,
  time: new Date(),
  icon,
});

const createUvUMessage = (message: string, icon: string | StaticImageData) => ({
  isUser: false,
  message,
  time: new Date(),
  icon,
});

export default function ChatComponent() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [acompañanteLoaded, setAcompañanteLoaded] = useState<boolean>(false);
  const [dotNumber, setDotNumber] = useState<number>(0);
  const [form, setForm] = useState<HTMLFormElement>(
    document.createElement("form")
  );
  const [data, setData] = useState<IDataMessages[]>([]);
  const [userIcon] = useState<string | StaticImageData>(
    `https://api.dicebear.com/5.x/thumbs/svg?seed=${Math.floor(
      Math.random() * 100
    )}`
  );

  const { name, icon, setAcompañante } = useContext(AcompañanteContext);

  const enterPress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      form.requestSubmit();
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const message = new FormData(form).get("message");
    if (message) {
      sendMessage(message.toString());
    }
    form.reset();
  };

  const getMessage = async (message: string) => {
    setLoadingState(true);

    const response = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const res = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoadingState(false);
    setData((prev) => [...prev, createUvUMessage(res.summary, icon)]);
  };

  const sendMessage = (message: string) => {
    setData((prev) =>
      [
        ...prev,
        {
          isUser: true,
          message,
          time: new Date(),
          icon: userIcon,
        },
      ].map((item) => ({ ...item, icon: item.isUser ? userIcon : icon }))
    );

    getMessage(message);
  };

  useEffect(() => {
    if (data.length) localStorage.setItem("messages", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingState(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (name && !acompañanteLoaded) {
      const timeout = setTimeout(() => {
        const messages: IDataMessages[] =
          JSON.parse(localStorage.getItem("messages") ?? "[]") ?? [];

        if (messages.length > 0) {
          setData(messages);
        } else setData((prev) => [...prev, STARTER_MESSAGES(name, icon)]);

        setAcompañanteLoaded(true);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [name, acompañanteLoaded, icon]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotNumber((prev) => (prev + 1) % 3);
    }, 500);
    return () => {
      clearInterval(interval);
      setDotNumber(0);
    };
  }, [loadingState]);

  return (
    <div className="h-full flex m-auto items-center justify-center relative ease-in-out delay-500 transition-width max-w-6xl">
      <div
        className={`flex flex-col bg-white shadow-xl rounded-l-lg overflow-y-auto h-full gap-1 relative ${
          toggle
            ? "rounded-r-lg md:rounded-r-none w-full md:w-1/2 lg:w-1/4"
            : "hidden w-0"
        }`}
      >
        <div
          className={`px-5 py-3 border-b border-black/20 flex items-center ${
            toggle ? "flex md:hidden" : ""
          }`}
        >
          <button
            className="flex items-center gap-2"
            onClick={() => setToggle((prev) => !prev)}
          >
            <p className={"text-2xl font-bold"}>{"Volver al chat"}</p>
          </button>
        </div>
        <div className={"p-1 flex flex-col gap-1"}>
          {ACOMPAÑANTES.map((avatar, i) => (
            <button
              key={`data_acompañantes_${i}`}
              className={`flex flex-col h-fit p-4 hover:bg-black/10 border border-black/20 rounded-lg ${
                loadingState ? "cursor-wait" : ""
              }`}
              onClick={() => {
                setToggle((prev) => !prev);
                setData((prev) => [
                  ...prev,
                  {
                    isUser: true,
                    message: `Quiero hablar con ${avatar.name}`,
                    time: new Date(),
                    icon: avatar.icon,
                  },
                ]);
                setLoadingState(true);
                setTimeout(() => {
                  setAcompañante({ ...avatar });
                  setData((prev) => [
                    ...prev,
                    CHANGE_MESSAGE(avatar.name, avatar.icon),
                  ]);
                  setLoadingState(false);
                }, 1500);
              }}
              disabled={loadingState}
            >
              <div className={`flex w-full mt-2 space-x-3 max-w-xs`}>
                <Image
                  src={avatar.icon}
                  alt={"Avatars"}
                  width={50}
                  height={50}
                  className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
                />
                <div>
                  <div className={`bg-gray-300 p-3 rounded-r-lg rounded-bl-lg`}>
                    <p className={`text-sm`}>{avatar.name}.</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div
        className={`flex flex-col w-full bg-white shadow-xl rounded-r-lg overflow-hidden h-full ${
          toggle ? "hidden md:flex" : "rounded-l-lg"
        }`}
      >
        <div className="px-5 py-3 border-b border-black/20 flex items-center justify-between">
          <button
            className={"flex items-center gap-2"}
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? (
              <ChevronDoubleLeftIcon className={`h-full w-full max-h-10`} />
            ) : (
              <ChevronDoubleRightIcon className={`h-full w-full max-h-10`} />
            )}
            <p className={"text-2xl font-bold"}>{"Acompañantes"}</p>
          </button>
          <div className="flex gap-4 text-sm">
            <button
              className={`flex flex-col items-center border rounded-lg p-2 ${
                loadingState ? "cursor-wait" : ""
              }`}
              onClick={() => {
                localStorage.removeItem("messages");
                setData([STARTER_MESSAGES(name, icon)]);
              }}
              disabled={loadingState}
            >
              <p className={"font-bold"}>{"Limpiar"}</p>
              <p className={"font-bold"}>{"chat"}</p>
            </button>
            <button
              className={`flex flex-col items-center border rounded-lg p-2 ${
                loadingState ? "cursor-wait" : ""
              }`}
              onClick={() => {
                localStorage.removeItem("acompañante");
                localStorage.removeItem("messages");
                setAcompañante({});
                setData([]);
              }}
              disabled={loadingState}
            >
              <p className={"font-bold"}>{"Reiniciar"}</p>
              <p className={"font-bold"}>{"chat"}</p>
            </button>
          </div>
        </div>
        <div
          className={`flex flex-col h-full w-full overflow-y-auto relative justify-end p-4`}
        >
          {data.map((item, i) => (
            <div
              key={`data_chat_${i}`}
              className={`flex w-full mt-2 space-x-3 max-w-xs ${
                item.isUser ? " ml-auto justify-end" : ""
              }`}
            >
              <Image
                src={item.icon}
                alt={"Acompañante"}
                width={50}
                height={50}
                className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
              />
              <div>
                <div
                  className={`${
                    item.isUser ? "bg-primary-600 text-white" : "bg-gray-300"
                  } p-3 rounded-r-lg rounded-bl-lg`}
                >
                  <p className={`text-sm`}>{item.message}</p>
                </div>
                <span className={`text-xs text-gray-500 leading-none`}>
                  {"Enviado a las: "}
                  {new Date(item.time).toLocaleTimeString("en-Es", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          ))}
          {loadingState && (
            <div className={`flex w-full mt-2 space-x-3 max-w-xs $`}>
              <Image
                src={icon}
                alt={"User"}
                width={50}
                height={50}
                className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
              />
              <div>
                <div
                  className={`bg-gray-300 px-3 py-1 rounded-r-lg rounded-bl-lg flex items-center justify-center`}
                >
                  <p className={`invisible text-4xl`}>{"•"}</p>
                  {[...Array(3)].map((_, i) => (
                    <React.Fragment key={`dots_message_${i}`}>
                      <p
                        className={`ease-linear duration-200 ${
                          i === dotNumber ? "text-4xl" : "text-2xl mt-1"
                        }`}
                      >
                        {"•"}
                      </p>
                      <p className={`invisible text-4xl`}>{"•"}</p>
                    </React.Fragment>
                  ))}
                </div>
                <span className={`text-xs text-gray-500 leading-none`}>
                  {"Escribiendo"}
                </span>
              </div>
            </div>
          )}
        </div>
        <form
          ref={(el: HTMLFormElement) => {
            setForm(el);
          }}
          className={`bg-gray-300 p-2 flex gap-2 max-h-20 w-full`}
          onSubmit={handleSubmit}
        >
          <textarea
            name={"message"}
            className={`bg-primary-alt/30 h-full w-full rounded p-2 text-sm resize-none text-primary-base/80 placeholder-primary-base/80 ${
              loadingState ? "cursor-wait" : ""
            }`}
            placeholder={"Escribe tu mensaje"}
            onKeyDown={enterPress}
            disabled={loadingState}
          />
          <button
            className={`bg-primary-600 text-primary-base p-3 rounded h-full ${
              loadingState ? "cursor-wait" : ""
            }`}
            type={"submit"}
            disabled={loadingState}
          >
            <PaperAirplaneIcon className={`h-full w-full`} />
          </button>
        </form>
      </div>
    </div>
  );
}

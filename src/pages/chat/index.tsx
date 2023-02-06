import React, {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

interface IDataMessages {
  isUser: boolean;
  message: string;
  time: Date;
}

const STARTER_MESSAGES = {
  isUser: false,
  message: "Hola, ¿Cómo estás?",
  time: new Date(),
};

const MOCK_MESSAGES = {
  isUser: false,
  message: "test",
  time: new Date(),
};

export default function Chat() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [dotNumber, setDotNumber] = useState<number>(0);
  const [form, setForm] = useState<HTMLFormElement>(
    document.createElement("form")
  );
  const [data, setData] = useState<IDataMessages[]>([]);

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
    const data = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoadingState(false);
    setData((prev) => [...prev, { ...MOCK_MESSAGES, message: data.summary }]);
  };

  const sendMessage = (message: string) => {
    setData((prev) => [
      ...prev,
      {
        isUser: true,
        message,
        time: new Date(),
      },
    ]);

    getMessage(message);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingState(false);
      setData((prev) => [...prev, STARTER_MESSAGES]);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      setData([]);
    };
  }, []);

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
    <div className="p-10 h-full flex m-auto items-center justify-center relative ease-in-out delay-500 transition-width">
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
      </div>
      <div
        className={`flex flex-col w-full bg-white shadow-xl rounded-r-lg overflow-hidden h-full ${
          toggle ? "hidden md:flex" : "rounded-l-lg"
        }`}
      >
        <div className="px-5 py-3 border-b border-black/20 flex items-center">
          <button
            className="flex items-center gap-2"
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? (
              <ChevronDoubleLeftIcon className={`h-full w-full max-h-10`} />
            ) : (
              <ChevronDoubleRightIcon className={`h-full w-full max-h-10`} />
            )}
            <p className={"text-2xl font-bold"}>{"Acompañantes"}</p>
          </button>
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
              <div
                className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
              ></div>
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
                  {item.time.toLocaleTimeString("en-Es", {
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
              <div
                className={`flex-shrink-0 h-10 w-10 rounded-full bg-gray-300`}
              ></div>
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

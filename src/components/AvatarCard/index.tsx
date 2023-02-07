import { RefObject, createRef, useContext, useState } from "react";
import { AcompañanteContext } from "@/context";
import Image from "next/image";
import { ACOMPAÑANTES } from "@/constants";

export default function AvatarCard() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { setAcompañante } = useContext(AcompañanteContext);

  const refs = ACOMPAÑANTES.reduce((acc, _, i) => {
    acc[i] = createRef<HTMLButtonElement>();
    return acc;
  }, {} as { [key: number]: RefObject<HTMLButtonElement> });

  const scrollToImage = (i: number) => {
    setCurrentSlide(i);

    refs[i].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const totalImages = ACOMPAÑANTES.length;

  const nextImage = () => {
    if (currentSlide >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentSlide + 1);
    }
  };

  const previousImage = () => {
    if (currentSlide === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentSlide - 1);
    }
  };

  return (
    <div className="h-full relative">
      <h1 className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-5">
        {"Selecciona tu acompañante."}
      </h1>
      <div className="carousel flex w-full h-4/5 bg-primary-alt/0 rounded-box max-w-lg m-auto relative">
        {ACOMPAÑANTES.map((item, i) => {
          const { avatar, name, icon } = item;
          console.log(
            "🚀 ~ file: index.tsx:51 ~ {ACOMPAÑANTES.map ~ item",
            item
          );

          return (
            <button
              key={avatar.toString()}
              ref={refs[i]}
              className="carousel-item relative w-full rounded-box m-auto h-4/5 flex-shrink-0 cursor-default"
              onClick={() => setAcompañante({ avatar, name, icon })}
            >
              <Image
                src={avatar}
                alt={name}
                width={600}
                height={600}
                className="w-4/5 m-auto rounded-lg bg-white p-4 shadow-lg bg-primary-600/10 h-auto z-10 cursor-pointer"
              />
            </button>
          );
        })}
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 -left-7 sm:left-0 -right-7 sm:right-0 top-1/2 max-w-2xl m-auto">
        <button onClick={previousImage} className="btn btn-circle">
          {"❮"}
        </button>
        <button onClick={nextImage} className="btn btn-circle">
          {"❯"}
        </button>
      </div>
    </div>
  );
}

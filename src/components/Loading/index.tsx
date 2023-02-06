import { useEffect, useState } from "react";
import style from "./index.module.css";

export default function Loading() {
  const [suspense, setSuspense] = useState<String>("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setSuspense((prev) => {
        if (prev === "...") {
          return "..";
        }
        if (prev === "..") {
          return ".";
        }
        return "...";
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`h-screen w-screen fixed top-0 left-0 flex items-center justify-center flex-col gap-4`}
    >
      <div className={`${style["sk-cube-grid"]} h-24 w-24`}>
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`${style["sk-cube"]} ${style[`sk-cube${index + 1}`]}`}
          />
        ))}
      </div>
      <div className="text-center text-2xl font-bold">
        {"Cargando" + suspense}
      </div>
    </div>
  );
}

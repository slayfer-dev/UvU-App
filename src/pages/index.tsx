import styles from "@/styles/index.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [test, setTest] = useState<Date>(new Date());

  const getClock = (test: Date) => {
    const hours = test.getHours();
    const minutes = test.getMinutes();
    const seconds = test.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTest(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <strong className={"text-secondary"}>{getClock(test)}</strong>
    </>
  );
}

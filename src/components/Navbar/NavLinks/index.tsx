import Link from "next/link";
// import LoginLinks from "../LoginLinks";
import { useEffect, useState } from "react";

function NavList({
  orientation,
  children,
}: {
  orientation: "horizontal" | "vertical";
  children?: React.ReactNode;
}) {
  const [dateState, setDateState] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateState(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ul
      className={`menu ${
        orientation === "horizontal" ? "menu-horizontal" : "p-4 w-fit"
      } text-primary-base`}
    >
      {children}
      <li>
        <Link
          href="/"
          className="block m-1 lg:inline-block lg:mt-0 bg-primary-200 hover:text-primary-base p-1 rounded-lg min-w-[90px] text-center"
        >
          {"Inicio"}
        </Link>
      </li>
      <li>
        <Link
          href="/chat"
          className="block m-1 lg:inline-block lg:mt-0 bg-primary-200 hover:text-primary-base p-1 rounded-lg min-w-[90px] text-center"
        >
          {"Chat"}
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className="block m-1 lg:inline-block lg:mt-0 bg-primary-200 hover:text-primary-base p-1 rounded-lg min-w-[90px] text-center"
        >
          {"Nosotros"}
        </Link>
      </li>
      {/* <li>
        <Link
          href="/contact"
          className="block m-1 lg:inline-block lg:mt-0 bg-primary-200 hover:text-primary-base p-1 rounded-lg min-w-[90px] text-center"
        >
          {"Contactanos"}
        </Link>
      </li> */}
      <div className="block m-1 lg:inline-block lg:mt-0 bg-primary-200 hover:text-primary-base p-1 rounded-lg min-w-[90px] text-center">
        {dateState.toLocaleTimeString("en-EN", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}
      </div>
    </ul>
  );
}

export default function NavLinks({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) {
  if (orientation === "horizontal")
    return (
      <>
        <NavList orientation={orientation} />
        {/* <LoginLinks orientation={orientation} /> */}
      </>
    );

  return (
    <>
      <NavList orientation={orientation}>
        {/* <LoginLinks orientation={orientation} /> */}
      </NavList>
    </>
  );
}

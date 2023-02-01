import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={"w-4/5 xl:w-9/12 mx-auto"}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

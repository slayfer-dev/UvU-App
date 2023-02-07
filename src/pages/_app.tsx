import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import { AcompañanteProvider, UsuarioProvider } from "@/context";
import Head from "next/head";

export default function UvUApp({ Component, pageProps }: AppProps) {
  const [loadingState, setLoadingState] = useState<boolean>(true);

  useEffect(() => {
    setLoadingState(false);
    return () => setLoadingState(true);
  }, []);

  if (loadingState) {
    return <Loading />;
  }
  return (
    <UsuarioProvider>
      <AcompañanteProvider>
        <div className="w-screen flex flex-col h-screen max-h-screen content-center">
          <Head>
            <title>UvU App</title>
          </Head>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Component {...pageProps} />
            </Suspense>
          </Layout>
        </div>
      </AcompañanteProvider>
    </UsuarioProvider>
  );
}

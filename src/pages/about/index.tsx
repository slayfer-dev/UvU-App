import AboutIllustration from "@/assets/illustrations/about-art.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className={`flex h-full w-full flex-col`}>
      <section className={`w-full h-full relative`} role={"content"}>
        <div className="w-full mx-auto px-6 md:px-12 lg:px-24 xl:px-48">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center my-5 md:my-0 md:mb-10">
            {"Conocenos UvU APP"}
          </h1>
          <span className="grid lg:grid-cols-2 gap-4 lg:gap-8">
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-center leading-normal">
              {
                "UvU APP es una aplicación que busca dar acompañamiento emocional a personas que deseen desahogarse de manera anónima mientras reciben apoyo para solucionar los problemas del día a día con temas que no pueden afrontar solos.  En UvU APP tenemos como objetivo ser un medio por el cual los usuarios se sientan respaldados y escuchados."
              }
            </p>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-center leading-normal">
              {
                "La Familia de UvU APP está trabajando para mejorar las interacciones de la IA de manera constante para que esta pueda dar un apoyo más cercano y amigable para los usuarios.  Nuestra finalidad es poder llegar a prestar un servicio mas afin a los estandares de la salud, por eso desde UvU APP estamos trabajando con profesionales de la salud en materia de salud mental para que nuestra IA pueda adaptarse a todas las necesidades de nuestros usuarios y dar un acompañamiento mas profesional."
              }
            </p>
            <Image
              src={AboutIllustration}
              alt="About Illustration"
              width={200}
              height={200}
              className="w-full h-auto mb-auto -mt-12 sm:-mt-24 md:-mt-36 lg:-mt-44 xl:-mt-60 col-span-2"
            />
          </span>
        </div>
        <div
          className={
            "hidden lg:block w-full h-1/5 -mt-32 xl:-mt-28 2xl:-mt-40 -z-10 horizontal-gradient"
          }
        />
      </section>
    </div>
  );
}

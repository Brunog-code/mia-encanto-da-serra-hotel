export const Gallery = () => {
  return (
    <section className="relative w-full min-h-screen h-auto flex flex-col items-center pt-20 px-10 bg-bistre-300 ">
      <div>
        <h1 className="text-3xl md:text-4xl text-white-gost-500 font-semibold text-center">
          Galeria de fotos
        </h1>
      </div>

      {/* Curva em S */}
      <svg
        className="absolute bottom-0 w-full h-32"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#f5f5f5" // mesma cor do background da div
          d="M0,160 C360,320 1080,0 1440,160 L1440,320 L0,320 Z"
        ></path>
      </svg>
    </section>
  );
};

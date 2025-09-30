export const MyReservations = () => {
  return (
    <section className="flex flex-col space-y-6 p-4 w-full min-h-screen">
      <div>
        <h1 className="bg-golden-500 shadow-md mt-5 p-3 rounded-md font-semibold text-white-gost-500 text-3xl text-center">
          Minhas reservas
        </h1>
      </div>

      {/* container */}
      <div className="flex flex-col md:items-center space-y-4 bg-gradient-to-r from-[#f1c070] to-[#e5a84e] shadow-md p-4 rounded-md text-bistre-400">
        {/* containert month and card */}
        <div className="flex flex-col items-center">
          {/* month */}
          <div className="bg-golden-500 p-1 rounded-md w-1/2">
            <h2 className="font-semibold text-white-gost-500 text-xl">
              Setembro de 2025
            </h2>
          </div>
          {/* Card */}
          <div className="flex md:flex-row flex-col bg-white-gost-500 shadow-md rounded-md md:w-1/2 overflow-hidden">
            {/* Foto à esquerda */}
            <div className="w-full md:w-1/4 h-48 md:h-auto">
              <img
                src="/images/hotel/bg-hero.jpg"
                alt="Quarto Luxo"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Infos à direita */}
            <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
              <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-4">
                <div>
                  <h3 className="font-bold text-bistre-500 text-lg">
                    Quarto Luxo
                  </h3>
                  <p className="text-bistre-400">Check-in: 28/09/2025</p>
                  <p className="text-bistre-400">Check-out: 30/09/2025</p>
                  <div className="flex flex-col items-start mt-6">
                    <span className="bg-bistre-400 px-2 py-1 rounded-md font-semibold text-white-gost-500">
                      Status: CONFIRMED
                    </span>
                    <span className="mt-2 font-bold text-golden-600 text-xl">
                      R$ 1.200,00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* containert month and card */}
        <div className="flex flex-col items-center">
          {/* month */}
          <div className="bg-golden-500 p-1 rounded-md w-1/2">
            <h2 className="font-semibold text-white-gost-500 text-xl">
              Outubro de 2024
            </h2>
          </div>
          {/* Card */}
          <div className="flex md:flex-row flex-col bg-white-gost-500 shadow-md rounded-md md:w-1/2 overflow-hidden">
            {/* Foto à esquerda */}
            <div className="w-full md:w-1/4 h-48 md:h-auto">
              <img
                src="/images/hotel/bg-hero.jpg"
                alt="Quarto Luxo"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Infos à direita */}
            <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
              <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-4">
                <div>
                  <h3 className="font-bold text-bistre-500 text-lg">
                    Quarto Luxo
                  </h3>
                  <p className="text-bistre-400">Check-in: 15/10/2024</p>
                  <p className="text-bistre-400">Check-out: 20/10/2024</p>
                  <div className="flex flex-col items-start mt-6">
                    <span className="bg-bistre-400 px-2 py-1 rounded-md font-semibold text-white-gost-500">
                      Status: CONFIRMED
                    </span>
                    <span className="mt-2 font-bold text-golden-600 text-xl">
                      R$ 1.200,00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

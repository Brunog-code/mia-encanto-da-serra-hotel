import { Button } from "@/components";

export const ConfirmReservation = () => {
  return (
    <section className="flex flex-col space-y-6 p-4 w-full min-h-screen">
      {/* título */}
      <div>
        <h1 className="bg-golden-500 shadow-md mt-5 p-3 rounded-md font-semibold text-white-gost-500 text-3xl text-center">
          Confirmar reserva
        </h1>
      </div>

      {/* container da confirmação */}
      <div className="flex flex-col gap-y-6 bg-gradient-to-r from-[#f1c070] to-[#e5a84e] shadow-md p-4 rounded-md h-auto text-bistre-400">
        <h3 className="font-semibold text-lg text-center">
          Confira abaixo os detalhes da sua reserva
        </h3>

        {/* card */}
        <div className="flex md:flex-row flex-col gap-y-4 bg-white-gost-500 shadow-md mx-auto rounded-md w-full sm:w-[80%] md:w-[90%]">
          {/* imagem do quarto */}
          <div className="flex justify-center items-center md:w-1/2">
            <img
              src="/images/room/quarto-luxo-2.webp"
              alt="Quarto Luxo"
              className="shadow-md rounded-md w-full h-auto sm:h-[300px] md:h-[400px] object-cover"
            />
          </div>

          {/* informações do quarto */}
          <div className="flex flex-col space-y-4 p-4 md:w-1/2">
            {/* descrição */}
            <span className="bg-bistre-400 p-2 rounded-md font-semibold text-white-gost-500 text-2xl text-center">
              Quarto Luxo
            </span>
            <p>
              Quarto espaçoso com decoração elegante, cama king-size, varanda
              com vista para as montanhas, Wi-Fi gratuito e café da manhã
              incluso.
            </p>

            {/* Dados do hóspede */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">
                Dados do hóspede principal
              </h4>
              <p>Nome: João da Silva</p>
              <p>Email: joao@email.com</p>
              <p>Celular: (11) 99999-9999</p>
              <p>Quantidade de hóspedes: 2</p>
            </div>

            {/* Resumo financeiro */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">Resumo financeiro</h4>
              <p>Valor da diária: R$ 2.500</p>
              <p>Quantidade de diárias: 3</p>
              <p>
                Taxas adicionais: R$ 500 (serviço + estacionamento + impostos)
              </p>
              <p className="font-bold text-bistre-500 text-lg">
                Valor total: R$ 8.000
              </p>
            </div>

            {/* Políticas importantes */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">Políticas importantes</h4>
              <ul className="text-bistre-400 text-sm list-disc list-inside">
                <li>
                  Cancelamento: reembolso integral até 48h antes do check-in
                </li>
                <li>Check-in a partir das 14h / Check-out até às 18h</li>
                <li>Inclusões: café da manhã, Wi-Fi, estacionamento</li>
                <li>Exclusões: refeições não inclusas</li>
              </ul>
            </div>

            {/* Preferências adicionais */}
            <div className="pt-2 border-gray-300 border-t">
              <h4 className="font-semibold text-lg">Preferências adicionais</h4>
              <p>
                Para solicitar preferências especiais, entre em contato conosco
                através dos canais de atendimento.
              </p>
            </div>

            {/* Garantia de reserva */}
            <div className="pt-2 border-gray-300 border-t text-gray-600 text-sm italic">
              Sua reserva só será confirmada após a conclusão do pagamento.
            </div>
          </div>
        </div>

        {/* botão de pagamento */}
        <div className="flex justify-end">
          <Button bg="bg-bistre-500" hoverBg="bg-bistre-600">
            Continuar para pagamento
          </Button>
        </div>
      </div>
    </section>
  );
};

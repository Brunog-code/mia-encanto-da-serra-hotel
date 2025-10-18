import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function FailurePayment() {
  const currentDate = new Date().toLocaleString("pt-BR");
  return (
    <div className="flex flex-col justify-center items-center bg-red-50 px-4 min-h-screen text-center">
      {/* Ícone */}
      <div className="bg-red-100 mb-6 p-6 rounded-full">
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "#dc2626" }} />
      </div>

      {/* Título */}
      <h1 className="mb-2 font-bold text-red-700 text-3xl">
        Pagamento não concluído
      </h1>
      <p className="mb-6 text-gray-600">
        Ocorreu um erro ao processar seu pagamento. 😞
      </p>

      {/* Card com detalhes */}
      <div className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-md text-left">
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium text-gray-700">Data:</span>{" "}
            {currentDate}
          </p>
        </div>
      </div>

      {/* Botão de voltar */}
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-red-600 hover:bg-red-700 mt-8 px-6 py-2 rounded-full font-semibold text-white transition-colors duration-200 cursor-pointer"
      >
        Voltar ao início
      </button>
    </div>
  );
}

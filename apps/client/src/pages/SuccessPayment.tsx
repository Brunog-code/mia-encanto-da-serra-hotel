import { useSearchParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SuccessPayment() {
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id");

  const currentDate = new Date().toLocaleString("pt-BR");

  return (
    <div className="flex flex-col justify-center items-center bg-green-50 px-4 min-h-screen text-center">
      {/* Ícone de sucesso */}
      <div className="bg-green-100 mb-6 p-6 rounded-full">
        <CheckCircleIcon sx={{ fontSize: 80, color: "#16a34a" }} />
      </div>

      {/* Título */}
      <h1 className="mb-2 font-bold text-green-700 text-3xl">
        Pagamento aprovado!
      </h1>
      <p className="mb-6 text-gray-600">
        Sua reserva foi confirmada com sucesso 🎉
      </p>

      {/* Card com detalhes */}
      <div className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-md text-left">
        <h2 className="mb-4 font-semibold text-gray-800 text-lg">
          Detalhes do pagamento
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium text-gray-700">ID do Pagamento:</span>{" "}
            {paymentId || "—"}
          </p>
          <p>
            <span className="font-medium text-gray-700">Status:</span>{" "}
            {status == "approved" ? "Aprovado" : status || "—"}
          </p>
          <p>
            <span className="font-medium text-gray-700">ID da Ordem:</span>{" "}
            {orderId || "—"}
          </p>
          <p>
            <span className="font-medium text-gray-700">Data:</span>{" "}
            {currentDate}
          </p>
        </div>
      </div>

      {/* Botão de voltar */}
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-green-600 hover:bg-green-700 mt-8 px-6 py-2 rounded-full font-semibold text-white transition-colors duration-200 cursor-pointer"
      >
        Voltar ao início
      </button>
    </div>
  );
}

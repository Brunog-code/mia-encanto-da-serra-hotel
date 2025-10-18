import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

export default function PendingPayment() {
  return (
    <div className="flex flex-col justify-center items-center bg-yellow-50 h-screen">
      <div className="bg-yellow-100 shadow-lg mb-4 p-6 rounded-full animate-pulse">
        <HourglassBottomIcon sx={{ fontSize: 80, color: "#ca8a04" }} />
      </div>
      <h1 className="mb-2 font-bold text-yellow-700 text-3xl">
        Pagamento em análise
      </h1>
      <p className="max-w-md text-gray-700 text-center">
        O pagamento ainda está sendo processado. Assim que o Mercado Pago
        confirmar a transação, você receberá uma notificação.
      </p>
    </div>
  );
}

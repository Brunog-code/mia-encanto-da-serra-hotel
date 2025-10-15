import { MercadoPagoConfig, Preference } from "mercadopago";
import { PaymentFormData } from "../shared/src/lib/zod/paymentSchema.js";

export const generatePreference = async (paymentData: PaymentFormData) => {
  console.log(paymentData)
  try {
    //Cria cliente autenticado
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN!,
});
    const {
      idReservation,
      chekeInReservation,
      chekeOutReservation,
      totalAmountReservation,
      roomCategory,
      userName,
      userEmail,
      userPhone,
    } = paymentData;

    const preference = new Preference(client);

    //corrigindo o formato do phone para passar no payer
    const area_code = userPhone.slice(0, 2);
    const number = userPhone.slice(2);

    const body = {
      items: [
        {
          id: String(idReservation), 
          title: `Reserva: ${chekeInReservation} a ${chekeOutReservation} - Quarto ${
            roomCategory == "LUXURY" ? "LUXO" : roomCategory
          }`,
          quantity: 1,
          unit_price: totalAmountReservation,
        },
      ],
      payer: {
        email: userEmail,
        name: userName,
        identification: {
          type: "CPF",
          number: "12345678909", //CPF fictício
        },
        phone: {
          area_code,
          number,
        },
      },
      back_urls: {
        success:
          "https://punitive-hezekiah-correctively.ngrok-free.dev/payment/success",
        failure:
          "https://punitive-hezekiah-correctively.ngrok-free.dev/payment/failure",
        pending:
          "https://punitive-hezekiah-correctively.ngrok-free.dev/payment/pending",
      },
      auto_return: "approved",
      notification_url:
        "https://punitive-hezekiah-correctively.ngrok-free.dev/webhook",
      external_reference: idReservation,
    };

    //cria a preferencia
    const response = await preference.create({ body });

    return response;
  } catch (error: any) {
    console.error("Erro ao criar preferência de pagamento:", error.message);
    throw new Error("Não foi possível gerar a preferência de pagamento");
  }
};

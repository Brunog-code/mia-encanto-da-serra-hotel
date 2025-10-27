import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface ISendEmail {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: ISendEmail) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_USER as string, // remetente verificado no SendGrid
      subject,
      html,
    };

    await sgMail.send(msg);
    console.log("Email enviado com sucesso para:", to);
  } catch (error: any) {
    console.error("Erro ao enviar email:", error.response?.body || error);
    throw new Error("Erro ao enviar email");
  }
};

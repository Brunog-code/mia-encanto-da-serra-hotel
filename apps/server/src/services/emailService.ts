import nodemailer from "nodemailer";

interface ISendEmail {
  to: string;
  subject: string;
  html: string;
}

//function para criar o transporte
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Variáveis de ambiente do email não carregadas!");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

//function para enviar email
export const sendEmail = async ({ to, subject, html }: ISendEmail) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Erro ao enviar email");
  }
};

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export const Faq = () => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const faqs = [
    {
      question: "Qual é o horário do check-in e check-out?",
      answer:
        "O check-in é a partir das 14:00 e o check-out até às 12:00. Horários flexíveis podem ser negociados com a recepção.",
    },
    {
      question: "O hotel oferece café da manhã incluso?",
      answer:
        "Sim, todos os nossos pacotes incluem café da manhã. Temos opções vegetarianas e sem glúten disponíveis mediante solicitação.",
    },
    {
      question: "Posso levar meu animal de estimação?",
      answer:
        "Aceitamos animais de estimação de pequeno porte, desde que avisados no momento da reserva. Taxa adicional pode ser aplicada.",
    },
    {
      question: "O hotel oferece estacionamento?",
      answer: "Sim, temos estacionamento gratuito para hóspedes.",
    },

    {
      question: "Quais comodidades de lazer o hotel oferece?",
      answer:
        "Temos piscina aquecida, academia, spa, salão de jogos e atividades guiadas como trilhas e passeios ecológicos.",
    },
    {
      question: "O hotel possui Wi-Fi gratuito?",
      answer:
        "Sim, temos Wi-Fi gratuito em todas as áreas do hotel, incluindo quartos e áreas comuns.",
    },
  ];
  return (
    <section className="relative flex flex-col items-center bg-bistre-300 px-10 pt-20 pb-30 w-full h-auto">
      <h1 className="mb-5 font-semibold text-white-gost-500 text-3xl md:text-4xl text-center">
        FAQ
      </h1>
      <div className="flex flex-col mx-auto w-full max-w-4xl">
        {faqs.map((faq, index) => (
          <Accordion
            className="w-full"
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              backgroundColor: expanded === index ? "#e5a84e" : "#e0e0e0", // bg-purple-600 / bg-red-400
              color: expanded === index ? "#fff" : "#3d2b1f", // text-white / text-gray-800
              transition: "background-color 0.3s",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                backgroundColor: expanded === index ? "#ffff" : "#F3F4F6", // bg-purple-100 / bg-gray-50
                color: expanded === index ? "#1F2937" : "#374151", // text-gray-900 / text-gray-700
              }}
            >
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* Curva em S */}
      <svg
        className="bottom-0 absolute w-full h-32"
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

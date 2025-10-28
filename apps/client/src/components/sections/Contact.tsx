import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

export const Contact = () => {
  const [imgContact, setImgContact] = useState<string | undefined>(undefined);
  useEffect(() => {
    interface MediaImage {
      id: string;
      category: string;
      url: string;
      title: string;
      createdAt: string;
    }

    const featchImg = async () => {
      try {
        const response = await api.get<MediaImage[]>(
          "/images?title=hotel-imagem-lateral-blur.webp"
        );

        if (response.data) {
          const img = response.data[0]?.url;
          setImgContact(img);
        }
      } catch (error) {
        console.error(error);
      }
    };
    featchImg();
  }, []);

  return (
    <section className="flex flex-col items-center bg-white-gost-500 px-10 pt-10 pb-2 w-full min-h-screen">
      <div>
        <h1 className="mt-12 mb-5 font-semibold text-bistre-600 text-3xl md:text-4xl text-center">
          Contato e localização
        </h1>
      </div>
      {/* container text, imag e map*/}
      <div className="flex justify-around items-center w-full">
        <div className="hidden sm:block">
          <img className="rounded-md" src={imgContact} width={450} alt="" />
        </div>

        {/* container endereco e map */}
        <div className="flex flex-col space-y-10">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <LocationOnIcon className="text-golden-600" />
              <span>
                Mia encanto da serra Hotel <br />
                Av. das Hortênsias, 1234 – Bairro das Montanhas <br />
                Campos do Jordão – SP, 12460-000
              </span>
            </div>

            <div className="flex items-center gap-2">
              <PhoneIcon className="text-golden-600" />
              <div className="flex gap-2">
                <a href="https://web.whatsapp.com/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 hover:scale-110 transition-transform duration-300 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                  >
                    <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12c0 2.117.553 4.122 1.602 5.884L0 24l6.283-1.637A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.205-1.25-6.212-3.48-8.52zM12 22.08a10.04 10.04 0 01-5.35-1.529l-.38-.23-3.73.97.993-3.632-.247-.387A9.963 9.963 0 012.04 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm5.204-7.787c-.272-.136-1.607-.794-1.854-.884-.247-.092-.427-.136-.607.136-.181.272-.697.884-.854 1.064-.157.181-.315.204-.587.068-.272-.136-1.146-.421-2.18-1.346-.807-.718-1.352-1.604-1.513-1.876-.158-.272-.017-.419.119-.555.123-.123.272-.315.407-.473.136-.157.181-.272.272-.454.091-.181.045-.34-.023-.476-.068-.136-.607-1.462-.832-2.004-.219-.524-.443-.454-.607-.462l-.519-.009c-.181 0-.476.068-.725.34-.272.272-1.04 1.016-1.04 2.477 0 1.46 1.065 2.875 1.213 3.074.136.181 2.097 3.197 5.077 4.482.709.306 1.261.489 1.69.625.71.225 1.356.193 1.868.117.571-.082 1.607-.656 1.833-1.29.226-.635.226-1.178.158-1.29-.068-.113-.247-.181-.519-.317z" />
                  </svg>
                </a>
                <span>(12) 99999-99999</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <EmailIcon className="text-golden-600" />
              <span>contato@miaencantohotel.com</span>
            </div>
          </div>

          <div className="shadow-lg rounded-lg w-full h-[220px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58877.983510986676!2d-45.62733053658056!3d-22.732925304857588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc89cbf10d10bf%3A0x42ed1a032c8ae78f!2sCampos%20do%20Jord%C3%A3o%2C%20SP%2C%2012460-000!5e0!3m2!1spt-BR!2sbr!4v1758486138010!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export const Contact = () => {
  return (
    <section className="w-full min-h-screen h-auto flex flex-col items-center pt-10 px-10 bg-white-gost-500 pb-10 ">
      <div>
        <h1 className="text-3xl md:text-4xl text-bistre-600 font-semibold text-center mt-12 mb-5">
          Contato e localização
        </h1>
      </div>
      {/* container text, imag e map*/}
      <div className="w-full flex justify-around items-center">
        <div className="hidden sm:block">
          <img
            className="rounded-md"
            src="/images/hotel/imagem-lateral-blur.webp"
            width={450}
            alt=""
          />
        </div>

        {/* container endereco e map */}
        <div className="space-y-10 flex flex-col">
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
              <span>(12) 99999-99999</span>
            </div>

            <div className="flex items-center gap-2">
              <EmailIcon className="text-golden-600" />
              <span>contato@miaencantohotel.com</span>
            </div>
          </div>

          <div className="w-full h-[220px] rounded-lg overflow-hidden shadow-lg">
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

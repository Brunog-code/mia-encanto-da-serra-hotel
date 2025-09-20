import CheckIcon from "@mui/icons-material/Check";

interface IstructureCard {
  img: string;
  imgAlt: string;
  title: string;
  items: string[];
  className?: string;
}

export const StructureCard = ({
  img,
  imgAlt,
  title,
  items,
  className,
}: IstructureCard) => {
  return (
    <div className="flex flex-col space-y-4 text-center bg-golden-400 rounded-xl p-4">
      <div className="flex justify-center items-center">
        <img
          className={`rounded-full ${className}`}
          width={200}
          src={img}
          alt={imgAlt}
        />
      </div>
      <div>
        <h3 className="text-bistre-400 font-semibold text-2xl">{title}</h3>
      </div>
      <div>
        <ul className="text-bistre-400 space-y-2">
          {items.map((item) => (
            <li>
              <CheckIcon fontSize="small" className="text-bistre-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

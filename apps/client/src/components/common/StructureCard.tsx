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
    <div className="flex flex-col space-y-4 bg-golden-400 shadow-lg p-4 rounded-xl text-center">
      <div className="flex justify-center items-center">
        <img
          className={`rounded-full ${className}`}
          width={200}
          src={img}
          alt={imgAlt}
        />
      </div>
      <div>
        <h3 className="font-semibold text-bistre-400 text-2xl">{title}</h3>
      </div>
      <div>
        <ul className="space-y-2 text-bistre-400">
          {items.map((item, index) => (
            <li key={index}>
              <CheckIcon fontSize="small" className="text-bistre-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface IButtonProps {
  children: React.ReactNode;
  px?: string;
  py?: string;
  bg?: string;
  hoverBg?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  px = "px-6",
  py = "py-3",
  bg = "bg-golden-500",
  hoverBg = "bg-golden-600",
  onClick,
}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${bg} hover:${hoverBg} text-white-gost-400 ${px} ${py}  rounded-md font-semibold transition-all duration-300`}
    >
      {children}
    </button>
  );
};

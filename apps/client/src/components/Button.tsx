interface IButtonProps {
  children: React.ReactNode;
  px?: string;
  py?: string;
  bg?: string;
  hoverBg?: string;
}

export const Button = ({
  children,
  px = "px-6",
  py = "py-3",
  bg = "bg-golden-500",
  hoverBg = "bg-golden-600",
}: IButtonProps) => {
  return (
    <button
      className={`cursor-pointer ${bg} hover:${hoverBg} text-white-gost-400 ${px} ${py}  rounded-md font-semibold transition-all duration-300`}
    >
      {children}
    </button>
  );
};

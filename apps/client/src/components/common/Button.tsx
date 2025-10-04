interface IButtonProps {
  children: React.ReactNode;
  px?: string;
  py?: string;
  bg?: string;
  hoverBg?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = ({
  children,
  px = "px-6",
  py = "py-3",
  bg = "bg-golden-500",
  hoverBg = "bg-golden-600",
  onClick,
  type = "button",
  disabled = false,
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer ${bg} hover:${hoverBg} text-white-gost-400 ${px} ${py}  rounded-md font-semibold transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

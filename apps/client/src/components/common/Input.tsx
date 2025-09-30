import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

interface IInputProps {
  type: string;
  placeholder: string;
  px?: string;
  py?: string;
  border?: string;
}

export const Input = ({
  type,
  placeholder,
  px = "px-4",
  py = "py-3",
  border = "border-golden-600",
}: IInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        className={`${px} ${py} w-full rounded-md text-golden-600 bg-white-gost-500 border ${border} focus:outline-none focus:ring-2 focus:ring-bistre-600 focus:border-transparent`}
      />
      {type == "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="top-1/2 right-5 absolute text-golden-600 -translate-y-1/2 cursor-pointer"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </button>
      )}
    </div>
  );
};

interface IInputProps {
  type: string;
  placeholder: string;
  px?: string;
  py?: string;
}

export const Input = ({
  type,
  placeholder,
  px = "px-4",
  py = "py-3",
}: IInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${px} ${py} rounded-md text-golden-600 bg-white-gost-500 border border-golden-600 focus:outline-none focus:ring-2 focus:ring-bistre-600 focus:border-transparent`}
    />
  );
};

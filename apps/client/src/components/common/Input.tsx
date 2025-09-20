interface IInputProps {
  type: string;
  placeholder: string;
}

export const Input = ({ type, placeholder }: IInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="px-4 py-3 rounded-md text-golden-600 bg-white-gost-500 border border-golden-600 focus:outline-none focus:ring-2 focus:ring-bistre-600 focus:border-transparent"
    />
  );
};

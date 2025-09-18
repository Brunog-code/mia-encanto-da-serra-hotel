interface IButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: IButtonProps) => {
  return (
    <button className="shadow-md cursor-pointer bg-golden-500 hover:bg-golden-600  text-white-gost-500 px-6 py-3 rounded-md font-semibold transition">
      {children}
    </button>
  );
};

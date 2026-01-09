interface TextProps {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ children }) => {
  return (
    <p className="text-sm md:text-base mb-8 leading-relaxed text-justify">
      {children}
    </p>
  );
};

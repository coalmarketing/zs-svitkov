interface TextProps {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ children }) => {
  return <p className="mb-4 leading-relaxed text-justify">{children}</p>;
};

interface TextProps {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ children }) => {
  return (
    <p className="text-base md:text-[18px] mb-8 leading-5 lg:leading-relaxed text-left lg:text-justify max-w-3xl">
      {children}
    </p>
  );
};

interface HeadingProps {
  children: React.ReactNode;
}

export const PageHeading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-4">
      {children}
    </h1>
  );
};

export const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <div className="relative mb-4 vertical-line">
      <h2 className="text-2xl md:text-3xl font-bold leading-8 py-2">
        {children}
      </h2>
    </div>
  );
};

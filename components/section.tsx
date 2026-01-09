interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={`mx-auto max-w-7xl px-16 py-8 ${className}`}>
      {children}
    </section>
  );
};

export default Section;

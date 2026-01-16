interface SectionProps {
  children: React.ReactNode;
  className?: string;
  pt?: string;
  pb?: string;
}

const Section = ({ children, className, pt, pb }: SectionProps) => {
  return (
    <section
      className={`mx-auto max-w-7xl px-16 ${className}`}
      style={{
        paddingTop: pt ? pt : "4rem",
        paddingBottom: pb ? pb : "4rem",
      }}
    >
      {children}
    </section>
  );
};

export default Section;

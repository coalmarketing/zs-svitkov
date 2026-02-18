import { Container, Grid12 } from "./grid12";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  pt?: string;
  pb?: string;
}

const Section = ({ children, className, pt, pb }: SectionProps) => {
  return (
    <section
      className={`${className}`}
      style={{
        paddingTop: pt ? pt : "4rem",
        paddingBottom: pb ? pb : "4rem",
      }}
    >
      <Container>
        <Grid12>{children}</Grid12>
      </Container>
    </section>
  );
};

export default Section;

import { Button } from "@/components/buttons";
import Header from "@/components/header";
import Section from "@/components/section";
import { Heading } from "@/components/text";

export default function NotFound() {
  return (
    <main className="min-h-screen pb-20 max-w-screen overflow-x-hidden">
      <Header imageUrl={"/img/headers/home.webp"} />
      <Section pt="5rem" pb="0" className="mt-10">
        <div className="col-span-4 lg:col-span-8 lg:col-start-3">
          <Heading>Chyba 404</Heading>
          <p>Požadovaná stránka nebyla nalezena.</p>
          <div className="max-w-sm mt-6">
            <Button href="/">Vrátit se domů</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}

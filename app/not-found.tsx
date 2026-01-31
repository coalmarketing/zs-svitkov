import { Button } from "@/components/buttons";
import Header from "@/components/header";
import Section from "@/components/section";
import { Heading } from "@/components/text";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen pb-20">
      <Header imageUrl={"/img/headers/home.webp"} />
      <Section pt="5rem" pb="0" className="mt-10">
        <Heading>Chyba 404</Heading>
        <p>Požadovaná stránka nebyla nalezena.</p>
        <div className="max-w-sm mt-6">
          <Button href="/">Vrátit se domů</Button>
        </div>
      </Section>
    </main>
  );
}

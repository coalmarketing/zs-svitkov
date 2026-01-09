"use client";

import { Button, DownloadButton } from "@/components/buttons";
import Header from "@/components/header";
import Section from "@/components/section";
import { Heading, PageHeading, Text } from "@/components/text";

const DevPage = () => {
  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Stránka pro vývoj a testování</PageHeading>
      <Section>
        <Heading>
          Informace ŠD pro
          <br />
          školní rok 2025/2026
        </Heading>
        <Text>
          Při půlených hodinách lze děti (v ten den) vyzvednout ve 13,15 hod. u
          bočního proskleného vchodu (u jídelny).
          <br />
          <br />
          1. A v úterý
          <br />
          1. B v pondělí
          <br />
          <br />
          Pokud chcete dítě takto vyzvedávat, napište to prosím do družinového
          notýsku dítěte.
        </Text>
        <Button onClick={() => alert("Button clicked!")}>
          Ukázkové Tlačítko
        </Button>
      </Section>
      <Section>
        <Heading>Dokumenty ke stažení</Heading>
        <DownloadButton fileUrl="/docs/sd_pravidla.pdf">
          Dokument ke stažení 1
        </DownloadButton>
      </Section>
    </main>
  );
};

export default DevPage;

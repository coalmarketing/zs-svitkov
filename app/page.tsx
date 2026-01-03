import Header from "@/components/header";
import Section from "@/components/section";
import { Text } from "@/components/text";

export default function Home() {
  return (
    <main className="">
      <Header imageUrl={"/img/headers/home.webp"} homePage={true} />
      <Section>
        <h1 className="text-4xl xl:text-6xl font-extrabold mb-2 xl:mb-0">
          ZŠ Svítkov
        </h1>
        <p className="text-xl xl:text-3xl font-bold space-grotesk">
          Škola, která otevírá dveře
        </p>
      </Section>
      <Section className="pr-1/2 space-grotesk">
        <Text>
          <strong>
            Základní škola Pardubice &ndash; Svítkov je moderní a přátelská
            škola
          </strong>{" "}
          poskytující kvalitní vzdělávání žákům 1. a 2. stupně. Klade důraz
          nejen na kvalitu vzdělávání, ale i na bezpečné prostředí a
          individuální přístup k&nbsp;žákům. Škola je zapojena do řady projektů
          a spolupracuje s&nbsp;různými organizacemi s&nbsp;cílem zkvalitnění
          vzdělávacího procesu.
        </Text>
        <Text>
          <strong>Pro výuku využíváme odborné učebny</strong> chemie a fyziky,
          přírodopisu, matematiky, jazyků, výpočetní techniky, dílen, výtvarné
          výchovy, hudební výchovy a cvičnou kuchyňku.{" "}
          <strong>
            Učebny a prostory školy jsou vybaveny moderními digitálními
            technologiemi.
          </strong>{" "}
          Žáci mohou navštěvovat i školní knihovnu, která nabízí spoustu
          zajímavých knížek, nejen pro nejmenší, ale i pro náročnější čtenáře.
          Velkou předností školy je rozsáhlá školní zahrada s&nbsp;vyvýšenými
          záhony, venkovní učebnou a hřištěm. Zahradu ke své činnosti využívá
          také školní družina.{" "}
        </Text>
        <Text>
          Žáci se pravidelně účastní vědomostních i sportovních soutěží,
          projektů a kulturních akcí. ZŠ Pardubice &ndash; Svítkov nabízí
          širokou škálu kroužků a volnočasových aktivit.{" "}
        </Text>
        <Text>
          Za&nbsp;přínosné považujeme aktivní zapojení rodičů do dění školy,
          proto dlouhodobě a úspěšně spolupracujeme se Sdružením rodičů, přátel
          a dětí školy.
        </Text>
      </Section>
    </main>
  );
}

import Divider from "@/components/divider";
import Header from "@/components/header";
import Section from "@/components/section";
import { Text } from "@/components/text";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} homePage={true} />
      <Section>
        <h1 className="text-4xl xl:text-7xl font-extrabold mb-6 xl:mb-6">
          ZŠ Svítkov
        </h1>
        <p className="text-xl xl:text-3xl font-bold space-grotesk">
          škola, která otevírá dveře
          <br />
          novým možnostem
        </p>
        <Divider height={64} />
      </Section>

      <Section className="space-grotesk">
        <div className="w-full md:w-2/3 mr-auto">
          <Text>
            <strong>
              Základní škola Pardubice &ndash; Svítkov je moderní a přátelská
              škola
            </strong>{" "}
            poskytující kvalitní vzdělávání žákům 1. a 2. stupně. Klade důraz
            nejen na kvalitu vzdělávání, ale i na bezpečné prostředí
            a&nbsp;individuální přístup k&nbsp;žákům. Škola je zapojena
            do&nbsp;řady projektů a spolupracuje s&nbsp;různými organizacemi
            s&nbsp;cílem zkvalitnění vzdělávacího procesu.
          </Text>
          <Text>
            <strong>Pro výuku využíváme odborné učebny</strong> chemie
            a&nbsp;fyziky, přírodopisu, matematiky, jazyků, výpočetní techniky,
            dílen, výtvarné výchovy, hudební výchovy a&nbsp;cvičnou kuchyňku.{" "}
            <strong>
              Učebny a&nbsp;prostory školy jsou vybaveny moderními digitálními
              technologiemi.
            </strong>{" "}
            Žáci mohou navštěvovat i&nbsp;školní knihovnu, která nabízí spoustu
            zajímavých knížek, nejen pro nejmenší, ale i&nbsp;pro náročnější
            čtenáře. Velkou předností školy je rozsáhlá školní zahrada
            s&nbsp;vyvýšenými záhony, venkovní učebnou a&nbsp;hřištěm. Zahradu
            ke&nbsp;své činnosti využívá také školní družina.{" "}
          </Text>
          <Text>
            Žáci se pravidelně účastní vědomostních i&nbsp;sportovních soutěží,
            projektů a&nbsp;kulturních akcí. ZŠ Pardubice &ndash; Svítkov nabízí
            širokou škálu kroužků a&nbsp;volnočasových aktivit.{" "}
          </Text>
          <Text>
            Za&nbsp;přínosné považujeme aktivní zapojení rodičů do&nbsp;dění
            školy, proto dlouhodobě a&nbsp;úspěšně spolupracujeme se Sdružením
            rodičů, přátel a&nbsp;dětí školy.
          </Text>
        </div>
        <Divider height={120} />
        <div className="flex flex-col gap-2">
          <Image
            src="/img/podpis.svg"
            alt="Podpis ředitelky školy"
            width={200}
            height={100}
            className="object-contain"
          />
          <p>Ředitelka školy</p>
          <p>Ing. Monika Dobruská</p>
        </div>
      </Section>
    </main>
  );
}

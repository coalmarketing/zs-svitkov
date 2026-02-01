import { Button } from "@/components/buttons";
import Divider from "@/components/divider";
import Header from "@/components/header";
import ImageGallery from "@/components/imageGallery";
import Section from "@/components/section";
import SocialButtons from "@/components/socialButtons";
import { Text } from "@/components/text";
import { getPage } from "@/lib/api/endpoints/pages";
import Image from "next/image";

export default async function Home() {
  const page = await getPage("homepage");

  const images =
    page.images?.map((img, i) => ({
      url: img.url,
      alt: img.alt ?? `Fotografie školy ${i + 1}`,
    })) ?? [];

  if (images.length === 0) return null;

  return (
    <main className="min-h-screen pb-20">
      <Header imageUrl={"/img/headers/home.webp"} homePage={true} />
      <Section pt="5rem" pb="0" className="mt-10">
        <h1 className="text-4xl xl:text-7xl font-extrabold mb-6 xl:mb-6">
          ZŠ Svítkov
        </h1>
        <p className="text-xl xl:text-3xl font-bold space-grotesk">
          škola, která otevírá dveře
          <br />
          novým možnostem
        </p>
        <div className="w-full mt-8">
          <Button href="/nastenka">Nástěnka</Button>
        </div>
      </Section>
      <Section className="" pt="0" pb="0">
        <Divider height={64} />
      </Section>

      <Section className="space-grotesk" pt="0" pb="0">
        <h2 className="text-xl xl:text-3xl font-extrabold mb-6 xl:mb-6">
          Vzděláváme žáky od roku 1924
        </h2>
        <div className="w-full grid grid-cols-3 gap-20 items-center">
          <div className="col-span-2">
            <ImageGallery images={images} className="mb-8" />
          </div>
          <div className="">
            <h3 className="text-4xl font-bold space-grotesk">
              Naše škola
              <br />
              na sítích
            </h3>
            <SocialButtons />
          </div>
        </div>
      </Section>

      <Section className="space-grotesk" pt="0" pb="0">
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

import Header from "@/components/header";
import Section from "@/components/section";

export default function Home() {
  return (
    <main className="">
      <Header imageUrl={"/img/headers/home.webp"} homePage={true} />
      <Section>
        <h1 className="text-6xl font-extrabold mb-4">ZŠ Svítkov</h1>
        <p className="text-3xl font-bold space-grotesk">
          Škola, která otevírá dveře
        </p>
      </Section>
    </main>
  );
}

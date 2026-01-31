import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400"],
  variable: "--font-poppins",
});

import Image from "next/image";
import { getImportantLinks } from "@/lib/api/endpoints/importantLinks";

export async function FooterImportantLinks() {
  const links = await getImportantLinks();

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {links.map((l) => (
        <a
          key={l.id}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          title={l.name}
          className="opacity-80 transition hover:opacity-100"
        >
          <Image
            src={l.logoUrl}
            alt={l.name}
            width={160}
            height={80}
            className="h-14 w-20 object-contain object-left"
          />
        </a>
      ))}
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="w-full footer relative">
      <div className="absolute w-screen h-5 overflow-hidden -top-2.5 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/menu-bg.webp"
          alt=""
          className="w-full h-full object-fill"
        />
      </div>
      <div className="h-200 lg:h-100 bg-slate-200 relative">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-6 gap-6 px-14 md:px-0">
          <div className="col-span-6 md:col-span-4 flex flex-col justify-center items-start bg-red-500/20 w-full gap-6">
            <div>
              <h4 className="font-semibold text-xl mb-4">Důležité odkazy</h4>
              <FooterImportantLinks />
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-4">Partneři školy</h4>
              <div className="flex flex-row w-full h-24 flex-nowrap"></div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 flex flex-col bg-blue-500/20 w-full h-full relative">
            {" "}
            {/* VODOZNAK */}
            <div className="absolute bottom-10 right-10 space-grotesk font-bold leading-none opacity-25 text-6xl pointer-events-none select-none">
              ZŠ Svítkov
              <br />
              1924 &ndash; …
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-10 px-40 bg-black text-white flex flex-row flex-nowrap justify-between items-center text-xs ${poppins.variable} overflow-hidden`}
      >
        <div className="flex flex-row items-center gap-2 font-extralight">
          <span className="text-3xl ">&copy;</span> {new Date().getFullYear()}
        </div>
        <div className="font-extralight lowercase">Vytvoříme web i Vám</div>
      </div>
    </footer>
  );
};

export default Footer;

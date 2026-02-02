import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400"],
  variable: "--font-poppins",
});

import SocialButtons from "./socialButtons";
import FooterImportantLinks from "./footerImportantLinks";

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
          <div className="col-span-6 md:col-span-4 flex flex-col justify-center items-start w-full gap-6">
            <div>
              <h4 className="font-semibold text-xl mb-4">Důležité odkazy</h4>
              <FooterImportantLinks />
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-4">Partneři školy</h4>
              <div className="flex flex-row w-full h-24 flex-nowrap"></div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 flex flex-col w-full h-full relative">
            <div className="mt-28 pl-18">
              <SocialButtons />
            </div>
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

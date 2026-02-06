import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400"],
  variable: "--font-poppins",
});

import SocialButtons from "./socialButtons";
import FooterImportantLinks from "./footerImportantLinks";
import { Container, Grid12 } from "./layout/grid12";

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
      <div className="h-200 lg:h-100 bg-slate-200 relative flex items-center">
        <Container>
          <Grid12>
            <div className="col-span-6 col-start-3">
              <h4 className="font-semibold text-xl mb-4">Důležité odkazy</h4>
              <FooterImportantLinks />
            </div>
            <div className="col-span-3 col-start-10">
              <SocialButtons />
            </div>

            <div className="col-span-6 col-start-3">
              <h4 className="font-semibold text-xl mb-4">Partneři školy</h4>
              <div className="grid grid-cols-6 gap-4"></div>{" "}
            </div>

            <div className="col-span-3 col-start-10">
              {/* VODOZNAK */}
              <div className="space-grotesk font-bold leading-none opacity-25 text-[70px] pointer-events-none select-none">
                ZŠ Svítkov
                <br />
                1924 &ndash; …
              </div>
            </div>
          </Grid12>
        </Container>
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

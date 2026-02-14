import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400"],
  variable: "--font-poppins",
});

import SocialButtons from "./socialButtons";
import FooterImportantLinks, {
  FooterSchoolPartners,
} from "./footerImportantLinks";
import { Container, Grid12 } from "./layout/grid12";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full footer relative">
      <div className="absolute w-screen h-5 overflow-hidden -top-2.5 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/menu-bg.webp"
          alt=""
          className="w-full h-full object-fill scale-x-150 lg:scale-x-105"
        />
      </div>
      <div className="h-200 lg:h-100  relative flex items-center">
        <Container>
          <Grid12>
            <div className="col-span-4 lg:col-span-6 lg:col-start-3">
              <h4 className="font-semibold text-xl mb-4">Důležité odkazy</h4>
              <FooterImportantLinks />
            </div>
            <div className="col-span-4 order-3 lg:order-2 lg:col-span-3 lg:col-start-10">
              <SocialButtons divideBy={3} />
            </div>

            <div className="col-span-4 order-2 lg:order-3 lg:col-span-6 lg:col-start-3">
              <h4 className="font-semibold text-xl mb-4">Partneři školy</h4>
              <FooterSchoolPartners />
            </div>

            <div className="order-4 col-span-4 lg:col-span-3 lg:col-start-10">
              {/* VODOZNAK */}
              <div className="space-grotesk font-bold leading-tight lg:leading-none opacity-25 text-5xl lg:text-[70px] pointer-events-none select-none">
                ZŠ Svítkov
                <br />
                1924 &ndash; …
              </div>
            </div>
          </Grid12>
        </Container>
      </div>

      <div
        className={`w-full h-10 bg-black text-white flex flex-row flex-nowrap justify-between items-center text-xs ${poppins.variable} overflow-hidden`}
      >
        <Container>
          <Grid12>
            <div className="col-span-3 col-start-1 flex items-center gap-2">
              <span className="text-3xl ">
                <Image
                  src="/img/icons/copyright-light.svg"
                  alt="Copyright"
                  width={20}
                  height={20}
                />
              </span>{" "}
              copyright {new Date().getFullYear()}
            </div>
            <div className="col-span-3 col-start-10 font-extralight lowercase flex items-center justify-end gap-2">
              <p className="mb-0">Vytvoříme web i Vám</p>
              <Image
                src="/img/matfix_test_black.svg"
                alt="Matfix"
                width={50}
                height={20}
                className="object-contain object-center"
              />{" "}
            </div>
          </Grid12>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

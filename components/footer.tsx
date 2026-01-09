import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400"],
  variable: "--font-poppins",
});

const Footer = () => {
  return (
    <footer className="w-full footer relative">
      <div className="absolute w-screen h-5 overflow-hidden -top-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/menu-bg.webp"
          alt=""
          className="w-full h-full object-fill"
        />
      </div>
      <div className="h-80 bg-slate-200 "></div>
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

import Image from "next/image";
import DesktopNav from "./navbar";
import { navbarItems } from "@/utils/webGlobals";

interface HeaderProps {
  imageUrl: string;
  homePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ imageUrl, homePage = false }) => {
  return (
    <header className="w-full relative mb-12">
      {homePage && (
        <div className="absolute w-full max-w-7xl mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center lg:justify-end z-10">
          <Image
            src="./img/logo.svg"
            alt="Logo ZŠ Svitkov"
            width={250}
            height={250}
            className="opacity-90"
          />
        </div>
      )}
      <div
        className={`relative w-full flex items-center justify-center -mb-10 -z-10`}
        style={{ height: homePage ? "400px" : "210px" }}
      >
        <Image src={imageUrl} alt="" className="object-cover" fill />
      </div>
      <DesktopNav items={navbarItems} />
    </header>
  );
};

export default Header;

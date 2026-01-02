import Image from "next/image";
import Navbar from "./navbar";
import { navbarItems } from "@/utils/webGlobals";

interface HeaderProps {
  imageUrl: string;
  homePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ imageUrl, homePage = false }) => {
  return (
    <header className="w-full relative mb-32">
      <div
        className={`relative w-full
      } flex items-center justify-center`}
        style={{ height: homePage ? "440px" : "210px" }}
      >
        <Image src={imageUrl} alt="" className="object-cover" fill />
      </div>
      <Navbar items={navbarItems} />
    </header>
  );
};

export default Header;

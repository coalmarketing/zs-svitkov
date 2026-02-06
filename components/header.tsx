import Image from "next/image";
import DesktopNav from "./navbar";
import { navbarItems } from "@/lib/webGlobals";
import Link from "next/link";
import { Container, Grid12 } from "./layout/grid12";

interface HeaderProps {
  imageUrl: string;
  homePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ imageUrl, homePage = false }) => {
  return (
    <header className="w-full relative mb-12">
      <div
        className={`relative w-full flex items-center justify-center -mb-10 -z-10`}
        style={{
          height: homePage ? "400px" : "210px",
          background: `url(${imageUrl}) center/cover no-repeat`,
        }}
      >
        {homePage && (
          <Container>
            <Grid12>
              <div className="col-span-12 lg:col-span-2 lg:col-start-9">
                <Link href="/">
                  <Image
                    src="./img/logo.svg"
                    alt="Logo ZŠ Svitkov"
                    width={250}
                    height={250}
                    className="opacity-90"
                  />
                </Link>
              </div>
            </Grid12>
          </Container>
        )}
      </div>
      <Container>
        <Grid12>
          <DesktopNav items={navbarItems} />
        </Grid12>
      </Container>
    </header>
  );
};

export default Header;

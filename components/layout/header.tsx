import Image from "next/image";
import DesktopNav, { MobileNav } from "./navbar";
import { navbarItems } from "@/lib/webGlobals";
import Link from "next/link";
import { Container, Grid12 } from "./grid12";

interface HeaderProps {
  imageUrl: string;
  homePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ imageUrl, homePage = false }) => {
  return (
    <header className="w-full relative mb-12">
      <Link href="/">
        <div
          className={`relative w-full flex items-center justify-center -mb-10 -z-10`}
          style={{
            height: homePage ? "400px" : "250px",
            background: `url(${imageUrl}) center 20% / cover no-repeat`,
          }}
        >
          {homePage && (
            <Container>
              <Grid12>
                <div className="col-span-4 mx-[20%] md:mx-0 md:col-span-3 md:col-end-9 lg:col-span-3 lg:col-end-12 xl:col-span-2 xl:col-start-9">
                  {/* <Link href="/"> */}
                  <Image
                    src="./img/logo.svg"
                    alt="Logo ZŠ Svitkov"
                    width={500}
                    height={500}
                  />
                  {/* </Link> */}
                </div>
              </Grid12>
            </Container>
          )}
        </div>
      </Link>
      <Container>
        <Grid12>
          <DesktopNav items={navbarItems} />
          <MobileNav items={navbarItems} />
        </Grid12>
      </Container>
    </header>
  );
};

export default Header;

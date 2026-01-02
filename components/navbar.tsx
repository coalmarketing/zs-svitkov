export type NavbarItem = {
  label: string;
  href: string;
  external?: boolean;
  subItems?: NavbarItem[];
};

interface NavbarProps {
  items: NavbarItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  return (
    <nav className="navbar w-3/4 aspect-10/1 mx-auto grid place-content-center absolute lg:-bottom-10 xl:-bottom-20 left-0 right-0">
      <ul className="flex flex-row justify-center gap-32 pb-4 pr-16 font-bold">
        {items.map((item) => (
          <li key={item.label} className="text-2xl">
            {item.label + (item.subItems ? " ▾" : "")}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

import { NavbarItem } from "@/components/navbar";

export const navbarItems: NavbarItem[] = [
  {
    label: "Škola",
    href: "/",
    subItems: [
      { label: "Nástěnka školy", href: "/nastenka" },
      { label: "Školní pokladna", href: "#", external: true },
      { label: "Dokumenty", href: "/skola/dokumenty" },
      { label: "Měsíční plán", href: "#", external: true },
      { label: "Poradenství", href: "/skola/poradenstvi" },
      { label: "Projekty školy", href: "/skola/projekty" },
      { label: "SRPDŠ", href: "/skola/srpds" },
      { label: "Školská rada", href: "/skola/skolska-rada" },
      { label: "Školní časopis", href: "/skola/skolni-casopis" },
      { label: "Fotogalerie", href: "#", external: true },
    ],
  },
  {
    label: "Žáci",
    href: "/zaci",
    subItems: [
      { label: "Třídy", href: "/nastenka/traidy" },
      { label: "Rozvrhy", href: "#", external: true },
      { label: "Úspěchy žáků", href: "/nastenka/uspechy" },
      { label: "Žákovská rada", href: "/zaci/zakovska-rada" },
      { label: "Budoucí prvňáčci", href: "/zaci/budouci-prvnacci" },
    ],
  },
  {
    label: "Družina",
    href: "/druzina",
  },
  { label: "Jídelna", href: "/jidelna" },
  { label: "Kontakty", href: "/kontakty" },
];

import { NavbarItem } from "@/components/navbar";

export const UNIVERSAL_PAGES = [
  { code: "poradenstvi", apiCode: "poradenstvi" },
  { code: "projekty-skoly", apiCode: "projekty-skoly" },
  { code: "srpds", apiCode: "srpdš" },
  { code: "skolska-rada", apiCode: "skolska-rada" },
  { code: "zakovska-rada", apiCode: "zakovska-rada" },
  { code: "budouci-prvnacci", apiCode: "budouci-prvnacci" },
  { code: "druzina", apiCode: "druzina" },
  { code: "jidelna", apiCode: "jidelna" },
] as const;

export type UniversalSlug = (typeof UNIVERSAL_PAGES)[number]["code"];

export function slugToApiCode(slug: string) {
  return UNIVERSAL_PAGES.find((p) => p.code === slug)?.apiCode;
}

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
      { label: "Projekty školy", href: "/skola/projekty-skoly" },
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

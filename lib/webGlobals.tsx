import { NavbarItem } from "@/components/navbar";

export const SITE_NAME = "Základní škola Pardubice-Svítkov";

export const FACEBOOK_URL = "https://www.facebook.com/zssvitkov";
export const INSTAGRAM_URL = "https://www.instagram.com/zssvitkov100/?hl=cs";

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

export function getUniversalPageMeta(code: string) {
  return UNIVERSAL_PAGES.find((p) => p.code === code);
}

export const navbarItems: NavbarItem[] = [
  {
    label: "Škola",
    href: "",
    subItems: [
      { label: "Nástěnka školy", href: "/nastenka" },
      { label: "Školní pokladna", href: "#", external: true },
      { label: "Dokumenty", href: "/dokumenty" },
      { label: "Měsíční plán", href: "#", external: true },
      { label: "Poradenství", href: "/poradenstvi" },
      { label: "Projekty školy", href: "/projekty-skoly" },
      { label: "SRPDŠ", href: "/srpds" },
      { label: "Školská rada", href: "/skolska-rada" },
      { label: "Školní časopis", href: "/skolni-casopis" },
      { label: "Historie školy", href: "/historie-skoly" },
      { label: "Fotogalerie", href: "#", external: true },
    ],
  },
  {
    label: "Žáci",
    href: "",
    subItems: [
      { label: "Třídy", href: "/nastenka?categoryCode=tridy" },
      { label: "Rozvrhy", href: "#", external: true },
      { label: "Úspěchy žáků", href: "/nastenka?categoryCode=uspechy-zaku" },
      { label: "Žákovská rada", href: "/zakovska-rada" },
      { label: "Budoucí prvňáčci", href: "/budouci-prvnacci" },
    ],
  },
  {
    label: "Družina",
    href: "/druzina",
  },
  { label: "Jídelna", href: "/jidelna" },
  { label: "Kontakty", href: "/kontakty" },
];

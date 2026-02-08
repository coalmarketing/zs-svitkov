"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiLinkExternal } from "react-icons/bi";

type NavbarSubItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavbarItem = {
  label: string;
  href: string;
  subItems?: NavbarSubItem[];
};

type NavbarProps = {
  items: NavbarItem[];
};

const DesktopNav: React.FC<NavbarProps> = ({ items }) => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);

  const inside = (item: NavbarItem, current: boolean, hover: boolean) => (
    <span
      className="relative"
      style={{
        textDecoration: current ? "underline" : "none",
        textUnderlineOffset: "6px",
        textDecorationThickness: "2px",
      }}
    >
      {item.label}
      <span className="absolute -right-5 top-1/2 -translate-y-1/2">
        {item.subItems ? (!hover ? " +" : " -") : ""}
      </span>
    </span>
  );

  return (
    <nav className="lg:col-span-10 lg:col-start-2 navbar h-20 hidden lg:flex items-center space-grotesk pl-12 pr-24">
      <ul className="w-full flex flex-row flex-nowrap justify-between">
        {items.map((item, idx) => (
          <li
            key={item.label}
            className="relative group text-xl w-1/5 flex justify-center font-semibold pb-3"
          >
            {/* Top-level item */}
            {item.href !== "" ? (
              <Link
                href={item.href}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className="w-full h-16 flex items-center justify-center text-black hover:text-orange-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
              >
                {inside(item, pathname === item.href, hovered === idx)}
              </Link>
            ) : (
              <span
                className="w-full h-16 flex items-center justify-center text-black cursor-default"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {inside(
                  item,
                  item.subItems?.some((sub) => sub.href === pathname) || false,
                  hovered === idx,
                )}
              </span>
            )}

            {/* Dropdown */}
            {item.subItems?.length ? (
              <div
                className="
                  absolute left-1/2 top-16 z-50 py-8 px-4 -translate-x-1/2
                  hidden min-w-56 rounded-3xl
                  bg-accent shadow-lg backdrop-blur
                  group-hover:block group-focus-within:block dropdown
                "
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <ul className="">
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      {sub.external ? (
                        <a
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-1 text-[17px] text-black outline-none hover:text-brand-dark transition"
                        >
                          {
                            <span className="flex flex-row flex-nowrap gap-2 items-center justify-start">
                              {sub.label + " "}{" "}
                              <Image
                                src="/img/icons/Arrow_R.svg"
                                alt="External link"
                                width={16}
                                height={16}
                                className="-rotate-45"
                              />
                            </span>
                          }
                        </a>
                      ) : (
                        <Link
                          href={sub.href}
                          className="block px-4 py-1 text-[17px] text-black outline-none hover:text-brand-dark transition"
                        >
                          {sub.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

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
    <nav className="md:col-span-8 md:col-start-1 lg:col-span-10 lg:col-start-2 navbar h-20 hidden md:flex items-center space-grotesk">
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

export const MobileNav: React.FC<NavbarProps> = ({ items }) => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  const isItemActive = (item: NavbarItem) => {
    if (item.href && pathname === item.href) return true;
    return item.subItems?.some((sub) => sub.href === pathname) || false;
  };

  const menuLabel = menuOpen ? "Menu -" : "Menu +";

  return (
    <nav className="col-span-12 mobile-navbar flex md:hidden items-center space-grotesk relative">
      <div className="w-full flex items-center justify-between">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen((v) => !v);
            if (menuOpen) setOpenGroup(null); // closing -> collapse groups
          }}
          className="w-full pb-2 text-3xl font-semibold text-black hover:text-orange-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 relative hover:cursor-pointer"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-dropdown"
        >
          {menuLabel}
        </button>
      </div>

      {/* Dropdown */}
      {menuOpen ? (
        <div
          id="mobile-menu-dropdown"
          className="
            absolute left-1/2 -translate-x-1/2 top-16 z-50 py-8 px-4
            min-w-72 rounded-3xl
            bg-accent shadow-lg backdrop-blur dropdown
          "
        >
          <ul>
            {items.map((item, idx) => {
              const active = isItemActive(item);
              const hasGroup = !!item.subItems?.length;

              const groupOpen = openGroup === idx;

              return (
                <li key={item.label} className="px-4">
                  {/* Top-level row */}
                  <div className="py-2">
                    {hasGroup ? (
                      // CATEGORY (toggle only, no link)
                      <button
                        type="button"
                        onClick={() =>
                          setOpenGroup((cur) => (cur === idx ? null : idx))
                        }
                        className="w-full flex items-center justify-between text-[17px] font-semibold text-black hover:text-brand-dark transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
                        aria-expanded={groupOpen}
                        aria-controls={`mobile-group-${idx}`}
                      >
                        <span
                          style={{
                            textDecoration: active ? "underline" : "none",
                            textUnderlineOffset: "6px",
                            textDecorationThickness: "2px",
                          }}
                        >
                          {item.label + " " + (groupOpen ? "-" : "+")}
                        </span>
                      </button>
                    ) : (
                      // NORMAL LINK
                      <Link
                        href={item.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenGroup(null);
                        }}
                        className="block text-[17px] font-semibold text-black hover:text-brand-dark transition outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
                        style={{
                          textDecoration: active ? "underline" : "none",
                          textUnderlineOffset: "6px",
                          textDecorationThickness: "2px",
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>

                  {/* Sublinks */}
                  {hasGroup && groupOpen ? (
                    <ul id={`mobile-group-${idx}`} className="pb-2 pl-4">
                      {item.subItems!.map((sub) => (
                        <li key={sub.label}>
                          {sub.external ? (
                            <a
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                setMenuOpen(false);
                                setOpenGroup(null);
                              }}
                              className="block py-1 text-[17px] font-normal text-black outline-none hover:text-brand-dark transition"
                            >
                              <span className="flex flex-row flex-nowrap gap-2 items-center justify-start">
                                {sub.label}{" "}
                                <Image
                                  src="/img/icons/Arrow_R.svg"
                                  alt="External link"
                                  width={16}
                                  height={16}
                                  className="-rotate-45"
                                />
                              </span>
                            </a>
                          ) : (
                            <Link
                              href={sub.href}
                              onClick={() => {
                                setMenuOpen(false);
                                setOpenGroup(null);
                              }}
                              className="block py-1 text-[17px] font-normal text-black outline-none hover:text-brand-dark transition"
                              style={{
                                textDecoration:
                                  pathname === sub.href ? "underline" : "none",
                                textUnderlineOffset: "6px",
                                textDecorationThickness: "2px",
                              }}
                            >
                              {sub.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </nav>
  );
};

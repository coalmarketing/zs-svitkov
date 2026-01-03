"use client";

import Link from "next/link";
import React from "react";

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
  return (
    <nav className="navbar w-3/4 h-16 mx-auto flex justify-center items-center rounded-lg shadow-lg border-orange-200 border-2 space-grotesk">
      <ul className="w-full flex flex-row flex-nowrap justify-center">
        {items.map((item) => (
          <li
            key={item.label}
            className="relative group text-lg w-32 flex justify-center not-last:border-r-2 font-semibold border-orange-200"
          >
            {/* Top-level item */}
            <Link
              href={item.href}
              className="w-full h-16 flex items-center justify-center text-orange-100 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
            >
              <span>
                {item.label}
                {item.subItems ? " +" : ""}
              </span>
            </Link>

            {/* Dropdown */}
            {item.subItems?.length ? (
              <div
                className="
                  absolute left-1/2 top-16 z-50 -translate-x-1/2
                  hidden min-w-56 rounded-lg border border-orange-200 overflow-hidden
                  bg-accent shadow-lg backdrop-blur
                  group-hover:block group-focus-within:block
                "
              >
                <ul className="">
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      {sub.external ? (
                        <a
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-orange-900 hover:bg-orange-50 focus:bg-orange-50 outline-none"
                        >
                          {sub.label}
                        </a>
                      ) : (
                        <Link
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-orange-900 hover:bg-orange-50 focus:bg-orange-50 outline-none"
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

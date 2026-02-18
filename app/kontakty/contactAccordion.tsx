"use client";

import React, { useMemo, useState } from "react";
import { Heading } from "@/components/ui/text";
import type { ContactsGroup } from "@/lib/api/endpoints/contacts";

export default function ContactsAccordionSection({
  group,
  children,
  open: defaultOpen = false,
}: {
  group: ContactsGroup;
  children: React.ReactNode;
  open?: boolean;
}) {
  const label = group.category.name;
  const hasContent = !!children;

  // Default: closed on mobile, open on lg via CSS (we’ll render content always,
  // but hide it on mobile unless open).
  const [open, setOpen] = useState(defaultOpen);

  const active = useMemo(() => open, [open]);

  return (
    <section className="">
      {/* Header row (clickable on mobile) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={open}
      >
        {/* Use your Heading styling, but wrap it */}
        <span className="pointer-events-none pl-4 md:pl-0">
          <Heading>
            {label}{" "}
            <span className="-translate-x-0.5 md:hidden">
              {active ? "-" : "+"}
            </span>
          </Heading>
        </span>
      </button>

      {/* Content:
          - Mobile: only show when open
          - LG+: always show (so desktop matches your current page) */}
      <div className={`${open ? "block" : "hidden"} lg:block`}>
        <div className="mt-4">{hasContent ? children : null}</div>
      </div>
    </section>
  );
}

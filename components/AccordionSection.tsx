"use client";

import React, { useMemo, useState } from "react";
import { Heading } from "@/components/ui/text";

export default function AccordionSection({
  label,
  children,
  open: defaultOpen = false,
}: {
  label: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const active = useMemo(() => open, [open]);

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="pointer-events-none pl-4 md:pl-0">
          <Heading>
            {label}{" "}
            <span className="-translate-x-0.5 md:hidden">
              {active ? "-" : "+"}
            </span>
          </Heading>
        </span>
      </button>

      {/* same behavior: mobile collapsible, lg always visible */}
      <div className={`${open ? "block" : "hidden"} lg:block`}>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function SchoolYearSelect({
  years,
  current,
}: {
  years: string[];
  current: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  function setYear(next: string) {
    const nextSp = new URLSearchParams(sp.toString());
    nextSp.set("schoolYear", next);
    router.push(`${pathname}?${nextSp.toString()}`);
  }

  return (
    <div className="mb-6 relative col-span-3">
      <label className="mb-1 block text-sm font-medium sr-only">
        Školní rok
      </label>
      <select
        className="bg-brand hover:bg-brand-dark transition rounded-lg
             px-4 py-2.5 min-h-11 w-full
             appearance-none 
             space-grotesk font-semibold text-left"
        value={current}
        onChange={(e) => setYear(e.target.value)}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <Image
        src={"/img/icons/Arrow_D.svg"}
        alt="Arrow"
        width={24}
        height={24}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
      />
    </div>
  );
}

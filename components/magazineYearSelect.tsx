"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    <div className="mb-6">
      <label className="mb-1 block text-sm font-medium">Školní rok</label>
      <select
        className="bg-brand hover:bg-brand-dark transition rounded-lg px-4 py-2 min-w-75 space-grotesk font-semibold text-center"
        value={current}
        onChange={(e) => setYear(e.target.value)}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

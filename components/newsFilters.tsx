"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./buttons";

export type Label = { id: number; code: string; name: string };
type Subcategory = { id: number; code: string; name: string; labels?: Label[] };
type Category = {
  id: number;
  code: string;
  name: string;
  subcategories?: Subcategory[];
};

function setOrDelete(sp: URLSearchParams, key: string, value?: string) {
  if (value && value.trim() !== "") sp.set(key, value);
  else sp.delete(key);
}

function findSelection(
  categories: Category[],
  currentCategoryCode?: string,
): { selectedTop?: Category; selectedSub?: Subcategory } {
  if (!currentCategoryCode) return {};

  for (const top of categories ?? []) {
    if (top.code === currentCategoryCode) return { selectedTop: top };

    for (const sub of top.subcategories ?? []) {
      if (sub.code === currentCategoryCode)
        return { selectedTop: top, selectedSub: sub };
    }
  }
  return {};
}

function buildLabelOptions(selectedTop?: Category, selectedSub?: Subcategory) {
  if (!selectedTop) return [];

  const map = new Map<string, Label>();

  if (selectedSub) {
    for (const l of selectedSub.labels ?? []) map.set(l.code, l);
  } else {
    for (const s of selectedTop.subcategories ?? []) {
      for (const l of s.labels ?? []) map.set(l.code, l);
    }
  }

  return [{ code: "", name: "Všechny štítky" }].concat(
    Array.from(map.values())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((l) => ({ code: l.code, name: l.name })),
  );
}

export default function NewsFilters({
  categories,
  currentCategoryCode,
  currentLabelCode,
}: {
  categories: Category[];
  currentCategoryCode?: string;
  currentLabelCode?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const { selectedTop, selectedSub } = findSelection(
    categories,
    currentCategoryCode,
  );

  const topOptions = [{ code: "", name: "Všechny kategorie" }].concat(
    (categories ?? []).map((c) => ({ code: c.code, name: c.name })),
  );

  const subOptions = selectedTop
    ? [{ code: "", name: "Všechny podkategorie" }].concat(
        (selectedTop.subcategories ?? []).map((s) => ({
          code: s.code,
          name: s.name,
        })),
      )
    : [];

  const labelOptions = buildLabelOptions(selectedTop, selectedSub);

  function push(next: { categoryCode?: string; labelCode?: string }) {
    const nextSp = new URLSearchParams(sp.toString());
    nextSp.set("page", "1");

    if (next.categoryCode !== undefined)
      setOrDelete(nextSp, "categoryCode", next.categoryCode);
    if (next.labelCode !== undefined)
      setOrDelete(nextSp, "labelCode", next.labelCode);

    const qs = nextSp.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function onTopChange(code: string) {
    // switching top category clears label and sub selection (subcategory selection is encoded in categoryCode)
    push({ categoryCode: code || "", labelCode: "" });
  }

  function onSubChange(code: string) {
    // if subcategory is "", we revert to filtering by top category only
    push({ categoryCode: code || selectedTop?.code || "", labelCode: "" });
  }

  function onLabelChange(code: string) {
    push({ labelCode: code || "" });
  }

  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end">
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium">Kategorie</label>
        <select
          className="bg-brand hover:bg-brand-dark transition rounded-lg px-4 py-2.5 min-w-75 w-full space-grotesk font-semibold text-left"
          value={selectedTop?.code ?? ""}
          onChange={(e) => onTopChange(e.target.value)}
        >
          {topOptions.map((o) => (
            <option key={o.code || "all"} value={o.code}>
              {o.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTop && (
        <>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">
              Podkategorie
            </label>
            <select
              className="bg-brand hover:bg-brand-dark transition rounded-lg px-4 py-2.5 min-w-75 w-full space-grotesk font-semibold text-left"
              value={selectedSub?.code ?? ""}
              onChange={(e) => onSubChange(e.target.value)}
            >
              {subOptions.map((o) => (
                <option key={o.code || "all"} value={o.code}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          {labelOptions.length > 1 && (
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Štítky</label>
              <select
                className="bg-brand hover:bg-brand-dark transition rounded-lg px-4 py-2.5 min-w-75 w-full space-grotesk font-semibold text-center"
                value={currentLabelCode ?? ""}
                onChange={(e) => onLabelChange(e.target.value)}
                disabled={labelOptions.length <= 1}
              >
                {labelOptions.map((o) => (
                  <option key={o.code || "all"} value={o.code}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      <Button onClick={() => push({ categoryCode: "", labelCode: "" })}>
        Zrušit filtry
      </Button>
    </div>
  );
}

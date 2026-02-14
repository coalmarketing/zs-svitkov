import { buildOpenHref } from "@/app/nastenka/page";
import Image from "next/image";

const Pagination = ({
  currentPage,
  totalPages,
  categoryCode,
  labelCode,
}: {
  currentPage: number;
  totalPages: number;
  categoryCode?: string;
  labelCode?: string;
}) => {
  if (totalPages <= 1) return null;

  const clamped = Math.max(1, Math.min(currentPage, totalPages));

  const makeHref = (p: number) =>
    buildOpenHref({
      page: String(p),
      categoryCode,
      labelCode,
      open: "", // <- do NOT keep opened article when paging
    });

  const prevDisabled = clamped <= 1;
  const nextDisabled = clamped >= totalPages;

  // windowed pages around current
  const windowSize = 2;
  const start = Math.max(1, clamped - windowSize);
  const end = Math.min(totalPages, clamped + windowSize);

  const windowPages: number[] = [];
  for (let p = start; p <= end; p++) windowPages.push(p);

  return (
    <div className="mt-12 flex items-center justify-center gap-2 text-sm">
      {/* Prev */}
      {prevDisabled ? (
        <></>
      ) : (
        <a
          href={makeHref(clamped - 1)}
          className="px-3 py-2 underline underline-offset-4 hover:text-brand transition-colors"
        >
          <Image
            src="/img/icons/Arrow_L.svg"
            alt="Previous"
            width={30}
            height={30}
            className="hover:scale-105 transition-all"
          />
        </a>
      )}

      {/* First + leading dots */}
      {start > 1 && (
        <>
          <a
            href={makeHref(1)}
            className="px-3 py-2 hover:text-brand transition-colors"
          >
            1
          </a>
          {start > 2 && <span className="px-2 opacity-60">…</span>}
        </>
      )}

      {/* Window */}
      {windowPages.map((p) =>
        p === clamped ? (
          <span
            key={p}
            className="px-3 py-2 font-semibold text-xl"
            aria-current="page"
          >
            {p}
          </span>
        ) : (
          <a
            key={p}
            href={makeHref(p)}
            className="px-3 py-2 underline underline-offset-4 hover:text-brand transition-colors"
          >
            {p}
          </a>
        ),
      )}

      {/* trailing dots + Last */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2 opacity-60">…</span>}
          <a
            href={makeHref(totalPages)}
            className="px-3 py-2 hover:text-brand transition-colors"
          >
            {totalPages}
          </a>
        </>
      )}

      {/* Next */}
      {nextDisabled ? (
        <></>
      ) : (
        <a
          href={makeHref(clamped + 1)}
          className="px-3 py-2 underline underline-offset-4 hover:text-brand transition-colors"
        >
          <Image
            src="/img/icons/Arrow_R.svg"
            alt="Previous"
            width={30}
            height={30}
            className="hover:scale-105 transition-all"
          />
        </a>
      )}
    </div>
  );
};

export default Pagination;

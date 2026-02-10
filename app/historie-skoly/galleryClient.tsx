"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "../../components/imageModal";

type HistoryEvent = {
  id: string | number;
  year: number;
  text: string;
  imageUrl?: string | null;
};

export default function HistoryTimelineClient({
  events,
}: {
  events: HistoryEvent[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // build a list of just the events that have images, but keep mapping back to event index
  const imageItems = events
    .map((e, idx) => ({
      eventIndex: idx,
      url: e.imageUrl ?? "",
      alt: `${e.year} – fotografie`,
    }))
    .filter((x) => x.url);

  const openForEventIndex = (eventIndex: number) => {
    const i = imageItems.findIndex((it) => it.eventIndex === eventIndex);
    if (i === -1) return;
    setActiveIndex(i);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + imageItems.length) % imageItems.length);
  };

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % imageItems.length);
  };

  const current = activeIndex !== null ? imageItems[activeIndex] : null;

  return (
    <>
      <div className="col-span-5 col-start-5">
        {events.map((e, idx) => (
          <div key={e.id} className="grid grid-cols-[24px_1fr]">
            {/* Timeline spine */}
            <div className="relative flex justify-center -translate-7">
              <span className="absolute top-2 h-4 w-4 rounded-full border-2 border-black bg-black" />
              {idx !== events.length - 1 ? (
                <span className="absolute top-5 -bottom-10 w-0.75 bg-black" />
              ) : (
                <>
                  <span className="absolute -bottom-10 h-4 w-4 rounded-full border-2 border-black bg-black" />{" "}
                  <span className="absolute top-5 -bottom-10 w-0.75 bg-black" />
                </>
              )}
            </div>

            {/* Content */}
            <div className="pb-20 ">
              <div className="text-brand font-extrabold text-4xl">{e.year}</div>
              <div
                className="text-base leading-relaxed prose prose-sm prose-p:leading-tight prose-a:text-brand prose-a:underline max-w-none"
                dangerouslySetInnerHTML={{ __html: e.text }}
              />

              {e.imageUrl && (
                <button
                  type="button"
                  onClick={() => openForEventIndex(idx)}
                  className="mt-4 block w-full overflow-hidden rounded-2xl border border-black/20 group hover:cursor-pointer"
                  aria-label={`Open image: ${e.year} – fotografie`}
                >
                  <Image
                    src={e.imageUrl}
                    alt={`${e.year} – fotografie`}
                    width={1200}
                    height={700}
                    className="h-auto w-full object-cover transition-transform group-hover:scale-[1.05]"
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ImageModal
        isOpen={isOpen}
        image={current ? { url: current.url, alt: current.alt } : null}
        onClose={close}
        onPrev={imageItems.length > 1 ? prev : undefined}
        onNext={imageItems.length > 1 ? next : undefined}
        canNavigate={imageItems.length > 1}
        counterText={
          activeIndex !== null
            ? `${activeIndex + 1} / ${imageItems.length}`
            : undefined
        }
      />
    </>
  );
}

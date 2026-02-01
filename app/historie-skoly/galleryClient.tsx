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
      <div className="max-w-2xl mx-auto">
        {events.map((e, idx) => (
          <div key={e.id} className="grid grid-cols-[24px_1fr] gap-4">
            {/* Timeline spine */}
            <div className="relative flex justify-center">
              <span className="absolute top-2 h-4 w-4 rounded-full border-2 border-black bg-black" />
              {idx !== events.length - 1 ? (
                <span className="absolute top-5 -bottom-10 w-0.75 bg-black" />
              ) : (
                <>
                  <span className="absolute top-5 bottom-1/2 w-0.75 bg-black" />
                  <span className="absolute top-[52%] bottom-[46%] w-0.75 bg-black opacity-80" />
                  <span className="absolute top-[56%] bottom-[42%] w-0.75 bg-black opacity-60" />
                  <span className="absolute top-[60%] bottom-[38%] w-0.75 bg-black opacity-40" />
                  <span className="absolute top-[64%] bottom-[34%] w-0.75 bg-black opacity-20" />
                </>
              )}
            </div>

            {/* Content */}
            <div className="pb-20 px-10">
              <div className="text-brand font-extrabold text-4xl">{e.year}</div>
              <p className="text-base leading-relaxed">{e.text}</p>

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

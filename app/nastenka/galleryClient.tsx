"use client";

import { useState } from "react";
import ImageModal from "../../components/imageModal";
import Image from "next/image";

export type GalleryImage = { url: string; alt: string };

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = (idx: number) => {
    setActiveIndex(idx);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const current = activeIndex !== null ? images[activeIndex] : null;

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <>
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4 w-full lg:w-4/5 mt-6 mb-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openModal(idx)}
              className="w-full aspect-square rounded-lg overflow-hidden border border-black/10 group hover:cursor-pointer grid place-items-center"
              aria-label={`Open image: ${img.alt}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition group-hover:scale-105 p-0"
                draggable={false}
                width={400}
                height={400}
                placeholder="blur"
                blurDataURL={"/img/assets/placeholder.webp"}
              />
            </div>
          ))}
        </div>
      )}

      <ImageModal
        isOpen={isOpen}
        image={current}
        onClose={closeModal}
        onPrev={images.length > 1 ? prev : undefined}
        onNext={images.length > 1 ? next : undefined}
        canNavigate={images.length > 1}
        counterText={
          activeIndex !== null
            ? `${activeIndex + 1} / ${images.length}`
            : undefined
        }
      />
    </>
  );
}

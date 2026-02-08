"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export interface GalleryImage {
  url: string;
  alt: string; // also used as display name/caption
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  initialIndex?: number;
  className?: string;

  // Optional customization
  showThumbnails?: boolean;
  aspectClassName?: string; // e.g. "aspect-video" | "aspect-square"
}

export default function ImageGallery({
  images,
  initialIndex = 0,
  className = "",
  showThumbnails = true,
  aspectClassName = "aspect-video",
}: ImageGalleryProps) {
  const safeImages = useMemo(() => images ?? [], [images]);
  const hasImages = safeImages.length > 0;

  const clampIndex = useCallback(
    (i: number) => {
      if (!hasImages) return 0;
      const n = safeImages.length;
      return ((i % n) + n) % n;
    },
    [hasImages, safeImages.length],
  );

  const [index, setIndex] = useState(() => clampIndex(initialIndex));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIndex(clampIndex(initialIndex));
  }, [initialIndex, clampIndex]);

  const prev = useCallback(
    () => setIndex((i) => clampIndex(i - 1)),
    [clampIndex],
  );
  const next = useCallback(
    () => setIndex((i) => clampIndex(i + 1)),
    [clampIndex],
  );

  const open = useCallback(() => {
    if (!hasImages) return;
    setIsOpen(true);
  }, [hasImages]);

  const close = useCallback(() => setIsOpen(false), []);

  // Keyboard controls in modal
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, prev, next]);

  const current = hasImages ? safeImages[index] : null;

  return (
    <div className={`w-full ${className}`}>
      {/* Carousel */}
      <div
        className={[
          "relative overflow-hidden rounded-[2.5rem] bg-black/20",
          ,
        ].join(" ")}
      >
        <div className={`relative w-full ${aspectClassName}`}>
          {!current ? (
            <div className="absolute inset-0 grid place-items-center text-sm text-white/60">
              No images
            </div>
          ) : (
            <button
              type="button"
              onClick={open}
              className="group absolute inset-0 w-full h-full cursor-zoom-in"
              aria-label={`Open image: ${current.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.url}
                alt={current.alt}
                className={[
                  "absolute inset-0 h-full w-full object-cover",
                  "transition-transform duration-300",
                  "group-hover:scale-[1.01]",
                ].join(" ")}
                draggable={false}
              />
              {/* subtle gradient for caption readability */}
              {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
                <div className="text-sm font-medium text-white/90 line-clamp-1">
                  {current.alt}
                </div>
                <div className="text-xs text-white/60">
                  {index + 1} / {safeImages.length}
                </div>
              </div> */}
            </button>
          )}

          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            disabled={!hasImages || safeImages.length < 2}
            aria-label="Previous image"
            className={[
              "absolute left-6 bottom-6",
              "inline-flex items-center justify-center",
              "h-10 w-10 rounded-full",
              "text-white",
              "backdrop-blur border border-white/10",
              "shadow-sm transition",
              "focus:outline-none focus:ring-2 focus:ring-white/30",
              "disabled:opacity-40 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            <Image
              src="/img/icons/Arrow_L.svg"
              alt="Previous"
              width={40}
              height={40}
              className="hover:scale-105 transition-all"
            />
            {/* <ChevronLeftIcon className="h-5 w-5" /> --- IGNORE --- */}
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            disabled={!hasImages || safeImages.length < 2}
            aria-label="Next image"
            className={[
              "absolute right-6 bottom-6",
              "inline-flex items-center justify-center",
              "h-10 w-10 rounded-full",
              "text-white",
              "backdrop-blur border border-white/10",
              "shadow-sm transition",
              "focus:outline-none focus:ring-2 focus:ring-white/30",
              "disabled:opacity-40 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            <Image
              src="/img/icons/Arrow_R.svg"
              alt="Next"
              width={40}
              height={40}
              className="hover:scale-105 transition-all"
            />
            {/* <ChevronRightIcon className="h-5 w-5" /> --- IGNORE --- */}
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && hasImages && safeImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => {
            const active = i === index;
            return (
              <button
                key={`${img.url}-${i}`}
                type="button"
                onClick={() => setIndex(clampIndex(i))}
                className={[
                  "relative shrink-0 overflow-hidden rounded-xl border",
                  active ? "border-white/40" : "border-white/10",
                  "bg-black/20",
                  "h-14 w-20",
                  "transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 hover:cursor-pointer",
                ].join(" ")}
                aria-label={`Go to image ${i + 1}: ${img.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {active && (
                  <div
                    className="absolute inset-0 ring-2 ring-white/20"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <button
            type="button"
            onClick={close}
            aria-label="Close viewer"
            className="absolute inset-0 bg-black/80"
          />

          {/* Content */}
          <div className="relative mx-auto flex h-full max-w-6xl items-center justify-center p-4">
            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
                <div className="relative w-full h-[70vh] sm:h-[78vh]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.url}
                    alt={current.alt}
                    className="absolute inset-0 h-full w-full object-contain"
                    draggable={false}
                  />

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={close}
                    className={[
                      "absolute right-3 top-3",
                      "inline-flex items-center justify-center",
                      "h-10 w-10 rounded-full",
                      "bg-black/45 text-white",
                      "backdrop-blur border border-white/10",
                      "shadow-sm transition",
                      "hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30",
                    ].join(" ")}
                    aria-label="Close"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>

                  {/* Modal arrows */}
                  <button
                    type="button"
                    onClick={prev}
                    disabled={safeImages.length < 2}
                    aria-label="Previous image"
                    className={[
                      "absolute left-3 top-1/2 -translate-y-1/2",
                      "inline-flex items-center justify-center",
                      "h-12 w-12 rounded-full",
                      "bg-black/45 text-white",
                      "backdrop-blur border border-white/10",
                      "shadow-sm transition",
                      "hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30",
                      "disabled:opacity-40 disabled:cursor-not-allowed",
                    ].join(" ")}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    disabled={safeImages.length < 2}
                    aria-label="Next image"
                    className={[
                      "absolute right-3 top-1/2 -translate-y-1/2",
                      "inline-flex items-center justify-center",
                      "h-12 w-12 rounded-full",
                      "bg-black/45 text-white",
                      "backdrop-blur border border-white/10",
                      "shadow-sm transition",
                      "hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30",
                      "disabled:opacity-40 disabled:cursor-not-allowed",
                    ].join(" ")}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="rounded-xl bg-black/45 backdrop-blur border border-white/10 px-3 py-2">
                      <div className="text-sm font-medium text-white/90 line-clamp-1">
                        {current.alt}
                      </div>
                      <div className="text-xs text-white/60">
                        {index + 1} / {safeImages.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional thumbnails in modal */}
              {showThumbnails && safeImages.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {safeImages.map((img, i) => {
                    const active = i === index;
                    return (
                      <button
                        key={`modal-${img.url}-${i}`}
                        type="button"
                        onClick={() => setIndex(clampIndex(i))}
                        className={[
                          "relative shrink-0 overflow-hidden rounded-xl border",
                          active ? "border-white/40" : "border-white/10",
                          "bg-black/20",
                          "h-14 w-20",
                          "transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20",
                        ].join(" ")}
                        aria-label={`Go to image ${i + 1}: ${img.alt}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                        {active && (
                          <div
                            className="absolute inset-0 ring-2 ring-white/20"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

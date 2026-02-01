"use client";

import React, { useEffect, useId, useRef } from "react";

export type ModalImage = {
  url: string;
  alt: string;
};

type ImageModalProps = {
  isOpen: boolean;
  image: ModalImage | null;
  onClose: () => void;

  // Optional navigation (pass only if you want arrows)
  onPrev?: () => void;
  onNext?: () => void;
  canNavigate?: boolean;

  // Optional extra UI
  showCounter?: boolean;
  counterText?: string; // e.g. "3 / 10"
};

export default function ImageModal({
  isOpen,
  image,
  onClose,
  onPrev,
  onNext,
  canNavigate = true,
  showCounter = true,
  counterText,
}: ImageModalProps) {
  const titleId = useId();
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Close on Escape and (optionally) Arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // If you pass onPrev/onNext, we’ll enable arrows automatically
      if (canNavigate && onPrev && onNext) {
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, onPrev, onNext, canNavigate]);

  // Lock scroll + basic focus restore
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop (click to close) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        className="absolute inset-0 bg-black/80"
      />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-center p-4">
        <div className="relative w-full">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
            <div className="relative h-[70vh] sm:h-[78vh] w-full">
              {/* Title for screen readers */}
              <h2 id={titleId} className="sr-only">
                {image.alt}
              </h2>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
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

              {/* Prev/Next (only if handlers provided) */}
              {canNavigate && onPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous image"
                  className={[
                    "absolute left-3 top-1/2 -translate-y-1/2",
                    "inline-flex items-center justify-center",
                    "h-12 w-12 rounded-full",
                    "bg-black/45 text-white",
                    "backdrop-blur border border-white/10",
                    "shadow-sm transition",
                    "hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30",
                  ].join(" ")}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
              )}

              {canNavigate && onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next image"
                  className={[
                    "absolute right-3 top-1/2 -translate-y-1/2",
                    "inline-flex items-center justify-center",
                    "h-12 w-12 rounded-full",
                    "bg-black/45 text-white",
                    "backdrop-blur border border-white/10",
                    "shadow-sm transition",
                    "hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30",
                  ].join(" ")}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              )}

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="rounded-xl bg-black/45 backdrop-blur border border-white/10 px-3 py-2">
                  <div className="text-sm font-medium text-white/90 line-clamp-1">
                    {image.alt}
                  </div>
                  {showCounter && counterText && (
                    <div className="text-xs text-white/60">{counterText}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Optional: you can add thumbnails underneath from the parent if you want */}
        </div>
      </div>
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

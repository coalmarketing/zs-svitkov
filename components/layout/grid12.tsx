// components/layout/Container.tsx
import { PropsWithChildren } from "react";
import clsx from "clsx";

export function Container({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx("mx-auto w-full", className)}>{children}</div>;
}

const globalGridSettings =
  "px-32 grid grid-cols-12 gap-4 sm:gap-6 lg:gap-4 items-center";

export function Grid12({
  gridSettings = globalGridSettings,
  children,
  className,
}: PropsWithChildren<{ className?: string; gridSettings?: string }>) {
  return <div className={clsx("", gridSettings, className)}>{children}</div>;
}

export function DisplayGrid12({ gridSettings = globalGridSettings }) {
  const twelve = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-screen z-10 pointer-events-none select-none",
        gridSettings,
      )}
    >
      {twelve.map((i) => (
        <div key={i} className="bg-red-800/20 h-full ">
          {i}
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ClampedContentProps {
  html: string;
  href: string;
  forceShowButton?: boolean;
}

const ClampedContent: React.FC<ClampedContentProps> = ({
  html,
  href,
  forceShowButton = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [html]);

  return (
    <>
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
        className="line-clamp-8"
      />
      {(forceShowButton || isClamped) && (
        <Link
          className="mt-4 block font-bold text-brand underline underline-offset-5 text-base"
          href={href + "#pin"}
        >
          Zobrazit více +
        </Link>
      )}
    </>
  );
};

export default ClampedContent;

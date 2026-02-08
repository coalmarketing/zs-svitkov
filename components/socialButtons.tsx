import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/webGlobals";
import Image from "next/image";

const SocialButtons = ({ divideBy }: { divideBy: number }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: divideBy ? `repeat(${divideBy}, 1fr)` : "",
        gap: "1rem",
      }}
    >
      <div className="col-span-1 w-full flex justify-between gap-4 mt-4 text-brand">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-brand-dark transition"
        >
          <Image
            src="/img/icons/IG.svg"
            alt="Instagram"
            width={40}
            height={40}
          />
        </a>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-brand-dark transition"
        >
          <Image
            src="/img/icons/FB.svg"
            alt="Facebook"
            width={40}
            height={40}
          />
        </a>
      </div>
    </div>
  );
};

export default SocialButtons;

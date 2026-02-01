import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/webGlobals";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const SocialButtons = () => {
  return (
    <div className="flex gap-4 mt-4 text-brand">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="hover:text-brand-dark transition"
      >
        <FaInstagram size={40} />
      </a>
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="hover:text-brand-dark transition"
      >
        <FaFacebook size={40} />
      </a>
    </div>
  );
};

export default SocialButtons;

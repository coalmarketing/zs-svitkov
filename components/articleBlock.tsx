import { LuImage } from "react-icons/lu";
import { PiPaperclipLight } from "react-icons/pi";
import Tag from "./tag";
import { Label } from "./newsFilters";

interface ArticleBlockProps {
  title: string;
  href: string;
  date: string;

  hasImage?: boolean;
  hasAttachment?: boolean;

  children?: React.ReactNode;
  labels?: Label[];
}

const ArticleBlock: React.FC<ArticleBlockProps> = ({
  title,
  children,
  href,
  date,
  hasImage = false,
  hasAttachment = false,
  labels,
}) => {
  return (
    <div className="w-full p-10 space-grotesk">
      <div className="border-l-2 border-black px-3 mb-6">
        {" "}
        <div className="flex flex-row flex-nowrap gap-5 items-center mb-2">
          <p className="text-brand text-lg font-semibold space-grotesk">
            {new Date(date).toLocaleDateString("cs-CZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-row flex-nowrap gap-2">
            {labels?.map((label) => (
              <Tag key={label.id} text={label.name} />
            ))}
          </div>
        </div>
        <h3 className="space-grotesk font-bold text-3xl">{title}</h3>
        <div className="flex items-center gap-4 mt-2">
          {hasImage && <LuImage size={28} />}
          {hasAttachment && <PiPaperclipLight size={28} />}
        </div>
      </div>

      <div className="px-3">
        <div className="text-black prose prose-sm prose-p:leading-tight prose-a:text-brand prose-a:underline">
          {children}
        </div>
        <a
          className="mt-4 block font-bold text-brand underline underline-offset-5 text-sm"
          href={href}
        >
          Zobrazit více +
        </a>
      </div>
    </div>
  );
};

export default ArticleBlock;

import Link from "next/link";

import Tag from "../../components/ui/tag";
import { Label } from "./newsFilters";
import Image from "next/image";

interface ArticleBlockProps {
  title: string;
  href: string;
  date: string;

  hasImage?: boolean;
  hasAttachment?: boolean;

  children?: React.ReactNode;
  labels?: Label[];

  expanded?: boolean;
}

const ArticleBlock: React.FC<ArticleBlockProps> = ({
  title,
  children,
  href,
  date,
  hasImage = false,
  hasAttachment = false,
  labels,
  expanded = false,
}) => {
  return (
    <div className="w-full space-grotesk lg:pr-20">
      <div className="vertical-line ml-4 md:ml-0">
        <div className="flex flex-row flex-nowrap gap-5 items-center mb-2">
          <p className="text-brand text-sm lg:text-lg font-semibold space-grotesk">
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
        <h3 className="space-grotesk font-bold text-xl lg:text-3xl">{title}</h3>
        <div className="flex items-center gap-4 mt-2 mb-10">
          {hasImage && (
            <div>
              <Image
                src={"/img/icons/Image_icon.svg"}
                alt="Image"
                width={24}
                height={24}
                className=""
              />
            </div>
          )}
          {hasAttachment && (
            <div>
              <Image
                src="/img/icons/Doc_icon.svg"
                alt="Attachment"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
      </div>

      <div className="">
        <div className="text-black prose prose-sm prose-p:leading-tight prose-a:text-brand prose-a:underline max-w-none">
          {children}
        </div>

        {!expanded && (
          <Link
            className="mt-4 block font-bold text-brand underline underline-offset-5 text-sm"
            href={href + "#pin"}
          >
            Zobrazit více +
          </Link>
        )}
      </div>
    </div>
  );
};

export default ArticleBlock;

interface TagProps {
  text: string;
  href?: string;
}

const Tag: React.FC<TagProps> = ({ text, href }) => {
  if (!href) {
    return (
      <div className="px-1 py-0 h-6 grid place-content-center rounded-md text-accent border border-accent space-grotesk text-xs">
        <p className="">{text}</p>
      </div>
    );
  }
  return (
    <a
      href={href}
      className="px-1 py-0 h-6 grid place-content-center rounded-md text-accent border border-accent space-grotesk text-xs hover:bg-accent hover:text-white transition-colors"
    >
      <p className="">{text}</p>
    </a>
  );
};

export default Tag;

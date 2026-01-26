import { PiPaperclipLight } from "react-icons/pi";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}

const ButtonInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-brand hover:bg-brand-dark transition rounded-lg px-4 py-2 min-w-75 font-semibold ">
      {children}
    </div>
  );
};

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  external,
  onClick,
}) => {
  return href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ButtonInner>{children}</ButtonInner>
      </a>
    ) : (
      <a href={href}>
        <ButtonInner>{children}</ButtonInner>
      </a>
    )
  ) : (
    <button onClick={onClick} className="hover:cursor-pointer">
      <ButtonInner>{children}</ButtonInner>
    </button>
  );
};

interface DownloadButtonProps {
  children: React.ReactNode;
  fileUrl: string;
  download?: boolean;
  target?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  children,
  fileUrl,
  download = true,
  target,
}) => {
  return (
    <a
      href={fileUrl}
      download={download}
      target={target}
      className="text-brand hover:text-brand-dark transition"
    >
      <div className="flex flex-row flex-nowrap gap-2 items-center text-sm">
        <PiPaperclipLight size={24} />
        {children}
      </div>
    </a>
  );
};

import { ReactElement, PropsWithChildren } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import classNames from "classnames";

function ExternalLink({
  href,
  text,
  children,
  className,
  showIcon = true,
}: PropsWithChildren<{
  href: string;
  text?: string;
  className?: string;
  showIcon?: boolean;
}>): ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={classNames(
        className,
        "flex shrink-0 items-center gap-2 decoration-current underline-offset-2 hover:underline",
      )}
    >
      {text ?? children}
      {showIcon && (
        <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-current" />
      )}
    </a>
  );
}

export default ExternalLink;

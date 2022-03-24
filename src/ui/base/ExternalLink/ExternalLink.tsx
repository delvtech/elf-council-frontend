import { ReactElement, ReactNode } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import classNames from "classnames";

interface ExternalLinkProps {
  href: string;
  text?: string;
  children?: ReactNode;
  className?: string;
  showIcon?: boolean;
}

function ExternalLink({
  href,
  text,
  children,
  className,
  showIcon = true,
}: ExternalLinkProps): ReactElement {
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
      {text ? text : children}
      {showIcon && (
        <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-current" />
      )}
    </a>
  );
}

export default ExternalLink;

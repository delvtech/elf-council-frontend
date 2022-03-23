import { ReactElement, ReactNode } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import classNames from "classnames";

interface ExternalLinkProps {
  link: string;
  children: ReactNode;
  className?: string;
}

function ExternalLink({
  link,
  children,
  className,
}: ExternalLinkProps): ReactElement {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={classNames(className, "flex items-center gap-2")}
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-principalRoyalBlue" />
    </a>
  );
}

export default ExternalLink;

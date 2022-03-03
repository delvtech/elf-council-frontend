import { ReactElement, ReactNode } from "react";

import classNames from "classnames";

interface TabsProps {
  "aria-label": string;
  /**
   * Use Tab components as children
   */
  children: ReactNode;
}
export default function Tabs({
  "aria-label": ariaLabel,
  children,
}: TabsProps): ReactElement {
  return (
    <nav className={classNames("-mb-px flex")} aria-label={ariaLabel}>
      {children}
    </nav>
  );
}

function getTextColor(current: boolean): string {
  if (current) {
    return classNames("text-white hover:text-white");
  }
  return classNames("text-yieldBlue");
}

function getBackgroundColor(current: boolean): string {
  return current
    ? classNames("bg-principalRoyalBlue")
    : classNames("bg-hackerSky");
}

function getBorderRadius(first: boolean, last: boolean) {
  const borderRadius = [];
  if (first) {
    borderRadius.push("rounded-l-xl");
  }
  if (last) {
    borderRadius.push("rounded-r-xl");
  }
  return borderRadius.join(" ");
}

function getFocusRing(current: boolean): string {
  if (current) {
    return classNames(
      "focus:ring-white ring-inset focus:border-0 focus:ring-4 focus:shadow-none",
    );
  }

  return "";
}

function getBorderColor(current: boolean): string {
  if (current) {
    return classNames("border-paleLily hover:border-clay");
  }
  return classNames("border-gray-200 hover:border-gray-300");
}

interface TabProps {
  name: string;
  current?: boolean;
  onClick?: () => void;
  href?: string;
  first?: boolean;
  last?: boolean;
}

export function Tab({
  name,
  first = false,
  last = false,
  current = false,
  onClick,
  href,
}: TabProps): ReactElement {
  const className = classNames(
    getTextColor(current),
    getBackgroundColor(current),
    getBorderRadius(first, last),
    getFocusRing(current),
    getBorderColor(current),
    "border-b-2 text-lg px-4 py-2 font-semibold",
  );
  if (href) {
    return (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-current={current ? "page" : undefined}
      >
        {name}
      </a>
    );
  }
  return (
    <button
      key={name}
      onClick={onClick}
      className={className}
      aria-current={current ? "page" : undefined}
    >
      {name}
    </button>
  );
}

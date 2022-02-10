import { ReactElement } from "react";

import classNames from "classnames";
import { t } from "ttag";

export interface TabInfo {
  name: string;
  current: boolean;
  onTabClick?: () => void;
  href?: string;
}

interface TabsProps {
  tabs: TabInfo[];
  "aria-label": string;
}
export default function Tabs({ tabs }: TabsProps): ReactElement {
  return (
    <nav className={classNames("-mb-px flex")} aria-label={t`Tabs`}>
      {tabs.map((tab, i) => {
        const className = classNames(
          getTextColor(tab.current),
          getBackgroundColor(tab.current),
          getBorderRadius(i, tabs.length),
          getFocusRing(tab.current),
          getBorderColor(tab.current),
          "border-b-2 text-lg px-4 py-2 font-semibold",
        );
        if (tab.href) {
          return (
            <a
              key={tab.name}
              href={tab.href}
              target="_blank"
              rel="noreferrer"
              className={className}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </a>
          );
        }
        return (
          <button
            key={tab.name}
            onClick={tab.onTabClick}
            className={className}
            aria-current={tab.current ? "page" : undefined}
          >
            {tab.name}
          </button>
        );
      })}
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

function getBorderRadius(i: number, length: number) {
  if (i === 0) {
    return "rounded-l-xl";
  }
  if (i === length - 1) {
    return "rounded-r-xl";
  }
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

import { ReactElement } from "react";
import tw, { TPseudoClasses, TTextColor } from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

export interface TabInfo {
  id: string;
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
    <nav className={tw("-mb-px", "flex")} aria-label={t`Tabs`}>
      {tabs.map((tab, i) => {
        const className = tw(
          "border-gray-200",
          "border-b-2",
          "hover:border-gray-300",
          "text-lg",
          "px-4",
          "py-2",
          "font-semibold",
          {
            "rounded-l-xl": i === 0,
            "rounded-r-xl": i === tabs.length - 1,
          },
          ...getTextColor(tab.current),
          tab.current ? "bg-paleLily" : "bg-hackerSky"
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

function getTextColor(current: boolean): (TTextColor | TPseudoClasses)[] {
  if (current) {
    return ["text-principalRoyalBlue", "hover:text-principalRoyalBlue"];
  }
  return ["text-yieldBlue"];
}

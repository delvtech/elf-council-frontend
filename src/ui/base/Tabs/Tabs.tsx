import { ReactElement } from "react";
import tw, {
  TArg,
  textColor,
  display,
  borderColor,
  borderWidth,
  fontSize,
  padding,
  fontWeight,
  borderRadius,
  backgroundColor,
} from "src/elf-tailwindcss-classnames";
import classnames from "classnames";
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
    <nav className={classnames("-mb-px", display("flex"))} aria-label={t`Tabs`}>
      {tabs.map((tab, i) => {
        const className = tw(
          getTextColor(tab.current),
          tab.current
            ? backgroundColor("bg-paleLily")
            : backgroundColor("bg-hackerSky"),
          borderColor("border-gray-200", "hover:border-gray-300"),
          borderWidth("border-b-2"),
          fontSize("text-lg"),
          padding("px-4", "py-2"),
          fontWeight("font-semibold"),
          borderRadius({
            "rounded-l-xl": i === 0,
            "rounded-r-xl": i === tabs.length - 1,
          }),
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

function getTextColor(current: boolean): TArg {
  if (current) {
    return textColor(
      "text-principalRoyalBlue",
      "hover:text-principalRoyalBlue",
    );
  }
  return textColor("text-yieldBlue");
}

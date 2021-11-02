import classNames from "classnames";
import { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

export interface TabInfo {
  id: string;
  name: string;
  current: boolean;
  onChange: () => void;
}

interface TabsProps {
  tabs: TabInfo[];
  "aria-label": string;
}
export default function Tabs({ tabs }: TabsProps): ReactElement {
  return (
    <nav className={tw("-mb-px", "flex")} aria-label={t`Tabs`}>
      {tabs.map((tab, i) => (
        <button
          key={tab.name}
          onClick={tab.onChange}
          className={classNames(
            tw(
              "shadow",
              "text-lg",
              "px-4",
              "py-2",
              "font-semibold",
              {
                "rounded-l-xl": i === 0,
                "rounded-r-xl": i === tabs.length - 1,
              },
              tab.current ? "text-principalRoyalBlue" : "text-yieldBlue",
              tab.current
                ? "hover:text-principalRoyalBlue"
                : "hover:text-denimBlue",
              tab.current ? "bg-paleLily" : "bg-hackerSky"
            )
          )}
          aria-current={tab.current ? "page" : undefined}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  );
}

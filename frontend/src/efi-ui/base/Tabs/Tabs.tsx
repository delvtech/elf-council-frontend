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
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className={tw("sr-only")}>
          {t`Select a tab`}
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className={tw(
            "block",
            "w-full",
            "pl-3",
            "pr-10",
            "py-2",
            "text-base",
            "border-gray-300",
            "focus:outline-none",
            "focus:ring-indigo-500",
            "focus:border-indigo-500",
            "sm:text-sm",
            "rounded-md"
          )}
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option onClick={tab.onChange} key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className={tw("hidden", "sm:block")}>
        <div className={tw("border-b", "border-gray-200")}>
          <nav className={tw("-mb-px", "flex", "space-x-8")} aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={tab.onChange}
                className={classNames(
                  tab.current
                    ? tw("border-indigo-500", "text-indigo-600")
                    : tw(
                        "border-transparent",
                        "text-gray-500",
                        "hover:text-gray-700",
                        "hover:border-gray-300"
                      ),
                  tw(
                    "whitespace-nowrap",
                    "py-4",
                    "px-1",
                    "border-b-2",
                    "font-medium",
                    "text-sm"
                  )
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

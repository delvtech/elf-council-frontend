import { ReactElement, ReactNode } from "react";
import tw from "src/elf-tailwindcss-classnames";

interface TooltipProps {
  text: ReactNode;
  enabled?: boolean;
  position?: "top" | "botton";
  children: ReactNode;
}
export function Tooltip(props: TooltipProps): ReactElement {
  const { text, enabled = false, position = "top", children } = props;
  return (
    <div className={tw("relative", "py-3", "sm:max-w-xl", "sm:mx-auto")}>
      <div
        className={tw(
          "group",
          "cursor-pointer",
          "relative",
          "inline-block",
          "border-b",
          "border-gray-400",
          "w-28",
          "text-center"
        )}
      >
        {children}
        <div
          className={tw(
            "opacity-0",
            "w-28",
            "bg-black",
            "text-white",
            "text-center",
            "text-xs",
            "rounded-lg",
            "py-2",
            "absolute",
            "z-10",
            "bottom-full",
            "-left-1/2",
            "ml-14",
            "px-3",
            "pointer-events-none",
            { "group-hover:opacity-100": enabled }
          )}
        >
          {text}
          <svg
            className={tw(
              "absolute",
              "text-black",
              "h-2",
              "w-full",
              "left-0",
              "top-full"
            )}
            x="0px"
            y="4px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon
              className={tw("fill-current")}
              points="0,0 127.5,127.5 255,0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

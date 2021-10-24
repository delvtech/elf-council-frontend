import { CSSProperties, ReactElement, ReactNode } from "react";

import classNames from "classnames";
import tw from "src/elf-tailwindcss-classnames";

const bottomFull: CSSProperties = {
  bottom: "calc(100% + 4px)",
};
interface TooltipProps {
  className?: string;
  tooltipClassName?: string;
  text: ReactNode;
  enabled?: boolean;
  show?: boolean;
  position?: "top" | "botton";
  children: ReactNode;
}
export function Tooltip(props: TooltipProps): ReactElement {
  const {
    className,
    tooltipClassName,
    text,
    enabled = false,
    show = false,
    position = "top",
    children,
  } = props;
  return (
    <div
      className={classNames(
        tw(
          "group",
          "cursor-pointer",
          "relative",
          "inline-block",
          "text-center"
        ),
        className
      )}
    >
      {children}
      <div
        style={bottomFull}
        className={classNames(
          tw(
            "opacity-0",
            "bg-black",
            "text-white",
            "text-center",
            "text-xs",
            "rounded-lg",
            "py-2",
            "absolute",
            "z-10",
            "left-1/2",
            "px-3",
            "pointer-events-none",
            { "group-hover:opacity-100": enabled, "opacity-100": show }
          ),
          tooltipClassName
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
  );
}

import { CSSProperties, ReactElement, ReactNode } from "react";

import classNames from "classnames";
import tw, {
  cursor,
  position as twPosition,
  display,
  textAlign,
  opacity,
  backgroundColor,
  textColor,
  fontSize,
  borderRadius,
  padding,
  zIndex,
  inset,
  pointerEvents,
  height,
  width,
  fill,
} from "src/elf-tailwindcss-classnames";

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
        "group",
        tw(
          cursor("cursor-pointer"),
          twPosition("relative"),
          display("inline-block"),
          textAlign("text-center"),
        ),
        className,
      )}
    >
      {children}
      <div
        style={bottomFull}
        className={classNames(
          tw(
            opacity("opacity-0"),
            backgroundColor("bg-black"),
            textColor("text-white"),
            textAlign("text-center"),
            fontSize("text-xs"),
            borderRadius("rounded-lg"),
            padding("py-2", "px-3"),
            twPosition("absolute"),
            zIndex("z-10"),
            inset("left-1/2"),
            pointerEvents("pointer-events-none"),
            opacity({
              "group-hover:opacity-100": enabled,
              "opacity-100": show,
            }),
          ),
          tooltipClassName,
        )}
      >
        {text}
        <svg
          className={tw(
            twPosition("absolute"),
            textColor("text-black"),
            height("h-2"),
            width("w-full"),
            inset("left-0", "top-full"),
          )}
          x="0px"
          y="4px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon
            className={tw(fill("fill-current"))}
            points="0,0 127.5,127.5 255,0"
          />
        </svg>
      </div>
    </div>
  );
}

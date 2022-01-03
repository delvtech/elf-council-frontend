import React, {
  CSSProperties,
  PropsWithChildren,
  ReactElement,
  useContext,
} from "react";
import classNames from "classnames";
import { TooltipContext } from "./TooltipProvider";

interface PopupProps {
  show?: boolean;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  style?: CSSProperties;
  arrowClassName?: string;
}

export default function TooltipPopup({
  show,
  position = "top",
  className,
  style,
  arrowClassName,
  children,
}: PropsWithChildren<PopupProps>): ReactElement {
  const context = useContext(TooltipContext);
  const isShowing = show ?? context.isShowing;
  return (
    <span
      className={classNames(
        "max-w-sm w-max max-h-96 block absolute opacity-0 transition-all bg-hackerSky text-principalRoyalBlue rounded drop-shadow z-20",
        {
          // position
          "left-1/2 -translate-x-1/2":
            position === "top" || position === "bottom",
          "bottom-full mb-3": position === "top",
          "top-full mt-3": position === "bottom",
          "top-1/2 -translate-y-1/2":
            position === "right" || position === "left",
          "left-full ml-3": position === "right",
          "right-full mr-3": position === "left",

          // show
          "!opacity-100": isShowing,
          "pointer-events-none": !isShowing,
        },
        className,
      )}
      style={style}
      onMouseOver={context.show}
      onFocus={context.show}
      onMouseOut={context.hide}
      onBlur={context.hide}
    >
      <span className="block max-w-sm px-2 py-1 overflow-y-auto w-max max-h-96">
        {children}
      </span>
      <svg
        className={classNames(
          "absolute fill-hackerSky",
          {
            "left-1/2 -translate-x-1/2":
              position === "top" || position === "bottom",
            "top-full": position === "top",
            "bottom-full rotate-180": position === "bottom",

            "top-1/2 translate-y-full":
              position === "right" || position === "left",
            "right-full rotate-90 origin-top-right": position === "right",
            "left-full -rotate-90 origin-top-left": position === "left",

            "!opacity-100": isShowing,
            "pointer-events-none": !isShowing,
          },
          arrowClassName,
        )}
        width="16"
        height="8"
        viewBox="0 0 16 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 8L12.6201 1.64731C13.3728 0.612336 14.5753 0 15.8551 0H0.14492C1.42467 0 2.62716 0.612338 3.37987 1.64732L8 8Z" />
      </svg>
    </span>
  );
}

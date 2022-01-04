import { PropsWithChildren, ReactElement } from "react";
import {
  Tooltip2,
  Tooltip2Props,
  Popover2,
  Popover2Props,
} from "@blueprintjs/popover2";
import classNames from "classnames";

export default function Tooltip({
  content,
  disabled,
  hoverCloseDelay,
  hoverOpenDelay,
  interactionKind = "hover",
  isOpen,
  placement = "top",
  transitionDuration,
  className,
  popoverClassName,
  children,
}: PropsWithChildren<Popover2Props>): ReactElement {
  const rest = {
    content,
    disabled,
    hoverCloseDelay,
    hoverOpenDelay,
    interactionKind,
    isOpen,
    placement,
    transitionDuration,
  };
  return (
    <Popover2
      className={className}
      popoverClassName={classNames(
        "p-1 bg-hackerSky text-principalRoyalBlue",
        popoverClassName,
      )}
      {...rest}
    >
      {children}
    </Popover2>
  );
}

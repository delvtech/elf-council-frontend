import { PropsWithChildren, ReactElement } from "react";
import { Tooltip2, Tooltip2Props } from "@blueprintjs/popover2";
import classNames from "classnames";
import styles from "./Tooltip.module.css";

export default function Tooltip(
  props: PropsWithChildren<Tooltip2Props>,
): ReactElement {
  const {
    popoverClassName,
    children,
    placement = "top",
    interactionKind = "hover",
  } = props;
  const propsWithDefaults = {
    placement,
    interactionKind,
  };
  return (
    <Tooltip2
      {...props}
      {...propsWithDefaults}
      placement={placement}
      popoverClassName={classNames(styles.popover, popoverClassName)}
    >
      {children}
    </Tooltip2>
  );
}

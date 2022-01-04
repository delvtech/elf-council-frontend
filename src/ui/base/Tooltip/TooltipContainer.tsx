import React, {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import classNames from "classnames";
import useTooltip, { UseTooltipProps } from "./useTooltip";
import TooltipProvider, { TooltipProviderValue } from "./TooltipProvider";
import Trigger from "./TooltipTrigger";
import Popup from "./TooltipPopup";

interface TooltipContainerProps<T extends ElementType> extends UseTooltipProps {
  as?: T;
  className?: string;
  children?: ReactNode | ((props: TooltipProviderValue) => JSX.Element);
}

export default function TooltipContainer<T extends ElementType = "span">({
  as,
  children,
  className,
  showDelay,
  hideDelay,
  ...props
}: PropsWithChildren<
  TooltipContainerProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TooltipContainerProps<T>>
>): ReactElement {
  const tooltip = useTooltip({ showDelay, hideDelay });
  const Component = as || "span";
  return (
    <TooltipProvider tooltip={tooltip}>
      <Component className={classNames("relative", className)} {...props}>
        {typeof children === "function" ? children(tooltip) : children}
      </Component>
    </TooltipProvider>
  );
}

TooltipContainer.Trigger = Trigger;
TooltipContainer.Popup = Popup;

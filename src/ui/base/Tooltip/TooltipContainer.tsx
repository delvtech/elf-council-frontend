import React, {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
} from "react";
import classNames from "classnames";
import useTooltip, { UseTooltipProps } from "./useTooltip";
import TooltipProvider from "./TooltipProvider";
import Trigger from "./TooltipTrigger";
import Popup from "./TooltipPopup";

interface TooltipContainerProps<T extends ElementType> extends UseTooltipProps {
  as?: T;
  className?: string;
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
        {children}
      </Component>
    </TooltipProvider>
  );
}

TooltipContainer.Trigger = Trigger;
TooltipContainer.Popup = Popup;

import React, { ElementType, ReactElement, ReactNode } from "react";
import { PolymorphicComponentProps } from "src/@types/helper";
import useTooltip, { UseTooltipProps } from "./useTooltip";
import TooltipProvider, { TooltipProviderValue } from "./TooltipProvider";
import Trigger from "./TooltipTrigger";
import Popup from "./TooltipPopup";
import classNames from "classnames";

interface TooltipContainerProps extends UseTooltipProps {
  className?: string;
  children?: ReactNode | ((props: TooltipProviderValue) => JSX.Element);
}

export default function TooltipContainer<C extends ElementType = "span">({
  as,
  children,
  className,
  showDelay,
  hideDelay,
  ...props
}: PolymorphicComponentProps<C, TooltipContainerProps>): ReactElement {
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

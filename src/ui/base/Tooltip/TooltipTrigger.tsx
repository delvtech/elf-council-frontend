import React, {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
  useContext,
} from "react";
import { TooltipContext } from "./TooltipProvider";

interface TriggerProps<T extends ElementType> {
  as?: T;
  disabled?: boolean;
  className?: string;
}

export default function TooltipTrigger<T extends ElementType = "span">({
  as,
  disabled,
  className,
  children,
  ...props
}: PropsWithChildren<
  TriggerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TriggerProps<T>>
>): ReactElement {
  const { show, hide } = useContext(TooltipContext);

  const Component = as || "span";
  return (
    <Component
      className={className}
      {...props}
      onMouseOver={disabled ? undefined : show}
      onMouseOut={disabled ? undefined : hide}
    >
      {children}
    </Component>
  );
}

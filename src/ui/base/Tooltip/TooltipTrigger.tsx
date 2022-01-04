import React, { ElementType, ReactElement, useContext } from "react";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "src/@types/helper";
import { TooltipContext } from "./TooltipProvider";

interface Props {
  disabled?: boolean;
  className?: string;
}

type TriggerProps<C extends ElementType> = PolymorphicComponentPropsWithRef<
  C,
  Props
>;

type TriggerComponent = <C extends ElementType = "span">(
  props: TriggerProps<C>,
) => ReactElement | null;

const TooltipTrigger: TriggerComponent = React.forwardRef(
  function TooltipTrigger<C extends ElementType = "span">(
    { as, disabled, className, children, ...props }: TriggerProps<C>,
    ref?: PolymorphicRef<C>,
  ) {
    const { show, hide } = useContext(TooltipContext);
    const Component = as || "span";
    return (
      <Component
        className={className}
        {...props}
        onMouseOver={disabled ? undefined : show}
        onFocus={disabled ? undefined : show}
        onMouseOut={disabled ? undefined : hide}
        onBlur={disabled ? undefined : hide}
        tabIndex={0}
        ref={ref}
      >
        {children}
      </Component>
    );
  },
);

export default TooltipTrigger;

import React, {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from "react";
import classNames from "classnames";
import { useDebounceFunction } from "src/ui/base/useDebounceFunction";
import { CSSProperties } from "react";

/*
Basic Usage Example:
````````````````````````````````````````````````````````````````````````````````
import Tooltip from "src/ui/base/Tooltip/Tooltip";

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis rutrum 
  nisi, quis ornare dui. Praesent mauris elit, luctus sit amet nunc sit amet, 
  rhoncus consectetur erat.

  <Tooltip>
    <Tooltip.Trigger className="border-b border-dashed">
      I have a tooltip!
    </Tooltip.Trigger>
    <Tooltip.Popup>I'm a toolip!</Tooltip.Popup>
  </Tooltip>

  Proin vel nunc nec neque luctus ultricies. 
  Praesent venenatis fringilla lorem, quis scelerisque dolor sagittis sed. Donec 
  rutrum mauris magna, quis congue augue porta eget. Curabitur ornare leo vitae 
  cursus porttitor.
</p>
````````````````````````````````````````````````````````````````````````````````

<Tooltip.Popup> is positioned relative to <Tooltip>.

<Tooltip> and <Tooltip.Trigger> are polymorphic components which accept an 
optional "as" prop that can be passed a:
  - tag name as a string (e.g. as="div") (default: "span")
  - component (e.g. as={Card})

They then accept any props that the tag/component in the "as" prop accepts.

Example:
````````````````````````````````````````````````````````````````````````````````
<Tooltip as={div}>
  ...
  <Tooltip.Trigger as={Button} variant={ButtonVariant.GRADIENT}>
    ...
  </Tooltip.Trigger>
  ...
</Tooltip>
````````````````````````````````````````````````````````````````````````````````

More on polymorphism: https://design-system.pluralsight.com/patterns/polymorphic

If <Tooltip.Trigger> is made a block element (e.g. div), then it's important
that <Tooltip> also be a block element to prevent misrendering in some browsers.

*/

interface TooltipProviderValue {
  isShowing: boolean;
  show: () => void;
  hide: () => void;
}

interface UseTooltipProps {
  showDelay?: number;
  hideDelay?: number;
}

const defaultHidDelay = 200;
export function useTooltip(props?: UseTooltipProps): TooltipProviderValue {
  const { showDelay = 100, hideDelay = defaultHidDelay } = props || {};
  const [isShowing, setIsShowing] = useState(false);

  const [show, cancelShow] = useDebounceFunction(() => {
    setIsShowing(true);
  }, showDelay);

  const [hide, cancelHide] = useDebounceFunction(() => {
    setIsShowing(false);
  }, hideDelay);

  return {
    isShowing,
    show: () => {
      cancelHide();
      show();
    },
    hide: () => {
      cancelShow();
      hide();
    },
  };
}

const TooltipContext = React.createContext({
  isShowing: false,
  show: () => {},
  hide: () => {},
} as TooltipProviderValue);

export function TooltipProvider({
  tooltip,
  children,
}: PropsWithChildren<{ tooltip: TooltipProviderValue }>): ReactElement {
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

interface TriggerProps<T extends ElementType> {
  as?: T;
  disabled?: boolean;
  className?: string;
}

function Trigger<T extends ElementType = "span">({
  as,
  disabled,
  className,
  children,
}: PropsWithChildren<
  TriggerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TriggerProps<T>>
>): ReactElement {
  const { show, hide } = useContext(TooltipContext);

  const Component = as || "span";
  return (
    <Component
      className={className}
      onMouseOver={disabled ? undefined : show}
      onMouseOut={disabled ? undefined : hide}
    >
      {children}
    </Component>
  );
}

interface PopupProps {
  show?: boolean;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  style?: CSSProperties;
  arrowClassName?: string;
}

function Popup({
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
          "left-1/2 -translate-x-1/2":
            position === "top" || position === "bottom",
          "bottom-full mb-3": position === "top",
          "top-full mt-3": position === "bottom",
          "top-1/2 -translate-y-1/2":
            position === "right" || position === "left",
          "left-full ml-3": position === "right",
          "right-full mr-3": position === "left",
          "!opacity-100": isShowing,
          "pointer-events-none": !isShowing,
        },
        className,
      )}
      style={style}
    >
      <span className="block max-w-sm px-3 py-2 overflow-y-auto w-max max-h-96">
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

interface TooltipProps<T extends ElementType> extends UseTooltipProps {
  as?: T;
  className?: string;
}

export default function Tooltip<T extends ElementType = "span">({
  as,
  children,
  className,
  showDelay,
  hideDelay,
  ...props
}: PropsWithChildren<
  TooltipProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TooltipProps<T>>
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

Tooltip.Trigger = Trigger;
Tooltip.Popup = Popup;

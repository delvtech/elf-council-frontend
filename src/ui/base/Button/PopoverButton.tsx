/* This example requires Tailwind CSS v2.0+ */
import React, {
  Fragment,
  LegacyRef,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { usePopper } from "react-popper";

import { Popover } from "@headlessui/react";
import classNames from "classnames";

import { ButtonProps } from "src/ui/base/Button/Button";
import { getButtonClass } from "src/ui/base/Button/styles";
import { isFunction } from "lodash";

interface PopoverButtonProps extends ButtonProps {
  popover: ReactNode;
  popoverClassName?: string;
}

export default function PopoverButton({
  disabled,
  variant,
  size,
  round,
  fill,
  children,
  error,
  popover,
  className,
  popoverClassName,
}: PopoverButtonProps): ReactElement {
  const buttonClass = getButtonClass({
    variant,
    size,
    round,
    fill,
    disabled,
    error,
  });
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  return (
    <Popover>
      {({ open }) => (
        <Fragment>
          <Popover.Button
            // setReferenceElement is a Dispatch function from useState.  This is the prescribed way to
            // do this by headless-ui.  See documentation here:
            // https://headlessui.dev/react/popover#positioning-the-panel
            ref={setReferenceElement as LegacyRef<HTMLButtonElement>}
            disabled={disabled}
            className={classNames(className, buttonClass, "relative")}
          >
            {isFunction(children) ? children(open) : children}
          </Popover.Button>

          <Popover.Panel
            style={styles.popper}
            {...attributes.popper}
            // setPopperElement is a Dispatch function from useState.  This is the prescribed way to
            // do this by headless-ui.  See documentation here:
            // https://headlessui.dev/react/popover#positioning-the-panel
            ref={setPopperElement as LegacyRef<HTMLDivElement>}
            className={classNames(popoverClassName, "absolute z-10")}
          >
            <Popover.Button>{popover}</Popover.Button>
          </Popover.Panel>
        </Fragment>
      )}
    </Popover>
  );
}

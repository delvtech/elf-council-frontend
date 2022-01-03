/* This example requires Tailwind CSS v2.0+ */
import React, { LegacyRef, ReactElement, ReactNode, useState } from "react";
import { usePopper } from "react-popper";

import { Popover } from "@headlessui/react";
import classNames from "classnames";

import { ButtonProps } from "src/ui/base/Button/Button";
import { getButtonClass } from "src/ui/base/Button/styles";

interface PopoverButtonProps extends ButtonProps {
  popover: ReactNode;
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
      <Popover.Button
        // setReferenceElement is a Dispatch function from useState.  This is the prescribed way to
        // do this by headless-ui.  See documentation here:
        // https://headlessui.dev/react/popover#positioning-the-panel
        ref={setReferenceElement as LegacyRef<HTMLButtonElement>}
        disabled={disabled}
        className={classNames(buttonClass, "relative")}
      >
        {children}
      </Popover.Button>

      <Popover.Panel
        style={styles.popper}
        {...attributes.popper}
        // setPopperElement is a Dispatch function from useState.  This is the prescribed way to
        // do this by headless-ui.  See documentation here:
        // https://headlessui.dev/react/popover#positioning-the-panel
        ref={setPopperElement as LegacyRef<HTMLDivElement>}
        className={classNames("absolute z-10")}
      >
        {popover}
      </Popover.Panel>
    </Popover>
  );
}

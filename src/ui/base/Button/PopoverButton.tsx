/* This example requires Tailwind CSS v2.0+ */
import React, { ReactElement, ReactNode } from "react";
import { Popover } from "@headlessui/react";
import tw from "src/elf-tailwindcss-classnames";
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
  return (
    <Popover>
      <Popover.Button
        disabled={disabled}
        className={tw("relative", buttonClass)}
      >
        {children}
      </Popover.Button>

      <Popover.Panel className={tw("absolute", "z-10")}>
        {popover}
      </Popover.Panel>
    </Popover>
  );
}

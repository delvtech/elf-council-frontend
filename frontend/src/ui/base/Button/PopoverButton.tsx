/* This example requires Tailwind CSS v2.0+ */
import React, { ReactElement, ReactNode } from "react";
import { Popover } from "@headlessui/react";
import tw from "src/elf-tailwindcss-classnames";

interface PopoverButtonProps {
  button: ReactNode;
  popover: ReactNode;
}

export default function PopoverButton({
  button,
  popover,
}: PopoverButtonProps): ReactElement {
  return (
    <Popover>
      <Popover.Button className={tw("relative")}>{button}</Popover.Button>

      <Popover.Panel className={tw("absolute", "z-10")}>
        {popover}
      </Popover.Panel>
    </Popover>
  );
}

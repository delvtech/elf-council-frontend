import classNames from "classnames";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import { getButtonClass } from "src/efi-ui/base/Button/styles";
import tw from "src/elf-tailwindcss-classnames";

interface LinkButtonProps {
  link: string;
  children?: ReactNode;
  minimal?: boolean;
}

export default function LinkButton(props: LinkButtonProps): ReactElement {
  const { link, children, minimal } = props;
  const buttonClass = getButtonClass({ minimal });
  return (
    <Link href={link} passHref>
      <div className={classNames(buttonClass, tw("cursor-pointer"))}>
        {children}
      </div>
    </Link>
  );
}

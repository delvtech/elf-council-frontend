import React, { ReactElement, ReactNode } from "react";
import Card from "src/ui/base/Card/Card";

import tw, {
  display,
  flexDirection,
  textColor,
  fontWeight,
  fontSize,
  padding,
  flex,
  justifyContent,
  alignItems,
} from "src/elf-tailwindcss-classnames";
import classnames from "classnames";
import Link from "next/link";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { t } from "ttag";

interface SummaryCardProps {
  title: string;
  balance?: ReactNode;
  children?: ReactNode;
}
export function SummaryCard(props: SummaryCardProps): ReactElement {
  const { balance, title, children } = props;

  return (
    <Card className={tw(display("flex"), flexDirection("flex-col"))}>
      <div
        className={classnames(
          "-mt-2",
          tw(
            textColor("text-principalRoyalBlue"),
            fontWeight("font-light"),
            fontSize("text-sm"),
          ),
        )}
      >
        <Tooltip content={t`Click to find out more.`}>
          <Link href="/resources">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>{title}</a>
          </Link>
        </Tooltip>
      </div>
      <div
        className={tw(
          padding("py-4"),
          display("flex"),
          flex("flex-1"),
          justifyContent("justify-center"),
          alignItems("items-center"),
          fontWeight("font-extralight"),
          fontSize("text-5xl"),
          textColor("text-principalRoyalBlue"),
        )}
      >
        {balance}
      </div>
      {children}
    </Card>
  );
}

export default SummaryCard;

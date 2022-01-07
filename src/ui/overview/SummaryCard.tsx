import React, { ReactElement, ReactNode } from "react";
import Card from "src/ui/base/Card/Card";

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
    <Card className="flex flex-col lg:flex-1">
      <div className="-mt-2 text-sm font-light text-principalRoyalBlue">
        <Tooltip content={t`Click to find out more.`}>
          <Link href="/resources">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>{title}</a>
          </Link>
        </Tooltip>
      </div>
      <div className="flex items-center justify-center flex-1 py-4 text-5xl font-extralight text-principalRoyalBlue">
        {balance}
      </div>
      {children}
    </Card>
  );
}

export default SummaryCard;

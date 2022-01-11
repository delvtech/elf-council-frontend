import React, { ReactElement, ReactNode } from "react";

import { t } from "ttag";

import Card from "src/ui/base/Card/Card";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { RESOURCES_URL } from "src/ui/resources";

interface SummaryCardProps {
  title: string;
  balance?: ReactNode;
  children?: ReactNode;
}
export function SummaryCard(props: SummaryCardProps): ReactElement {
  const { title, balance, children } = props;

  return (
    <Card className="flex flex-col lg:flex-1">
      <div className="-mt-2 text-sm font-light text-principalRoyalBlue">
        <Tooltip content={t`Click to find out more.`}>
          <a
            target="_blank"
            rel="noreferrer"
            href={RESOURCES_URL}
            className="underline"
          >
            {title}
          </a>
        </Tooltip>
      </div>
      <div className="flex items-center justify-center flex-1 py-4 text-5xl text-center font-extralight text-principalRoyalBlue">
        {balance}
      </div>
      {children}
    </Card>
  );
}

export default SummaryCard;

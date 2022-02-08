import React, { ReactElement, ReactNode } from "react";

import { t } from "ttag";

import Card from "src/ui/base/Card/Card";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { RESOURCES_URL } from "src/ui/resources";

interface SummaryCardProps {
  title: string;
  tooltipContent?: string | ReactElement;
  balance?: ReactNode;
  children?: ReactNode;
}
export function SummaryCard(props: SummaryCardProps): ReactElement {
  const { title, balance, children, tooltipContent } = props;

  return (
    <Card className="flex flex-col lg:flex-1">
      <div className="-mt-2 text-sm font-light text-principalRoyalBlue">
        {tooltipContent ? (
          <Tooltip content={tooltipContent}>
            <a
              target="_blank"
              rel="noreferrer"
              href={RESOURCES_URL}
              className="underline"
            >
              {title}
            </a>
          </Tooltip>
        ) : (
          <a
            target="_blank"
            rel="noreferrer"
            href={RESOURCES_URL}
            className="underline"
          >
            {title}
          </a>
        )}
      </div>
      <div className="flex items-center justify-center flex-1 py-4 text-5xl text-center font-extralight text-principalRoyalBlue">
        {balance}
      </div>
      {children}
    </Card>
  );
}

export default SummaryCard;

import React, { ReactElement, ReactNode } from "react";
import Card from "src/ui/base/Card/Card";

import tw from "src/elf-tailwindcss-classnames";

interface SummaryCardProps {
  title: string;
  balance?: ReactNode;
  children?: ReactNode;
}
export function SummaryCard(props: SummaryCardProps): ReactElement {
  const { balance, title, children } = props;

  return (
    <Card className={tw("flex", "flex-col")}>
      <div
        className={tw(
          "text-principalRoyalBlue",
          "font-light",
          "text-sm",
          "-mt-2"
        )}
      >
        {title}
      </div>
      <div
        className={tw(
          "py-4",
          "flex",
          "flex-1",
          "justify-center",
          "items-center",
          "font-extralight",
          "text-5xl",
          "text-principalRoyalBlue"
        )}
      >
        {balance}
      </div>
      {children}
    </Card>
  );
}

export default SummaryCard;

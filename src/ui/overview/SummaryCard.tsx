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
    <Card>
      <h3 className={tw("text-blue-900", "font-semibold")}>{title}</h3>
      <p className={tw("text-lg", "text-blue-500", "font-semibold")}>
        {balance}
      </p>
      {children}
    </Card>
  );
}

export default SummaryCard;

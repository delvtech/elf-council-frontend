import React, { ReactElement } from "react";
import Card from "src/efi-ui/base/Card/Card";

import tw from "src/elf-tailwindcss-classnames";

interface SummaryCardProps {
  title: string;
  balance: number;
}
export function SummaryCard(props: SummaryCardProps): ReactElement {
  const { balance, title } = props;

  return (
    <Card>
      <h3 className={tw("text-blue-900", "font-semibold")}>{title}</h3>
      <p className={tw("text-lg", "text-blue-500", "font-semibold")}>
        {balance}
      </p>
    </Card>
  );
}

export default SummaryCard;

import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";
import SummaryCard from "src/ui/overview/SummaryCard";

export function SummaryCards(): ReactElement {
  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "space-y-6",
        "lg:space-y-0",
        "lg:grid",
        "lg:grid-cols-3",
        "lg:gap-6"
      )}
    >
      <SummaryCard title="Claimed Today" balance={6000} />
      <SummaryCard title="Circulating Supply" balance={400.079} />
      <SummaryCard title="Total Voting Power" balance={100} />
    </div>
  );
}

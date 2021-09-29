import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";
import SummaryCard from "src/efi-ui/overview/SummaryCard";

export function SummaryCards(): ReactElement {
  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "p-4",
        "space-y-6",
        "lg:space-y-0",
        "lg:grid",
        "lg:grid-cols-4",
        "lg:gap-6"
      )}
    >
      <SummaryCard title="Votes Delegated" balance={6000} />
      <SummaryCard title="Total Governance Rewards" balance={400.079} />
      <SummaryCard title="Proposals" balance={100} />
      <SummaryCard title="Governance Tokens Circulating" balance={790} />
    </div>
  );
}

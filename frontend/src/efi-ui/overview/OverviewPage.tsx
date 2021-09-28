import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";
import SummaryCard from "src/efi-ui/overview/SummaryCard";
import Middle from "src/efi-ui/overview/Middle";
import RightBar from "src/efi-ui/overview/RightBar";
import { useProposals } from "src/efi-ui/proposals/useProposals";
import { t } from "ttag";

export function OverviewPage(): ReactElement {
  const { data } = useProposals();
  console.log("data", data);

  return (
    <div className={tw("h-full")}>
      <div className={tw("px-8", "py-1")}>
        <p
          className={tw(
            "text-blue-900",
            "font-bold",
            "text-2xl",
            "text-center",
            "transform-gpu",
            "-translate-y-2"
          )}
        >
          {t`Governance Overview`}
        </p>
      </div>
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
      <div className={tw("flex", "ml-3", "mt-6", "space-x-6", "mr-4")}>
        <Middle />
        <RightBar />
      </div>
    </div>
  );
}

export default OverviewPage;

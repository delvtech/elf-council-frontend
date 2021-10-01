import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";
import Middle from "src/efi-ui/overview/Middle";
import RightBar from "src/efi-ui/overview/RightBar";
import { t } from "ttag";
import { SummaryCards } from "./SummaryCards";
import H1 from "src/efi-ui/base/H1";

export function OverviewPage(): ReactElement {
  return (
    <div className={tw("h-full")}>
      <div className={tw("px-8", "py-1")}>
        <H1 className={tw("text-center")}> {t`Governance Overview`}</H1>
      </div>
      <SummaryCards />
      <div className={tw("flex", "ml-3", "mt-6", "space-x-6", "mr-4")}>
        <Middle />
        <RightBar />
      </div>
    </div>
  );
}

export default OverviewPage;

import DescriptionIcon from "@material-ui/icons/Description";
import GavelIcon from "@material-ui/icons/Gavel";
import GradeIcon from "@material-ui/icons/Grade";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";
import Card from "src/efi-ui/overview/Card";
import Middle from "src/efi-ui/overview/Middle";
import RightBar from "src/efi-ui/overview/RightBar";
import { useProposals } from "src/efi-ui/proposals/useProposals";
import { t } from "ttag";

const iconStyle = tw("text-white", "text-xs");

export function OverviewPage(): ReactElement {
  const { data } = useProposals();
  console.log("data", data);

  return (
    <div className={tw("h-full")}>
      <div className={tw("px-8", "py-1")}>
        <p
          className={tw(
            "text-blue-400",
            "font-bold",
            "text-2xl",
            "transform-gpu",
            "-translate-y-2"
          )}
        >
          {t`Governance Overview`}
        </p>
      </div>
      <div className={tw("flex", "p-4", "space-x-3")}>
        <Card
          title="VOTES DELEGATED"
          balance={6000}
          icon={
            <GavelIcon key="gavel" fontSize="small" className={iconStyle} />
          }
        />
        <Card
          title="TOTAL GOVERNANCE REWARDS"
          balance={400.079}
          icon={
            <GradeIcon key="grade" fontSize="small" className={iconStyle} />
          }
        />
        <Card
          title="PROPOSALS"
          balance={100}
          icon={
            <DescriptionIcon
              key="description"
              fontSize="small"
              className={iconStyle}
            />
          }
        />
        <Card
          title="GOVERNANCE TOKENS CIRCULATING"
          balance={790}
          icon={
            <MonetizationOnIcon
              key="monetization"
              fontSize="small"
              className={iconStyle}
            />
          }
        />
      </div>
      <div className={tw("flex", "ml-3", "mt-6", "space-x-6", "mr-4")}>
        <Middle />
        <RightBar />
      </div>
    </div>
  );
}

export default OverviewPage;

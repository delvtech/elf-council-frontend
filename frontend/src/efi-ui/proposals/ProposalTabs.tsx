import ExternalLinkIcon from "@material-ui/icons/ExitToApp";
import React, { ReactElement } from "react";
import Tabs, { TabInfo } from "src/efi-ui/base/Tabs/Tabs";
import { SNAPSHOT_URL } from "src/efi-ui/proposals/SNAPSHOT_URL";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

interface ProposalTabsProps {
  proposalTabs: TabInfo[];
}
export function ProposalTabs({
  proposalTabs,
}: ProposalTabsProps): ReactElement {
  return (
    <div className={tw("flex", "items-center", "space-x-8", "pb-8")}>
      <a
        href={SNAPSHOT_URL}
        className={tw("font-semibold", "text-blue-800", "hover:underline")}
      >
        {t`Off-chain`}
        <ExternalLinkIcon className={tw("ml-2")} />
      </a>
      <Tabs aria-label={t`Filter proposals`} tabs={proposalTabs} />
    </div>
  );
}

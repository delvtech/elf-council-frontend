import ExternalLinkIcon from "@material-ui/icons/ExitToApp";
import React, { ReactElement } from "react";
import Tabs, { TabInfo } from "src/ui/base/Tabs/Tabs";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";
import { ELEMENT_FINANCE_SNAPSHOT_URL } from "src/elf-snapshot/endpoints";

interface ProposalTabsProps {
  proposalTabs: TabInfo[];
}
export function ProposalTabs({
  proposalTabs,
}: ProposalTabsProps): ReactElement {
  return (
    <div className={tw("flex", "items-center", "space-x-8", "pb-8")}>
      <a
        href={ELEMENT_FINANCE_SNAPSHOT_URL}
        className={tw("font-semibold", "text-brandDarkBlue", "hover:underline")}
      >
        {t`Off-chain`}
        <ExternalLinkIcon className={tw("ml-2")} />
      </a>
      <Tabs aria-label={t`Filter proposals`} tabs={proposalTabs} />
    </div>
  );
}

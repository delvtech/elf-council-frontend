import { useWeb3React } from "@web3-react/core";
import React, { ReactElement, useMemo, useState } from "react";
import { proposalsBySnapShotId } from "src/elf-council-proposals";
import { ELEMENT_FINANCE_SNAPSHOT_URL } from "src/elf-snapshot/endpoints";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import tw from "src/elf-tailwindcss-classnames";
import H1 from "src/ui/base/H1";
import Tabs, { TabInfo } from "src/ui/base/Tabs/Tabs";
import { ProposalDetailsCard } from "src/ui/proposals/ProposalDetailsCard";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useSigner } from "src/ui/signer/useSigner";
import { t } from "ttag";
import { ProposalList } from "./ProposalList";

type TabId = "active-proposals-tab" | "past-proposals-tab";

export default function ProposalsPage(): ReactElement {
  const { data: snapshotProposals } = useSnapshotProposals(
    Object.keys(proposalsBySnapShotId)
  );
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);

  // TODO: Move these into the route so people can link to a proposal easily
  const [activeTabId, setActiveTab] = useState<TabId>("active-proposals-tab");
  const [activeProposalId, setActiveProposalId] = useState<string | undefined>(
    ""
  );
  const activeProposal = activeProposalId
    ? proposalsBySnapShotId[activeProposalId]
    : undefined;

  const filteredProposals = useFilteredProposals(
    activeTabId,
    snapshotProposals
  );

  const proposalTabs: TabInfo[] = useMemo(() => {
    return [
      {
        id: "off-chain-proposals",
        current: false,
        href: ELEMENT_FINANCE_SNAPSHOT_URL,
        name: t`Off-chain`,
      },
      {
        id: "active-proposals-tab",
        current: activeTabId === "active-proposals-tab",
        onTabClick: () => setActiveTab("active-proposals-tab"),
        name: t`Active`,
      },
      {
        id: "past-proposals-tab",
        current: activeTabId === "past-proposals-tab",
        onTabClick: () => setActiveTab("past-proposals-tab"),
        name: t`Past`,
      },
    ];
  }, [activeTabId]);

  return (
    <div className={tw("h-full", "pt-8", "px-8", "space-y-8")}>
      <H1 className={tw("flex-1", "text-center")}>{t`Proposals`}</H1>
      <Tabs aria-label={t`Filter proposals`} tabs={proposalTabs} />
      <div className={tw("flex", "space-x-12")}>
        <ProposalList
          account={account}
          signer={signer}
          proposals={filteredProposals || []}
          activeProposalId={activeProposalId}
        />
        <ProposalDetailsCard proposal={activeProposal} />
      </div>
    </div>
  );
}

function useFilteredProposals(
  activeTabId: string,
  snapshotProposals: SnapshotProposal[] | undefined
) {
  return useMemo(() => {
    if (activeTabId === "active-proposals-tab") {
      return snapshotProposals?.filter((proposal) =>
        ["active", "pending"].includes(proposal.state)
      );
    }

    if (activeTabId === "past-proposals-tab") {
      return snapshotProposals?.filter((proposal) =>
        ["closed"].includes(proposal.state)
      );
    }
  }, [activeTabId, snapshotProposals]);
}

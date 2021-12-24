import { useWeb3React } from "@web3-react/core";
import { Proposal } from "elf-council-proposals";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { proposalsBySnapShotId } from "src/elf-council-proposals";
import { ELEMENT_FINANCE_SNAPSHOT_URL } from "src/elf-snapshot/endpoints";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import H1 from "src/ui/base/H1";
import Tabs, { TabInfo } from "src/ui/base/Tabs/Tabs";
import { ProposalDetailsCard } from "src/ui/proposals/ProposalDetailsCard";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useSigner } from "src/ui/signer/useSigner";
import { t } from "ttag";
import { ProposalList } from "./ProposalList";

type TabId = "active-proposals-tab" | "past-proposals-tab";

export default function ProposalsPage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);

  // TODO: Move these into the route so people can link to a proposal easily
  const [activeTabId, setActiveTab] = useState<TabId>("active-proposals-tab");
  const [activeProposalId, setActiveProposalId] = useState<
    string | undefined
  >();
  const [activeProposal, setActiveProposal] = useState<Proposal | undefined>();

  const { data: snapshotProposals } = useSnapshotProposals(
    Object.keys(proposalsBySnapShotId),
  );

  const filteredProposals = useOnChainProposalsWithSnapshotInfo(
    activeTabId,
    snapshotProposals,
  );

  // set the active proposal when the user switches between Active and Past
  // tabs.
  useEffect(() => {
    setActiveProposalId(filteredProposals?.[0].proposalId);
    setActiveProposal(filteredProposals?.[0]);
  }, [activeTabId, filteredProposals]);

  const onSetActiveProposalId = useCallback(
    (proposalId: string | undefined) => {
      setActiveProposal(
        filteredProposals?.find((p) => p.proposalId === proposalId),
      );
      setActiveProposalId(proposalId);
    },
    [filteredProposals],
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
    <div className="flex h-full">
      <div className="flex-1 h-full px-8 pt-8 space-y-8">
        <H1 className="flex-1 text-center">{t`Proposals`}</H1>
        <Tabs aria-label={t`Filter proposals`} tabs={proposalTabs} />
        <div className="flex space-x-12">
          <ProposalList
            account={account}
            signer={signer}
            proposals={filteredProposals || []}
            activeProposalId={activeProposalId}
            setActiveProposal={onSetActiveProposalId}
          />
        </div>
      </div>
      <div className="pb-20">
        <ProposalDetailsCard
          className="hidden lg:flex"
          account={account}
          proposal={activeProposal}
        />
      </div>
    </div>
  );
}

/**
 * To make sure we are only showing proposals that are deemed safe to vote on, we keep a curated
 * list of proposals hardcoded in the frontend.  The client grabs the snapshot information and we
 * link the on-chain proposal with the snapshot information.
 *
 * @param activeTabId
 * @param snapshotProposals
 * @returns
 */
function useOnChainProposalsWithSnapshotInfo(
  activeTabId: string,
  snapshotProposals: SnapshotProposal[] | undefined,
): Proposal[] | undefined {
  return useMemo(() => {
    if (activeTabId === "active-proposals-tab") {
      return snapshotProposals
        ?.filter((snapshotProposal) =>
          ["active", "pending"].includes(snapshotProposal.state),
        )
        .map((snapshotProposal) => proposalsBySnapShotId[snapshotProposal.id]);
    }

    if (activeTabId === "past-proposals-tab") {
      return snapshotProposals
        ?.filter((snapshotProposal) =>
          ["closed"].includes(snapshotProposal.state),
        )
        .map((snapshotProposal) => proposalsBySnapShotId[snapshotProposal.id]);
    }

    return [];
  }, [activeTabId, snapshotProposals]);
}

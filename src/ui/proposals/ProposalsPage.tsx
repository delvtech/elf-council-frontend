import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ExternalLinkIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { Proposal, ProposalsJson } from "elf-council-proposals";
import { t } from "ttag";

import { ELEMENT_FINANCE_SNAPSHOT_URL } from "src/elf-snapshot/endpoints";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1/H1";
import Tabs, { TabInfo } from "src/ui/base/Tabs/Tabs";
import { useIsTailwindSmallScreen } from "src/ui/base/tailwindBreakpoints";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { ProposalDetailsCard } from "src/ui/proposals/ProposalDetailsCard";
import { useSigner } from "src/ui/signer/useSigner";

import { ProposalList } from "./ProposalList/ProposalList";

type TabId = "active-proposals-tab" | "past-proposals-tab";

interface ProposalsPageProps {
  proposalsJson: ProposalsJson;
}

export default function ProposalsPage({
  proposalsJson,
}: ProposalsPageProps): ReactElement {
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();

  const isSmallScreen = useIsTailwindSmallScreen();

  const [activeTabId, setActiveTab] = useState<TabId>("active-proposals-tab");
  const [activeProposalId, setActiveProposalId] = useState<
    string | undefined
  >();
  const [activeProposal, setActiveProposal] = useState<Proposal | undefined>();

  const filteredProposals = useFilteredProposals(
    activeTabId,
    proposalsJson.proposals,
    currentBlockNumber,
  );

  // set the active proposal when the user switches between Active and Past
  // tabs.
  useEffect(() => {
    if (isSmallScreen) {
      setActiveProposalId(undefined);
      setActiveProposal(undefined);
      return;
    }
    setActiveProposalId(filteredProposals?.[0]?.proposalId);
    setActiveProposal(filteredProposals?.[0]);
  }, [activeTabId, filteredProposals, isSmallScreen]);

  const onSetActiveProposalId = useCallback(
    (proposalId: string | undefined) => {
      const proposal = filteredProposals?.find(
        (p) => p.proposalId === proposalId,
      );
      setActiveProposal(proposal);
      setActiveProposalId(proposalId);
    },
    [filteredProposals],
  );

  const proposalTabs: TabInfo[] = useMemo(() => {
    return [
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
    <div className="flex h-full lg:justify-center">
      <div className="flex-1 w-full h-full px-8 pt-8 space-y-8 lg:max-w-lg">
        <H1 className="flex-1 text-center text-principalRoyalBlue">{t`On-chain Proposals`}</H1>
        <div className="flex justify-between">
          <Tabs aria-label={t`Filter proposals`} tabs={proposalTabs} />
          <OffChainProposalsLink />
        </div>
        <div className="flex space-x-12">
          <ProposalList
            account={account}
            signer={signer}
            proposals={filteredProposals || []}
            activeProposalId={activeProposalId}
            onClickItem={onSetActiveProposalId}
          />
        </div>
      </div>
      {activeProposal && (
        <ProposalDetailsCard
          isOpen={!!activeProposal}
          onClose={() => {
            setActiveProposal(undefined);
            setActiveProposalId(undefined);
          }}
          account={account}
          signer={signer}
          proposal={activeProposal}
        />
      )}
    </div>
  );
}

function OffChainProposalsLink() {
  return (
    <AnchorButton
      target="_blank"
      href={ELEMENT_FINANCE_SNAPSHOT_URL}
      variant={ButtonVariant.SECONDARY}
    >
      <div className="flex items-center h-full">
        {t`Off-chain`}
        <ExternalLinkIcon height={24} />
      </div>
    </AnchorButton>
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
function useFilteredProposals(
  activeTabId: string,
  proposals: Proposal[],
  currentBlockNumber: number,
): Proposal[] {
  return useMemo(() => {
    if (activeTabId === "active-proposals-tab") {
      return proposals?.filter(
        (proposal) => proposal.expiration > currentBlockNumber,
      );
    }

    if (activeTabId === "past-proposals-tab") {
      return proposals?.filter(
        (proposal) => proposal.expiration <= currentBlockNumber,
      );
    }

    return [];
  }, [activeTabId, currentBlockNumber, proposals]);
}

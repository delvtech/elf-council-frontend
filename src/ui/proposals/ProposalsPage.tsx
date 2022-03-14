import React, {
  ReactElement,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";

import { ExternalLinkIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { Proposal, ProposalsJson } from "elf-council-proposals";
import { t } from "ttag";

import { ELEMENT_FINANCE_SNAPSHOT_URL } from "src/elf-snapshot/endpoints";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1/H1";
import Tabs, { Tab } from "src/ui/base/Tabs/Tabs";
import {
  useIsTailwindSmallScreen,
  useIsTailwindLargeScreen,
} from "src/ui/base/tailwindBreakpoints";
import EmptySpaceFace from "src/ui/base/svg/EmptySpaceFace";
import { ProposalDetailsCard } from "src/ui/proposals/ProposalDetailsCard";
import { useSigner } from "src/ui/signer/useSigner";

import { ProposalList } from "./ProposalList/ProposalList";

type TabId = "active" | "past";

interface ProposalsPageProps {
  proposalsJson: ProposalsJson;
  currentBlockNumber: number;
}

export default function ProposalsPage({
  proposalsJson,
  currentBlockNumber,
}: ProposalsPageProps): ReactElement {
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);

  const [activeTabId, setActiveTab] = useState<TabId>("active");

  const isTailwindSmallScreen = useIsTailwindSmallScreen();
  const isTailwindLargeScreen = useIsTailwindLargeScreen();

  const activeProposals = useFilteredProposals(
    "active",
    proposalsJson.proposals,
    currentBlockNumber,
  );
  const pastProposals = useFilteredProposals(
    "past",
    proposalsJson.proposals,
    currentBlockNumber,
  );

  const setDefaultActiveProposals = useCallback(() => {
    setSelectedProposalId(activeProposals?.[0]?.proposalId);
    setSelectedProposal(activeProposals?.[0]);
  }, [activeProposals]);

  const setDefaultPastProposals = useCallback(() => {
    setSelectedProposalId(pastProposals?.[0]?.proposalId);
    setSelectedProposal(pastProposals?.[0]);
  }, [pastProposals]);

  // set the default to the first active proposal, since that's what filter is
  // on by default
  const [selectedProposalId, setSelectedProposalId] = useState<
    string | undefined
  >(isTailwindSmallScreen ? undefined : activeProposals?.[0].proposalId);
  const [selectedProposal, setSelectedProposal] = useState<
    Proposal | undefined
  >(isTailwindSmallScreen ? undefined : activeProposals?.[0]);

  const handleSelectProposal = useCallback(
    (proposalId: string | undefined) => {
      const proposal = proposalsJson.proposals.find(
        (p) => p.proposalId === proposalId,
      );
      setSelectedProposal(proposal);
      setSelectedProposalId(proposalId);
    },
    [proposalsJson.proposals],
  );

  const handleActiveTabClick = () => {
    if (activeTabId !== "active") {
      setActiveTab("active");
      // select the first proposal when the user clicks to view the
      // active tab
      if (isTailwindSmallScreen) {
        setSelectedProposalId(undefined);
        setSelectedProposal(undefined);
      } else {
        setDefaultActiveProposals();
      }
    }
  };

  const handlePastTabClick = () => {
    if (activeTabId !== "past") {
      setActiveTab("past");
      if (isTailwindSmallScreen) {
        setSelectedProposalId(undefined);
        setSelectedProposal(undefined);
      } else {
        // select the first proposal when the user clicks to view the
        // past tab
        setDefaultPastProposals();
      }
    }
  };

  useEffect(() => {
    if (isTailwindLargeScreen && !selectedProposal) {
      if (activeTabId === "past") {
        setDefaultPastProposals();
      } else {
        setDefaultActiveProposals();
      }
    }
  }, [
    activeTabId,
    isTailwindLargeScreen,
    pastProposals,
    selectedProposal,
    setDefaultActiveProposals,
    setDefaultPastProposals,
  ]);

  return (
    <div className="flex h-full lg:justify-center">
      <div className="h-full w-full flex-1 space-y-8 pr-8 pt-8 lg:max-w-lg">
        <H1 className="flex-1 text-center text-principalRoyalBlue">{t`On-chain Proposals`}</H1>
        <div className="flex justify-between">
          <Tabs aria-label={t`Filter proposals`}>
            <Tab
              first
              current={activeTabId === "active"}
              onClick={handleActiveTabClick}
              name={t`Active`}
            />
            <Tab
              last
              current={activeTabId === "past"}
              onClick={handlePastTabClick}
              name={t`Past`}
            />
          </Tabs>
          <OffChainProposalsLink />
        </div>
        <div className="flex space-x-12">
          {activeProposals.length ? (
            <ProposalList
              account={account}
              signer={signer}
              proposals={
                activeTabId === "active" ? activeProposals : pastProposals
              }
              selectedProposalId={selectedProposalId}
              onClickItem={handleSelectProposal}
            />
          ) : (
            <NoProposalsEmptyState activeTabId={activeTabId} />
          )}
        </div>
      </div>
      {selectedProposal && (
        <ProposalDetailsCard
          isOpen={!!selectedProposal}
          onClose={() => {
            setSelectedProposal(undefined);
            setSelectedProposalId(undefined);
          }}
          account={account}
          signer={signer}
          proposal={selectedProposal}
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
      <div className="flex h-full items-center">
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
  activeTabId: TabId,
  proposals: Proposal[],
  currentBlockNumber: number,
): Proposal[] {
  return useMemo(() => {
    if (activeTabId === "active") {
      return proposals?.filter(
        (proposal) => proposal.expiration > currentBlockNumber,
      );
    }

    if (activeTabId === "past") {
      return proposals?.filter(
        (proposal) => proposal.expiration <= currentBlockNumber,
      );
    }

    return [];
  }, [activeTabId, currentBlockNumber, proposals]);
}

function NoProposalsEmptyState(props: { activeTabId: TabId }) {
  return (
    <div className="my-6 flex flex-1 flex-col items-center text-blueGrey">
      <EmptySpaceFace width={327} height={107} className="-mr-[27px]" />
      <p className="mt-4 text-xl font-semibold leading-6">{t`no ${props.activeTabId} proposals`}</p>
    </div>
  );
}

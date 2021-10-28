import { Signer } from "@ethersproject/abstract-signer";
import { ChevronLeft } from "@material-ui/icons";
import { useWeb3React } from "@web3-react/core";
import { Proposal } from "elf-council-proposals";
import React, { ReactElement, useCallback, useMemo, useState } from "react";

import {
  getIsExecutable,
  getIsVotingOpen,
  proposalsBySnapShotId,
  proposalsJson,
} from "src/elf-council-proposals";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import tw, { TTailwindString } from "src/elf-tailwindcss-classnames";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Button from "src/ui/base/Button/Button";
import PopoverButton from "src/ui/base/Button/PopoverButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import H1 from "src/ui/base/H1";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useSigner } from "src/ui/signer/useSigner";
import { Ballot } from "src/ui/voting/Ballot";
import { useVote } from "src/ui/voting/useVote";
import { t } from "ttag";

import { ProposalTabs } from "./ProposalTabs";

type TabId = "active-proposals-tab" | "past-proposals-tab";

export default function ProposalsPage(): ReactElement {
  const { data: snapshotProposals } = useSnapshotProposals(
    proposalsJson.proposals.map(({ snapshotId }) => snapshotId)
  );
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);

  const [activeTabId, setActiveTab] = useState<TabId>("active-proposals-tab");

  const proposalTabs = useMemo(() => {
    return [
      {
        id: "active-proposals-tab",
        current: activeTabId === "active-proposals-tab",
        onChange: () => setActiveTab("active-proposals-tab"),
        name: t`Active`,
      },
      {
        id: "past-proposals-tab",
        current: activeTabId === "past-proposals-tab",
        onChange: () => setActiveTab("past-proposals-tab"),
        name: t`Past`,
      },
    ];
  }, [activeTabId]);

  const filteredProposals = useMemo(() => {
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

  return (
    <div className={tw("h-full", "pt-8", "px-8")}>
      <ProposalPageHeader />
      <ProposalTabs proposalTabs={proposalTabs} />
      <ProposalList
        account={account}
        signer={signer}
        proposals={filteredProposals || []}
      />
    </div>
  );
}

interface ProposalListProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  proposals: SnapshotProposal[];
}

function ProposalList({ account, proposals, signer }: ProposalListProps) {
  return (
    <div className={tw("flex", "w-full", "flex-col", "space-y-4", "pb-8")}>
      {proposals.map((proposal) => (
        <ProposalCardRow
          key={proposal.id}
          snapshotProposal={proposal}
          account={account}
          signer={signer}
        />
      ))}
    </div>
  );
}
interface ProposalCardRowProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  snapshotProposal: SnapshotProposal;
}

function ProposalCardRow({
  account,
  signer,
  snapshotProposal,
}: ProposalCardRowProps): ReactElement {
  const { mutate: vote } = useVote(account, signer);
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();

  const proposal = proposalsBySnapShotId[snapshotProposal.id];
  const { proposalId: onChainProposalId } = proposal;

  const onYesVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.YES);
  }, [onChainProposalId, vote]);
  const onNoVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.NO);
  }, [onChainProposalId, vote]);
  const onMaybeVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.MAYBE);
  }, [onChainProposalId, vote]);

  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);

  return (
    <Card
      key={snapshotProposal.id}
      className={tw("flex", "justify-between", "items-center")}
    >
      <div className={tw("flex-col", "space-y-4")}>
        <CardHeader
          title={snapshotProposal.title}
          description={t`Proposal #${
            proposalsBySnapShotId[snapshotProposal.id].proposalId
          }`}
        />
        <div className={tw("flex", "space-x-4")}>
          <AnchorButton
            variant={ButtonVariant.PRIMARY}
            href={snapshotProposal.link}
          >{t`View Proposal`}</AnchorButton>
          <Button variant={ButtonVariant.PRIMARY}>{t`Discuss`}</Button>
        </div>
      </div>
      <div className={tw("flex", "space-x-4")}>
        {isVotingOpen ? (
          <PopoverButton
            button={
              <Button variant={ButtonVariant.GRADIENT}>
                {t`Vote`}
                <ChevronLeft
                  className={tw(
                    // transform is weird, it exists in the tailwind css, but
                    // requires casting when using "tw()" :shrug:
                    "transform" as TTailwindString,
                    "-rotate-90"
                  )}
                />
              </Button>
            }
            popover={
              <Card variant={CardVariant.BLUE}>
                <div className={tw("flex", "flex-col")}>
                  <Button onClick={onYesVoteClick}>{t`yes`}</Button>
                  <Button onClick={onNoVoteClick}>{t`no`}</Button>
                  <Button onClick={onMaybeVoteClick}>{t`maybe`}</Button>
                </div>
              </Card>
            }
          ></PopoverButton>
        ) : null}

        <StatusButton proposal={proposal} />
      </div>
    </Card>
  );
}

interface StatusButtonProps {
  proposal: Proposal;
}

function StatusButton({ proposal }: StatusButtonProps): ReactElement | null {
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  const isExecutable = getIsExecutable(proposal, currentBlockNumber);

  if (isExecutable) {
    return (
      <Button variant={ButtonVariant.OUTLINE_BLUE}>
        <div className={tw("flex", "space-x-8", "items-center")}>
          {t`Execute`}
        </div>
      </Button>
    );
  }

  if (isVotingOpen) {
    return (
      <Tag intent={Intent.SUCCESS}>
        <div className={tw("flex", "space-x-8", "items-center")}>
          <svg
            className="-ml-0.5 mr-1.5 h-3 w-3 text-statusGreen"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          {t`Open for Voting`}
        </div>
      </Tag>
    );
  }
  return null;
}

function ProposalPageHeader() {
  return (
    <div className={tw("flex")}>
      <H1 className={tw("flex-1", "text-center")}>{t`Proposals`}</H1>
      <Button variant={ButtonVariant.GRADIENT}>{t`New Proposal`}</Button>
    </div>
  );
}

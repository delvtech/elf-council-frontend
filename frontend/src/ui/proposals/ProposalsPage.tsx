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
import { ELEMENT_FINANCE_SNAPSHOT_URL } from "src/elf-snapshot/endpoints";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import tw, { TTailwindString } from "src/elf-tailwindcss-classnames";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Button from "src/ui/base/Button/Button";
import PopoverButton from "src/ui/base/Button/PopoverButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import H1 from "src/ui/base/H1";
import Tabs, { TabInfo } from "src/ui/base/Tabs/Tabs";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useExecute } from "src/ui/proposals/useExecute";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { useSigner } from "src/ui/signer/useSigner";
import { Ballot } from "src/ui/voting/Ballot";
import { useVote } from "src/ui/voting/useVote";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";

type TabId = "active-proposals-tab" | "past-proposals-tab";

const { proposals } = proposalsJson;
export default function ProposalsPage(): ReactElement {
  const { data: snapshotProposals } = useSnapshotProposals(
    proposals.map(({ snapshotId }) => snapshotId)
  );
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);

  const [activeTabId, setActiveTab] = useState<TabId>("active-proposals-tab");

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
    <div className={tw("h-full", "pt-8", "px-8", "space-y-8")}>
      <ProposalPageHeader />
      <Tabs aria-label={t`Filter proposals`} tabs={proposalTabs} />
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
  const proposal = proposalsBySnapShotId[snapshotProposal.id];
  const { proposalId: onChainProposalId, created: proposalCreatedBlockNumber } =
    proposal;

  const { mutate: vote } = useVote(account, signer, proposalCreatedBlockNumber);
  const votePower = useVotingPowerForAccount(
    account,
    proposalCreatedBlockNumber
  );
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();

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
      {account ? (
        <span>{t`Your voting power for this proposal: ${votePower}`}</span>
      ) : null}
      <div className={tw("flex", "space-x-4")}>
        {isVotingOpen ? (
          <PopoverButton
            disabled={!account}
            variant={ButtonVariant.GRADIENT}
            popover={
              <Card variant={CardVariant.BLUE}>
                <div className={tw("flex", "flex-col")}>
                  <Button onClick={onYesVoteClick}>{t`yes`}</Button>
                  <Button onClick={onNoVoteClick}>{t`no`}</Button>
                  <Button onClick={onMaybeVoteClick}>{t`maybe`}</Button>
                </div>
              </Card>
            }
          >
            <span>{t`Vote`}</span>
            <ChevronLeft
              className={tw(
                // transform is weird, it exists in the tailwind css, but
                // requires casting when using "tw()" :shrug:
                "transform" as TTailwindString,
                "-rotate-90"
              )}
            />
          </PopoverButton>
        ) : null}

        <StatusButton signer={signer} proposal={proposal} />
      </div>
    </Card>
  );
}

interface StatusButtonProps {
  signer: Signer | undefined;
  proposal: Proposal;
}

function StatusButton({
  proposal,
  signer,
}: StatusButtonProps): ReactElement | null {
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  const isExecutable = getIsExecutable(proposal, currentBlockNumber);
  const { mutate: execute } = useExecute(signer);
  const onExecuteClick = useCallback(() => {
    execute(proposal.proposalId);
  }, [execute, proposal.proposalId]);

  if (isExecutable) {
    return (
      <Button onClick={onExecuteClick} variant={ButtonVariant.OUTLINE_BLUE}>
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

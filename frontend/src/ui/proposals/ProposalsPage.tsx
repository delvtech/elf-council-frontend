import { Signer } from "@ethersproject/abstract-signer";
import { ChevronLeft } from "@material-ui/icons";
import { useWeb3React } from "@web3-react/core";
import React, { ReactElement, useCallback, useMemo, useState } from "react";

import {
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
          proposal={proposal}
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
  proposal: SnapshotProposal;
}

function ProposalCardRow({
  account,
  signer,
  proposal,
}: ProposalCardRowProps): ReactElement {
  const { proposalId: onChainProposalId } = proposalsBySnapShotId[proposal.id];
  const { mutate: vote } = useVote(account, signer);
  const onYesVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.YES);
  }, [onChainProposalId, vote]);
  const onNoVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.NO);
  }, [onChainProposalId, vote]);
  const onMaybeVoteClick = useCallback(() => {
    vote(onChainProposalId.toString(), Ballot.MAYBE);
  }, [onChainProposalId, vote]);
  return (
    <Card
      key={proposal.id}
      className={tw("flex", "justify-between", "items-center")}
    >
      <div className={tw("flex-col", "space-y-4")}>
        <CardHeader
          title={proposal.title}
          description={t`Proposal #${
            proposalsBySnapShotId[proposal.id].proposalId
          }`}
        />
        <div className={tw("flex", "space-x-4")}>
          <AnchorButton
            variant={ButtonVariant.PRIMARY}
            href={proposal.link}
          >{t`View Proposal`}</AnchorButton>
          <Button variant={ButtonVariant.PRIMARY}>{t`Discuss`}</Button>
        </div>
      </div>
      <div className={tw("flex", "space-x-4")}>
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
        {/* TODO: Make this a "Tag" */}
        <Button disabled variant={ButtonVariant.OUTLINE_BLUE}>
          {proposal.state}
        </Button>
      </div>
    </Card>
  );
}

function ProposalPageHeader() {
  return (
    <div className={tw("flex")}>
      <H1 className={tw("flex-1", "text-center")}>{t`Proposals`}</H1>
      <Button variant={ButtonVariant.GRADIENT}>{t`New Proposal`}</Button>
    </div>
  );
}

import { Event } from "@ethersproject/contracts";
import React, { ReactElement, useMemo, useState } from "react";
import { formatFullDate } from "src/base/dates";
import { proposalsJson } from "src/elf-council-proposals";
import { SnapshotProposal } from "src/elf-snapshot/queries/proposals";
import tw from "src/elf-tailwindcss-classnames";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";
import H1 from "src/ui/base/H1";
import { useSnapshotProposals } from "src/ui/proposals/useSnapshotProposals";
import { t } from "ttag";

import { ProposalTabs } from "./ProposalTabs";

type TabId = "active-proposals-tab" | "past-proposals-tab";

export default function ProposalsPage(): ReactElement {
  const { data: snapshotProposals } = useSnapshotProposals(
    proposalsJson.proposals.map(({ snapshotId }) => snapshotId)
  );
  console.log("snapshotProposalResults", snapshotProposals);

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
      <ProposalList proposals={filteredProposals || []} />
    </div>
  );
}

interface ProposalListProps {
  proposals: SnapshotProposal[];
}

function ProposalList({ proposals }: ProposalListProps) {
  return (
    <div className={tw("flex", "w-full", "flex-col", "space-y-4", "pb-8")}>
      {proposals.map((proposal) => (
        <Card
          key={proposal.id}
          className={tw("flex", "justify-between", "items-center")}
        >
          <div className={tw("flex-col", "space-y-4")}>
            <CardHeader title={proposal.title} />
            <div className={tw("flex", "space-x-4")}>
              <AnchorButton
                variant={ButtonVariant.PRIMARY}
                round
                href={proposal.link}
              >{t`View Proposal`}</AnchorButton>
              <Button
                round
                variant={ButtonVariant.SECONDARY}
              >{t`Discussion`}</Button>
            </div>
          </div>
          <div className={tw("space-x-4")}>
            <Button variant={ButtonVariant.GRADIENT}>{t`Vote`}</Button>
            {/* TODO: Make this a "Tag" */}
            <span>
              {t`Voting ends ${formatFullDate(new Date(proposal.end * 1000))}`}
            </span>
            <Button>{proposal.state}</Button>
          </div>
        </Card>
      ))}
    </div>
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

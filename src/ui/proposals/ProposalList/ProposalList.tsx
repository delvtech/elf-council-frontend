import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "elf-council-proposals";
import { ProposalCardRow } from "./ProposalListItem";

interface ProposalListProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  proposals: Proposal[];
  activeProposalId: string | undefined;
  setActiveProposal: (proposalId: string | undefined) => void;
}
export function ProposalList({
  account,
  proposals,
  signer,
  activeProposalId,
  setActiveProposal,
}: ProposalListProps): ReactElement {
  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {proposals.map((proposal) => (
        <ProposalCardRow
          key={proposal.proposalId}
          active={proposal.proposalId === activeProposalId}
          proposal={proposal}
          setActiveProposal={setActiveProposal}
          account={account}
          signer={signer}
        />
      ))}
    </div>
  );
}

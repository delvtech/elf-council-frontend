import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "@elementfi/elf-council-proposals";
import { ProposalListItem } from "./ProposalListItem";

interface ProposalListProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  proposals: Proposal[];
  selectedProposalId: string | undefined;
  onClickItem: (proposalId: string | undefined) => void;
  isModalOpen: boolean;
}
export function ProposalList({
  account,
  proposals,
  signer,
  selectedProposalId,
  onClickItem,
  isModalOpen,
}: ProposalListProps): ReactElement {
  return (
    <div className="flex w-full flex-col space-y-4 pb-8">
      {proposals.map((proposal) => (
        <ProposalListItem
          key={proposal.proposalId}
          active={isModalOpen && proposal.proposalId === selectedProposalId}
          proposal={proposal}
          onClick={onClickItem}
          account={account}
          signer={signer}
        />
      ))}
    </div>
  );
}

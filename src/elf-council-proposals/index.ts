import { Proposal, testnetProposals } from "elf-council-proposals";
import keyBy from "lodash.keyby";

// TODO: Choose the right proposalsJson based on environment
export const proposalsJson = testnetProposals;

export const proposalsBySnapShotId = keyBy(
  proposalsJson.proposals,
  "snapshotId"
);

export const proposalsById = keyBy(proposalsJson.proposals, "proposalId");

export function getIsVotingOpen(
  proposal: Proposal,
  blockNumber: number
): boolean {
  return proposal.expiration > blockNumber;
}

export function getIsExecutable(
  proposal: Proposal,
  blockNumber: number
): boolean {
  return proposal.unlock < blockNumber;
}

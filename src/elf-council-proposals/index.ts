import { Proposal } from "elf-council-proposals";
import keyBy from "lodash.keyby";

export const PROPOSALS_JSON_URL =
  "https://elementfi.s3.us-east-2.amazonaws.com/testnet.proposals.json";

export function getProposalsBySnapshotId(
  proposals: Proposal[],
): Record<string, Proposal> {
  return keyBy(proposals, "snapshotId");
}

export function getIsVotingOpen(
  proposal: Proposal,
  blockNumber: number,
): boolean {
  return proposal.expiration > blockNumber;
}

export function getIsExecutable(
  proposal: Proposal,
  blockNumber: number,
): boolean {
  return proposal.unlock < blockNumber;
}

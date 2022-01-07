import { Proposal } from "elf-council-proposals";
import keyBy from "lodash.keyby";
import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

export const PROPOSALS_JSON_URL = getProposalsJsonUrl();
console.log("proposals", PROPOSALS_JSON_URL);

function getProposalsJsonUrl() {
  switch (addressesJson.chainId) {
    case ChainId.GOERLI:
      return "https://elementfi.s3.us-east-2.amazonaws.com/goerli.proposals.json";

    case ChainId.LOCAL:
    default:
      return "https://elementfi.s3.us-east-2.amazonaws.com/testnet.proposals.json";
  }
}

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

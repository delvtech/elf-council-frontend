import { Proposal } from "elf-council-proposals";
import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

export const PROPOSALS_JSON_URL = getProposalsJsonUrl();

function getProposalsJsonUrl() {
  switch (addressesJson.chainId) {
    case ChainId.GOERLI:
      return "https://elementfi.s3.us-east-2.amazonaws.com/goerli.proposals.json";

    case ChainId.LOCAL:
    default:
      return "https://elementfi.s3.us-east-2.amazonaws.com/testnet.proposals.json";
  }
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

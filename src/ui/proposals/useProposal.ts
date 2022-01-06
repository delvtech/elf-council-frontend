import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "ethers/lib/utils";

import { coreVotingContract } from "src/elf/contracts";

interface Proposal {
  proposalHash: string;
  created: number;
  unlock: number;
  expiration: number;
  quorum: string;
  lastCall: number;
}
/**
 * Returns the voting power for a given proposal.
 * @param {string} proposalId the id of the proposal
 * @returns {VotingPower} an array of BigNumbers tallying results in the format [YES, NO, MAYBE]
 */
export function useProposal(
  proposalId: string | undefined,
): Proposal | undefined {
  const { data: proposal } = useSmartContractReadCall(
    coreVotingContract,
    "proposals",
    {
      callArgs: [Number(proposalId as string)],
      enabled: !!proposalId,
    },
  );

  if (!proposal) {
    return;
  }

  return {
    ...proposal,
    created: proposal?.created?.toNumber(),
    unlock: proposal?.unlock?.toNumber(),
    expiration: proposal?.expiration?.toNumber(),
    quorum: formatEther(proposal?.quorum || 0),
    lastCall: proposal?.lastCall?.toNumber(),
  };
}

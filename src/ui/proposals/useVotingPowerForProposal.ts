import { useSmartContractReadCall } from "@elementfi/react-query-typechain";

import { coreVotingContract } from "src/elf/contracts";
import { VotingPower } from "src/elf/proposals/VotingPower";

/**
 * Returns the voting power for a given proposal.
 * @param {string} proposalId the id of the proposal
 * @returns {VotingPower} an array of BigNumbers tallying results in the format [YES, NO, MAYBE]
 */
export function useVotingPowerForProposal(
  proposalId: string | undefined,
): VotingPower | undefined {
  const { data: votingPower } = useSmartContractReadCall(
    coreVotingContract,
    "getProposalVotingPower",
    {
      callArgs: [proposalId as string],
      enabled: !!proposalId,
    },
  );

  return votingPower;
}

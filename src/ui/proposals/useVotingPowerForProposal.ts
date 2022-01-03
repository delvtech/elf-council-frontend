import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";
import { coreVotingContract } from "src/elf/contracts";

export type VotingPower = [YES: BigNumber, NO: BigNumber, MAYBE: BigNumber];

/**
 * Returns the voting power for a given proposal.
 * @param {string} proposalId the id of the proposal
 * @returns {VotingPower} an array of BigNumbers tallying results in the format [YES, NO, MAYBE]
 */
export function useVotingPowerForProposal(
  proposalId: string,
): VotingPower | undefined {
  const { data: votingPower } = useSmartContractReadCall(
    coreVotingContract,
    "getProposalVotingPower",
    {
      callArgs: [proposalId],
    },
  );

  return votingPower;
}

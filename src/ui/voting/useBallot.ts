import { QueryObserverResult } from "react-query";

import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";

import { coreVotingContract } from "src/elf/contracts";
import { Ballot } from "src/ui/voting/Ballot";

// TODO: get from typechain
export type Vote = [votingPower: BigNumber, castBallot: Ballot];

/**
 * Returns how a user voted on a proposal
 * @param {string} account address of voter
 * @param {string} proposalId id the proposal
 * @returns {Vote} an object containing the vote power and direction of the vote.
 */
export function useBallot(
  account: string | undefined | null,
  proposalId: string | undefined,
): QueryObserverResult<Vote> | undefined {
  const result = useSmartContractReadCall(coreVotingContract, "votes", {
    callArgs: [account as string, proposalId as string],
    enabled: !!account && !!proposalId,
  });

  // if a user has not voted, the default response is:
  // { votePower: 0, ballot: 0 }.  This means the user likely hasn't voted
  // so we return undefined to indicate that.

  // Checks voting power === 0
  if (result.isSuccess && result.data?.[0].eq(0)) {
    return undefined;
  }

  return result;
}

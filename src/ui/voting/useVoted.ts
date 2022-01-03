import { QueryObserverResult } from "react-query";

import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";

import { coreVotingContract } from "src/elf/contracts";

// TODO: get from typechain
export enum Ballot {
  YES,
  NO,
  MAYBE,
}

// TODO: get from typechain
export interface Vote {
  votingPower: BigNumber;
  castBallot: Ballot;
}

/**
 * Returns how a user voted on a proposal
 * @param {string} account address of voter
 * @param {string} proposalId id the proposal
 * @returns {Vote} an object containing the vote power and direction of the vote.
 */
export function useVoted(
  account: string | undefined | null,
  proposalId: string,
): QueryObserverResult<Vote> {
  return useSmartContractReadCall(coreVotingContract, "votes", {
    callArgs: [account as string, proposalId],
    enabled: !!account,
  });
}

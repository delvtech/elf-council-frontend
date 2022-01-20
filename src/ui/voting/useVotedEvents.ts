import { QueryObserverResult } from "react-query";

import {
  useSmartContractEvents,
  UseSmartContractEventsCallOptions,
} from "@elementfi/react-query-typechain";
import { CoreVoting } from "elf-council-typechain";
import { BigNumber, Event } from "ethers";

import { coreVotingContract } from "src/elf/contracts";

/**
 * Returns 'Voted' events, filterable by voterAddress and proposalId.  Block ranges can be provided
 * in options.
 * @param voterAddress filter by voter address
 * @param proposalId filter by proposal id
 * @param options UseSmartContractEventsCallOptions
 * @returns QueryObserverResult<Event[]>
 */
export function useVotedEvents(
  voterAddress: string | null | undefined,
  proposalId: string | undefined,
  options?: UseSmartContractEventsCallOptions<CoreVoting, "Voted">,
): QueryObserverResult<Event[], unknown> {
  return useSmartContractEvents(coreVotingContract, "Voted", {
    ...options,
    // Note: a BigNumber must be passed for proposalId, not a string value, despite the fact that
    // the interface allows BigNumberish!
    callArgs: [voterAddress, proposalId && BigNumber.from(proposalId)],
    enabled: !!voterAddress && !!proposalId,
    staleTime: 1000,
  });
}

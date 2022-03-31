import { QueryObserverResult } from "react-query";

import {
  useSmartContractEvents,
  UseSmartContractEventsCallOptions,
} from "@elementfi/react-query-typechain";
import { CoreVoting } from "@elementfi/elf-council-typechain";
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
  options?: Omit<
    UseSmartContractEventsCallOptions<CoreVoting, "Voted">,
    "callArgs"
  >,
): QueryObserverResult<Event[], unknown> {
  // allow consumer to pass enabled logic still
  const enabled = options?.enabled ?? true;

  return useSmartContractEvents(coreVotingContract, "Voted", {
    ...options,
    // Note: a BigNumber must be passed for proposalId, not a string value, despite the fact that
    // the interface allows BigNumberish!
    callArgs: [voterAddress, proposalId && BigNumber.from(proposalId)],
    enabled: !!voterAddress && !!proposalId && enabled,
  });
}

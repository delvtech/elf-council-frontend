import { QueryObserverResult, useQuery } from "react-query";

import { TransactionResponse } from "@ethersproject/providers";
import { Event } from "ethers";

import { useVotedEvents } from "./useVotedEvents";

export function useLastVoteTransactionForAccount(
  voterAddress: string | null | undefined,
  proposalId: string | undefined,
): QueryObserverResult<TransactionResponse> {
  const { data: events } = useVotedEvents(voterAddress, proposalId);

  return useQuery({
    queryKey: ["last-vote", voterAddress, proposalId],
    queryFn: async () => {
      // Will return undefined if no history of events
      if (!events?.length) {
        return;
      }

      const lastVoteEvent: Event = events[events.length - 1];
      const { getTransaction } = lastVoteEvent;
      const transaction = await getTransaction();
      return transaction;
    },
    enabled: !!events && !!events.length,
  });
}

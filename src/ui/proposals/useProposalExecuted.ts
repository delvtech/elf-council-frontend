import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { useMemo } from "react";

import { coreVotingContract } from "src/elf/contracts";

/**
 * Returns whether a proposal has been executed
 * @param {string} proposalId the id of the proposal
 */
export function useProposalExecuted(proposalId: string | undefined): boolean {
  const { data: proposals } = useSmartContractEvents(
    coreVotingContract,
    "ProposalExecuted",
  );

  const foundEvent = useMemo(() => {
    return proposals?.find((e) => e?.args?.[0]?.toString() === proposalId);
  }, [proposalId, proposals]);

  return !!foundEvent;
}

import { useCallback } from "react";

import { Signer } from "ethers";
import { proposalsJson } from "src/elf-council-proposals";
import { coreVotingContract } from "src/elf/contracts";
import { useSmartContractTransaction } from "@elementfi/react-query-typechain";

const { proposals } = proposalsJson;

export function useExecute(signer: Signer | undefined): {
  mutate: (proposalId: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
} {
  const {
    mutate: execute,
    isLoading,
    isSuccess,
    isError,
  } = useSmartContractTransaction(coreVotingContract, "execute", signer);

  const onExecute = useCallback(
    (proposalId: string) => {
      const proposal = proposals.find((p) => p.proposalId === proposalId);

      if (!proposal) {
        return;
      }

      const { targets, calldatas } = proposal;
      execute([proposalId, targets, calldatas]);
    },
    [execute]
  );

  return { mutate: onExecute, isLoading, isSuccess, isError };
}

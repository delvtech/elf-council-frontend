import { UseMutationResult } from "react-query";

import { OptimisticRewards } from "elf-council-typechain";
import { ContractReceipt, Signer } from "ethers";
import { rewardsContract } from "src/elf/contracts";
import { useSmartContractTransaction } from "@elementfi/react-query-typechain";

export function useClaimRewards(
  signer: Signer | undefined,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<OptimisticRewards["claim"]>
> {
  const claim = useSmartContractTransaction(rewardsContract, "claim", signer);
  return claim;
}

import { UseMutationResult } from "react-query";

import { Airdrop } from "elf-council-typechain";
import { ContractReceipt, Signer } from "ethers";
import { airdropContract } from "src/elf/contracts";
import { useSmartContractTransaction } from "@elementfi/react-query-typechain";

export function useClaimAirdrop(
  signer: Signer | undefined
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<Airdrop["claim"]>
> {
  const claim = useSmartContractTransaction(airdropContract, "claim", signer);
  return claim;
}

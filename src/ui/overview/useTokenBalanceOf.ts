import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { defaultProvider as provider } from "src/elf/providers/providers";
import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";
import { ElfNFT__factory } from "src/typechain-types/factories/ElfNFT__factory";
import { getNFTTokenContract } from "src/ui/overview/getNFTTokenContract";

export function useTokenBalanceOf(
  address: string | null | undefined,
): QueryObserverResult<BigNumber, unknown> {
  const tokenContract = ElfNFT__factory.connect(
    getNFTTokenContract(),
    provider,
  );

  return useSmartContractReadCall(tokenContract, "balanceOf", {
    callArgs: [address as string],
    enabled: !!address,
  });
}

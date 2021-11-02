import { formatEther } from "@ethersproject/units";
import { lockingVaultContract } from "src/elf/contracts";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";

export function useDeposited(
  address: string | undefined | null
): string | undefined {
  const { data: depositInfo } = useSmartContractReadCall(
    lockingVaultContract,
    "deposits",
    {
      callArgs: [address as string],
      enabled: !!address,
    }
  );

  const [, depositBN] = depositInfo || [];

  return depositBN && formatEther(depositBN || 0);
}

import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "@ethersproject/units";
import { lockingVaultContract } from "src/elf/contracts";

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

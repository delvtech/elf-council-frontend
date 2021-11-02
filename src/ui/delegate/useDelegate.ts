import { ethers } from "ethers";
import { lockingVaultContract } from "src/elf/contracts";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";

export function useDelegate(
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

  const [delegate] = depositInfo || [];

  return delegate === ethers.constants.AddressZero ? undefined : delegate;
}

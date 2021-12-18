import { FixedNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { airdropContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";

export function useClaimableAirdropBalance(
  account: string | null | undefined
): string {
  const { data: claimed } = useSmartContractReadCall(
    airdropContract,
    "claimed",
    { callArgs: [account as string], enabled: !!account }
  );

  const { data: merkleProof } = useMerkleInfo(account);

  if (merkleProof && claimed) {
    return FixedNumber.from(merkleProof.leaf.value)
      .subUnsafe(FixedNumber.from(formatEther(claimed)))
      .toString();
  }

  return formatEther(claimed || "0");
}

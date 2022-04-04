import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "@ethersproject/units";
import { privateAirdropContract } from "src/elf/contracts";

export default function useClaimableAmount(): string {
  const { data: ClaimableAmount } = useSmartContractReadCall(
    privateAirdropContract,
    "amountPerRedemption",
  );

  return formatEther(ClaimableAmount || 0);
}

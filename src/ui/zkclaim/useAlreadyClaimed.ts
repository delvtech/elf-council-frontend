import { pedersenHash, toHex } from "zkp-merkle-airdrop-lib";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { privateAirdropContract } from "src/elf/contracts";

export default function useAlreadyClaimed(key?: string): boolean | undefined {
  const { data: alreadyClaimed } = useSmartContractReadCall(
    privateAirdropContract,
    "nullifierSpent",
    {
      callArgs: [toHex(pedersenHash(BigInt(key || "")))],
      enabled: !!key,
    },
  );

  return alreadyClaimed;
}

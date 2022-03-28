import { QueryObserverResult, useQuery } from "react-query";

import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { MerkleProof } from "src/elf/merkle/MerkleProof";

const ELEMENT_REWARDS_URL =
  "https://elementfi.s3.us-east-2.amazonaws.com/rewards";

const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "local";

export enum MerkleRewardType {
  RETRO = "retro",
  REWARDS_VAULT = "rewardsVault",
}

export function useMerkleInfo(
  address: string | undefined | null,
  rewardType: MerkleRewardType = MerkleRewardType.RETRO,
): QueryObserverResult<MerkleProof> {
  return useQuery({
    queryKey: ["merkleInfo", address],
    queryFn: () => fetchMerkleInfo(address as string, rewardType),
    enabled: !!address,
  });
}

export async function fetchMerkleInfo(
  address: string,
  rewardType: MerkleRewardType,
): Promise<MerkleProof> {
  const result = await fetch(
    `${ELEMENT_REWARDS_URL}/${chainName}/${rewardType}/${address}`,
  );

  const merkleProofWithBN = (await result.json())[0] as MerkleProof;
  const value = BigNumber.from(merkleProofWithBN.leaf.value);

  const merkleProof = {
    ...merkleProofWithBN,
    leaf: { address, value: formatEther(value) },
  };
  return merkleProof;
}

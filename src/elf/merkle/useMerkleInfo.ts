import { QueryObserverResult, useQuery } from "react-query";

import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { addressesJson } from "src/elf-council-addresses";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { ChainId } from "src/ethereum";

const merkleServerUrl = process.env.NEXT_PUBLIC_MERKLE_SERVER_URL;
const ELEMENT_REWARDS_URL =
  "https://elementfi.s3.us-east-2.amazonaws.com/rewards";

const { chainId } = addressesJson;
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";

export enum MerkleRewardType {
  RETRO = "retro",
  REWARDS_VAULT = "rewardsVault",
}

export function useMerkleInfo(
  address: string | undefined | null,
  rewardType: MerkleRewardType = MerkleRewardType.RETRO
): QueryObserverResult<MerkleProof> {
  return useQuery({
    queryKey: ["merkleInfo", address],
    queryFn: () => fetchMerkleInfo(address as string, rewardType),
    enabled: !!address,
  });
}

export async function fetchMerkleInfo(
  address: string,
  rewardType: MerkleRewardType
): Promise<MerkleProof> {
  // TODO: host this on s3 as well
  if (chainId === ChainId.LOCAL) {
    const result = await fetch(`${merkleServerUrl}/api/merkleProof/${address}`);
    const merkleProof = (await result.json()) as MerkleProof;
    return merkleProof;
  }

  const result = await fetch(
    `${ELEMENT_REWARDS_URL}/${chainName}/${rewardType}/${address}`
  );

  const merkleProofWithBN = (await result.json())[0] as MerkleProof;
  const value = BigNumber.from(merkleProofWithBN.leaf.value);

  const merkleProof = {
    ...merkleProofWithBN,
    leaf: { address, value: formatEther(value) },
  };
  return merkleProof;
}

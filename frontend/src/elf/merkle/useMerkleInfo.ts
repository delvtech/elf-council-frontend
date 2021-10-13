import { QueryObserverResult, useQuery } from "react-query";

import { MerkleProof } from "src/elf/merkle/MerkleProof";

const merkleServerUrl = process.env.NEXT_PUBLIC_MERKLE_SERVER_URL;

export function useMerkleInfo(
  address: string | undefined | null
): QueryObserverResult<MerkleProof> {
  return useQuery({
    queryKey: ["merkleInfo", address],
    queryFn: () => fetchMerkleInfo(address as string),
    refetchInterval: 5000,
    enabled: !!address,
  });
}

export async function fetchMerkleInfo(address: string): Promise<MerkleProof> {
  const result = await fetch(`${merkleServerUrl}/api/merkleProof/${address}`);

  const merkleProof = (await result.json()) as MerkleProof;
  return merkleProof;
}

export interface MerkleProof {
  leaf: {
    address: string;
    value: string;
  };
  proof: number[][];
}

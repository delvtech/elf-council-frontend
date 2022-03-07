import { useCallback, useMemo, useReducer } from "react";
import {
  generateProofCallData,
  MerkleTree,
  pedersenHashConcat,
  toHex,
} from "zkp-merkle-airdrop-lib";
import { useQuery } from "react-query";

// TODO: Move cdn base url to environment variable
const cdnUrl = `https://elementfi.s3.us-east-2.amazonaws.com/rewards/${
  process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet"
}/zkRetro`;

interface ProofState {
  error?: Error;
  isGenerating: boolean;
  proof?: string;
}

type ProofAction =
  | { type: "startGenerating" }
  | { type: "setProof"; payload: string }
  | { type: "setError"; payload: Error };

function reducer(state: ProofState, action: ProofAction): ProofState {
  switch (action.type) {
    case "startGenerating":
      return {
        error: undefined,
        isGenerating: true,
        proof: undefined,
      };
    case "setProof":
      return {
        error: undefined,
        isGenerating: false,
        proof: action.payload,
      };
    case "setError":
      return {
        error: action.payload,
        isGenerating: false,
        proof: undefined,
      };
    default:
      console.warn("Unsupported ProofState reducer action:", action);
      return state;
  }
}

export interface UseZKProofProps {
  key?: string;
  secret?: string;
  account?: string;
}

interface UseZKProof extends ProofState {
  generate: () => void;
  isEligible: boolean;
  isReady: boolean;
}

export default function useZKProof({
  key,
  secret,
  account,
}: UseZKProofProps): UseZKProof {
  const [state, dispatch] = useReducer(reducer, {
    isGenerating: false,
  });

  // fetch required files
  const { data: merkleTree } = useQuery({
    queryKey: "zk-merkle-tree",
    queryFn: async () =>
      fetch(`${cdnUrl}/merkle_tree_storage_string.txt`)
        .then((res) => res.text())
        .then((mtss) => MerkleTree.createFromStorageString(mtss)),
    staleTime: Infinity,
  });
  const { data: wasmBuffer } = useQuery({
    queryKey: "zk-wasm-buffer",
    queryFn: () =>
      fetch(`${cdnUrl}/circuit.wasm`)
        .then((res) => res.arrayBuffer())
        .then((ab) => Buffer.from(ab)),
    staleTime: Infinity,
  });
  const { data: zkeyBuffer } = useQuery({
    queryKey: "zk-zkey-buffer",
    queryFn: () =>
      fetch(`${cdnUrl}/circuit_final.zkey`)
        .then((res) => res.arrayBuffer())
        .then((ab) => Buffer.from(ab)),
    staleTime: Infinity,
  });

  // set isEligible when the key, secret, and/or merkleTree change
  const isEligible = useMemo(() => {
    if (key && secret && merkleTree) {
      const commitment = toHex(pedersenHashConcat(BigInt(key), BigInt(secret)));
      return merkleTree.leafExists(BigInt(commitment));
    }
    return false;
  }, [key, secret, merkleTree]);

  const isReady = !!(merkleTree && wasmBuffer && zkeyBuffer);

  const generate = useCallback(() => {
    if (isReady && isEligible && key && secret && account) {
      dispatch({ type: "startGenerating" });
      generateProofCallData(
        merkleTree,
        BigInt(key),
        BigInt(secret),
        account,
        wasmBuffer,
        zkeyBuffer,
      )
        .then((proof) => {
          dispatch({ type: "setProof", payload: proof });
        })
        .catch((err) => {
          dispatch({ type: "setError", payload: err });
        });
    }
  }, [
    key,
    secret,
    account,
    merkleTree,
    wasmBuffer,
    zkeyBuffer,
    isEligible,
    isReady,
  ]);

  return {
    generate,
    isReady,
    isEligible,
    ...state,
  };
}

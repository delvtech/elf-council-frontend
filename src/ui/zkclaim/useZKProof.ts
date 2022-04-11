import { useCallback, useMemo, useReducer } from "react";
import {
  generateProofCallData,
  MerkleTree,
  pedersenHashConcat,
  toHex,
} from "zkp-merkle-airdrop-lib";
import { useQuery } from "react-query";
import {
  discordTier1PrivateAirdropContract,
  discordTier2PrivateAirdropContract,
  discordTier3PrivateAirdropContract,
  githubTier1PrivateAirdropContract,
  githubTier2PrivateAirdropContract,
  githubTier3PrivateAirdropContract,
} from "src/elf/contracts";
import { PrivateAirdrop } from "@elementfi/elf-council-typechain";

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

export interface MerkleTreeInfo {
  merkleTree: MerkleTree;
  contract: PrivateAirdrop;
}

interface UseZKProof extends ProofState, Partial<MerkleTreeInfo> {
  generate: () => Promise<string> | undefined;
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
  // TODO: fetch all trees
  const { data: githubTier1MerkleTree } = useQuery({
    queryKey: "github-merkle-tree-1",
    queryFn: async () =>
      fetch(`${cdnUrl}/merkle/${githubTier1PrivateAirdropContract.address}.txt`)
        .then((res) => res.text())
        .then((mtss) => MerkleTree.createFromStorageString(mtss)),
    staleTime: Infinity,
  });
  const { data: githubTier2MerkleTree } = useQuery({
    queryKey: "github-merkle-tree-2",
    queryFn: async () =>
      fetch(`${cdnUrl}/merkle/${githubTier2PrivateAirdropContract.address}.txt`)
        .then((res) => res.text())
        .then((mtss) => MerkleTree.createFromStorageString(mtss)),
    staleTime: Infinity,
  });
  const { data: githubTier3MerkleTree } = useQuery({
    queryKey: "github-merkle-tree-3",
    queryFn: async () =>
      fetch(`${cdnUrl}/merkle/${githubTier3PrivateAirdropContract.address}.txt`)
        .then((res) => res.text())
        .then((mtss) => MerkleTree.createFromStorageString(mtss)),
    staleTime: Infinity,
  });
  const { data: discordTier1MerkleTree } = useQuery({
    queryKey: "discord-merkle-tree-1",
    queryFn: async () =>
      fetch(
        `${cdnUrl}/merkle/${discordTier1PrivateAirdropContract.address}.txt`,
      )
        .then((res) => res.text())
        .then((mtss) => MerkleTree.createFromStorageString(mtss)),
    staleTime: Infinity,
  });
  const { data: discordTier2MerkleTree } = useQuery({
    queryKey: "discord-merkle-tree-2",
    queryFn: async () =>
      fetch(
        `${cdnUrl}/merkle/${discordTier2PrivateAirdropContract.address}.txt`,
      )
        .then((res) => res.text())
        .then((mtss) => MerkleTree.createFromStorageString(mtss)),
    staleTime: Infinity,
  });
  const { data: discordTier3MerkleTree } = useQuery({
    queryKey: "discord-merkle-tree-3",
    queryFn: async () =>
      fetch(
        `${cdnUrl}/merkle/${discordTier3PrivateAirdropContract.address}.txt`,
      )
        .then((res) => res.text())
        .then((mtss) => MerkleTree.createFromStorageString(mtss)),
    staleTime: Infinity,
  });
  const treesReady = !!(
    githubTier1MerkleTree &&
    githubTier2MerkleTree &&
    githubTier3MerkleTree &&
    discordTier1MerkleTree &&
    discordTier2MerkleTree &&
    discordTier3MerkleTree
  );
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
  const merkleTreeInfo = useMemo<MerkleTreeInfo | undefined>(() => {
    if (key && secret && treesReady) {
      let commitment: string;

      // OK to catch, as it throws in the case of being not eligible
      try {
        commitment = toHex(pedersenHashConcat(BigInt(key), BigInt(secret)));
      } catch (e) {
        return undefined;
      }

      const merkleTrees = [
        {
          merkleTree: githubTier1MerkleTree,
          contract: githubTier1PrivateAirdropContract,
        },
        {
          merkleTree: githubTier2MerkleTree,
          contract: githubTier2PrivateAirdropContract,
        },
        {
          merkleTree: githubTier3MerkleTree,
          contract: githubTier3PrivateAirdropContract,
        },
        {
          merkleTree: discordTier1MerkleTree,
          contract: discordTier1PrivateAirdropContract,
        },
        {
          merkleTree: discordTier2MerkleTree,
          contract: discordTier2PrivateAirdropContract,
        },
        {
          merkleTree: discordTier3MerkleTree,
          contract: discordTier3PrivateAirdropContract,
        },
      ];
      for (const treeInfo of merkleTrees) {
        const leafExists = treeInfo.merkleTree.leafExists(BigInt(commitment));
        if (leafExists) {
          return treeInfo;
        }
      }
    }
  }, [
    key,
    secret,
    treesReady,
    githubTier1MerkleTree,
    githubTier2MerkleTree,
    githubTier3MerkleTree,
    discordTier1MerkleTree,
    discordTier2MerkleTree,
    discordTier3MerkleTree,
  ]);

  const isReady = !!(treesReady && wasmBuffer && zkeyBuffer);

  const generate = useCallback(() => {
    if (isReady && merkleTreeInfo && key && secret && account) {
      dispatch({ type: "startGenerating" });
      return generateProofCallData(
        merkleTreeInfo?.merkleTree,
        // the last 2 characters represent the MSB which are removed by the
        // pedersenHash function when creating the commitment (public ID). To
        // generate a valid proof, they need to be removed here too.
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        BigInt(key.slice(0, 64)),
        // the last 2 characters represent the MSB which are removed by the
        // pedersenHash function when creating the commitment (public ID). To
        // generate a valid proof, they need to be removed here too.
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        BigInt(secret.slice(0, 64)),
        account,
        wasmBuffer,
        zkeyBuffer,
      )
        .then((proof) => {
          dispatch({ type: "setProof", payload: proof });
          return proof;
        })
        .catch((err) => {
          dispatch({ type: "setError", payload: err });
          return err?.message || "";
        });
    }
  }, [key, secret, account, merkleTreeInfo, wasmBuffer, zkeyBuffer, isReady]);

  return {
    generate,
    isReady,
    isEligible: !!merkleTreeInfo,
    ...state,
    ...merkleTreeInfo,
  };
}

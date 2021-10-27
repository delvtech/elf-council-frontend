import { parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import { useCallback } from "react";
import { addressesJson } from "src/elf-council-addresses";
import { coreVotingContract } from "src/elf/contracts";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useSmartContractTransaction } from "src/react-query-typechain/hooks/useSmartContractTransaction/useSmartContractTransaction";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { Ballot } from "src/ui/voting/Ballot";

const { optimisticRewardsVault, lockingVault } = addressesJson.addresses;

export function useVote(
  account: string | undefined | null,
  signer: Signer,
  atblockNumber?: number
): {
  mutate: (proposalId: string, ballot: Ballot) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
} {
  const { data: latestBlockNumber } = useLatestBlockNumber();
  const { data: merkleInfo } = useMerkleInfo(account);

  const {
    mutate: vote,
    isLoading,
    isSuccess,
    isError,
  } = useSmartContractTransaction(coreVotingContract, "vote", signer);

  const onVote = useCallback(
    (proposalId: string, ballot: Ballot) => {
      const blockNumber = atblockNumber || latestBlockNumber;

      if (!blockNumber || !merkleInfo || !account) {
        return;
      }

      const { extraDataForLockingVault, extraDataForRewardsVault } =
        getCallDatasToQueryVotePower(blockNumber, merkleInfo, account);

      const votingVaults = [lockingVault, optimisticRewardsVault];
      const extraData = [extraDataForLockingVault, extraDataForRewardsVault];
      vote([votingVaults, extraData, proposalId, ballot]);
    },
    [account, atblockNumber, latestBlockNumber, merkleInfo, vote]
  );

  return { mutate: onVote, isLoading, isSuccess, isError };
}

/**
 * Returns the calldata required to query vote power for each voting vault.
 * @param blockNumber the blocknumber at which the voting power is calculated
 * @param merkleInfo merkle proof information use to calculate voting power for the rewards vault
 * @param account the account we are interested in
 * @returns
 */
function getCallDatasToQueryVotePower(
  blockNumber: number,
  merkleInfo: MerkleProof,
  account: string
): {
  extraDataForLockingVault: Uint8Array;
  extraDataForRewardsVault: Uint8Array;
} {
  const { value: totalGrant } = merkleInfo?.leaf || {};
  const totalGrantHexString = parseEther(totalGrant || "0").toHexString();
  const { proof = [] } = merkleInfo || {};

  const extraDataForLockingVault = ethers.utils.concat([
    account,
    blockNumber,
    ...proof,
  ] as string[]);

  const extraDataForRewardsVault = ethers.utils.concat([
    account,
    totalGrantHexString,
    ...proof,
  ] as string[]);

  return { extraDataForLockingVault, extraDataForRewardsVault };
}

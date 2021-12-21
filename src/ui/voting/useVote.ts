import { useCallback } from "react";

import { parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import { addressesJson } from "src/elf-council-addresses";
import {
  coreVotingContract,
  nonFungibleVotingContract,
  rewardsContract,
} from "src/elf/contracts";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { Ballot } from "src/ui/voting/Ballot";
import { useLockingVaultVotingPower } from "src/ui/voting/useLockingVaultVotingPower";
import { useRewardsVaultVotingPower } from "src/ui/voting/useRewardsVaultVotingPower";
import { useSmartContractTransaction } from "@elementfi/react-query-typechain";

const {
  optimisticRewardsVault: optimisticRewardsVaultAddress,
  lockingVault: lockingVaultAddress,
} = addressesJson.addresses;

export function useVote(
  account: string | undefined | null,
  signer: Signer | undefined,
  atBlockNumber?: number
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

  const lockingVaultVotingPower = useLockingVaultVotingPower(
    account,
    atBlockNumber
  );
  const rewardsVaultVotingPower = useRewardsVaultVotingPower(
    account,
    rewardsContract,
    atBlockNumber
  );
  const nonFungibleVotingPower = useRewardsVaultVotingPower(
    account,
    nonFungibleVotingContract,
    atBlockNumber
  );

  const onVote = useCallback(
    (proposalId: string, ballot: Ballot) => {
      const blockNumber = atBlockNumber || latestBlockNumber;

      if (!blockNumber || !merkleInfo || !account) {
        return;
      }

      // We should not include any vaults that the user has 0 voting power in
      // when casting a vote to save gas
      const votingVaults: string[] = [];
      const extraDatas: string[] = [];

      if (+rewardsVaultVotingPower > 0) {
        votingVaults.push(optimisticRewardsVaultAddress);
        const extraData = getCallDatasForRewardsVaultQueryVotePower(merkleInfo);
        extraDatas.push(extraData);
      }
      if (+nonFungibleVotingPower > 0) {
        votingVaults.push(nonFungibleVotingContract.address);
        const extraData = getCallDatasForRewardsVaultQueryVotePower(merkleInfo);
        extraDatas.push(extraData);
      }
      if (+lockingVaultVotingPower > 0) {
        votingVaults.push(lockingVaultAddress);
        const extraData = getCallDatasForLockingVaultQueryVotePower();
        extraDatas.push(extraData);
      }

      vote([votingVaults, extraDatas, proposalId, ballot]);
    },
    [
      account,
      atBlockNumber,
      latestBlockNumber,
      lockingVaultVotingPower,
      merkleInfo,
      nonFungibleVotingPower,
      rewardsVaultVotingPower,
      vote,
    ]
  );

  return { mutate: onVote, isLoading, isSuccess, isError };
}

function getCallDatasForLockingVaultQueryVotePower(): string {
  // extra data is not needed for the locking vault to query vote power, stub with empty value
  return "0x00";
}

function getCallDatasForRewardsVaultQueryVotePower(
  merkleInfo: MerkleProof
): string {
  const { value: totalGrant } = merkleInfo?.leaf || {};
  const { proof = [] } = merkleInfo || {};

  const extraDataForRewardsVault = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bytes32[]"],
    [parseEther(totalGrant || "0"), proof]
  );

  return extraDataForRewardsVault;
}

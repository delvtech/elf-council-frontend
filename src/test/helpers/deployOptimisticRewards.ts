import {
  OptimisticRewards,
  OptimisticRewards__factory,
} from "@elementfi/elf-council-typechain";
import { Wallet } from "ethers";
import MerkleTree from "merkletreejs";

export async function deployOptimisticRewards(
  signer: Wallet,
  elementTokenAddress: string,
  coreVotingAddress: string,
  merkleTree: MerkleTree,
  lockingVaultAddress: string,
): Promise<OptimisticRewards> {
  const rewardsDeployer = new OptimisticRewards__factory(signer);
  const rewardsContract = await rewardsDeployer.deploy(
    coreVotingAddress,
    merkleTree.getHexRoot(),
    signer.address,
    signer.address,
    elementTokenAddress,
    lockingVaultAddress,
  );

  return rewardsContract;
}

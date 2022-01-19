import { AddressesJsonFile } from "elf-council-tokenlist";
import {
  MockERC20__factory,
  OptimisticRewards__factory,
} from "elf-council-typechain";
import { ethers, Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { getMerkleTree } from "src/base/merkle";
import { testProvider } from "src/elf/providers/providers";

const ONE_ETHER = ethers.utils.parseEther("1");
export async function testClaiming(
  addressesJson: AddressesJsonFile,
): Promise<void> {
  const signers: Wallet[] = await testProvider.getWallets();
  const [signer] = signers;
  const {
    addresses: { elementToken, optimisticRewardsVault },
  } = addressesJson;

  const accounts = [];
  for (const i in signers) {
    accounts.push({
      address: signers[i].address,
      value: ONE_ETHER,
    });
  }
  const merkleTree = getMerkleTree(accounts);
  const leaves = merkleTree.getLeaves();
  const merkleProof = merkleTree.getHexProof(leaves[0]);

  const rewardsContract = OptimisticRewards__factory.connect(
    optimisticRewardsVault,
    signer,
  );

  const elementTokenContract = MockERC20__factory.connect(elementToken, signer);

  const rewardsContractBalance = await elementTokenContract.balanceOf(
    optimisticRewardsVault,
  );

  if (rewardsContractBalance.eq(0)) {
    await elementTokenContract.setBalance(
      optimisticRewardsVault,
      parseEther("10"),
    );
  }

  const rewardsTx = await rewardsContract.claim(
    ONE_ETHER,
    ONE_ETHER,
    merkleProof,
    signer.address,
  );
  await rewardsTx.wait(1);
}

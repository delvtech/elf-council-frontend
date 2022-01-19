import { Airdrop, Airdrop__factory } from "elf-council-typechain";
import { Wallet } from "ethers";
import MerkleTree from "merkletreejs";

import { MS_PER_S, ONE_YEAR_IN_SECONDS } from "src/base/time";

export async function deployAirdrop(
  signer: Wallet,
  elementTokenAddress: string,
  coreVotingAddress: string,
  merkleTree: MerkleTree,
  lockingVaultAddress: string,
): Promise<Airdrop> {
  const airdropDeployer = new Airdrop__factory(signer);
  const nowInSeconds = Math.round(Date.now() / MS_PER_S);
  const airdropContract = await airdropDeployer.deploy(
    coreVotingAddress,
    merkleTree.getHexRoot(),
    elementTokenAddress,
    nowInSeconds + ONE_YEAR_IN_SECONDS,
    lockingVaultAddress,
  );

  return airdropContract;
}

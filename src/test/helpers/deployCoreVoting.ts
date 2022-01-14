import { CoreVoting, CoreVoting__factory } from "elf-council-typechain";
import { BigNumberish, Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";

export async function deployCoreVoting(
  signer: Wallet,
  votingVaultAddresses: string[],
  timeLockAddress: string,
  baseQuorum: string,
  minProposalPower: string,
  gscVaultAddress: string,
  // can start executing after 10 blocks
  lockDuration: BigNumberish = "10",
  // can vote for 15 blocks
  extraVotingTime: BigNumberish = "15",
): Promise<CoreVoting> {
  const coreVotingDeployer = new CoreVoting__factory(signer);
  const coreVotingContract = await coreVotingDeployer.deploy(
    timeLockAddress,
    parseEther(baseQuorum),
    parseEther(minProposalPower),
    gscVaultAddress,
    votingVaultAddresses,
  );

  (await coreVotingContract.setLockDuration(lockDuration)).wait(1);
  (await coreVotingContract.changeExtraVotingTime(extraVotingTime)).wait(1);

  return coreVotingContract;
}

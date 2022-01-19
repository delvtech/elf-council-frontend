import { Timelock, Timelock__factory } from "elf-council-typechain";
import { BigNumberish, Wallet } from "ethers";

export async function deployTimelock(
  signer: Wallet,
  waitTime: BigNumberish,
  governanceAddress: string,
  gscVaultAddress: string,
): Promise<Timelock> {
  const timeLockDeployer = new Timelock__factory(signer);
  const timeLockContract = await timeLockDeployer.deploy(
    waitTime,
    governanceAddress,
    gscVaultAddress,
  );

  return timeLockContract;
}

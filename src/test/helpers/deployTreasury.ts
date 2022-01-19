import { Treasury, Treasury__factory } from "elf-council-typechain";
import { Wallet } from "ethers";

export async function deployTreasury(
  signer: Wallet,
  timeLockAddress: string,
): Promise<Treasury> {
  const treasuryDeployer = new Treasury__factory(signer);
  const treasuryContract = await treasuryDeployer.deploy(timeLockAddress);

  return treasuryContract;
}

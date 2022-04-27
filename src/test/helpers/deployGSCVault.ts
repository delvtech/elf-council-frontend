import { GSCVault, GSCVault__factory } from "@elementfi/elf-council-typechain";
import { BigNumberish, Wallet } from "ethers";

export async function deployGSCVault(
  signer: Wallet,
  coreVotingAddress: string,
  votingPowerBound: BigNumberish,
  governanceOwnerAddress: string,
): Promise<GSCVault> {
  const GSCDeployer = new GSCVault__factory(signer);
  const GSCContract = await GSCDeployer.deploy(
    coreVotingAddress,
    votingPowerBound,
    governanceOwnerAddress,
  );

  return GSCContract;
}

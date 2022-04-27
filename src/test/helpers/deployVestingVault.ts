import {
  VestingVault,
  VestingVault__factory,
} from "@elementfi/elf-council-typechain";
import { BigNumberish, Wallet } from "ethers";

export async function deployVestingVault(
  signer: Wallet,
  tokenAddress: string,
  timelockAddress: string,
  staleBlockLag: BigNumberish,
): Promise<VestingVault> {
  const vestingVaultDeployer = new VestingVault__factory(signer);
  const vestingVaultContract = await vestingVaultDeployer.deploy(
    tokenAddress,
    staleBlockLag,
  );

  await vestingVaultContract.initialize(signer.address, timelockAddress);

  return vestingVaultContract;
}

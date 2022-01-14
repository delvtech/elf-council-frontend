import {
  LockingVault__factory,
  SimpleProxy,
  SimpleProxy__factory,
} from "elf-council-typechain";
import { BigNumberish, Signer } from "ethers";

export async function deployLockingVault(
  signer: Signer,
  tokenAddress: string,
  timeLockAddress: string,
  staleBlockLag: BigNumberish,
): Promise<SimpleProxy> {
  const lockingVaultDeployer = new LockingVault__factory(signer);
  const lockingVaultBaseContract = await lockingVaultDeployer.deploy(
    tokenAddress,
    staleBlockLag,
  );

  const proxyDeployer = new SimpleProxy__factory(signer);
  const lockingVaultProxy = await proxyDeployer.deploy(
    timeLockAddress,
    lockingVaultBaseContract.address,
  );

  const lockingVaultContract = lockingVaultProxy.attach(
    lockingVaultProxy.address,
  );

  return lockingVaultContract;
}

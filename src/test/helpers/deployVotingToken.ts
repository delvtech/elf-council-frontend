import { MockERC20, MockERC20__factory } from "elf-council-typechain";
import { Wallet } from "ethers";

export async function deployVotingToken(signer: Wallet): Promise<MockERC20> {
  const tokenDeployer = new MockERC20__factory(signer);
  const tokenContract = await tokenDeployer.deploy(
    "Element Governance Token",
    "ELFI",
    signer.address,
  );

  return tokenContract;
}

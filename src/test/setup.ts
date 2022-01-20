import { testProvider } from "src/elf/providers/providers";
import { deployGovernanace } from "src/test/helpers/deployGovernance";
import { initializeGovernance } from "src/test/helpers/initializeGovernance";

async function setup(): Promise<void> {
  const wallets = testProvider.getWallets();
  const [owner] = wallets;
  const governanceContracts = await deployGovernanace(owner, wallets);
  await initializeGovernance(governanceContracts);
}

export default setup;

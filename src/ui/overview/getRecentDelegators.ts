import { defaultProvider as provider } from "src/elf/providers/providers";
import {
  lockingVaultContract as lockingVault,
  vestingContract as vestingVault,
} from "src/elf/contracts";
import { Log } from "@ethersproject/providers";
import { BigNumber } from "ethers";

const STARTING_BLOCK_NUMBER = 14496292;

const noTokens =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

// Fetches the number of unique delegators from both locking and vesting vaults
// This function should be used within NextJs getStaticProps with a TTL to cache this result
export async function getRecentDelegators(): Promise<string[]> {
  // Query for all events
  const lockingFilter = lockingVault.filters.VoteChange(null, null, null);
  const vestingFilter = vestingVault.filters.VoteChange(null, null, null);

  const lockingEvents = await lockingVault.queryFilter(lockingFilter, 0);
  const vestingEvents = await vestingVault.queryFilter(vestingFilter, 0);

  const delegators = new Set<string>([]);

  lockingEvents.forEach((event) => {
    console.log(event);
    const value = event.args[2];
    const from = event.args[0];
    if (value.gt(0)) {
      delegators.add(from);
    }
  });

  vestingEvents.forEach((event) => {
    console.log(event);
    const value = event.args[2];
    const from = event.args[0];
    if (value.gt(0)) {
      delegators.add(from);
    }
  });

  return Array.from(delegators);
}

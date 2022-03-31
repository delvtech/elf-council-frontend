import { defaultProvider as provider } from "src/elf/providers/providers";
import {
  lockingVaultContract as lockingVault,
  vestingContract as vestingVault,
} from "src/elf/contracts";

const STARTING_BLOCK_NUMBER = 14496292;

// Fetches the number of unique delegators from both locking and vesting vaults
// This function should be used within NextJs getStaticProps with a TTL to cache this result
export async function getRecentDelegators(): Promise<string[]> {
  // Query for all events
  const lockingFilter = lockingVault.filters.VoteChange(null, null, null);
  const vestingFilter = vestingVault.filters.VoteChange(null, null, null);

  const lockingLogs = await provider.getLogs({
    fromBlock: STARTING_BLOCK_NUMBER,
    ...lockingFilter,
  });
  const vestingLogs = await provider.getLogs({
    fromBlock: STARTING_BLOCK_NUMBER,
    ...vestingFilter,
  });

  const delegators: Set<string> = new Set([]);

  lockingLogs.forEach((log) => {
    const from = log.topics[1];
    from && delegators.add(from);
  });

  vestingLogs.forEach((log) => {
    const from = log.topics[1];
    from && delegators.add(from);
  });

  return Array.from(delegators);
}

export interface AddressesJsonFile {
  chainId: number;
  addresses: {
    elementToken: string;
    coreVoting: string;
    gscCoreVoting: string;
    gscVault: string;
    timeLock: string;
    lockingVault: string;
    vestingVault: string;
    optimisticRewardsVault: string;
    optimisticGrants: string;
    airdrop: string;
    treasury: string;
  };
}

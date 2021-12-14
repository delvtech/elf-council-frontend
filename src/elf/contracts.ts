import {
  Airdrop__factory,
  CoreVoting__factory,
  ERC20Permit__factory,
  LockingVault__factory,
  OptimisticRewards__factory,
  VestingVault__factory,
} from "elf-council-typechain";
import { addressesJson } from "src/elf-council-addresses";
import { defaultProvider } from "src/elf/providers/providers";

export const elementTokenContract = ERC20Permit__factory.connect(
  addressesJson.addresses.elementToken,
  defaultProvider
);

export const lockingVaultContract = LockingVault__factory.connect(
  addressesJson.addresses.lockingVault,
  defaultProvider
);

export const rewardsContract = OptimisticRewards__factory.connect(
  addressesJson.addresses.optimisticRewardsVault,
  defaultProvider
);

export const nonFungibleVotingContract = OptimisticRewards__factory.connect(
  addressesJson.addresses.nonFungibleVotingVault,
  defaultProvider
);

export const coreVotingContract = CoreVoting__factory.connect(
  addressesJson.addresses.coreVoting,
  defaultProvider
);

export const vestingContract = VestingVault__factory.connect(
  addressesJson.addresses.vestingVault,
  defaultProvider
);

export const airdropContract = Airdrop__factory.connect(
  addressesJson.addresses.airdrop,
  defaultProvider
);

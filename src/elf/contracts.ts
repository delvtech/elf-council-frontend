import {
  Airdrop__factory,
  PrivateAirdrop__factory,
  CoreVoting__factory,
  ERC20Permit__factory,
  LockingVault__factory,
  OptimisticRewards__factory,
  VestingVault__factory,
} from "@elementfi/elf-council-typechain";
import { addressesJson } from "src/elf-council-addresses";
import { defaultProvider } from "src/elf/providers/providers";

export const elementTokenContract = ERC20Permit__factory.connect(
  addressesJson.addresses.elementToken,
  defaultProvider,
);

export const lockingVaultContract = LockingVault__factory.connect(
  addressesJson.addresses.lockingVault,
  defaultProvider,
);

export const rewardsContract = OptimisticRewards__factory.connect(
  addressesJson.addresses.optimisticRewardsVault,
  defaultProvider,
);

export const coreVotingContract = CoreVoting__factory.connect(
  addressesJson.addresses.coreVoting,
  defaultProvider,
);

export const vestingContract = VestingVault__factory.connect(
  addressesJson.addresses.vestingVault,
  defaultProvider,
);

export const airdropContract = Airdrop__factory.connect(
  addressesJson.addresses.airdrop,
  defaultProvider,
);

export const githubTier1PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    "0x7198A8379fE0A0663A1E7020F6100F39b53bbB9e",
    defaultProvider,
  );

export const githubTier2PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    "0xd21A03818ffe26dD92AEeD030E8a4b920c25C1cd",
    defaultProvider,
  );

export const githubTier3PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    "0xd98BD503c766F2ee0Bf05A4f34dA50af5B71D051",
    defaultProvider,
  );

export const discordTier1PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    "0x8c7a3457742bC7ae91Bec25ea9Ab5dCbEF412292",
    defaultProvider,
  );

export const discordTier2PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    "0x6E023DAF6D9B89491A86A4554651fBaF3b8402FE",
    defaultProvider,
  );

export const discordTier3PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    "0x6923F46Bfbf87E01428b8a70B1B6737a982ABcdA",
    defaultProvider,
  );

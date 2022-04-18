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

// TODO: Update addressesJson
export const githubTier1PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    process.env.NEXT_PUBLIC_CHAIN_NAME === "goerli"
      ? "0x7198A8379fE0A0663A1E7020F6100F39b53bbB9e"
      : "0x5ae69B714859A3C15281e0a227D9B8C82F03b966",
    defaultProvider,
  );

export const githubTier2PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    process.env.NEXT_PUBLIC_CHAIN_NAME === "goerli"
      ? "0xd21A03818ffe26dD92AEeD030E8a4b920c25C1cd"
      : "0x63A2548f0a3795a35Ff62121E5f8C24Ada9831F8",
    defaultProvider,
  );

export const githubTier3PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    process.env.NEXT_PUBLIC_CHAIN_NAME === "goerli"
      ? "0xd98BD503c766F2ee0Bf05A4f34dA50af5B71D051"
      : "0x72D3acDAd21dF959DB2C112A0a5982d03759a154",
    defaultProvider,
  );

export const discordTier1PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    process.env.NEXT_PUBLIC_CHAIN_NAME === "goerli"
      ? "0x8c7a3457742bC7ae91Bec25ea9Ab5dCbEF412292"
      : "0x508071cEEf3d24D94b6783c0808fe1A417DDa485",
    defaultProvider,
  );

export const discordTier2PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    process.env.NEXT_PUBLIC_CHAIN_NAME === "goerli"
      ? "0x6E023DAF6D9B89491A86A4554651fBaF3b8402FE"
      : "0x805bb52e4D9795B44C1ecd191Bd31F1D4a9C2dA5",
    defaultProvider,
  );

export const discordTier3PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    process.env.NEXT_PUBLIC_CHAIN_NAME === "goerli"
      ? "0x6923F46Bfbf87E01428b8a70B1B6737a982ABcdA"
      : "0xb7726ee8d589fd3e74C0369aB8F08D5d847bC86A",
    defaultProvider,
  );

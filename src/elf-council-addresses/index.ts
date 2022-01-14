import { AddressesJsonFile } from "elf-council-tokenlist";

import testnetAddressList from "./testnet.addresses.json";
import waffleAddressList from "./waffle.addresses.json";

const localGoerliAddressList = {
  addresses: {
    airdrop: "0xb7920477F7A39c3DffA925076857eB1585503e1B",
    coreVoting: "0x0CB8aa45068EE31e97B717b0B35e26A43884c84c",
    elementToken: "0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601",
    gscCoreVoting: "0x600c4926c9F88beCE3533ceaAA36804d6E23F1c1",
    gscVault: "0x0A575bFA79454112c37B9Af2a6362c9c68f7d2e3",
    lockingVault: "0xb5E8AF575Ee302A24c6C7746a99D895BeF67cb5D",
    nonFungibleVotingVault: "0x9eE5f603D8dCFbdF06f23aE0960F704b85F12fAb",
    optimisticGrants: "0x092B49777CB45dc4939FBc4029ce7a116D63D29D",
    optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
    spender: "0x722289C399e6f4AbCE80FaFbABC9a9876432834C",
    timeLock: "0x36687bdD319a78AB4b4347f3A7459Da235AFc4f4",
    treasury: "0xd46dDb33A33FD3D352d08cc7022Ce1f5c6ccFF1a",
    vestingVault: "0xe69D2F8DeD2924e0845118E7E467Fc97F7994ef6",
  },
  chainId: 5,
};

// Default to the testnet in this repo so `npm start` Just Works without having
// to specify it on the command line.
// TODO: Add this env variable (ie: "mainnet") to .env file when we're ready
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";

export const addressesJson = getAddressesList();

function getAddressesList() {
  if (process.env.NODE_ENV === "test") {
    return waffleAddressList;
  }

  const addressesList: AddressesJsonFile =
    chainName === "testnet" ? testnetAddressList : localGoerliAddressList;

  return addressesList;
}

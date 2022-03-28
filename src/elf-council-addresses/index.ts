import {
  AddressesJsonFile,
  mainnetAddressList,
  goerliAddressList,
} from "elf-council-tokenlist";

import testnetAddressList from "./testnet.addresses.json";
import waffleAddressList from "./waffle.addresses.json";

// Default to the testnet in this repo so `npm start` Just Works without having
// to specify it on the command line. This requires a local hardhat node to be running.
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";

export const addressesJson = getAddressesList();

function getAddressesList(): AddressesJsonFile {
  if (process.env.NODE_ENV === "test") {
    return waffleAddressList;
  }

  // local hardhat
  if (chainName === "testnet") {
    return testnetAddressList;
  }

  if (chainName === "goerli") {
    return goerliAddressList;
  }

  if (chainName === "mainnet") {
    return mainnetAddressList;
  }

  // Should not happen because of chainName has a default value set, regardless
  // we can just default to local hardhat
  return testnetAddressList;
}

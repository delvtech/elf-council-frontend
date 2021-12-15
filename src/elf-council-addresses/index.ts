import { AddressesJsonFile, goerliAddressList } from "elf-council-tokenlist";

import testnetAddressList from "./testnet.addresses.json";

// Default to the testnet in this repo so `npm start` Just Works without having
// to specify it on the command line.
// TODO: Add this env variable (ie: "mainnet") to .env file when we're ready
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";

export const addressesJson: AddressesJsonFile =
  chainName === "testnet" ? testnetAddressList : goerliAddressList;

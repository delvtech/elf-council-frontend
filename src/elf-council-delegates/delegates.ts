import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

import testnetDelegatesJson from "./testnet.delegates.json";
import goerliDelegatesJson from "./goerli.delegates.json";

export interface DelegatesJson {
  chainId: number;
  version: string;
  delegates: Delegate[];
}

export interface Delegate {
  address: string;
  name: string;
  description: string;
  /**
   * Twitter handle w/out the @ symbol, eg: "CharlieStLouis" (not "@CharlieStLouis")
   */
  twitterHandle: string;
}

export const delegates: Delegate[] =
  addressesJson.chainId === ChainId.GOERLI
    ? goerliDelegatesJson.delegates
    : testnetDelegatesJson.delegates;

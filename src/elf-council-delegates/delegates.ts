import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

import testnetDelegatesJson from "src/elf-council-delegates/testnet.delegates.json";
import mainnetDelegatesJson from "src/elf-council-delegates/mainnet.delegates.json";
import goerliDelegatesJson from "src/elf-council-delegates/goerli.delegates.json";

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

export const delegates = getDelegates();

function getDelegates(): Delegate[] {
  if (addressesJson.chainId === ChainId.GOERLI) {
    return goerliDelegatesJson.delegates;
  }

  if (addressesJson.chainId === ChainId.MAINNET) {
    return mainnetDelegatesJson.delegates;
  }

  if (addressesJson.chainId === ChainId.LOCAL) {
    return testnetDelegatesJson.delegates;
  }

  // Should never happen, but for type safety we default to hardhat testnet delegates
  return testnetDelegatesJson.delegates;
}

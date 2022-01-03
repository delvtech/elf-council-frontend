import delegatesJson from "./delegates.testnet.json";

export interface DelegatesJson {
  chainId: number;
  version: string;
  delegates: Delegate[];
}

export interface Delegate {
  address: string;
  name: string;
  description: string;
  numDelegatedVotes: number;
  numProposalsVoted: number;
  /**
   * Twitter handle w/out the @ symbol, eg: "CharlieStLouis" (not "@CharlieStLouis")
   */
  twitterHandle: string;
}

// TODO: use delegatesJson for specified chain, for now just use testnet
export const delegates: Delegate[] = (delegatesJson as DelegatesJson).delegates;

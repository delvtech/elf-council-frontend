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
  twitterHandle: string;
}

export const delegates: Delegate[] = (delegatesJson as DelegatesJson).delegates;

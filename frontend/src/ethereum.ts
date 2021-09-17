/*
 * See https://chainid.network/
 */
export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
  LOCAL = 31337,
}
export const ChainNames: Record<ChainId, string> = {
  [ChainId.MAINNET]: "Ethereum Mainnet",
  [ChainId.GOERLI]: "Goerli Testnet",
  [ChainId.LOCAL]: "Local development",
};

export const DEFAULT_CHAIN_IDS: ChainId[] = [
  ChainId.MAINNET,
  ChainId.GOERLI,
  ChainId.LOCAL,
];

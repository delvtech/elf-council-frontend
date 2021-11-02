import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

const { chainId } = addressesJson;

export const epochBlocksByChainId: Record<ChainId, number> = {
  // Oct-27-2021 03:37:04 PM +UTC
  [ChainId.MAINNET]: 13500232,
  // Oct-27-2021 03:38:01 PM +UTC
  [ChainId.GOERLI]: 5745115,
  // Just start at beginning
  [ChainId.LOCAL]: 0,
};

export const epochBlock = epochBlocksByChainId[chainId as ChainId];

import {
  testNftTokenContractAddress,
  testnetNftTokenContractAddress,
  goerliNftTokenContractAddress,
  mainnetNftTokenContractAddress,
} from "src/ui/overview/NFTTokenContractAddresses";

export function getNFTTokenContract(): string {
  const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";

  if (process.env.NODE_ENV === "test") {
    return testNftTokenContractAddress;
  }

  if (chainName === "testnet") {
    return testnetNftTokenContractAddress;
  }

  if (chainName === "goerli") {
    return goerliNftTokenContractAddress;
  }

  if (chainName === "mainnet") {
    return mainnetNftTokenContractAddress;
  }

  // Should not happen because of chainName has a default value set, regardless
  // we can just default to local hardhat
  return testnetNftTokenContractAddress;
}

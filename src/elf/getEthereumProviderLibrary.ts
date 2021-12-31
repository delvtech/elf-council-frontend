import { ExternalProvider, Web3Provider } from "@ethersproject/providers";

export function getEthereumProviderLibrary(
  provider?: ExternalProvider,
): Web3Provider | null {
  if (!provider) {
    console.warn(
      `Could not instantiate web3 context at the root. Missing provider?`,
    );
    return null;
  }

  // TODO: figure out if we are conencting to hardhat and use a localhost provider
  const library = new Web3Provider(provider);

  return library;
}

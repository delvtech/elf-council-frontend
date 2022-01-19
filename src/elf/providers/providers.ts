import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ExternalProvider, Provider } from "@ethersproject/providers";
import type { MockProvider } from "ethereum-waffle";
import { providers } from "ethers";

import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

const LOCAL_RPC_HOST = "http://127.0.0.1:8545";
const ALCHEMY_GOERLI_KEY = process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_KEY as string;
const ALCHEMY_MAINNET_KEY = process.env
  .NEXT_PUBLIC_MAINNET_ALCHEMY_KEY as string;

const { chainId } = addressesJson;
export const ALCHEMY_GOERLI_HTTP_URL = `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;
export const ALCHEMY_MAINNET_HTTP_URL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_MAINNET_KEY}`;

// vercel won't build with ethereum-waffle as a production dependency.  only import it if we are testing.
let mockProvider: MockProvider | undefined;
if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MockProvider } = require("ethereum-waffle");
  mockProvider = new MockProvider();
}
// safe to cast since this should only ever be used in 'test' environment anyway.
export const testProvider = mockProvider as MockProvider;

const provider = getProvider();
export const defaultProvider = provider;

// Default rpc host to local, but check the chain id in the addresses.json for
// final say
function getProvider() {
  if (process.env.NODE_ENV === "test") {
    return testProvider;
  }

  // otherwise, if a chain id is provided, we'll use the corresponding alchemy provider.  right now
  // this is only goerli.
  if (chainId === ChainId.GOERLI) {
    const web3Goerli = createAlchemyWeb3(
      `wss://eth-goerli.ws.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`,
    );
    const alchemyWeb3GoerliWebSocketProvider = new providers.Web3Provider(
      web3Goerli.currentProvider as ExternalProvider,
      ChainId.GOERLI,
    );
    return alchemyWeb3GoerliWebSocketProvider as Provider;
  }

  if (chainId === ChainId.MAINNET) {
    const web3Mainnet = createAlchemyWeb3(
      `wss://eth-mainnet.ws.alchemyapi.io/v2/${ALCHEMY_MAINNET_KEY}`,
    );

    const alchemyWeb3MainnetWebSocketProvider = new providers.Web3Provider(
      web3Mainnet.currentProvider as ExternalProvider,
      ChainId.MAINNET,
    );

    return alchemyWeb3MainnetWebSocketProvider as Provider;
  }

  // default to localhost
  const localhostProvider = new providers.JsonRpcProvider(LOCAL_RPC_HOST);
  return localhostProvider;
}

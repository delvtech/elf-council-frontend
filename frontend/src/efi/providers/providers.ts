import { ExternalProvider, Provider } from "@ethersproject/providers";
import { providers } from "ethers";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { ChainId, DEFAULT_CHAIN_IDS } from "elf/ethereum";

const LOCAL_RPC_HOST = "http://127.0.0.1:8545";
const ALCHEMY_GOERLI_KEY = process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_KEY as string;
const ALCHEMY_MAINNET_KEY = process.env
  .NEXT_PUBLIC_MAINNET_ALCHEMY_KEY as string;

// default to mainnet for now
const chainId = DEFAULT_CHAIN_IDS[0];
export const ALCHEMY_GOERLI_HTTP_URL = `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;
export const ALCHEMY_MAINNET_HTTP_URL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_MAINNET_KEY}`;

// eslint-disable-next-line no-var
export var defaultProvider = getProvider();

// Default rpc host to local, but check the chain id in the addresses.json for
// final say
function getProvider() {
  // always use localhostProvider for tests
  if (process.env.NODE_ENV === "test") {
    const localhostProvider = new providers.JsonRpcProvider(LOCAL_RPC_HOST);
    return localhostProvider;
  }

  // otherwise, if a chain id is provided, we'll use the corresponding alchemy provider.  right now
  // this is only goerli.
  if (chainId === ChainId.GOERLI) {
    const web3Goerli = createAlchemyWeb3(
      `wss://eth-goerli.ws.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`
    );
    const alchemyWeb3GoerliWebSocketProvider = new providers.Web3Provider(
      web3Goerli.currentProvider as ExternalProvider,
      ChainId.GOERLI
    );
    return alchemyWeb3GoerliWebSocketProvider as Provider;
  }

  if (chainId === ChainId.MAINNET) {
    const web3Mainnet = createAlchemyWeb3(
      `wss://eth-mainnet.ws.alchemyapi.io/v2/${ALCHEMY_MAINNET_KEY}`
    );

    const alchemyWeb3MainnetWebSocketProvider = new providers.Web3Provider(
      web3Mainnet.currentProvider as ExternalProvider,
      ChainId.MAINNET
    );

    return alchemyWeb3MainnetWebSocketProvider as Provider;
  }

  // default to localhost
  const localhostProvider = new providers.JsonRpcProvider(LOCAL_RPC_HOST);
  return localhostProvider;
}

import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

export const ETHERSCAN_DOMAIN = getDomain();

function getDomain() {
  if (addressesJson.chainId === ChainId.LOCAL) {
    return "https://app.tryethernal.com";
  }
  if (addressesJson.chainId === ChainId.GOERLI) {
    return "https://goerli.etherscan.io";
  }
  return "https://etherscan.io";
}

const TX_PATH = addressesJson.chainId === ChainId.LOCAL ? "transaction" : "tx";

export const ETHERSCAN_TRANSACTION_DOMAIN = `${ETHERSCAN_DOMAIN}/${TX_PATH}`;

import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

export const SNAPSHOT_GRAPHQL_ENDPOINT = "https://hub.snapshot.org/graphql";
export const ELEMENT_FINANCE_SNAPSHOT_URL = getSnapshotUrl();

function getSnapshotUrl() {
  switch (addressesJson.chainId) {
    case ChainId.MAINNET:
      return "https://snapshot.org/#/elfi.eth";
    case ChainId.GOERLI:
    case ChainId.LOCAL:
    default:
      return "https://snapshot.org/#/element-finance-goerli.eth";
  }
}

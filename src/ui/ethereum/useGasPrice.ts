import { QueryObserverResult, useQuery } from "react-query";

import {
  EtherChainGasPriceResult,
  fetchGasPrice,
} from "src/elf-etherchain/fetchGasPrice";

export function useGasPrice(): QueryObserverResult<EtherChainGasPriceResult> {
  return useQuery({
    queryKey: "ethereum-gas-price",
    queryFn: () => fetchGasPrice(),
    refetchInterval: 5000,
  });
}

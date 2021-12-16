export async function fetchGasPrice(): Promise<EtherChainGasPriceResult> {
  const result = await fetch("https://www.etherchain.org/api/gasPriceOracle");

  const resultJSON = (await result.json()) as EtherChainGasPriceResult;

  return resultJSON;
}

export interface EtherChainGasPriceResult {
  /**
   * Result are in gwei
   */
  safeLow: number;

  /**
   * Result are in gwei
   */
  standard: number;

  /**
   * Result are in gwei
   */
  fast: number;

  /**
   * Result are in gwei
   */
  fastest: number;

  /**
   * Result are in gwei
   */
  currentBaseFee: number;

  /**
   * Result are in gwei
   */
  recommendedBaseFee: number;
}

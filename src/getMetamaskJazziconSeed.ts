/**
 * See:
 * https://github.com/MetaMask/metamask-extension/blob/master/ui/helpers/utils/icon-factory.js#L84
 */
export function getMetamaskJazziconSeed(address: string): number {
  const addr = address.slice(2, 10);
  const seed = parseInt(addr, 16);
  return seed;
}

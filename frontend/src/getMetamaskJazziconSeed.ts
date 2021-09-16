/**
 * See:
 * https://github.com/MetaMask/metamask-extension/blob/master/ui/lib/icon-factory.js
 */
export function getMetamaskJazziconSeed(address: string): number {
  const addr = address.slice(2, 10);
  const seed = parseInt(addr, 16);
  return seed;
}

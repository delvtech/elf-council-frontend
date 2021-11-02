const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
export function isValidAddress(address: string): boolean {
  return ETHEREUM_ADDRESS_REGEX.test(address);
}

export function formatWalletAddress(address: string): string {
  const hexPrefix = address.slice(0, 2);
  const firstFive = address.slice(2, 7); // after the 0x, take the first 5 uuniqu
  const lastFive = address.slice(-5);

  return `${hexPrefix}${firstFive}...${lastFive}`;
}

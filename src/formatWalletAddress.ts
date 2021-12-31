export function formatWalletAddress(address: string): string {
  const hexPrefix = address.slice(0, 2);

  // Using slice w/ no-magic-numbers is overkill
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const firstFive = address.slice(2, 7); // after the 0x, take the first 5 uuniqu

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const lastFive = address.slice(-5);

  return `${hexPrefix}${firstFive}...${lastFive}`;
}

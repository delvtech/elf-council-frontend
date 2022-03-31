export function formatWalletAddress(account: string): string {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return `${account.slice(0, 7)}...${account.slice(-5)}`;
}

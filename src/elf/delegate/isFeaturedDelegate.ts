import { Delegate, delegates } from "src/elf-council-delegates/delegates";

export function getFeaturedDelegate(
  delegateAddress: string,
): Delegate | undefined {
  const featuredDelegate = delegates.find(
    ({ address }) => delegateAddress === address,
  );

  return featuredDelegate;
}

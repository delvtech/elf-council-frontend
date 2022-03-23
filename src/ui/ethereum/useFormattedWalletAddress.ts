import { Provider } from "@ethersproject/providers";
import { isValidAddress } from "src/base/isValidAddress";
import { useEnsName } from "./useEnsName";

export function useFormattedWalletAddress(
  accountOrEnsName: string | null | undefined,
  provider?: Provider,
): string | null | undefined {
  const { data: ensName } = useEnsName(accountOrEnsName, provider);
  if (ensName) {
    return ensName;
  } else if (!accountOrEnsName || !isValidAddress(accountOrEnsName)) {
    return accountOrEnsName;
  } else {
    // Using slice w/ no-magic-numbers is overkill
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return `${accountOrEnsName.slice(0, 7)}...${accountOrEnsName.slice(-5)}`;
  }
}

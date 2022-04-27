import { Provider } from "@ethersproject/providers";
import { formatWalletAddress } from "src/base/formatWalletAddress";
import { isValidAddress } from "src/base/isValidAddress";
import { useENSName } from "./useEnsName";

export function useFormattedWalletAddress(
  accountOrEnsName: string | null | undefined,
  provider?: Provider,
): string | null | undefined {
  const { data: ensName } = useENSName(accountOrEnsName, provider);
  if (ensName) {
    return ensName;
  } else if (!accountOrEnsName || !isValidAddress(accountOrEnsName)) {
    return accountOrEnsName;
  } else {
    return formatWalletAddress(accountOrEnsName);
  }
}

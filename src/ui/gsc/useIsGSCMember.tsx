import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { gscVaultContract } from "src/elf/contracts";

export function useIsGSCMember(account: string | null | undefined): boolean {
  const { data: timeStamp } = useSmartContractReadCall(
    gscVaultContract,
    "members",
    {
      callArgs: [account as string],
      enabled: !!account,
    },
  );

  // if there is a valid timestamp, the user is on the GSC, if it is zero, that indicates there is
  // no entry.
  return !!timeStamp?.toNumber();
}

import { BigNumber } from "ethers";
import { Delegate } from "src/elf-council-delegates/delegates";
import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { lockingVaultContract } from "src/elf/contracts";
import { formatEther } from "ethers/lib/utils";
import { useGSCMembers } from "src/ui/gsc/useGSCMembers";
import { useMemo } from "react";

/**
 * Returns a list of candidates, sorted by highest to lowest voting power
 * @returns {Delegate[]} a list of candidates
 */
export function useGSCCandidates(): Delegate[] {
  const { data: members = [] } = useGSCMembers();
  const gscMemberAddresses = members.map(({ address }) => address);

  const { data: vestingVaultEvents = [] } = useSmartContractEvents(
    lockingVaultContract,
    "VoteChange",
  );

  const { data: lockingVaultEvents = [] } = useSmartContractEvents(
    lockingVaultContract,
    "VoteChange",
  );

  const events = [...lockingVaultEvents, ...vestingVaultEvents];

  // memoize since there are thousands of events and we're manipluating large objects/arrays.
  return useMemo(() => {
    const votePowerByDelegates: Record<string, BigNumber> = {};
    events?.forEach((event) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [unusedAccount, delegate, amount]: [string, string, BigNumber] =
        event.args as [string, string, BigNumber];

      if (delegate in votePowerByDelegates) {
        votePowerByDelegates[delegate] =
          votePowerByDelegates[delegate].add(amount);
      }

      votePowerByDelegates[delegate] = amount;
    });

    const sortedByVotePower = Object.entries(votePowerByDelegates)
      .sort((a, b) => Number(formatEther(b[1])) - Number(formatEther(a[1])))
      .filter(([address]) => !gscMemberAddresses.includes(address))
      .map(([address]) => ({ address }));

    return sortedByVotePower;

    // don't re-compute every time there's a new array.  length is good enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events.length, gscMemberAddresses.length]);
}

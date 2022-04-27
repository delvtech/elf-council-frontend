import { BigNumber, Event } from "ethers";
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
    {
      fromBlock: 14496292,
      refetchOnWindowFocus: false,
    },
  );

  const { data: lockingVaultEvents = [] } = useSmartContractEvents(
    lockingVaultContract,
    "VoteChange",
    {
      fromBlock: 14496292,
      refetchOnWindowFocus: false,
    },
  );

  const events = [...lockingVaultEvents, ...vestingVaultEvents];

  // memoize since there are thousands of events and we're manipulating large objects/arrays.
  return useMemo(() => {
    const votePowerByDelegates = getVotePowerByDelegate(events);

    return sortVotingPower(votePowerByDelegates, gscMemberAddresses);

    // don't re-compute every time there's a new array.  length is good enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events.length, gscMemberAddresses.length]);
}

/**
 * Returns a record of all delegates and their respective voting power
 * @returns {Record<string, BigNumber>} a mapping between delegate address -> voting power
 */
function getVotePowerByDelegate(events: Event[]): Record<string, BigNumber> {
  const votePowerByDelegates: Record<string, BigNumber> = {};

  events.forEach((event) => {
    const [, delegate, amount]: [string, string, BigNumber] = event.args as [
      string,
      string,
      BigNumber,
    ];

    if (delegate in votePowerByDelegates) {
      votePowerByDelegates[delegate] =
        votePowerByDelegates[delegate].add(amount);
    }

    votePowerByDelegates[delegate] = amount;
  });

  return votePowerByDelegates;
}

/**
 * Returns a sorted list of delegates. Sorted by voting power.
 * @returns {Array<string>} a string array of delegate addresses.
 */
function sortVotingPower(
  votePowerByDelegates: Record<string, BigNumber>,
  gscMembers: Array<string>,
) {
  return Object.entries(votePowerByDelegates)
    .sort((a, b) => Number(formatEther(b[1])) - Number(formatEther(a[1])))
    .filter(([address]) => !gscMembers.includes(address))
    .map(([address]) => ({ address }));
}

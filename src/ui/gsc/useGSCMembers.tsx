import { useQuery } from "react-query";
import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";
import { gscVaultContract } from "src/elf/contracts";
import zip from "lodash.zip";
import { Delegate } from "src/elf-council-delegates/delegates";

export function useGSCMembers(): Delegate[] {
  // grab membership approved events
  const { data: events } = useSmartContractEvents(
    gscVaultContract,
    "MembershipProved",
  );

  const membersSet = new Set<string>();
  events?.forEach((event) => {
    const [member]: [string] = event.args as [string];
    membersSet.add(member);
  });

  // events are sometimes out of order, sort to prevent useQuery cache busting
  const membersArray = Array.from(membersSet).sort();

  // now look to see if the member is *still* in the GSC.  they could have been kicked so we look at
  // the members property and make sure there is an entry.
  const { data: members } = useQuery({
    queryFn: async () => {
      // timestamps in seconds when user joined.  If the user doesn't exist, 0 is returned
      const timeStamps = await Promise.all(
        membersArray.map((member) => {
          return gscVaultContract.members(member);
        }),
      );

      // TODO: query the vote power of each gsc member so we sort descending
      const validMembers = zip<string, BigNumber>(membersArray, timeStamps)
        // 0 value for timestamp means no entry, so we filter
        .filter(([unusedMember, timeStamp]) => !!timeStamp?.toNumber())
        .map(([address]) => address) // only care about the addressthrow away the timestamp now
        .filter((address): address is string => !!address); // typeguard so (string | undefined)[] -> string[]

      return validMembers;
    },
    queryKey: ["gsc-members", membersArray],
    enabled: !!membersArray?.length,
  });

  if (!members) {
    return [];
  }

  return members.map((address) => ({
    address,
  }));
}

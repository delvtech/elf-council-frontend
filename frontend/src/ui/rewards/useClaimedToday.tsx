import { useMemo } from "react";

import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { ONE_DAY_IN_SECONDS } from "src/base/time";
import { addressesJson } from "src/elf-council-addresses";
import { elementTokenContract } from "src/elf/contracts";
import { useSmartContractEvents } from "src/react-query-typechain/hooks/useSmartContractEvents/useSmartContractEvents";
import { useBlockAtTimestamp } from "src/ui/ethereum/useBlockAtTimestamp";

const now = Date.now();
const nowInSeconds = Math.floor(now / 1000);
const { optimisticRewardsVault } = addressesJson.addresses;
export function useClaimedToday(): string {
  const block24hrsAgo = useBlockAtTimestamp(nowInSeconds - ONE_DAY_IN_SECONDS);

  const { data: events = [] } = useSmartContractEvents(
    elementTokenContract,
    "Transfer",
    {
      callArgs: [optimisticRewardsVault],
      fromBlock: block24hrsAgo as number,
      enabled: !!block24hrsAgo,
    }
  );

  // there may be many events so lets memoize
  const totalClaimedMemoized = useMemo(() => {
    let totalClaimedBN = BigNumber.from(0);
    events.forEach((event) => {
      totalClaimedBN = totalClaimedBN.add(event?.args?.[2] || 0);
    });

    const totalClaimed = formatEther(totalClaimedBN);
    return totalClaimed;
  }, [events]);

  return totalClaimedMemoized;
}

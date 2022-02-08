import { useQuery } from "react-query";

import { formatEther } from "@ethersproject/units";

import { lockingVaultContract } from "src/elf/contracts";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

export function useLockingVaultVotingPower(
  account: string | undefined | null,
  atBlockNumber?: number,
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();

  const blockNumber = atBlockNumber || latestBlockNumber;

  // TODO: use this when useSmartContractReadCall accepts keepPreviousData
  // const { data: lockingVotingPowerBN } = useSmartContractReadCall(
  //   lockingVaultContract,
  //   "queryVotePower",
  //   {
  //     callArgs: [account as string, blockNumber as number, "0x00"],
  //     enabled: !!account && !!blockNumber,
  //   },
  // );

  const { data: lockingVotingPowerBN } = useQuery({
    queryFn: async () => {
      const votePower = await lockingVaultContract.callStatic.queryVotePower(
        account as string,
        blockNumber as number,
        "0x00",
      );
      return votePower;
    },
    queryKey: ["queryVotePower", "lockingVault", { blockNumber, account }],
    enabled: !!account && !!blockNumber,
    keepPreviousData: true,
  });

  const lockingVotingPower = formatEther(lockingVotingPowerBN || 0);

  return lockingVotingPower;
}

import { formatEther } from "@ethersproject/units";
import { useQuery } from "react-query";

import { vestingContract } from "src/elf/contracts";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

export function useVestingVaultVotingPower(
  account: string | undefined | null,
  atBlockNumber?: number,
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();

  const blockNumber = atBlockNumber || latestBlockNumber;

  // TODO: use this when useSmartContractReadCall accepts keepPreviousData
  // const { data: vestingVotingPowerBN } = useSmartContractReadCall(
  //   vestingContract,
  //   "queryVotePower",
  //   {
  //     callArgs: [account as string, blockNumber as number, "0x00"],
  //     enabled: !!account && !!blockNumber,
  //   },
  // );

  const { data: vestingVotingPowerBN } = useQuery({
    queryFn: async () => {
      const votePower = await vestingContract.callStatic.queryVotePower(
        account as string,
        blockNumber as number,
        "0x00",
      );
      return votePower;
    },
    queryKey: ["queryVotePower", "vestingVault", { blockNumber, account }],
    enabled: !!account && !!blockNumber,
    keepPreviousData: true,
  });

  const lockingVotingPower = formatEther(vestingVotingPowerBN || 0);

  return lockingVotingPower;
}

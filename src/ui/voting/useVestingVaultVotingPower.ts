import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "@ethersproject/units";

import { vestingContract } from "src/elf/contracts";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

export function useVestingVaultVotingPower(
  account: string | undefined | null,
  atBlockNumber?: number,
): string {
  const { data: latestBlockNumber } = useLatestBlockNumber();

  const blockNumber = atBlockNumber || latestBlockNumber;

  const { data: vestingVotingPowerBN } = useSmartContractReadCall(
    vestingContract,
    "queryVotePower",
    {
      callArgs: [account as string, blockNumber as number, "0x00"],
      enabled: !!account && !!blockNumber,
    },
  );

  const lockingVotingPower = formatEther(vestingVotingPowerBN || 0);

  return lockingVotingPower;
}

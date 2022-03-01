import { vestingContract } from "src/elf/contracts";
import {
  useQueryVotePower,
  useQueryVotePowerView,
} from "src/ui/voting/useQueryVotePower";

export function useVestingVaultVotingPower(
  account: string | undefined | null,
  atBlockNumber?: number,
): string {
  return useQueryVotePower(account, vestingContract, atBlockNumber);
}

export function useVestingVaultVotingPowerView(
  account: string | undefined | null,
  atBlockNumber?: number,
): string {
  return useQueryVotePowerView(account, vestingContract, atBlockNumber);
}

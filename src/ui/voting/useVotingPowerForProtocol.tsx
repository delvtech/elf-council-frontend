import {
  useSmartContractEvents,
  useSmartContractReadCall,
} from "@elementfi/react-query-typechain";
import { BigNumber, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useMemo } from "react";
import { addressesJson } from "src/elf-council-addresses";
import { elementTokenContract, vestingContract } from "src/elf/contracts";

const { lockingVault } = addressesJson.addresses;

export function useVotingPowerForProtocol(): number {
  // value in Eth
  const vestingVaultVotingPower = useVestingVaultVotingPower();

  const { data: lockingVaultBalanceBN = BigNumber.from(0) } =
    useSmartContractReadCall(elementTokenContract, "balanceOf", {
      callArgs: [lockingVault],
    });

  const lockingVaultVotingPower = +formatEther(lockingVaultBalanceBN);

  const votingPower = +vestingVaultVotingPower + lockingVaultVotingPower;

  return votingPower;
}

function useVestingVaultVotingPower(): string {
  const { data: events } = useSmartContractEvents(
    vestingContract,
    "VoteChange",
  );

  return useMemo(() => {
    if (!events) {
      return "0";
    }

    // tally vote power for each address
    const votingPowerByAddress: Record<string, BigNumber> = {};
    events.forEach((event) => {
      const [delegatee, , amount]: [string, string, BigNumber] =
        (event.args as [string, string, BigNumber]) || [
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          BigNumber.from(0),
        ];

      const previousVotingPower =
        votingPowerByAddress[delegatee] || BigNumber.from(0);
      votingPowerByAddress[delegatee] = previousVotingPower.add(amount);
    });

    // sum up vote power across all addresses
    let vestingVaultVotingPowerBN = BigNumber.from(0);
    Object.keys(votingPowerByAddress).forEach((address) => {
      const votePowerBN = votingPowerByAddress[address];
      vestingVaultVotingPowerBN = vestingVaultVotingPowerBN.add(votePowerBN);
    });

    const vestingVaultVotingPower = formatEther(vestingVaultVotingPowerBN);
    return vestingVaultVotingPower;
    // events are immutable, only update if there are new events.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events?.length]);
}

import { useMemo } from "react";

import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { BigNumber, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";

import { addressesJson } from "src/elf-council-addresses";
import { elementTokenContract, vestingContract } from "src/elf/contracts";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import { useLockingVaultBalance } from "src/ui/voting/useLockingVaultBalance";

const { lockingVault } = addressesJson.addresses;

// the following two addresses have tokens in the locking vault but they aren't used to vote so we
// need to subtract them from calculation of the circulating voting power for the protocol:
const foundationAddress = "0xFEaDB1F18386d0225a38E9c4bD1E9Ac52243dE99"; // foundation non voting contract
const teamAddress = "0xcC46775f1dB1d697c176ed66698BA3C15394C3D4"; // team non voting contract

export function useVotingPowerForProtocol(): number {
  // value in Eth
  const vestingVaultVotingPower = useVestingVaultVotingPower();

  const { data: lockingVaultBalanceBN } = useTokenBalanceOf(
    elementTokenContract,
    lockingVault,
  );
  const lockingVaultVotingPower = +formatEther(lockingVaultBalanceBN || 0);

  // get deposits for foundation and team in the locking vault.  they are delegated to the
  // 0x0000...0001 address so they can't vote so we need to remove them from the total
  const foundationBalance = useLockingVaultBalance(foundationAddress);
  const teamBalance = useLockingVaultBalance(teamAddress);

  const votingPower =
    +vestingVaultVotingPower +
    lockingVaultVotingPower -
    +foundationBalance -
    +teamBalance;

  return votingPower;
}

function useVestingVaultVotingPower(): string {
  const { data: events } = useSmartContractEvents(
    vestingContract,
    "VoteChange",
  );

  const result = useMemo(() => {
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

  return result;
}

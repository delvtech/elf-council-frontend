import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { addressesJson } from "src/elf-council-addresses";
import { elementTokenContract, vestingContract } from "src/elf/contracts";

const { vestingVault, lockingVault } = addressesJson.addresses;

export function useVotingPowerForProtocol(): number {
  const vestingVaultVotingPower = useVestingVaultVotingPower();

  const { data: lockingVaultBalanceBN = BigNumber.from(0) } =
    useSmartContractReadCall(elementTokenContract, "balanceOf", {
      callArgs: [lockingVault],
    });

  const lockingVaultVotingPower = +formatEther(lockingVaultBalanceBN);

  const votingPower = vestingVaultVotingPower + lockingVaultVotingPower;

  return votingPower;
}

// TODO: initially the vesting vault has only unvested tokens, so we can get away with this simple
// calculation.  however, around December of 2022 this will no long be the case and we'll have to
// update this calculation to include unvested/invested portions per grant in the vault
function useVestingVaultVotingPower() {
  const { data: vestingVaultBalanceBN = BigNumber.from(0) } =
    useSmartContractReadCall(elementTokenContract, "balanceOf", {
      callArgs: [vestingVault],
    });

  const { data: vestingVaultMultiplierBN = BigNumber.from(0) } =
    useSmartContractReadCall(vestingContract, "unvestedMultiplier", {
      callArgs: [],
    });
  const unvestedMultiplier = vestingVaultMultiplierBN?.toNumber();
  const vestingVaultBalance = +formatEther(vestingVaultBalanceBN);
  const vestingVaultVotingPower =
    (vestingVaultBalance * unvestedMultiplier) / 100;
  return vestingVaultVotingPower;
}

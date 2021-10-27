import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { addressesJson } from "src/elf-council-addresses";
import { elementTokenContract } from "src/elf/contracts";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";

const { optimisticRewardsVault, lockingVault } = addressesJson.addresses;
export function useVotingPowerForProtocol(): string {
  const { data: rewardsBalanceBN = BigNumber.from(0) } =
    useSmartContractReadCall(elementTokenContract, "balanceOf", {
      callArgs: [optimisticRewardsVault],
    });
  const { data: lockingVaultBalanceBN = BigNumber.from(0) } =
    useSmartContractReadCall(elementTokenContract, "balanceOf", {
      callArgs: [lockingVault],
    });

  const votingPowerBN = rewardsBalanceBN.add(lockingVaultBalanceBN);
  const votingPower = formatEther(votingPowerBN);

  return votingPower;
}

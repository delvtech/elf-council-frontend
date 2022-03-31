import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";
import { lockingVaultContract } from "src/elf/contracts";

export default function useNumDelegates(): number {
  const { data: events } = useSmartContractEvents(
    lockingVaultContract,
    "VoteChange",
  );

  // tally of vote power by delegate
  const votePowerByDelegates: Record<string, BigNumber> = {};
  events?.forEach((event) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [unusedAccount, delegate, amount]: [string, string, BigNumber] =
      event.args as [string, string, BigNumber];

    if (delegate in votePowerByDelegates) {
      votePowerByDelegates[delegate] =
        votePowerByDelegates[delegate].add(amount);
    }

    votePowerByDelegates[delegate] = amount;
  });

  const delegatedVotes = Object.values(votePowerByDelegates);

  const filtered = delegatedVotes.filter((votePower) => !votePower.isZero());

  return filtered.length;
}

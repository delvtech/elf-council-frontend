import { parseEther } from "ethers/lib/utils";
import { VotingPower } from "src/elf/proposals/VotingPower";

export enum ProposalStatus {
  IN_PROGRESS = "IN_PROGRESS",
  PASSING = "PASSING",
  FAILING = "FAILING",

  PASSED = "PASSED",
  FAILED = "FAILIED",
}

export function getProposalStatus(
  isVotingOpen: boolean,
  isExecuted: boolean,
  quourum: string,
  votingPower: VotingPower | undefined,
): ProposalStatus | undefined {
  // TODO: add if voting power is loading and return undefined

  // special case here once a proposal is executed, it is deleted, so there is no votePower.
  // however, if it has NOT been executed, and there is no vote power, then it is probably still
  // loading, so we should show no status until it loads.
  // if the proposal is executed
  if (!votingPower && !isExecuted) {
    return undefined;
  }

  // if there are enough yes votes to pass quorum
  const hasEnoughYes = votingPower?.[0]?.gte(parseEther(quourum || "0"));
  // if there are enough no votes to pass quorum
  const hasEnoughNo = votingPower?.[1]?.gte(parseEther(quourum || "0"));

  if (!isVotingOpen) {
    if (isExecuted) {
      return ProposalStatus.PASSED;
    }

    if (hasEnoughYes) {
      return ProposalStatus.PASSING;
    }

    // voting is closed and there weren't enough yes votes means it failed.
    return ProposalStatus.FAILED;
  }

  if (hasEnoughYes) {
    return ProposalStatus.PASSING;
  }

  if (hasEnoughNo) {
    return ProposalStatus.FAILING;
  }

  return ProposalStatus.IN_PROGRESS;
}

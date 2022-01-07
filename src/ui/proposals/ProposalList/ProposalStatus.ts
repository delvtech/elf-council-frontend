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
  quourum: string,
  votingPower: VotingPower | undefined,
): ProposalStatus | undefined {
  // special case here.  if no one ever voted on the proposal and voting is closed, it failed.
  // NOTE: we should remove this before mainnet as it could cause a flash of FAILED before SUCCESS
  // if votingPower just hasn't loaded yet. leaving in for demonstration purposes right now
  if (!votingPower && !isVotingOpen) {
    return ProposalStatus.FAILED;
  }

  // otherwise let's assume that the votingPower response is still loading
  if (!votingPower) {
    return undefined;
  }

  // if there are enough yes votes to pass quorum
  const hasEnoughYes = votingPower[0].gte(parseEther(quourum || "0"));
  // if there are enough no votes to pass quorum
  const hasEnoughNo = votingPower[1].gte(parseEther(quourum || "0"));

  if (isVotingOpen) {
    if (hasEnoughYes) {
      return ProposalStatus.PASSING;
    }

    if (hasEnoughNo) {
      return ProposalStatus.FAILING;
    }

    return ProposalStatus.IN_PROGRESS;
  }

  if (hasEnoughYes) {
    return ProposalStatus.PASSED;
  }

  // voting is closed and there weren't enough yes votes means it failed.
  return ProposalStatus.FAILED;
}

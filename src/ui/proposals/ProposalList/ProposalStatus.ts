import { VotingPower } from "src/ui/proposals/useVotingPowerForProposal";

export enum ProposalStatus {
  IN_PROGRESS = "IN_PROGRESS",
  PASSING = "PASSING",
  FAILING = "FAILING",

  PASSED = "PASSED",
  FAILED = "FAILIED",
}

export function getProposalStatus(
  isVotingOpen: boolean,
  quourum: number,
  votingPower: VotingPower | undefined,
): ProposalStatus | undefined {
  if (!votingPower) {
    return undefined;
  }

  // if there are enough yes votes to pass quorum
  const hasEnoughYes = votingPower[0].toNumber() >= quourum;
  // if there are enough no votes to pass quorum
  const hasEnoughNo = votingPower[1].toNumber() >= quourum;

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

  if (hasEnoughNo) {
    return ProposalStatus.FAILED;
  }
}

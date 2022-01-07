import { t } from "ttag";

// TODO: get from typechain
export enum Ballot {
  YES,
  NO,
  MAYBE,
}

export const BallotChoices: Record<Ballot, string> = {
  [Ballot.YES]: t`Yes`,
  [Ballot.NO]: t`No`,
  [Ballot.MAYBE]: t`Abstain`,
};

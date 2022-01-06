import React, { ReactElement, useCallback } from "react";

import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { isNumber } from "lodash";
import { t } from "ttag";

import PopoverButton from "src/ui/base/Button/PopoverButton";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { Ballot } from "src/ui/voting/useVoted";

const BallotChoices: Record<Ballot, string> = {
  [Ballot.YES]: t`Yes`,
  [Ballot.NO]: t`No`,
  [Ballot.MAYBE]: t`Abstain`,
};

interface VotingBallotButtonProps {
  currentBallot: Ballot | undefined;
  onSelectBallot: (choice: Ballot) => void;
}

export function VotingBallotButton(
  props: VotingBallotButtonProps,
): ReactElement {
  const { currentBallot, onSelectBallot } = props;
  return (
    <PopoverButton
      className="p-0"
      popover={
        <Card variant={CardVariant.BLUE}>
          <div className="flex flex-col py-2 -mx-4 -my-5 text-white">
            <BallotDropdownItem
              ballot={Ballot.YES}
              ballotLabel={t`Yes`}
              currentBallot={currentBallot}
              onSelectItem={onSelectBallot}
            />
            <BallotDropdownItem
              ballot={Ballot.NO}
              ballotLabel={t`No`}
              currentBallot={currentBallot}
              onSelectItem={onSelectBallot}
            />
            <BallotDropdownItem
              ballot={Ballot.MAYBE}
              ballotLabel={t`Abstain`}
              currentBallot={currentBallot}
              onSelectItem={onSelectBallot}
            />
          </div>
        </Card>
      }
    >
      {(open: boolean) => (
        <div className="flex items-center">
          <span>
            {isNumber(currentBallot) ? BallotChoices[currentBallot] : t`Choice`}
          </span>

          <ChevronDownIcon
            className={classNames(
              open ? classNames("transform rotate-180") : "",
              "ml-2 h-5 w-5 transition ease-in-out duration-150",
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </PopoverButton>
  );
}
interface BallotDropdownItemProps {
  currentBallot: Ballot | undefined;
  ballot: Ballot;
  ballotLabel: string;
  onSelectItem: (choice: Ballot) => void;
}
function BallotDropdownItem(props: BallotDropdownItemProps) {
  const { currentBallot, ballot, ballotLabel, onSelectItem } = props;
  const active = currentBallot === ballot;

  const handleSelectItem = useCallback(() => {
    onSelectItem(ballot);
  }, [ballot, onSelectItem]);

  return (
    <button
      className="flex items-center justify-between px-4 py-2 rounded hover:bg-white hover:bg-opacity-20"
      onClick={handleSelectItem}
    >
      <span>{ballotLabel}</span>
      {active && <CheckCircleIcon className="ml-2" height="24" />}
      {!active && (
        <div className="w-5 h-5 ml-2 mr-1 bg-transparent border-2 border-white rounded-full" />
      )}
    </button>
  );
}

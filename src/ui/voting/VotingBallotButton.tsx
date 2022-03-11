import React, { ReactElement, useCallback } from "react";

import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { isNumber } from "lodash";
import { t } from "ttag";

import PopoverButton from "src/ui/base/Button/PopoverButton";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { Ballot, BallotChoices } from "src/ui/voting/Ballot";
import { Proposal } from "elf-council-proposals";

interface VotingBallotButtonProps {
  proposal: Proposal;
  currentBallot: Ballot | undefined;
  onSelectBallot: (choice: Ballot) => void;
  disabled?: boolean;
}

export function VotingBallotButton(
  props: VotingBallotButtonProps,
): ReactElement {
  const { currentBallot, onSelectBallot, disabled = false } = props;

  return (
    <PopoverButton
      disabled={disabled}
      className="p-0"
      popover={
        <Card variant={CardVariant.BLUE}>
          <div className="-mx-4 -my-5 flex flex-col py-2 text-white">
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
      {(open) => (
        <div className="flex items-center">
          <span>
            {isNumber(currentBallot) ? BallotChoices[currentBallot] : t`Vote`}
          </span>

          <ChevronDownIcon
            className={classNames(
              open ? classNames("rotate-180 transform") : "",
              "ml-2 h-5 w-5 transition duration-150 ease-in-out",
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
      className="flex items-center justify-between rounded px-4 py-2 hover:bg-white hover:bg-opacity-20"
      onClick={handleSelectItem}
    >
      <span>{ballotLabel}</span>
      {active ? (
        <CheckCircleIcon className="ml-2" height="24" />
      ) : (
        <div className="ml-2 mr-1 h-5 w-5 rounded-full border-2 border-white bg-transparent" />
      )}
    </button>
  );
}

import { ReactElement } from "react";

import classNames from "classnames";

import { formatWalletAddress } from "src/base/formatWalletAddress";
import { getGSCCandidateUrl } from "src/commonwealth";
import { Delegate } from "src/elf-council-delegates/delegates";
import { formatBalance } from "src/formatBalance";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";

interface GSCMemberProfileRowProps {
  selected: boolean;
  highlightSelected?: boolean;
  delegate: Delegate;
  delegateButton: ReactElement;
  kickButton?: ReactElement;
}

export function GSCMemberProfileRow(
  props: GSCMemberProfileRowProps,
): ReactElement {
  const {
    selected = false,
    highlightSelected = false,
    delegate,
    delegateButton,
    kickButton,
  } = props;

  const formattedDelegateName =
    delegate.ensName ||
    delegate.commonwealthName ||
    delegate.name ||
    formatWalletAddress(delegate.address);

  const delegateNameElement = (
    <span className="truncate">{formattedDelegateName}</span>
  );
  return (
    <div
      className={classNames(
        "grid grid-cols-10 items-center justify-between rounded-xl bg-white py-3 px-4",
        {
          "!bg-votingGreen": highlightSelected && selected,
        },
      )}
    >
      {/* Name */}
      <div className="col-span-6 mr-4 items-start truncate lg:col-span-4">
        <div className="flex items-center font-bold text-principalRoyalBlue">
          <WalletJazzicon
            account={delegate.address}
            size={20}
            className="mr-2 h-5 w-5 rounded-xl bg-principalRoyalBlue"
          />
          {delegate.commonwealthPostedFromAddress ? (
            <a
              className="hover:underline"
              target="_blank"
              href={getGSCCandidateUrl(delegate.commonwealthPostedFromAddress)}
              rel="noreferrer"
            >
              {delegateNameElement}
            </a>
          ) : (
            delegateNameElement
          )}
        </div>
        <div className="lg:hidden">
          <NumDelegatedVotes
            selected={selected}
            highlightSelected={highlightSelected}
            account={delegate.address}
          />
        </div>
      </div>

      {/* Voting Power */}
      <div className="col-span-2 ml-auto mr-10 hidden lg:block">
        <NumDelegatedVotes
          selected={selected}
          highlightSelected={highlightSelected}
          account={delegate.address}
        />
      </div>

      {/* Buttons */}
      <div className="col-span-4 flex justify-end gap-x-4">
        {/* Unique action event button */}
        <div className="w-1/2 lg:pl-2">{kickButton}</div>
        <div className="w-1/2 lg:pl-2">{delegateButton}</div>
      </div>
    </div>
  );
}

interface NumDelegatedVotesProps {
  account: string | undefined | null;
  highlightSelected: boolean;
  selected: boolean;
}

function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account, highlightSelected, selected } = props;
  const votePower = useVotingPowerForAccountAtLatestBlock(account);

  return (
    <div
      className={classNames(
        highlightSelected && selected ? "text-gray-400" : "text-blueGrey",
        "flex",
        "items-center",
      )}
    >
      <ElementIconCircle size={IconSize.SMALL} className="mr-1" />
      <span>{formatBalance(votePower)}</span>
    </div>
  );
}

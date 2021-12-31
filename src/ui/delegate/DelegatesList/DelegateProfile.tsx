import React, { ReactElement, useState, useCallback, useRef } from "react";
import { Tooltip } from "@material-ui/core";
import { t } from "ttag";
import { AnnotationIcon } from "@heroicons/react/solid";
import { Delegate } from "src/elf-council-delegates/delegates";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { copyToClipboard } from "src/base/copyToClipboard";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon/WalletJazzicon";
import Image from "next/image";
import classNames from "classnames";
import { ONE_SECOND_IN_MILLISECONDS } from "src/base/time";
interface DelegateProfileProps {
  selected: boolean;
  delegate: Delegate;
  active?: boolean;
}

const defaultToolTipState = {
  twitterHandle: false,
  address: false,
};

function DelegateProfile(props: DelegateProfileProps): ReactElement {
  const { selected = false, delegate } = props;
  const [showToolTip, setshowToolTip] = useState(defaultToolTipState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(
    (type: "twitterHandle" | "address") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const nextState = { ...defaultToolTipState };
      nextState[type] = true;
      setshowToolTip(nextState);
      timeoutRef.current = setTimeout(() => {
        setshowToolTip(defaultToolTipState);
        timeoutRef.current = null;
      }, ONE_SECOND_IN_MILLISECONDS);
      copyToClipboard(delegate[type]);
    },
    [delegate],
  );

  const handleCopyTwitterHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCopy("twitterHandle");
  };
  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCopy("address");
  };

  return (
    <div
      className={classNames(
        "flex items-center justify-between py-3 px-4 bg-hackerSky rounded-xl",
        { "!bg-paleLily": selected },
      )}
    >
      <div className="items-start text-left w-10/12 truncate">
        <div className="text-principalRoyalBlue font-bold flex items-center mb-1">
          <WalletJazzicon
            account={delegate.address}
            size={20}
            className="inline-block h-5 w-5 rounded-xl bg-principalRoyalBlue mr-1.5"
          />
          <span className="truncate">{delegate.name}</span>
        </div>
        <span className="text-blueGrey">
          <NumDelegatedVotes account={delegate.address} />
        </span>
      </div>
      <div>
        <span className="flex flex-col gap-1 items-center justify-center">
          <Tooltip
            arrow
            placement="top"
            open={showToolTip.twitterHandle}
            title={t`Twitter handle copied`}
          >
            <button onClick={handleCopyTwitterHandle}>
              <AnnotationIcon className="h-5 text-principalRoyalBlue" />
            </button>
          </Tooltip>
          <Tooltip
            arrow
            placement="top"
            open={showToolTip.address}
            title={t`Address copied`}
          >
            <button onClick={handleCopyAddress}>
              <div className="relative h-4 w-4">
                <Image
                  layout="fill"
                  src="/assets/crown.svg"
                  alt={t`Crown icon`}
                />
              </div>
            </button>
          </Tooltip>
        </span>
      </div>
    </div>
  );
}

interface NumDelegatedVotesProps {
  account: string;
}
function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account } = props;
  const votePower = useVotingPowerForAccount(account);
  return <span>{t`${votePower} votes`}</span>;
}

export default DelegateProfile;

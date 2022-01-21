import { ReactElement, useState, useCallback, useRef } from "react";
import { formatWalletAddress } from "src/formatWalletAddress";
import { t } from "ttag";
import { formatBalance } from "src/formatBalance";
import classNames from "classnames";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import Image from "next/image";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { ONE_SECOND_IN_MILLISECONDS } from "src/base/time";
import { copyToClipboard } from "src/base/browser/copyToClipboard";

interface CurrentDelegateProps {
  className?: string;
  currentDelegateAddress: string;
}

function CurrentDelegate(props: CurrentDelegateProps): ReactElement {
  const { className = "", currentDelegateAddress } = props;
  const delegate = getFeaturedDelegate(currentDelegateAddress);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopyAddress = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowTooltip(true);
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
      timeoutRef.current = null;
    }, ONE_SECOND_IN_MILLISECONDS);
    copyToClipboard(currentDelegateAddress);
  }, [currentDelegateAddress]);

  return (
    <div
      className={classNames(
        className,
        "flex py-4 px-4 justify-between bg-hackerSky rounded-xl",
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center mb-1 font-bold text-principalRoyalBlue">
          <WalletJazzicon
            account={currentDelegateAddress}
            size={20}
            className="inline-block h-5 w-5 rounded-xl bg-principalRoyalBlue mr-1.5"
          />
          <span>
            {delegate?.name || formatWalletAddress(currentDelegateAddress)}
          </span>
        </div>
        <span className="text-blueGrey">
          <NumDelegatedVotes account={currentDelegateAddress} />
        </span>
        <Tooltip
          isOpen={showTooltip}
          content="Address copied"
          className="w-fit"
        >
          <button onClick={handleCopyAddress}>
            <span className="text-blueGrey hover:text-principalRoyalBlue">
              {formatWalletAddress(currentDelegateAddress)}
            </span>
          </button>
        </Tooltip>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative w-4 h-4">
          <Image layout="fill" src="/assets/crown.svg" alt={t`Crown icon`} />
        </div>
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
  return <span>{t`${formatBalance(votePower)} votes`}</span>;
}

export default CurrentDelegate;

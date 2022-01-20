import { ReactElement } from "react";
import { Delegate } from "src/elf-council-delegates/delegates";
import { formatWalletAddress } from "src/formatWalletAddress";
import { t } from "ttag";
import { formatBalance } from "src/formatBalance";
import classNames from "classnames";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import Image from "next/image";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";

interface CurrentDelegateProps {
  className?: string;
  delegate: Delegate;
}

function CurrentDelegate(props: CurrentDelegateProps): ReactElement {
  const { className = "", delegate } = props;

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
            account={delegate.address}
            size={20}
            className="inline-block h-5 w-5 rounded-xl bg-principalRoyalBlue mr-1.5"
          />
          <span>{delegate.name}</span>
        </div>
        <span className="text-blueGrey">
          <NumDelegatedVotes account={delegate.address} />
        </span>
        <span className="text-blueGrey">
          {formatWalletAddress(delegate.address)}
        </span>
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

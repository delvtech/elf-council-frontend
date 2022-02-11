import { ReactElement } from "react";
import { formatWalletAddress } from "src/formatWalletAddress";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { t } from "ttag";
import { formatBalance } from "src/formatBalance";
import classNames from "classnames";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import Image from "next/image";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
interface CurrentDelegateProps {
  className?: string;
  currentDelegateAddress: string;
  isSelfDelegated: boolean;
}

function CurrentDelegate(props: CurrentDelegateProps): ReactElement {
  const { className = "", currentDelegateAddress, isSelfDelegated } = props;
  const delegate = getFeaturedDelegate(currentDelegateAddress);

  return (
    <div
      className={classNames(
        className,
        "flex justify-between rounded-xl bg-hackerSky py-4 px-4",
      )}
    >
      <div className="flex flex-col">
        <div className="mb-1 flex items-center font-bold text-principalRoyalBlue">
          <WalletJazzicon
            account={currentDelegateAddress}
            size={20}
            className="mr-1.5 inline-block h-5 w-5 rounded-xl bg-principalRoyalBlue"
          />
          <div className="flex items-center gap-2">
            <span>
              {delegate?.name || formatWalletAddress(currentDelegateAddress)}
            </span>
            <div className="relative h-4 w-4">
              <Image
                layout="fill"
                src="/assets/crown.svg"
                alt={t`Crown icon`}
              />
            </div>
          </div>
        </div>
        <span className="text-blueGrey">
          <NumDelegatedVotes account={currentDelegateAddress} />
        </span>

        <a
          href={`https://etherscan.io/address/${currentDelegateAddress}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-blueGrey hover:text-principalRoyalBlue">
            {formatWalletAddress(currentDelegateAddress)}
          </span>
        </a>
      </div>

      {isSelfDelegated ? (
        <div className="flex items-end justify-end">
          <Tag intent={Intent.SUCCESS}>
            <CheckCircleIcon height={24} className="mr-2" />
            <span className="font-bold">{t`Self-delegated!`}</span>
          </Tag>
        </div>
      ) : null}
    </div>
  );
}

interface NumDelegatedVotesProps {
  account: string;
}
function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account } = props;
  const votePower = useVotingPowerForAccountAtLatestBlock(account);
  return <span>{t`Voting Power: ${formatBalance(votePower)}`}</span>;
}

export default CurrentDelegate;

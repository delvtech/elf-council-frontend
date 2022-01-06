import { Fragment, ReactElement, useState, useCallback, useRef } from "react";
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
import { Popover, Transition } from "@headlessui/react";
import DetailedDelegateProfile from "src/ui/delegate/DelegatesList/DetailedDelegateProfile";

interface DelegateProfileProps {
  selected: boolean;
  delegate: Delegate;
  onChooseDelegate?: (address: string) => void;
  active?: boolean;
}

const defaultTooltipState = {
  twitterHandle: false,
  address: false,
};

function DelegateProfile(props: DelegateProfileProps): ReactElement {
  const { selected = false, delegate, onChooseDelegate } = props;
  const [showTooltip, setShowTooltip] = useState(defaultTooltipState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = useCallback(
    (type: "twitterHandle" | "address") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const nextState = { ...defaultTooltipState };
      nextState[type] = true;
      setShowTooltip(nextState);
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(defaultTooltipState);
        timeoutRef.current = null;
      }, ONE_SECOND_IN_MILLISECONDS);
      copyToClipboard(delegate[type]);
    },
    [delegate],
  );

  const onCopyTwitterHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy("twitterHandle");
  };

  const onCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy("address");
  };

  return (
    <Popover>
      <Popover.Button className="w-full">
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
                open={showTooltip.twitterHandle}
                title={t`Twitter handle copied`}
              >
                <button onClick={onCopyTwitterHandle}>
                  <AnnotationIcon className="h-5 text-principalRoyalBlue" />
                </button>
              </Tooltip>
              <Tooltip
                arrow
                placement="top"
                open={showTooltip.address}
                title={t`Address copied`}
              >
                <button onClick={onCopyAddress}>
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
      </Popover.Button>

      <Transition>
        {/* Greyed out background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* z-30 in order to overlap sidebar z-index */}
          <Popover.Overlay className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        {/* Detailed delegate profile */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 sm:scale-95"
          enterTo="opacity-100 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 sm:scale-100"
          leaveTo="opacity-0 sm:scale-95"
        >
          {/* WIP: Make modal centered when less than lg, make modal full screen when < small */}
          <Popover.Panel
            className="fixed lg:absolute z-50 box-content rounded-xl md:top-[50%] md:left-[50%] md:transform md:translate-x-[-50%] md:translate-y-[-50%] lg:translate-x-0 lg:translate-y-0 lg:top-0 
          lg:right-0 h-full w-full lg:left-0 md:h-[500px] md:w-[700px] lg:h-full lg:w-full bg-hackerSky"
          >
            {({ close }) => (
              <DetailedDelegateProfile
                delegate={delegate}
                onClose={close}
                onChooseDelegate={onChooseDelegate}
              />
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition>
    </Popover>
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

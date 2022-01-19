import { Fragment, ReactElement } from "react";
import { t } from "ttag";
import { formatBalance } from "src/formatBalance";
import { Delegate } from "src/elf-council-delegates/delegates";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import Image from "next/image";
import classNames from "classnames";
import { Popover, Transition } from "@headlessui/react";
import DetailedDelegateProfile from "src/ui/delegate/DelegatesList/DetailedDelegateProfile";
import dynamic from "next/dynamic";

interface DelegateProfileProps {
  selected: boolean;
  delegate: Delegate;
  onSelectDelegate: () => void;
  active?: boolean;
}

function DelegateProfile(props: DelegateProfileProps): ReactElement {
  const { selected = false, delegate, onSelectDelegate } = props;

  return (
    <Popover>
      <Popover.Button className="w-full">
        <div
          className={classNames(
            "flex items-center justify-between py-3 px-4 bg-hackerSky rounded-xl",
            { "!bg-principalRoyalBlue": selected },
          )}
        >
          <div className="items-start w-10/12 text-left truncate">
            <div
              className={classNames(
                "flex items-center mb-1 font-bold text-principalRoyalBlue",
                { "!text-white": selected },
              )}
            >
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

          {/* Element member verified delegate icon */}
          <div className="flex relative w-4 h-4">
            <Image
              layout="fill"
              src="/assets/crown.svg"
              alt={t`Affiliated with Element Finance`}
              className={classNames({
                "filter brightness-0 invert": selected,
              })}
            />
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
          <Popover.Overlay className="fixed inset-0 z-10 transition-opacity bg-black bg-opacity-50" />
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
          <Popover.Panel
            className="fixed lg:absolute z-20 box-content sm:rounded-xl sm:top-[50%] sm:left-[50%] sm:transform sm:translate-x-[-50%] sm:translate-y-[-50%] lg:translate-x-0 lg:translate-y-0 lg:top-0 
          lg:right-0 inset-0 sm:inset-[initial] lg:left-0 sm:w-[400px] md:w-[700px] lg:h-full lg:w-full bg-hackerSky"
          >
            {({ close }) => (
              <DetailedDelegateProfile
                delegate={delegate}
                onSelectDelegate={() => {
                  onSelectDelegate();
                  close();
                }}
                onCloseProfileClick={close}
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
  return <span>{t`${formatBalance(votePower)} votes`}</span>;
}

export default dynamic(() => Promise.resolve(DelegateProfile), {
  // we cant server side render the Popover component, so we turn this off for DelegateProfile
  ssr: false,
});

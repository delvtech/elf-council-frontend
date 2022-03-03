import { Fragment, ReactElement } from "react";
import { t } from "ttag";
import { formatBalance } from "src/formatBalance";
import { Delegate } from "src/elf-council-delegates/delegates";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import Image from "next/image";
import classNames from "classnames";
import { Popover, Transition } from "@headlessui/react";
import DetailedDelegateProfile from "src/ui/delegate/DelegatesList/DetailedDelegateProfile";
import dynamic from "next/dynamic";
import { ButtonVariant, getButtonClass } from "src/ui/base/Button/styles";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";

interface DelegateProfileRowProps {
  selected: boolean;
  highlightSelected?: boolean;
  delegate: Delegate;
  actionButton: ReactElement;
  profileActionButton: ReactElement;
}

function DelegateProfileRow(props: DelegateProfileRowProps): ReactElement {
  const {
    selected = false,
    highlightSelected = false,
    delegate,
    actionButton,
    profileActionButton,
  } = props;

  const votePower = useVotingPowerForAccountAtLatestBlock(delegate.address);

  return (
    <Popover>
      <div
        className={classNames(
          "grid grid-cols-10 items-center justify-between rounded-xl bg-white py-3 px-4",
          {
            "!bg-votingGreen": highlightSelected && selected,
          },
        )}
      >
        {/* Name */}
        <div className="col-span-7 mr-4 items-start truncate text-left lg:col-span-4">
          <div className="flex flex-col">
            <div
              className={classNames(
                "flex items-center font-bold text-principalRoyalBlue",
              )}
            >
              <WalletJazzicon
                account={delegate.address}
                size={20}
                className="mr-2 inline-block h-5 w-5 rounded-xl bg-principalRoyalBlue"
              />
              <span className="truncate">{delegate.name}</span>
              {/* Crown Icon */}
              <div className="relative ml-2 flex h-4 w-4 shrink-0">
                <Image
                  layout="fill"
                  src="/assets/crown.svg"
                  alt={t`Affiliated with Element Finance`}
                />
              </div>
            </div>
            <div className="lg:hidden">
              <span
                className={
                  highlightSelected && selected
                    ? "text-gray-400"
                    : "text-blueGrey"
                }
              >
                <span>{formatBalance(votePower)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Voting Power */}
        <div className="col-span-2 ml-auto mr-10 hidden lg:block">
          <span
            className={
              highlightSelected && selected ? "text-gray-400" : "text-blueGrey"
            }
          >
            <span>{formatBalance(votePower)}</span>
          </span>
        </div>

        {/* Buttons */}
        <div className="col-span-3 flex gap-x-4 lg:col-span-4">
          {/* Button to expand a detailed view of delegate  */}
          <Popover.Button
            className={classNames(
              getButtonClass({ variant: ButtonVariant.SECONDARY }),
              "w-full justify-center",
            )}
          >
            {t`Profile`}
          </Popover.Button>

          {/* Unique action event button */}
          {actionButton}
        </div>
      </div>

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
          <Popover.Overlay className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity" />
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
            focus
            className="fixed inset-0 z-20 box-content bg-hackerSky sm:inset-[initial] sm:top-[50%] sm:left-[50%] sm:w-[400px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:transform sm:rounded-xl 
          md:w-[700px] lg:absolute lg:top-0 lg:right-0 lg:left-0 lg:h-full lg:w-full lg:translate-x-0 lg:translate-y-0"
          >
            {({ close }) => (
              <DetailedDelegateProfile
                delegate={delegate}
                onCloseProfileClick={close}
                selected={selected}
                actionButton={profileActionButton}
              />
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition>
    </Popover>
  );
}

export default dynamic(() => Promise.resolve(DelegateProfileRow), {
  // we cant server side render the Popover component, so we turn this off for DelegateProfile
  ssr: false,
});

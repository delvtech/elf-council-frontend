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
import {
  ButtonVariant,
  ButtonStyles,
  getButtonClass,
} from "src/ui/base/Button/styles";
import Button from "src/ui/base/Button/Button";

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
      <div
        className={classNames(
          "flex items-center justify-between py-3 px-4 bg-white rounded-xl",
          {
            "!bg-votingGreen": selected,
          },
        )}
      >
        {/* LeftSide */}
        <div className="items-start text-left truncate mr-4">
          <div
            className={classNames(
              "flex items-center font-bold text-principalRoyalBlue",
            )}
          >
            <WalletJazzicon
              account={delegate.address}
              size={20}
              className="inline-block h-5 w-5 rounded-xl bg-principalRoyalBlue mr-2"
            />
            <span className="truncate">{delegate.name}</span>
            {/* Crown Icon */}
            <div className="relative flex w-4 h-4 ml-2 shrink-0">
              <Image
                layout="fill"
                src="/assets/crown.svg"
                alt={t`Affiliated with Element Finance`}
              />
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="ml-auto mr-10">
          <span className={selected ? "text-gray-400" : "text-blueGrey"}>
            <NumDelegatedVotes account={delegate.address} />
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-x-4 w-[85px] lg:w-[205px]">
          <Popover.Button as={Fragment}>
            <Button
              variant={ButtonVariant.SECONDARY}
              className="w-full justify-center"
            >
              Profile
            </Button>
          </Popover.Button>

          <Button
            onClick={onSelectDelegate}
            variant={ButtonVariant.PRIMARY}
            disabled={selected}
            className="hidden lg:block w-full"
          >
            Choose
          </Button>
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
                selected={selected}
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
  return <span>{formatBalance(votePower)}</span>;
}

export default dynamic(() => Promise.resolve(DelegateProfile), {
  // we cant server side render the Popover component, so we turn this off for DelegateProfile
  ssr: false,
});

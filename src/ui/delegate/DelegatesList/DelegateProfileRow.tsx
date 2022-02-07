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
import { ButtonVariant, getButtonClass } from "src/ui/base/Button/styles";
import Button from "src/ui/base/Button/Button";

interface DelegateProfileRowProps {
  account: string | null | undefined;
  selected: boolean;
  delegate: Delegate;
  onSelectDelegate: () => void;
  onDelegation?: () => void;
  isLoading?: boolean;
  airdrop?: boolean;
}

function DelegateProfileRow(props: DelegateProfileRowProps): ReactElement {
  const {
    account,
    selected = false,
    delegate,
    onSelectDelegate,
    onDelegation,
    isLoading = false,
    airdrop = false,
  } = props;
  const votePower = useVotingPowerForAccount(account);

  return (
    <Popover>
      <div
        className={classNames(
          "grid grid-cols-7 items-center justify-between py-3 px-4 bg-white rounded-xl",
          {
            "!bg-votingGreen": selected,
          },
        )}
      >
        {/* Name */}
        <div className="col-span-5 lg:col-span-4 items-start text-left truncate mr-4">
          <div className="flex flex-col">
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
            <div className="lg:hidden">
              <span className={selected ? "text-gray-400" : "text-blueGrey"}>
                <span>{t`${formatBalance(votePower)} votes`}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Votes */}
        <div className="hidden lg:block col-span-1 ml-auto mr-10">
          <span className={selected ? "text-gray-400" : "text-blueGrey"}>
            <span>{formatBalance(votePower)}</span>
          </span>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex gap-x-4">
          <Popover.Button
            className={classNames(
              getButtonClass({ variant: ButtonVariant.SECONDARY }),
              "w-full justify-center",
            )}
          >
            {t`Profile`}
          </Popover.Button>

          <Button
            onClick={!airdrop && onDelegation ? onDelegation : onSelectDelegate}
            variant={airdrop ? ButtonVariant.PRIMARY : ButtonVariant.GRADIENT}
            disabled={selected || !account || isLoading}
            className="hidden lg:inline-flex w-full justify-center"
            loading={isLoading}
          >
            {airdrop ? t`Choose` : t`Delegate`}
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
            focus
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

export default dynamic(() => Promise.resolve(DelegateProfileRow), {
  // we cant server side render the Popover component, so we turn this off for DelegateProfile
  ssr: false,
});

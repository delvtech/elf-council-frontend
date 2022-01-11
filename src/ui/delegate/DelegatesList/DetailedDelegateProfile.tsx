import { ReactElement } from "react";
import Image from "next/image";
import { t } from "ttag";
import { Popover } from "@headlessui/react";
import { formatWalletAddress } from "src/formatWalletAddress";
import H2 from "src/ui/base/H2";
import { Delegate } from "src/elf-council-delegates/delegates";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon/WalletJazzicon";
import classNames from "classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
interface DetailedDelegateProfileProps {
  delegate: Delegate;
  onSelectDelegate: () => void;
  closePopover: () => void;
  className?: string;
}

function DetailedDelegateProfile({
  delegate,
  onSelectDelegate,
  closePopover,
  className = "",
}: DetailedDelegateProfileProps): ReactElement {
  const onClickChooseDelegate = () => {
    onSelectDelegate();
    closePopover();
  };

  return (
    <div className={classNames(className, "h-full")}>
      <div className="flex flex-col relative p-5 h-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Left Hand Column */}
          <div className="w-full md:w-[72.5%]">
            {/* Name */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <WalletJazzicon
                  account={delegate.address}
                  size={20}
                  className="h-5 mr-3"
                />
                <H2 className="text-principalRoyalBlue">{delegate.name}</H2>
              </div>

              <span className="text-blueGrey">
                {formatWalletAddress(delegate.address)}
              </span>
            </div>

            {/* Body */}
            <div className="mt-5">
              <h3 className="text-principalRoyalBlue">{t`Personal Delegate Mission`}</h3>

              <p className="mt-2 text-sm text-principalRoyalBlue">
                {delegate.description}
              </p>
            </div>
          </div>

          {/* Right Hand Column */}
          <div className="flex flex-col w-full md:w-[27.5%]">
            {/* Some handle/username */}
            <div>
              <span className="font-bold text-xl text-principalRoyalBlue">
                username.eth
              </span>
            </div>

            {/* Contact Info. */}
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <span className="text-blueGrey">discord-handle</span>
                <div className="relative h-5 w-5">
                  <Image
                    layout="fill"
                    src="/assets/Discord.svg"
                    alt={t`Crown icon`}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                {/* Empty span used for justify-between trick */}
                <span />
                <div className="relative h-5 w-5">
                  <Image
                    layout="fill"
                    src="/assets/crown.svg"
                    alt={t`Crown icon`}
                  />
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="mt-auto">
              <h3 className="text-principalRoyalBlue">{t`Background`}</h3>
              <p className="text-sm text-principalRoyalBlue">
                Ex. Matcha, DyDX, ENS, Full stack engineer and solidity engineer
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex gap-4 mt-auto sm:mt-14 lg:mt-auto">
          <Button
            className="grid place-items-center w-1/2"
            onClick={onClickChooseDelegate}
          >
            <span className="font-bold text-lg">{t`Choose Delegate`}</span>
          </Button>
          <Popover.Button as="div" className="w-1/2">
            <Button
              variant={ButtonVariant.WHITE}
              className="grid place-items-center w-full"
            >
              <span className="font-bold text-lg">
                {t`Close Delegate Profile`}
              </span>
            </Button>
          </Popover.Button>
        </div>
      </div>
    </div>
  );
}

export default DetailedDelegateProfile;

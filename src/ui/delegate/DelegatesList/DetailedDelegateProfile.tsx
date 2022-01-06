import { ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import { t } from "ttag";
import { Popover } from "@headlessui/react";
import { formatWalletAddress } from "src/formatWalletAddress";
import H2 from "src/ui/base/H2";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { Delegate } from "src/elf-council-delegates/delegates";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon/WalletJazzicon";
import classNames from "classnames";

interface DetailedDelegateProfileProps {
  delegate: Delegate;
  onClose: () => void;
  onChooseDelegate?: (address: string) => void;
  className?: string;
}

function DetailedDelegateProfile({
  delegate,
  onClose,
  onChooseDelegate,
  className = "",
}: DetailedDelegateProfileProps): ReactElement {
  const { account } = useWeb3React();

  const onClickChooseDelegate = () => {
    onClose();
    if (onChooseDelegate) {
      onChooseDelegate(delegate.address);
    }
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
                This is a small change, but a big move for us. 140 was an
                arbitrary choice based on the 160 character SMS limit. Proud of
                how thoughtful the team has been in solving a real problem
                people have when trying to tweet. And at the same time
                maintaining our brevity, speed, and essence! This is a small
                change, but a big move for us. 140 was an arbitrary choice based
                on the 160 character SMS limit. Proud of how thoughtful the team
                has been in solving a real problem people have when trying to
                tweet. And at the same time maintaining our brevity, speed, and
                essence.
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

        {/* Choose Delegate & Close Button */}
        <div className="flex flex-col gap-4 mt-auto">
          {onChooseDelegate ? (
            <Button
              className="w-52 flex justify-center items-center ml-auto mt-4"
              variant={ButtonVariant.GRADIENT}
              disabled={!account}
              onClick={onClickChooseDelegate}
            >
              <span className="mr-2">{t`Choose Delegate`}</span>
              <div className="relative h-5 w-5">
                <Image
                  layout="fill"
                  src="/assets/radio-button.svg"
                  alt={t`Radio icon`}
                />
              </div>
            </Button>
          ) : null}

          <Popover.Button className="bg-paleLily hover:bg-[#aadce5] rounded-xl h-12">
            <span className="text-principalRoyalBlue font-bold text-lg">
              {t`Close Delegate Profile`}
            </span>
          </Popover.Button>
        </div>
      </div>
    </div>
  );
}

export default DetailedDelegateProfile;

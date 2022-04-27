import { ReactElement, useEffect, useRef } from "react";
import { t } from "ttag";
import H2 from "src/ui/base/H2/H2";
import { Delegate } from "src/elf-council-delegates/delegates";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import classNames from "classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { useWeb3React } from "@web3-react/core";
import CloseButton from "src/ui/base/Dialog/CloseButton";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { Provider } from "@ethersproject/providers";

interface DetailedDelegateProfileProps {
  provider?: Provider;
  delegate: Delegate;
  onCloseProfileClick: () => void;
  selected: boolean;
  actionButton: ReactElement;
  className?: string;
}

function DetailedDelegateProfile({
  provider,
  delegate,
  onCloseProfileClick,
  actionButton,
  selected,
  className = "",
}: DetailedDelegateProfileProps): ReactElement {
  const { account } = useWeb3React();
  const previousSelectedRef = useRef<boolean>();
  const chooseDelegateTooltip = !account ? t`Connect wallet` : "";
  const formattedAddress = useFormattedWalletAddress(
    delegate.address,
    provider,
  );

  useEffect(() => {
    // Hacky-ish way to close the modal on selection
    if (previousSelectedRef.current === false) {
      onCloseProfileClick();
    }
    previousSelectedRef.current = selected;
  }, [onCloseProfileClick, selected]);

  return (
    <div className={classNames(className, "h-full", "relative", "pt-7")}>
      <CloseButton
        onClose={onCloseProfileClick}
        iconClassName="text-black"
        className="absolute top-0 right-0"
      />

      <div className="relative flex h-full flex-col p-5">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {/* Left Hand Column */}
          <div className="w-full md:w-[72.5%]">
            {/* Name */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <WalletJazzicon
                  account={delegate.address}
                  size={20}
                  className="mr-3 h-5"
                />
                <H2 className="text-principalRoyalBlue">{delegate.name}</H2>
              </div>

              <a
                href={`https://etherscan.io/address/${delegate.address}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-blueGrey hover:text-principalRoyalBlue">
                  {formattedAddress}
                </span>
              </a>
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
          <div className="flex w-full flex-col md:w-[27.5%]">
            {/* Some handle/username */}
            <div>
              <span className="text-xl font-bold text-principalRoyalBlue">
                username.eth
              </span>
            </div>

            {/* Contact Info. */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <span className="text-blueGrey">discord-handle</span>
              </div>
            </div>

            {/* Background */}
            <div className="mt-2">
              <h3 className="text-principalRoyalBlue">{t`Background`}</h3>
              <p className="text-sm text-principalRoyalBlue">
                Ex. Matcha, DyDX, ENS, Full stack engineer and solidity engineer
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto flex gap-4 sm:mt-14 lg:mt-auto">
          {/* Close Button */}
          <Button
            variant={ButtonVariant.WHITE}
            className="grid w-1/2 place-items-center"
            onClick={onCloseProfileClick}
          >
            <span className="text-lg font-bold">{t`Close`}</span>
          </Button>

          {/* Action Button */}
          <Tooltip content={chooseDelegateTooltip} className="w-1/2">
            {actionButton}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default DetailedDelegateProfile;

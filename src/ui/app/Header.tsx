import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import { TokenRewardsButton } from "src/ui/app/TokenRewardsButton";
import { WalletProfileButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { useGasPrice } from "src/ui/ethereum/useGasPrice";
import Image from "next/image";
import { t } from "ttag";

function Header(): ReactElement {
  const { account, active } = useWeb3React();
  const { data: gasPrice, isLoading } = useGasPrice();

  return (
    <div className={tw("flex", "justify-between", "w-full")}>
      <div className={tw("flex", "space-x-3")}></div>
      <div
        className={tw(
          "flex",
          "items-center",
          "space-x-4",
          "text-gray-400",
          "mr-3"
        )}
      >
        {account ? (
          <div className={tw("flex", "items-center")}>
            <div className={tw("flex", "items-center", "gap-2", "mr-8")}>
              <span
                className={tw("text-principalRoyalBlue")}
              >{t`Learn how to vote`}</span>
              <button>
                <TooltipSvg />
              </button>
            </div>
            <div className={tw("flex", "items-center", "mr-8")}>
              <Image
                height={18}
                width={18}
                src="/assets/gas.svg"
                alt={t`Gas pump icon`}
              />
              <span
                className={tw(
                  "text-principalRoyalBlue",
                  "font-bold",
                  "ml-2",
                  "mr-1"
                )}
              >
                {gasPrice?.recommendedBaseFee}
              </span>
              <button>
                <ChevronSvg />
              </button>
            </div>
          </div>
        ) : null}

        <WalletProfileButton
          account={account}
          walletConnectionActive={active}
        />
      </div>
    </div>
  );
}

const TooltipSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-principalRoyalBlue"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const ChevronSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-principalRoyalBlue"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Header;

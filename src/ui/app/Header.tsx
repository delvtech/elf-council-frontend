import React, { ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import tw from "src/elf-tailwindcss-classnames";
import { WalletProfileButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { useGasPrice } from "src/ui/ethereum/useGasPrice";
import Image from "next/image";
import { t } from "ttag";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

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
            <div className={tw("flex", "items-center", "gap-1", "mr-8")}>
              <span
                className={tw("text-principalRoyalBlue")}
              >{t`Learn how to vote`}</span>
              <button>
                <QuestionMarkCircleIcon
                  className={tw("h-4", "text-principalRoyalBlue")}
                />
              </button>
            </div>
            <div className={tw("flex", "items-center", "mr-8")}>
              <div className={tw("relative", "h-5", "w-5")}>
                <Image
                  layout="fill"
                  src="/assets/gas.svg"
                  alt={t`Gas pump icon`}
                />
              </div>
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

// TODO: Replace with HeroIcon once implemented
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

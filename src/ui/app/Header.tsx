import React, { ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import tw, {
  display,
  justifyContent,
  width,
  space,
  alignItems,
  textColor,
  margin,
  gap,
  height,
  position,
  fontWeight,
} from "src/elf-tailwindcss-classnames";
import { WalletProfileButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { useGasPrice } from "src/ui/ethereum/useGasPrice";
import Image from "next/image";
import { t } from "ttag";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

function Header(): ReactElement {
  const { account, active } = useWeb3React();
  const { data: gasPrice, isLoading } = useGasPrice();

  return (
    <div
      className={tw(
        display("flex"),
        justifyContent("justify-between"),
        width("w-full"),
      )}
    >
      <div className={tw(display("flex"), space("space-x-3"))}></div>
      <div
        className={tw(
          display("flex"),
          alignItems("items-center"),
          space("space-x-4"),
          textColor("text-gray-400"),
          margin("mr-3"),
        )}
      >
        {account ? (
          <div className={tw(display("flex"), alignItems("items-center"))}>
            <div
              className={tw(
                display("flex"),
                alignItems("items-center"),
                gap("gap-1"),
                margin("mr-8"),
              )}
            >
              <span
                className={textColor("text-principalRoyalBlue")}
              >{t`Learn how to vote`}</span>
              <button>
                <QuestionMarkCircleIcon
                  className={tw(
                    height("h-4"),
                    textColor("text-principalRoyalBlue"),
                  )}
                />
              </button>
            </div>
            <div
              className={tw(
                display("flex"),
                alignItems("items-center"),
                margin("mr-8"),
              )}
            >
              <div
                className={tw(
                  position("relative"),
                  height("h-5"),
                  width("w-5"),
                )}
              >
                <Image
                  layout="fill"
                  src="/assets/gas.svg"
                  alt={t`Gas pump icon`}
                />
              </div>
              <span
                className={tw(
                  textColor("text-principalRoyalBlue"),
                  fontWeight("font-bold"),
                  margin("ml-2", "mr-1"),
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

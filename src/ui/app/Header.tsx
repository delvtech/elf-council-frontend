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

export default Header;

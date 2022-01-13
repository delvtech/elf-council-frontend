import React, { ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletProfileButton } from "src/ui/wallet/ConnectWalletButton";
import { useGasPrice } from "src/ui/ethereum/useGasPrice";
import Image from "next/image";
import { t } from "ttag";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

function Header(): ReactElement {
  const { account, active } = useWeb3React();
  const { data: gasPrice } = useGasPrice();

  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-3"></div>
      <div className="flex items-center space-x-4 text-gray-400 mr-3">
        {account ? (
          <div className="flex items-center">
            <div className="flex items-center gap-1 mr-8">
              <span className="text-principalRoyalBlue">{t`Learn how to vote`}</span>
              <QuestionMarkCircleIcon className="h-4 text-principalRoyalBlue" />
            </div>
            <div className="flex items-center mr-8">
              <div className="relative h-5 w-5">
                <Image
                  layout="fill"
                  src="/assets/gas.svg"
                  alt={t`Gas pump icon`}
                />
              </div>
              <span className="text-principalRoyalBlue font-bold ml-2 mr-1">
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

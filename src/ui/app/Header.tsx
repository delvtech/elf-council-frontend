import React, { ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { t } from "ttag";
import { WalletProfileButton } from "src/ui/wallet/ConnectWalletButton";
import { useGasPrice } from "src/ui/ethereum/useGasPrice";
import { RESOURCES_URL } from "src/ui/resources";

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
              <a
                target="_blank"
                rel="noreferrer"
                href={RESOURCES_URL}
                className="flex items-center gap-2"
              >
                <span className="text-principalRoyalBlue">{t`Learn how to vote`}</span>
                <ExternalLinkIcon className="h-4 text-principalRoyalBlue" />
              </a>
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

import React, { ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import { t } from "ttag";
import { WalletProfileButton } from "src/ui/wallet/ConnectWalletButton";
import { useGasPrice } from "src/ui/ethereum/useGasPrice";
import ElementUrl from "src/elf/urls";
import GasIcon from "src/ui/base/svg/GasIcon";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { TooltipDefinition } from "src/ui/voting/tooltipDefinitions";
import { Provider } from "@ethersproject/providers";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";

const GAS_URL = "https://www.etherchain.org/tools/gasnow";

function Header(): ReactElement {
  const { account, active, library } = useWeb3React<Provider>();
  const { data: gasPrice } = useGasPrice();
  const amountDeposited = useDeposited(account) || "0";

  return (
    <div className="flex w-full justify-between">
      <div className="flex space-x-3"></div>
      <div className="flex items-center space-x-4 text-gray-400">
        {account ? (
          <div className="flex items-center">
            <span className="mr-8 hidden items-center gap-1 lg:flex">
              <ExternalLink
                href={ElementUrl.DOCS}
                text={t`Learn how to vote`}
                className="text-principalRoyalBlue"
              />
            </span>

            <ExternalLink
              href={GAS_URL}
              className="mr-8 flex items-center text-principalRoyalBlue"
              showIcon={false}
            >
              <GasIcon className="h-5 w-5" />
              <span className="font-bold">
                {gasPrice?.recommendedBaseFee || 0.0}
              </span>
            </ExternalLink>

            <Tooltip content={t`${TooltipDefinition.OWNED_ELFI}`}>
              <span className="mr-8 flex items-center gap-2 font-bold text-principalRoyalBlue">
                <ElementIconCircle size={IconSize.MEDIUM} />
                <span>
                  {amountDeposited}
                  <span className="hidden lg:inline"> ELFI</span>
                </span>
              </span>
            </Tooltip>
          </div>
        ) : null}

        <WalletProfileButton
          account={account}
          provider={library}
          walletConnectionActive={active}
        />
      </div>
    </div>
  );
}

export default Header;

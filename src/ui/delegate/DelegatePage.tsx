import { ReactElement, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";
import { Delegate, delegates } from "src/elf-council-delegates/delegates";
import H2 from "src/ui/base/H2";
import PortfolioCard from "src/ui/delegate/PortfolioCard/PortfolioCard";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import { t } from "ttag";
import DelegatesList from "./DelegatesList/DelegatesList";
import GradientCard from "src/ui/base/Card/GradientCard";
import { elementTokenContract } from "src/elf/contracts";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import { ShieldExclamationIcon, SparklesIcon } from "@heroicons/react/solid";
import { formatEther } from "ethers/lib/utils";
import { useDeposits } from "src/ui/contracts/useDeposits";
import classNames from "classnames";
import WarningLabel from "src/ui/delegate/PortfolioCard/WarningLabel";
import { isValidAddress } from "src/base/isValidAddress";

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const [currentDelegate, setCurrentDelegate] = useState<
    Delegate | undefined
  >();

  const [delegateAddressInput, setDelegateAddressInput] = useState("");
  const [selectedDelegate, setSelectedDelegate] = useState("");

  const { data: walletBalanceBN } = useTokenBalanceOf(
    elementTokenContract,
    account,
  );
  const walletBalance = formatEther(walletBalanceBN || 0);

  const { data: [, vaultBalanceBN] = [] } = useDeposits(account);
  const vaultBalance = formatEther(vaultBalanceBN || 0);

  const showWarning =
    !account || (parseInt(walletBalance) > 0 && parseInt(vaultBalance) === 0);

  useEffect(() => {
    if (
      delegateAddressInput.length === 42 &&
      isValidAddress(delegateAddressInput)
    ) {
      const chosenDelegate = delegates.find(
        (delegate) => delegate.address === delegateAddressInput,
      );

      if (chosenDelegate) {
        setSelectedDelegate(chosenDelegate.address);
      } else {
        setSelectedDelegate("");
      }
    } else {
      setSelectedDelegate("");
    }
  }, [delegateAddressInput]);

  return (
    <div
      className={classNames("flex flex-col items-center pb-8", {
        "pt-16": !showWarning,
      })}
    >
      {/* Warning Card */}
      {showWarning ? (
        <div className="flex flex-col xl:flex-row xl:justify-center mb-4 max-w-7xl w-full">
          <WarningLabel>
            {!account ? <NoConnection /> : <NoDeposit />}
          </WarningLabel>

          {/***
           * This is just a empty placeholder to match the width of its
           * counterpart container: delegates list. Matches the '8/12' width.
           * Helps keep warning label flush with the main content of the page,
           * i.e. the PortfolioCard & DelegateList + DelegateCard, due to the
           * 'justify-center' attribute on the main content, which makes it hard
           * to keep things flush and responsive.
           */}
          <div className="xl:w-8/12" />
        </div>
      ) : null}

      <div className="flex flex-col xl:flex-row xl:justify-center max-w-7xl">
        {/* Portfolio Card */}
        <GradientCard className="flex flex-col lg:flex-row xl:flex-col xl:w-4/12 rounded-xl shadow mr-16">
          <div className="px-6 py-7">
            <H2 className="mb-4 text-white text-2xl tracking-wide">{t`Portfolio`}</H2>
            <PortfolioCard
              account={account}
              signer={signer}
              currentDelegate={currentDelegate}
              walletBalance={walletBalance}
              vaultBalance={vaultBalance}
            />
          </div>
        </GradientCard>
        
        {/* Delegates */}
        <div className="flex flex-col xl:w-8/12">
          {/* Delegates List */}
          <DelegatesList
            selectedDelegate={selectedDelegate}
            setDelegateAddressInput={setDelegateAddressInput}
          />

          {/* Delegate Card */}
          <div className="px-6 py-7 mt-auto rounded-xl bg-principalRoyalBlue">
            <H2 className="mb-4 text-white text-2xl tracking-wide">{t`Delegate`}</H2>

            <DelegateCard
              account={account}
              signer={signer}
              vaultBalance={vaultBalance}
              currentDelegate={currentDelegate}
              setCurrentDelegate={setCurrentDelegate}
              delegateAddressInput={delegateAddressInput}
              setDelegateAddressInput={setDelegateAddressInput}
              selectedDelegate={selectedDelegate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NoConnection(): ReactElement {
  return (
    <p className="text-left">
      <div>{t`Unable to determine delegation eligibility`}</div>
      <div>
        {t`Please connect your wallet`}
        <ShieldExclamationIcon className="relative bottom-0.5 inline-block h-4 ml-2" />
      </div>
    </p>
  );
}

function NoDeposit(): ReactElement {
  return (
    <p className="text-left">
      <div>
        {t`Please ensure you deposit your tokens to earn your delegating power`}
        <SparklesIcon className="relative bottom-0.5 inline-block h-4 ml-2" />
      </div>
    </p>
  );
}

import { ReactElement, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";
import { t } from "ttag";
import classNames from "classnames";
import { ShieldExclamationIcon, SparklesIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { formatEther } from "ethers/lib/utils";

import { isValidAddress } from "src/base/isValidAddress";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import H2 from "src/ui/base/H2";
import GradientCard from "src/ui/base/Card/GradientCard";
import PortfolioCard from "src/ui/delegate/PortfolioCard/PortfolioCard";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import DelegatesList from "src/ui/delegate/DelegatesList/DelegatesList";
import WarningLabel from "src/ui/delegate/PortfolioCard/WarningLabel";
import { delegates } from "src/elf-council-delegates/delegates";
import { elementTokenContract } from "src/elf/contracts";
import { useDeposits } from "src/ui/contracts/useDeposits";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const currentDelegateAddress = useDelegate(account);
  const currentDelegate = getFeaturedDelegate(currentDelegateAddress || "");

  const [delegateAddressInput, setDelegateAddressInput] = useState("");
  const [selectedDelegate, setSelectedDelegate] = useState("");

  const { data: walletBalanceBN } = useTokenBalanceOf(
    elementTokenContract,
    account,
  );
  const walletBalance = formatEther(walletBalanceBN || 0);

  const { data: [, vaultBalanceBN] = [] } = useDeposits(account);
  const vaultBalance = formatEther(vaultBalanceBN || 0);

  const noConnection = !account;
  const noDelegation = +walletBalance > 0 && !currentDelegateAddress;
  const noDeposit =
    +walletBalance > 0 && +vaultBalance === 0 && currentDelegateAddress;
  const showWarning = [noConnection, noDelegation, noDeposit].some((x) => x);

  const renderWarning = () => {
    if (noConnection) {
      return <NoConnection />;
    } else if (noDelegation) {
      return <NoDelegation />;
    } else if (noDeposit) {
      return <NoDeposit />;
    }
  };

  // Used to verify if delegate inputted is an actual delegate in our system
  useEffect(() => {
    if (isValidAddress(delegateAddressInput)) {
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
          <WarningLabel className="xl:w-4/12 xl:mr-16 px-6 p-2">
            {renderWarning()}
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
        <GradientCard className="flex flex-col lg:flex-row xl:flex-col xl:w-4/12 rounded-xl shadow xl:mr-16">
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
        <div className="flex flex-col xl:w-8/12 mt-8 xl:mt-0">
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
      <div className="mt-1">
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

function NoDelegation(): ReactElement {
  return (
    <p className="text-left">
      <div>{t`Please set a delegation in order to deposit.`}</div>
      <Link key="learn-more-link" href="/resources">
        {/* There's a big discussion about how awful the Link api is for a11y
      here: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402 the
      best thing to do for now is just ignore this rule when an anchor tag is
      the child of a Link since all a tags *should* have an href 🙁 */
        /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="underline">{t`To learn more about delegations click here.`}</a>
      </Link>
    </p>
  );
}

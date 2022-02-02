import { ReactElement, useEffect, useState } from "react";

import { ShieldExclamationIcon, SparklesIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { Signer } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { t } from "ttag";

import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { elementTokenContract } from "src/elf/contracts";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import { useDeposits } from "src/ui/contracts/useDeposits";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import DelegatesList from "src/ui/delegate/DelegatesList/DelegatesList";
import WarningLabel from "src/ui/delegate/DelegateCard/WarningLabel";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { RESOURCES_URL } from "src/ui/resources";

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const currentDelegateAddress = useDelegate(account);

  const [delegateAddressInput, setDelegateAddressInput] = useState("");
  const [selectedDelegate, setSelectedDelegate] = useState("");

  const { data: walletBalanceBN } = useTokenBalanceOf(
    elementTokenContract,
    account,
  );

  const walletBalance = formatEther(walletBalanceBN || 0);

  const { data: [, vaultBalanceBN] = [] } = useDeposits(account);
  const vaultBalance = formatEther(vaultBalanceBN || 0);

  const showNoConnectionWarning = !account;
  const showNoDelegationWarning = +walletBalance > 0 && !currentDelegateAddress;
  const showNoDepositWarning =
    +walletBalance > 0 && +vaultBalance === 0 && currentDelegateAddress;
  const showWarning = [
    showNoConnectionWarning,
    showNoDelegationWarning,
    showNoDepositWarning,
  ].some((x) => x);

  const renderWarning = () => {
    if (showNoConnectionWarning) {
      return <NoConnection />;
    } else if (showNoDelegationWarning) {
      return <NoDelegation />;
    } else if (showNoDepositWarning) {
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
      <div className="flex flex-col max-w-7xl">
        {/* Warning Card */}
        {showWarning ? (
          <div className="flex flex-col w-full mb-4 xl:flex-row xl:justify-center max-w-7xl">
            <WarningLabel className="p-2 px-6 w-full">
              {renderWarning()}
            </WarningLabel>
          </div>
        ) : null}
        {/* Delegates */}
        <div className="flex flex-col xl:w-full">
          {/* Delegates List */}
          <DelegatesList
            selectedDelegate={selectedDelegate}
            setDelegateAddressInput={setDelegateAddressInput}
          />

          {/* Delegate Card */}
          <Card
            variant={CardVariant.BLUE}
            className="px-6 mt-auto py-7 rounded-xl"
          >
            <H2 className="mb-4 text-2xl tracking-wide text-white">{t`My Delegate`}</H2>
            <DelegateCard
              account={account}
              signer={signer}
              vaultBalance={vaultBalance}
              currentDelegateAddress={currentDelegateAddress}
              delegateAddressInput={delegateAddressInput}
              setDelegateAddressInput={setDelegateAddressInput}
              selectedDelegate={selectedDelegate}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

function NoConnection(): ReactElement {
  return (
    <p className="text-center w-full whitespace-pre-wrap">
      <span className="inline-block">
        {t`Unable to determine delegation eligibility.`}{" "}
      </span>
      <span className="inline-block">
        {t`Please connect your wallet`}
        <ShieldExclamationIcon className="relative bottom-0.5 inline-block h-4 ml-2" />
      </span>
    </p>
  );
}

function NoDeposit(): ReactElement {
  return (
    <p className="text-center w-full">
      <span className="inline-block">
        {t`Please ensure you deposit your tokens to earn your delegating power`}
        <SparklesIcon className="relative bottom-0.5 inline-block h-4 ml-2" />
      </span>
    </p>
  );
}

function NoDelegation(): ReactElement {
  return (
    <p className="text-center w-full whitespace-pre-wrap">
      <span className="inline-block">
        {t`Please set a delegation in order to deposit.`}{" "}
      </span>
      <span className="inline-block">
        <a
          target="_blank"
          rel="noreferrer"
          href={RESOURCES_URL}
          className="underline"
        >{t`To learn more about delegations click here`}</a>
      </span>
    </p>
  );
}

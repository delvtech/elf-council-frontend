import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";

import { ShieldExclamationIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { Signer } from "ethers";
import { t } from "ttag";

import { useDelegate } from "src/ui/delegate/useDelegate";
import { useChangeDelegation } from "src/ui/contracts/useChangeDelegation";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import DelegatesList from "src/ui/delegate/DelegatesList/DelegatesList";
import WarningLabel from "src/ui/delegate/DelegateCard/WarningLabel";
import { useResolvedEnsName } from "src/ui/ethereum/useResolvedEnsName";

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const [delegateAddressInput, setDelegateAddressInput] = useState("");
  const [selectedDelegate, setSelectedDelegate] = useState("");

  const { data: resolvedDelegateAddressInput } = useResolvedEnsName(
    delegateAddressInput,
    library,
  );

  const {
    mutate: changeDelegation,
    isLoading,
    isError,
    isSuccess,
  } = useChangeDelegation(account, signer);

  const delegateAddressOnChain = useDelegate(account);

  const showNoConnectionWarning = !account;

  const renderWarning = () => {
    if (showNoConnectionWarning) {
      return <NoConnection />;
    }
  };

  // Used to verify if the custom delegate inputted is an actual address
  useEffect(() => {
    if (!resolvedDelegateAddressInput) {
      return;
    }

    if (resolvedDelegateAddressInput) {
      setSelectedDelegate(resolvedDelegateAddressInput);
    } else {
      setSelectedDelegate("");
    }
  }, [account, resolvedDelegateAddressInput]);

  return (
    <div
      className={classNames("flex flex-col items-center pb-8", {
        "pt-16": !showNoConnectionWarning,
      })}
    >
      <Head>
        <title>{t`Choose Delegate | Element Council Protocol`}</title>
      </Head>

      <div className="flex w-full max-w-4xl flex-col">
        {/* Warning Card */}
        {showNoConnectionWarning ? (
          <div className="mb-8 flex w-full flex-col xl:flex-row xl:justify-center">
            <WarningLabel className="w-full p-2 px-6">
              {renderWarning()}
            </WarningLabel>
          </div>
        ) : null}
        {/* Delegates */}
        <div className="flex flex-col">
          {/* Delegates List */}
          <DelegatesList
            account={account}
            provider={library}
            changeDelegation={changeDelegation}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            delegateAddressOnChain={delegateAddressOnChain}
            selectedDelegate={selectedDelegate}
            setDelegateAddressInput={setDelegateAddressInput}
          />

          {/* Delegate Card */}
          <Card
            variant={CardVariant.BLUE}
            className="mt-auto rounded-xl px-6 py-7"
          >
            <H2 className="mb-4 text-2xl tracking-wide text-white">{t`My Delegate`}</H2>
            <DelegateCard
              account={account}
              provider={library}
              changeDelegation={changeDelegation}
              isLoading={isLoading}
              isSuccess={isSuccess}
              delegateAddressInput={delegateAddressInput}
              delegateAddressOnChain={delegateAddressOnChain}
              setDelegateAddressInput={setDelegateAddressInput}
              selectedDelegate={selectedDelegate}
              setSelectedDelegate={setSelectedDelegate}
              resolvedDelegateAddressInput={resolvedDelegateAddressInput}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

function NoConnection(): ReactElement {
  return (
    <p className="w-full whitespace-pre-wrap text-center">
      <span className="inline-block">
        {t`Unable to determine delegation eligibility.`}{" "}
      </span>
      <span className="inline-block">
        {t`Please connect your wallet`}
        <ShieldExclamationIcon className="relative bottom-0.5 ml-2 inline-block h-4" />
      </span>
    </p>
  );
}

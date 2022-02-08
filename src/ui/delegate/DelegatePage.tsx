import { ReactElement, useEffect, useState } from "react";

import { ShieldExclamationIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { ContractReceipt, Overrides, Signer } from "ethers";
import { t } from "ttag";

import { useDelegate } from "src/ui/delegate/useDelegate";
import { useChangeDelegation } from "src/ui/contracts/useChangeDelegation";
import { isValidAddress } from "src/base/isValidAddress";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import DelegatesList from "src/ui/delegate/DelegatesList/DelegatesList";
import WarningLabel from "src/ui/delegate/DelegateCard/WarningLabel";
import { UseMutateFunction } from "react-query";

export interface ChangeDelegationResult {
  changeDelegation: UseMutateFunction<
    ContractReceipt | undefined,
    unknown,
    [
      newDelegate: string,
      overrides?:
        | (Overrides & {
            from?: string | Promise<string> | undefined;
          })
        | undefined,
    ],
    unknown
  >;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const [delegateAddressInput, setDelegateAddressInput] = useState("");
  const [selectedDelegate, setSelectedDelegate] = useState("");

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
    if (delegateAddressInput.length === 0) {
      return;
    }

    if (isValidAddress(delegateAddressInput)) {
      setSelectedDelegate(delegateAddressInput);
    } else {
      setSelectedDelegate("");
    }
  }, [account, delegateAddressInput]);

  return (
    <div
      className={classNames("flex flex-col items-center pb-8", {
        "pt-16": !showNoConnectionWarning,
      })}
    >
      <div className="flex flex-col w-full max-w-4xl">
        {/* Warning Card */}
        {showNoConnectionWarning ? (
          <div className="flex flex-col w-full mb-4 xl:flex-row xl:justify-center">
            <WarningLabel className="p-2 px-6 w-full">
              {renderWarning()}
            </WarningLabel>
          </div>
        ) : null}
        {/* Delegates */}
        <div className="flex flex-col">
          {/* Delegates List */}
          <DelegatesList
            account={account}
            changeDelegationResult={{
              changeDelegation,
              isLoading,
              isError,
              isSuccess,
            }}
            delegateAddressOnChain={delegateAddressOnChain}
            selectedDelegate={selectedDelegate}
            setDelegateAddressInput={setDelegateAddressInput}
            setSelectedDelegate={setSelectedDelegate}
          />

          {/* Delegate Card */}
          <Card
            variant={CardVariant.BLUE}
            className="px-6 mt-auto py-7 rounded-xl"
          >
            <H2 className="mb-4 text-2xl tracking-wide text-white">{t`My Delegate`}</H2>
            <DelegateCard
              account={account}
              changeDelegationResult={{
                changeDelegation,
                isLoading,
                isError,
                isSuccess,
              }}
              delegateAddressInput={delegateAddressInput}
              delegateAddressOnChain={delegateAddressOnChain}
              setDelegateAddressInput={setDelegateAddressInput}
              selectedDelegate={selectedDelegate}
              setSelectedDelegate={setSelectedDelegate}
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

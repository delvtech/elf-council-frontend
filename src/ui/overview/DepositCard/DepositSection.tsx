import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";

import { formatEther, parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import { isValidAddress } from "src/base/isValidAddress";
import { addressesJson } from "src/elf-council-addresses";
import tw from "src/elf-tailwindcss-classnames";
import { elementTokenContract } from "src/elf/contracts";
import { useTokenAllowance } from "src/elf/token/useTokenAllowance";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H3 from "src/ui/base/H3";
import TextInput from "src/ui/base/Input/TextInput";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useSetTokenAllowance } from "src/ui/base/token/useSetTokenAllowance";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { useDepositIntoLockingVault } from "src/ui/rewards/useDepositIntoLockingVault";
import { jt, t } from "ttag";

import { DepositButton } from "./DepositButton";
import { DepositInput } from "./DepositInput";
import Link from "next/link";

const { elementToken, lockingVault } = addressesJson.addresses;

interface DepositSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
export function DepositSection(props: DepositSectionProps): ReactElement {
  const { account, signer } = props;
  const { data: balanceBN } = useTokenBalanceOf(elementTokenContract, account);
  const { data: allowanceBN } = useTokenAllowance(
    elementTokenContract,
    account,
    lockingVault
  );
  const delegate = useDelegate(account);
  const balance = formatEther(balanceBN || 0);
  const allowance = formatEther(allowanceBN || 0);
  const hasBalanceToDeposit = !!Number(balance);

  const title = t`Increase Voting Power`;
  const description = t`Deposit your ELFI tokens into the governance system.`;
  const description2 = t`This will give your delegate more voting power.`;
  const learnMoreLink = (
    <Link key="learn-more-link" href="/resources">
      <a
        className={tw("text-blue-500", "underline")}
        href="/resources"
      >{t`here.`}</a>
    </Link>
  );
  const learnMore = jt`Learn more ${learnMoreLink}`;

  const [delegateAddress, setDelegateAddress] = useState<string>("");
  const onUpdateDelegateAddress = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const delegateAddr = event.target.value;
      setDelegateAddress(delegateAddr);
    },
    []
  );

  const { value: depositAmount, setNumericValue: setDepositAmount } =
    useNumericInputValue();

  const hasAllowance =
    allowanceBN?.gt(parseEther(depositAmount || "0")) || false;

  // handlers for numeric input
  const onSetDepositAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newDepositAmount = event.target.value;
      setDepositAmount(newDepositAmount);
    },
    [setDepositAmount]
  );
  const clearDepositAmount = useCallback(() => {
    setDepositAmount("");
  }, [setDepositAmount]);

  // handler for max button
  const onSetMax = useCallback(() => {
    setDepositAmount(balance);
  }, [balance, setDepositAmount]);

  // handler for deposit button
  const { mutate: deposit, isLoading } = useDepositIntoLockingVault(
    signer,
    clearDepositAmount
  );
  const onDeposit = useCallback(() => {
    if (!account || !delegateAddress) {
      return;
    }

    deposit([account, parseEther(depositAmount), delegateAddress]);
  }, [account, delegateAddress, deposit, depositAmount]);

  // handler for allowance button
  const { mutate: allow } = useSetTokenAllowance(signer, elementToken);
  const onSetAllowance = useCallback(() => {
    if (!account) {
      return;
    }

    allow([lockingVault, ethers.constants.MaxUint256]);
  }, [account, allow]);

  // TODO: make DelegateAddressInput and move these inside there
  const hasAnyBalance = !!Number(balance);
  const disableWithoutError =
    !account || !hasAllowance || !hasAnyBalance || !delegateAddress;
  const addressError = disableWithoutError
    ? false
    : !isValidAddress(delegateAddress);
  return (
    <div>
      <div className={tw("grid", "grid-cols-1", "gap-6", "md:grid-cols-2")}>
        <div>
          <H3
            className={tw("text-brandDarkBlue-dark", "font-semibold", "pb-2")}
          >
            {title}
          </H3>
          <p>{description}</p>
          <p>{description2}</p>
          <p>{learnMore}</p>
        </div>

        <div className={tw("space-y-4")}>
          <div className={tw("flex", "flex-grow", "justify-end")}>
            <LabeledStat data={balance} bottomLabel={t`Balance`} />
          </div>
          <div className={tw("flex", "space-x-4", "w-full")}>
            <Button
              disabled={!hasBalanceToDeposit || !account}
              onClick={onSetMax}
            >
              <span className={tw("w-full")}>{t`Max`}</span>
            </Button>
            <DepositInput
              balance={balance}
              depositAmount={depositAmount}
              onSetDepositAmount={onSetDepositAmount}
              id={"deposit-amount"}
              name={"Deposit amount"}
              placeholder={"Insert amount to deposit"}
              screenReaderLabel={"Amount to deposit"}
            />
          </div>
          {!delegate && (
            <TextInput
              error={addressError}
              screenReaderLabel={t`Insert Delegate Address`}
              id={"delegate-address"}
              name={t`Insert Delegate Address`}
              placeholder={t`Insert Delegate Address`}
              className={tw("mb-8", "h-12", "text-center")}
              value={delegateAddress}
              onChange={onUpdateDelegateAddress}
            />
          )}
          <Button
            className={tw("w-full")}
            onClick={onSetAllowance}
            disabled={!account || hasAllowance}
            variant={ButtonVariant.OUTLINE_BLUE}
          >
            <span className={tw("w-full")}>
              {hasAllowance ? t`Approved` : t`Allow`}
            </span>
          </Button>
          <DepositButton
            isLoading={isLoading}
            balance={balance}
            allowance={allowance}
            account={account}
            depositAmount={depositAmount}
            isDelegated={isValidAddress(delegate || "")}
            delegateAddress={delegateAddress}
            onDeposit={onDeposit}
          />
        </div>
      </div>
    </div>
  );
}

import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";

import { formatEther, parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import { isValidAddress } from "src/base/isValidAddress";
import { addressesJson } from "src/elf-council-addresses";
import tw, {
  textColor,
  display,
  gridTemplateColumns,
  gap,
  fontWeight,
  padding,
  space,
  flexGrow,
  justifyContent,
  width,
  margin,
  height,
  textAlign,
} from "src/elf-tailwindcss-classnames";
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
    lockingVault,
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
      {/* There's a big discussion about how awful the Link api is for a11y
      here: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402 the
      best thing to do for now is just ignore this rule when an anchor tag is
      the child of a Link since all a tags *should* have an href 🙁 */
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="text-blue-500 underline">{t`here.`}</a>
    </Link>
  );
  const learnMore = jt`Learn more ${learnMoreLink}`;

  const [delegateAddress, setDelegateAddress] = useState<string>("");
  const onUpdateDelegateAddress = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const delegateAddr = event.target.value;
      setDelegateAddress(delegateAddr);
    },
    [],
  );

  const { value: depositAmount, setNumericValue: setDepositAmount } =
    useNumericInputValue();

  const hasAllowance =
    allowanceBN?.gt(parseEther(depositAmount || "0")) || false;

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
    account,
    clearDepositAmount,
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
      <div
        className={tw(
          display("grid"),
          gridTemplateColumns("grid-cols-1", "md:grid-cols-2"),
          gap("gap-6"),
        )}
      >
        <div>
          <H3
            className={tw(
              textColor("text-brandDarkBlue-dark"),
              fontWeight("font-semibold"),
              padding("pb-2"),
            )}
          >
            {title}
          </H3>
          <p>{description}</p>
          <p>{description2}</p>
          <p>{learnMore}</p>
        </div>

        <div className={space("space-y-4")}>
          <div
            className={tw(
              display("flex"),
              flexGrow("grow"),
              justifyContent("justify-end"),
            )}
          >
            <LabeledStat data={balance} bottomLabel={t`Balance`} />
          </div>
          <div
            className={tw(display("flex"), space("space-x-4"), width("w-full"))}
          >
            <Button
              disabled={!hasBalanceToDeposit || !account}
              onClick={onSetMax}
            >
              <span className={width("w-full")}>{t`Max`}</span>
            </Button>
            <DepositInput
              balance={balance}
              depositAmount={depositAmount}
              onDeposit={setDepositAmount}
              id={"deposit-amount"}
              name={t`Deposit amount`}
              placeholder={t`Insert amount to deposit`}
              screenReaderLabel={t`Amount to deposit`}
            />
          </div>
          {!delegate && (
            <TextInput
              error={addressError}
              screenReaderLabel={t`Insert Delegate Address`}
              id={"delegate-address"}
              name={t`Insert Delegate Address`}
              placeholder={t`Insert Delegate Address`}
              className={tw(
                margin("mb-8"),
                height("h-12"),
                textAlign("text-center"),
              )}
              value={delegateAddress}
              onChange={onUpdateDelegateAddress}
            />
          )}
          <Button
            className={width("w-full")}
            onClick={onSetAllowance}
            disabled={!account || hasAllowance}
            variant={ButtonVariant.OUTLINE_BLUE}
          >
            <span className={width("w-full")}>
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

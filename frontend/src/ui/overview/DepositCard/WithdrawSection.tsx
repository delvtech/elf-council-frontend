import React, { ChangeEvent, ReactElement, useCallback } from "react";

import { parseEther } from "@ethersproject/units";
import { FixedNumber, Signer } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import H3 from "src/ui/base/H3";
import NumericInput from "src/ui/base/Input/NumericInput";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { WithdrawButton } from "src/ui/overview/DepositCard/WithdrawButton";
import { useWithdrawFromLockingVault } from "src/ui/rewards/useWithdrawFromLockingVault";
import { t } from "ttag";

interface WithdrawSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
export function WithdrawSection(props: WithdrawSectionProps): ReactElement {
  const { account, signer } = props;
  const amountDeposited = useDeposited(account) || "0";

  const title = t`Unstake`;
  const description = t`Withdraw your ELFI tokens to your wallet.`;

  const { value: withdrawAmount, setNumericValue: setWithdrawAmount } =
    useNumericInputValue();

  const hasAmountDeposited = !!Number(amountDeposited);
  const hasEnoughDeposited = !FixedNumber.from(amountDeposited)
    .subUnsafe(FixedNumber.from(withdrawAmount || "0"))
    .isNegative();

  // handlers for numeric input
  const clearWithdrawInput = useCallback(() => {
    setWithdrawAmount("");
  }, [setWithdrawAmount]);

  const onSetWithdrawAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newWithdrawAmount = event.target.value;
      setWithdrawAmount(newWithdrawAmount);
    },
    [setWithdrawAmount]
  );

  // handler for max button
  const onSetMax = useCallback(() => {
    if (amountDeposited) {
      setWithdrawAmount(amountDeposited);
    }
  }, [amountDeposited, setWithdrawAmount]);

  // handler for withdraw button
  const withdrawFromLockingVault = useWithdrawFromLockingVault(
    signer,
    clearWithdrawInput
  );
  const { mutate: withdraw, isLoading } = withdrawFromLockingVault;
  const onWithdraw = useCallback(() => {
    if (!account) {
      return;
    }

    withdraw([parseEther(withdrawAmount)]);
  }, [account, withdraw, withdrawAmount]);

  return (
    <div>
      <div className={tw("grid", "grid-cols-1", "gap-6", "sm:grid-cols-2")}>
        <div>
          <H3
            className={tw("text-brandDarkBlue-dark", "font-semibold", "pb-2")}
          >
            {title}
          </H3>
          <p>{description}</p>
        </div>

        <div className={tw("space-y-4")}>
          <div className={tw("flex", "flex-grow", "justify-end")}>
            <LabeledStat data={amountDeposited} bottomLabel={t`Deposited`} />
          </div>
          <div className={tw("flex", "space-x-4", "w-full")}>
            <Button
              disabled={!hasAmountDeposited || !account}
              onClick={onSetMax}
            >
              <span className={tw("w-full")}>{t`Max`}</span>
            </Button>
            <NumericInput
              disabled={!hasAmountDeposited}
              error={!hasEnoughDeposited}
              screenReaderLabel={t`Amount to withdraw`}
              id={"withdraw-amount"}
              name={t`Withdraw amount`}
              placeholder={t`Insert amount to withdraw`}
              className={tw("flex-grow")}
              inputClassName={tw("h-12", "text-center")}
              value={withdrawAmount}
              onChange={onSetWithdrawAmount}
            />
          </div>
          <WithdrawButton
            isLoading={isLoading}
            account={account}
            amountDeposited={amountDeposited}
            withdrawAmount={withdrawAmount}
            onWithdraw={onWithdraw}
          />
        </div>
      </div>
    </div>
  );
}

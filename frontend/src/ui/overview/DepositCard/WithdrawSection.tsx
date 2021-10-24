import React, { ChangeEvent, ReactElement, useCallback } from "react";

import { formatEther, parseEther } from "@ethersproject/units";
import { Signer } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import { elementTokenContract } from "src/elf/contracts";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import Button from "src/ui/base/Button/Button";
import H3 from "src/ui/base/H3";
import NumericInput from "src/ui/base/Input/NumericInput";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useWithdrawFromLockingVault } from "src/ui/rewards/useWithdrawFromLockingVault";
import { t } from "ttag";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useUnclaimed } from "src/ui/rewards/useUnclaimed";

interface WithdrawSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
export function WithdrawSection(props: WithdrawSectionProps): ReactElement {
  const { account, signer } = props;
  const amountDeposited = useDeposited(account);

  const hasAmountDeposited = !!Number(amountDeposited);

  const title = t`Unstake`;
  const description = t`Withdraw your ELFI tokens to your wallet.`;

  // handler for numeric input
  const { value: withdrawAmount, setNumericValue: setWithdrawAmount } =
    useNumericInputValue();

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
  const { mutate: withdraw } = useWithdrawFromLockingVault(signer);
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
            <LabeledStat
              data={amountDeposited || "0"}
              bottomLabel={t`Unclaimed rewards`}
            />
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
          <Button
            disabled={!account}
            className={tw("w-full")}
            onClick={onWithdraw}
          >
            <span className={tw("w-full")}>{t`Withdraw`}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

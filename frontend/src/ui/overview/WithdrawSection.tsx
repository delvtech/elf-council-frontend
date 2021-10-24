import React, { ChangeEvent, ReactElement, useCallback } from "react";
import { parseEther } from "@ethersproject/units";
import { Signer } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import H3 from "src/ui/base/H3";
import NumericInput from "src/ui/base/Input/NumericInput";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useWithdrawFromLockingVault } from "src/ui/rewards/useWithdrawFromLockingVault";
import { t } from "ttag";

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
          <H3 className={tw("text-blue-900", "font-semibold", "pb-2")}>
            {title}
          </H3>
          <p>{description}</p>
        </div>

        <div className={tw("space-y-4")}>
          <div className={tw("flex", "space-x-4", "w-full")}>
            <Button
              disabled={!hasAmountDeposited || !account}
              onClick={onSetMax}
            >
              <span className={tw("w-full")}>{t`Max`}</span>
            </Button>
            <NumericInput
              screenReaderLabel={t`Amount to deposit`}
              id={"deposit-amount"}
              name={t`Deposit amount`}
              placeholder={t`Insert amount to withdraw`}
              className={tw("h-12", "text-center", "flex-grow")}
              inputClassName={tw("h-12", "text-center", "flex-grow")}
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

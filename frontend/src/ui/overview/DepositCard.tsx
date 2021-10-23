import React, { ChangeEvent, ReactElement, useCallback } from "react";

import { formatEther, parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import { addressesJson } from "src/elf-council-addresses";
import tw from "src/elf-tailwindcss-classnames";
import { elementTokenContract } from "src/elf/contracts";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2";
import H3 from "src/ui/base/H3";
import NumericInput from "src/ui/base/Input/NumericInput";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { useSetTokenAllowance } from "src/ui/base/token/useSetTokenAllowance";
import { useDepositIntoLockingVault } from "src/ui/rewards/useDepositIntoLockingVault";
import { t } from "ttag";
import { useWithdrawFromLockingVault } from "src/ui/rewards/useWithdrawFromLockingVault";

interface DepositCardProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}

export default function DepositCard(props: DepositCardProps): ReactElement {
  const { account, signer } = props;

  return (
    <Card className={tw("w-full")}>
      <H2
        className={tw("text-blue-900", "font-semibold", "pb-4")}
      >{t`Staking`}</H2>
      <div className={tw("space-y-12")}>
        <DepositSection account={account} signer={signer} />
        <WithdrawSection account={account} signer={signer} />
      </div>
    </Card>
  );
}

interface DepositSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}

function DepositSection(props: DepositSectionProps): ReactElement {
  const { account, signer } = props;
  const { elementToken, lockingVault } = addressesJson.addresses;
  const { data: balanceBN } = useTokenBalanceOf(elementTokenContract, account);
  const balance = formatEther(balanceBN || 0);

  const title = t`Stake`;
  const description = t`Deposit your ELFI tokens into the governanace system.`;

  // handler for numeric input
  const { value: depositAmount, setNumericValue: setDepositAmount } =
    useNumericInputValue();

  const onSetDepositAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newDepositAmount = event.target.value;
      setDepositAmount(newDepositAmount);
    },
    [setDepositAmount]
  );

  // handler for max button
  const onSetMax = useCallback(() => {
    setDepositAmount(balance);
  }, [balance, setDepositAmount]);

  // handler for deposit button
  const { mutate: deposit } = useDepositIntoLockingVault(signer);
  const onDeposit = useCallback(() => {
    if (!account) {
      return;
    }

    deposit([account, parseEther(depositAmount), account]);
  }, [account, deposit, depositAmount]);

  // handler for allowance button
  const { mutate: allow } = useSetTokenAllowance(signer, elementToken);
  const onSetAllowance = useCallback(() => {
    if (!account) {
      return;
    }

    allow([lockingVault, ethers.constants.MaxUint256]);
  }, [account, allow, lockingVault]);

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
            <Button onClick={onSetMax}>
              <span className={tw("w-full")}>{t`Max`}</span>
            </Button>
            <NumericInput
              screenReaderLabel={t`Amount to deposit`}
              id={"deposit-amount"}
              name={t`Deposit amount`}
              placeholder={t`Insert amount to deposit`}
              className={tw("h-12", "text-center", "flex-grow")}
              inputClassName={tw("h-12", "text-center", "flex-grow")}
              value={depositAmount}
              onChange={onSetDepositAmount}
            />
          </div>
          <Button
            className={tw("w-full")}
            onClick={onSetAllowance}
            disabled={!account}
            variant={ButtonVariant.OUTLINE_BLUE}
          >
            <span className={tw("w-full")}>{t`Allow`}</span>
          </Button>
          <Button className={tw("w-full")} onClick={onDeposit}>
            <span className={tw("w-full")}>{t`Deposit`}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface WithdrawSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
function WithdrawSection(props: WithdrawSectionProps) {
  const { account, signer } = props;
  const { data: balanceBN } = useTokenBalanceOf(elementTokenContract, account);
  const balance = formatEther(balanceBN || 0);

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
    setWithdrawAmount(balance);
  }, [balance, setWithdrawAmount]);

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
            <Button onClick={onSetMax}>
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
          <Button className={tw("w-full")} onClick={onWithdraw}>
            <span className={tw("w-full")}>{t`Withdraw`}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

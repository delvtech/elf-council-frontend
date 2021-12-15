import React, { ReactElement } from "react";
import { FixedNumber } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import NumericInput from "src/ui/base/Input/NumericInput";
import { t } from "ttag";

interface DepositInputProps {
  depositAmount: string;
  balance: string;
  onSetDepositAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  transactionType?: string;
}

export function DepositInput(props: DepositInputProps): ReactElement {
  const {
    depositAmount,
    balance,
    onSetDepositAmount,
    transactionType = "deposit",
  } = props;
  const hasBalance = Number(balance);
  const hasEnoughBalance = !FixedNumber.from(balance || "0")
    .subUnsafe(FixedNumber.from(depositAmount || "0"))
    .isNegative();
  const properCaseName =
    transactionType[0].toUpperCase() + transactionType.slice(1);

  return (
    <NumericInput
      disabled={!hasBalance}
      error={!hasEnoughBalance}
      screenReaderLabel={t`Amount to ${transactionType}`}
      id={`${transactionType}-amount`}
      name={t`${properCaseName} amount`}
      placeholder={t`Insert amount to ${transactionType}`}
      className={tw("flex-grow")}
      inputClassName={tw("h-12", "text-center")}
      value={depositAmount}
      onChange={onSetDepositAmount}
    />
  );
}
